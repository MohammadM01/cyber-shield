from sqlalchemy import create_engine, Column, String, Integer, Boolean, DateTime, ForeignKey, JSON, func
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from sqlalchemy.dialects.postgresql import UUID
import uuid
from config.config import config

Base = declarative_base()

# Database Models
class User(Base):
    __tablename__ = "users"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String, unique=True, nullable=False, index=True)
    password_hash = Column(String, nullable=False)
    name = Column(String, nullable=False)
    plan = Column(String, default="free")
    email_verified = Column(Boolean, default=False)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())
    
    assessments = relationship("Assessment", back_populates="user")
    subscriptions = relationship("Subscription", back_populates="user")
    rate_limits = relationship("RateLimit", back_populates="user")
    api_keys = relationship("APIKey", back_populates="user")
    audit_logs = relationship("AuditLog", back_populates="user")
    reported_threats = relationship("CommunityThreat", back_populates="reporter")  # Updated to match new relationship name

class Assessment(Base):
    __tablename__ = "assessments"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"))
    report_id = Column(String, unique=True, nullable=False, index=True)
    target = Column(String, nullable=False)
    type = Column(String, nullable=False)
    score = Column(Integer, nullable=False)
    status = Column(String, nullable=False)
    threats = Column(JSON)
    details = Column(JSON)
    processing_time_ms = Column(Integer)
    created_at = Column(DateTime, server_default=func.now())
    
    user = relationship("User", back_populates="assessments")

class Subscription(Base):
    __tablename__ = "subscriptions"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"))
    stripe_subscription_id = Column(String, unique=True)
    stripe_customer_id = Column(String)
    plan_type = Column(String, nullable=False)
    status = Column(String, nullable=False)
    current_period_start = Column(DateTime)
    current_period_end = Column(DateTime)
    cancel_at_period_end = Column(Boolean, default=False)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())
    
    user = relationship("User", back_populates="subscriptions")

class RateLimit(Base):
    __tablename__ = "rate_limits"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"))
    endpoint = Column(String, nullable=False)
    count = Column(Integer, default=0)
    reset_time = Column(DateTime, nullable=False)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())
    
    user = relationship("User", back_populates="rate_limits")

class APIKey(Base):
    __tablename__ = "api_keys"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"))
    key_hash = Column(String, nullable=False)
    name = Column(String, nullable=False)
    last_used_at = Column(DateTime)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, server_default=func.now())
    
    user = relationship("User", back_populates="api_keys")

class AuditLog(Base):
    __tablename__ = "audit_logs"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"))
    action = Column(String, nullable=False)
    resource_type = Column(String)
    resource_id = Column(String)
    ip_address = Column(String)
    user_agent = Column(String)
    meta_data = Column(JSON)
    created_at = Column(DateTime, server_default=func.now())
    
    user = relationship("User", back_populates="audit_logs")

class SystemMetric(Base):
    __tablename__ = "system_metrics"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    metric_name = Column(String, nullable=False)
    metric_value = Column(Integer)
    tags = Column(JSON)
    recorded_at = Column(DateTime, server_default=func.now())

class CommunityThreat(Base):
    __tablename__ = "community_threats"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    target = Column(String, nullable=False)
    type = Column(String, nullable=False)
    threat_type = Column(String, nullable=False)
    severity = Column(String, nullable=False)
    reported_by = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"))
    details = Column(JSON)
    reported_at = Column(DateTime, server_default=func.now())
    
    reporter = relationship("User", back_populates="reported_threats")  # Renamed to avoid ambiguity

class Resource(Base):
    __tablename__ = "resources"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String, nullable=False)
    content = Column(String)
    category = Column(String, nullable=False)
    created_at = Column(DateTime, server_default=func.now())

# Database Setup
engine = create_engine(config.DATABASE_URL, echo=config.ENVIRONMENT == "development")
Base.metadata.create_all(engine)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()