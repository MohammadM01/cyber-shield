# Mock breach data as an HIBP alternative
MOCK_BREACHES = {
    "suspicious@example.com": ["DataBreach2023", "Phishing2022"],
    "test@example.com": []
}

def check_breaches(email: str) -> list:
    return MOCK_BREACHES.get(email, [])