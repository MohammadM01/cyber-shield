from dork_scanner import run_dork_scan
from security_apis import run_api_checks
from scoring import calculate_score
from report_generator import generate_pdf_report

def main():
    target = input("Enter website URL or email: ").strip()
    print("\n[1] Running Google Dorking...")
    dork_results = run_dork_scan(target)

    print("\n[2] Checking external APIs...")
    api_results = run_api_checks(target)

    print("\n[3] Calculating security score...")
    score = calculate_score(dork_results, api_results)

    print(f"\nSecurity Score: {score}/100")
    generate_pdf_report(target, dork_results, api_results, score)
    print("\nReport saved as 'report.pdf'")

if __name__ == "__main__":
    main()