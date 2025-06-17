import requests

def check_shodan(target):
    try:
        # Extract domain or IP from the input
        ip = target.replace("https://", "").replace("http://", "").split("/")[0]
        api_key = "YOUR_SHODAN_API_KEY"  # Replace this with your real key
        url = f"https://api.shodan.io/shodan/host/{ip}?key={api_key}"
        response = requests.get(url)
        if response.status_code == 200:
            return True
    except Exception as e:
        print("Shodan error:", e)
    return False

def check_hibp(email):
    try:
        if "@" not in email:
            return False
        url = f"https://haveibeenpwned.com/api/v3/breachedaccount/{email}"
        headers = {
            "hibp-api-key": "YOUR_HIBP_API_KEY",  # Replace this with your real key
            "user-agent": "RiskyScanTool"
        }
        response = requests.get(url, headers=headers)
        return response.status_code == 200
    except Exception as e:
        print("HIBP error:", e)
    return False

def run_api_checks(target):
    return {
        "shodan_exposed_ports": check_shodan(target),
        "pwned_email": check_hibp(target)
    }
