from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
import io

def generate_pdf_report(assessment: dict) -> bytes:
    buffer = io.BytesIO()
    c = canvas.Canvas(buffer, pagesize=letter)
    c.drawString(100, 750, f"CyberShield Lite Report: {assessment['target']}")
    c.drawString(100, 730, f"Type: {assessment['type']}")
    c.drawString(100, 710, f"Score: {assessment['score']}")
    c.drawString(100, 690, f"Status: {assessment['status']}")
    y = 670
    for threat in assessment.get("threats", []):
        c.drawString(100, y, f"- {threat}")
        y -= 20
    c.showPage()
    c.save()
    buffer.seek(0)
    return buffer.getvalue()