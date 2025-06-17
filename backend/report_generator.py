from fpdf import FPDF

def generate_pdf_report(target, dork_results, api_results, score):
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)
    pdf.cell(200, 10, txt="RiskyScan Security Report", ln=True, align='C')
    pdf.ln(10)
    pdf.cell(200, 10, txt=f"Target: {target}", ln=True)
    pdf.cell(200, 10, txt=f"Security Score: {score}/100", ln=True)
    pdf.ln(10)

    pdf.cell(200, 10, txt="Google Dork Results:", ln=True)
    for key, value in dork_results.items():
        pdf.cell(200, 10, txt=f"{key.replace('_', ' ').title()}: {'Yes' if value else 'No'}", ln=True)

    pdf.ln(5)
    pdf.cell(200, 10, txt="Security API Results:", ln=True)
    for key, value in api_results.items():
        pdf.cell(200, 10, txt=f"{key.replace('_', ' ').title()}: {'Yes' if value else 'No'}", ln=True)

    pdf.output("report.pdf")  # Saves to current folder
