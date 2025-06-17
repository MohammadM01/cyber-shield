from sqlalchemy.orm import Session
from db.database import CommunityThreat
from datetime import datetime

def report_threat(db: Session, user_id: str, target: str, type: str, threat_type: str, severity: str, details: dict):
    threat = CommunityThreat(
        target=target,
        type=type,
        threat_type=threat_type,
        severity=severity,
        reported_by=user_id,  # Changed from reported_by_id to reported_by
        details=details,
        reported_at=datetime.utcnow()
    )
    db.add(threat)
    db.commit()
    db.refresh(threat)
    return threat

def get_community_threats(db: Session):
    return db.query(CommunityThreat).all()