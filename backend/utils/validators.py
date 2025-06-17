import re
from fastapi import HTTPException

def validate_email(email: str) -> str:
    if not re.match(r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$", email):
        raise HTTPException(status_code=400, detail="Invalid email format")
    return email

def validate_url(url: str) -> str:
    if not re.match(r"^https?://[^\s/$.?#].[^\s]*$", url):
        raise HTTPException(status_code=400, detail="Invalid URL format")
    return url

def validate_ip(ip: str) -> str:
    if not re.match(r"^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$", ip):
        raise HTTPException(status_code=400, detail="Invalid IP format")
    return ip