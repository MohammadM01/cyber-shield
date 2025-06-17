import smtplib
from email.mime.text import MIMEText
from config.config import config
from utils.logger import logger

def send_notification(email: str, assessment: dict):
    try:
        msg = MIMEText(
            f"Assessment Result for {assessment['target']}:\n"
            f"Type: {assessment['type']}\n"
            f"Score: {assessment['score']}\n"
            f"Status: {assessment['status']}\n"
            f"Threats: {', '.join(assessment['threats']) if assessment['threats'] else 'None'}"
        )
        msg["Subject"] = f"CyberShield Lite: Assessment Result for {assessment['target']}"
        msg["From"] = config.SMTP_USER
        msg["To"] = email

        with smtplib.SMTP(config.SMTP_HOST, config.SMTP_PORT) as server:
            server.starttls()
            server.login(config.SMTP_USER, config.SMTP_PASS)
            server.sendmail(config.SMTP_USER, email, msg.as_string())
        logger.info(f"Notification sent to {email}")
    except Exception as e:
        logger.error(f"Failed to send notification to {email}: {e}")