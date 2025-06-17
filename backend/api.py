from fastapi import FastAPI, Depends, HTTPException, Header
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
from sqlalchemy.orm import Session
from jose import JWTError, jwt
from passlib.context import CryptContext
from datetime import datetime, timedelta
import redis
import uuid
from config.config import config
from db.database import get_db, User, Assessment, Subscription, RateLimit, CommunityThreat, Resource
from db.breach_data import check_breaches
from core.scoring import calculate_email_score, calculate_url_score, calculate_ip_score
from core.security_apis import check_email_reputation, check_url_security, check_ip_reputation, check_shodan_host
from core.report_generator import generate_report
from core.notifications import send_notification
from core.community import report_threat, get_community_threats
from db.resources import get_resources, add_resource
from reports.pdf_generator import generate_pdf_report
from utils.validators import validate_email, validate_url, validate_ip
from utils.logger import logger

app = FastAPI()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Attempt to connect to Redis, but allow fallback if it fails
try:
    redis_client = redis.Redis.from_url(config.REDIS_URL, decode_responses=True)
    redis_client.ping()
    logger.info("Connected to Redis successfully")
    USE_REDIS = True
except Exception as e:
    logger.warning(f"Failed to connect to Redis: {e}. Disabling rate limiting.")
    USE_REDIS = False
    redis_client = None

# Pydantic Models
class UserCreate(BaseModel):
    email: str
    password: str
    name: str

class UserLogin(BaseModel):
    email: str
    password: str

class EmailAssessmentRequest(BaseModel):
    email: str

class URLAssessmentRequest(BaseModel):
    url: str

class IPAssessmentRequest(BaseModel):
    ip: str

class CommunityThreatRequest(BaseModel):
    target: str
    type: str
    threat_type: str
    severity: str
    details: dict

class ResourceRequest(BaseModel):
    title: str
    content: str
    category: str

# Authentication
def create_access_token(data: dict, expires_delta: timedelta = timedelta(minutes=30)):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, config.JWT_SECRET, algorithm="HS256")

async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    try:
        payload = jwt.decode(token, config.JWT_SECRET, algorithms=["HS256"])
        email = payload.get("sub")
        if not email:
            raise HTTPException(status_code=401, detail="Invalid token")
        user = db.query(User).filter(User.email == email).first()
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        return user
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

# Rate Limiting
async def check_rate_limit(user: User, endpoint: str, db: Session):
    if not USE_REDIS:
        logger.info("Redis not available, skipping rate limiting")
        return  # Skip rate limiting if Redis isn't available

    limits = config.PREMIUM_LIMITS if user.plan == "premium" else config.FREE_LIMITS
    key = f"rate_limit:{user.id}:{endpoint}"
    current_count = redis_client.get(key)
    
    if current_count is None:
        redis_client.setex(key, 60, 1)
    elif int(current_count) >= limits["requests_per_minute"]:
        raise HTTPException(status_code=429, detail="Rate limit exceeded")
    else:
        redis_client.incr(key)

