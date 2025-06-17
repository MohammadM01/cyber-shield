import uuid
from datetime import datetime

def generate_report(assessment: dict) -> dict:
    report_id = f"{assessment['type']}_report_{uuid.uuid4().hex[:6]}"
    return {
        "report_id": report_id,
        "target": assessment["target"],
        "type": assessment["type"],
        "score": assessment["score"],
        "status": assessment["status"],
        "created_at": datetime.utcnow().isoformat(),
        "summary": {
            "risk_level": "High" if assessment["score"] < 50 else "Moderate" if assessment["score"] < 75 else "Low",
            "primary_threats": assessment.get("threats", []),
            "recommendation": "Avoid" if assessment["score"] < 50 else "Monitor" if assessment["score"] < 75 else "Safe"
        },
        "technical_details": assessment.get("details", {}),
        "recommendations": ["Block target"] if assessment["score"] < 50 else ["Monitor activity"]
    }