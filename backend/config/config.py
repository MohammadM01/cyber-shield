import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    ENVIRONMENT = os.getenv("ENVIRONMENT", "development")
    BACKEND_PORT = int(os.getenv("BACKEND_PORT", 3001))
    DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://cybershield:password@localhost:5432/cybershield_db")
    REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379")
    JWT_SECRET = os.getenv("JWT_SECRET", "your-super-secret-jwt-key")
    CORS_ORIGIN = os.getenv("CORS_ORIGIN", "http://localhost:3000")
    
    # External API Keys
    SHODAN_API_KEY = os.getenv("SHODAN_API_KEY")
    VIRUSTOTAL_API_KEY = os.getenv("VIRUSTOTAL_API_KEY")
    GOOGLE_SAFE_BROWSING_API_KEY = os.getenv("GOOGLE_SAFE_BROWSING_API_KEY")
    EMAILREP_API_KEY = os.getenv("EMAILREP_API_KEY")
    
    # SMTP Settings
    SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
    SMTP_PORT = int(os.getenv("SMTP_PORT", 587))
    SMTP_USER = os.getenv("SMTP_USER")
    SMTP_PASS = os.getenv("SMTP_PASS")
    
    # Rate Limits
    FREE_LIMITS = {"scans_per_day": 10, "scans_per_month": 100, "requests_per_minute": 5}
    PREMIUM_LIMITS = {"scans_per_day": -1, "scans_per_month": -1, "requests_per_minute": 20}

config = Config()