# Endpoints
@app.post("/api/auth/register")
async def register(user: UserCreate, db: Session = Depends(get_db)):
    validate_email(user.email)
    if db.query(User).filter(User.email == user.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")
    password_hash = pwd_context.hash(user.password)
    db_user = User(email=user.email, password_hash=password_hash, name=user.name)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    token = create_access_token({"sub": user.email})
    return {"success": True, "data": {"user": {"id": str(db_user.id), "email": db_user.email, "name": db_user.name, "plan": db_user.plan}, "token": token}}

@app.post("/api/auth/login")
async def login(user: UserLogin, db: Session = Depends(get_db)):
    validate_email(user.email)
    db_user = db.query(User).filter(User.email == user.email).first()
    if not db_user or not pwd_context.verify(user.password, db_user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_access_token({"sub": user.email})
    return {"success": True, "data": {"user": {"id": str(db_user.id), "email": db_user.email, "name": db_user.name, "plan": db_user.plan}, "token": token}}

@app.post("/api/assess/email")
async def assess_email(request: EmailAssessmentRequest, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    await check_rate_limit(user, "assess_email", db)
    validate_email(request.email)
    
    # Email reputation and Shodan check for the domain
    email_data = await check_email_reputation(request.email)
    shodan_data = await check_shodan_host(request.email.split("@")[1])
    email_data.update(shodan_data)
    email_data["breaches"] = check_breaches(request.email)
    score = calculate_email_score(email_data)
    status = "Secure" if score >= 75 else "Moderate" if score >= 50 else "High Risk"
    threats = email_data.get("phishing_indicators", []) + ([f"Breach: {b}" for b in email_data["breaches"]] if email_data["breaches"] else []) + email_data.get("threats", [])
    
    assessment = {"target": request.email, "type": "email", "score": score, "status": status, "threats": threats, "details": email_data}
    report = generate_report(assessment)
    
    db_assessment = Assessment(**assessment, user_id=user.id, report_id=report["report_id"])
    db.add(db_assessment)
    db.commit()
    
    send_notification(user.email, assessment)
    return {"success": True, "data": {**assessment, "report_id": report["report_id"], "timestamp": report["created_at"]}}

@app.post("/api/assess/url")
async def assess_url(request: URLAssessmentRequest, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    await check_rate_limit(user, "assess_url", db)
    validate_url(request.url)
    
    url_data = await check_url_security(request.url)
    score = calculate_url_score(url_data)
    status = "Secure" if score >= 75 else "Moderate" if score >= 50 else "High Risk"
    threats = url_data.get("threats", [])
    
    assessment = {"target": request.url, "type": "url", "score": score, "status": status, "threats": threats, "details": url_data}
    report = generate_report(assessment)
    
    db_assessment = Assessment(**assessment, user_id=user.id, report_id=report["report_id"])
    db.add(db_assessment)
    db.commit()
    
    send_notification(user.email, assessment)
    return {"success": True, "data": {**assessment, "report_id": report["report_id"], "timestamp": report["created_at"]}}

@app.post("/api/assess/ip")
async def assess_ip(request: IPAssessmentRequest, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    await check_rate_limit(user, "assess_ip", db)
    validate_ip(request.ip)
    
    ip_data = await check_ip_reputation(request.ip)
    score = calculate_ip_score(ip_data)
    status = "Secure" if score >= 75 else "Moderate" if score >= 50 else "High Risk"
    threats = ip_data.get("threats", [])
    
    assessment = {"target": request.ip, "type": "ip", "score": score, "status": status, "threats": threats, "details": ip_data}
    report = generate_report(assessment)
    
    db_assessment = Assessment(**assessment, user_id=user.id, report_id=report["report_id"])
    db.add(db_assessment)
    db.commit()
    
    send_notification(user.email, assessment)
    return {"success": True, "data": {**assessment, "report_id": report["report_id"], "timestamp": report["created_at"]}}

@app.get("/api/reports/{report_id}")
async def get_report(report_id: str, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    assessment = db.query(Assessment).filter(Assessment.report_id == report_id, Assessment.user_id == user.id).first()
    if not assessment:
        raise HTTPException(status_code=404, detail="Report not found")
    report = generate_report(assessment.__dict__)
    return {"success": True, "data": report}

@app.get("/api/reports/{report_id}/download")
async def download_report(report_id: str, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    assessment = db.query(Assessment).filter(Assessment.report_id == report_id, Assessment.user_id == user.id).first()
    if not assessment:
        raise HTTPException(status_code=404, detail="Report not found")
    pdf_bytes = generate_pdf_report(assessment.__dict__)
    return {"success": True, "data": pdf_bytes.hex()}  # Hex-encoded for simplicity

@app.get("/api/history")
async def get_history(page: int = 1, limit: int = 10, type: str = None, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    query = db.query(Assessment).filter(Assessment.user_id == user.id)
    if type:
        query = query.filter(Assessment.type == type)
    total = query.count()
    assessments = query.offset((page - 1) * limit).limit(limit).all()
    return {
        "success": True,
        "data": {
            "assessments": [{"report_id": a.report_id, "target": a.target, "type": a.type, "score": a.score, "status": a.status, "created_at": a.created_at.isoformat()} for a in assessments],
            "pagination": {"current_page": page, "total_pages": (total + limit - 1) // limit, "total_items": total, "has_next": page * limit < total, "has_prev": page > 1}
        }
    }

@app.post("/api/subscription/premium")
async def subscribe_premium(plan_type: str, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if plan_type not in ["monthly", "yearly"]:
        raise HTTPException(status_code=400, detail="Invalid plan type")
    sub_id = f"sub_{uuid.uuid4().hex[:8]}"
    db_sub = Subscription(user_id=user.id, stripe_subscription_id=sub_id, plan_type=plan_type, status="active", current_period_start=datetime.utcnow(), current_period_end=datetime.utcnow() + timedelta(days=30))
    db.add(db_sub)
    user.plan = "premium"
    db.commit()
    return {"success": True, "data": {"subscription_id": sub_id, "client_secret": "mock_secret", "plan_type": plan_type, "amount": 999, "currency": "usd"}}

@app.get("/api/subscription/status")
async def get_subscription_status(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    sub = db.query(Subscription).filter(Subscription.user_id == user.id, Subscription.status == "active").first()
    scans = db.query(Assessment).filter(Assessment.user_id == user.id, Assessment.created_at >= datetime.utcnow().replace(day=1)).count()
    return {
        "success": True,
        "data": {
            "plan": user.plan,
            "status": sub.status if sub else "inactive",
            "current_period_end": sub.current_period_end.isoformat() if sub else None,
            "cancel_at_period_end": sub.cancel_at_period_end if sub else False,
            "usage": {"scans_this_month": scans, "scans_limit": -1 if user.plan == "premium" else 100}
        }
    }

@app.get("/api/limits")
async def get_limits(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    limits = config.PREMIUM_LIMITS if user.plan == "premium" else config.FREE_LIMITS
    scans_today = db.query(Assessment).filter(Assessment.user_id == user.id, Assessment.created_at >= datetime.utcnow().replace(hour=0, minute=0, second=0)).count()
    scans_month = db.query(Assessment).filter(Assessment.user_id == user.id, Assessment.created_at >= datetime.utcnow().replace(day=1)).count()
    return {
        "success": True,
        "data": {
            "plan": user.plan,
            "limits": {"scans_per_day": limits["scans_per_day"], "scans_per_month": limits["scans_per_month"], "detailed_reports": user.plan == "premium"},
            "usage": {"scans_today": scans_today, "scans_this_month": scans_month, "reset_time": (datetime.utcnow() + timedelta(days=1)).replace(hour=0, minute=0, second=0).isoformat()}
        }
    }

@app.post("/api/community/report")
async def report_community_threat(request: CommunityThreatRequest, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    threat = report_threat(db, user.id, request.target, request.type, request.threat_type, request.severity, request.details)
    return {"success": True, "data": {"id": str(threat.id), "target": threat.target, "type": threat.type, "threat_type": threat.threat_type, "severity": threat.severity}}

@app.get("/api/community/threats")
async def list_community_threats(db: Session = Depends(get_db)):
    threats = get_community_threats(db)
    return {"success": True, "data": [{"id": str(t.id), "target": t.target, "type": t.type, "threat_type": t.threat_type, "severity": t.severity} for t in threats]}

@app.get("/api/resources")
async def get_educational_resources(category: str = None, db: Session = Depends(get_db)):
    resources = get_resources(db, category)
    return {"success": True, "data": [{"id": str(r.id), "title": r.title, "content": r.content, "category": r.category} for r in resources]}

@app.post("/api/resources")
async def add_educational_resource(request: ResourceRequest, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if user.plan != "premium":
        raise HTTPException(status_code=403, detail="Premium feature")
    resource = add_resource(db, request.title, request.content, request.category)
    return {"success": True, "data": {"id": str(resource.id), "title": resource.title, "category": resource.category}}