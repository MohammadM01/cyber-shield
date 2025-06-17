async def check_ip_reputation(ip: str) -> dict:
    # Mocked; replace with real AbuseIPDB or similar free API
    return {
        "reputation": "malicious" if ip.startswith("192") else "clean",
        "abuse_score": 85 if ip.startswith("192") else 10,
        "threats": ["DDoS source"] if ip.startswith("192") else []
    }