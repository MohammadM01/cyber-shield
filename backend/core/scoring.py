def calculate_email_score(data: dict) -> int:
    score = 100
    if not data.get("spf_record"):
        score -= 20
    if not data.get("dmarc_record"):
        score -= 20
    if not data.get("dkim_record"):
        score -= 10
    if data.get("blacklisted"):
        score -= 30
    if data.get("reputation") == "poor":
        score -= 20
    if data.get("phishing_indicators"):
        score -= len(data["phishing_indicators"]) * 10
    if data.get("breaches"):
        score -= len(data["breaches"]) * 10
    if data.get("is_exposed"):
        score -= 20
    return max(0, min(100, score))

def calculate_url_score(data: dict) -> int:
    score = 100
    if not data.get("ssl_valid"):
        score -= 30
    if data.get("malware_detected"):
        score -= 40
    if data.get("phishing_detected"):
        score -= 40
    if data.get("blacklisted"):
        score -= 30
    if data.get("is_exposed"):
        score -= 20
    return max(0, min(100, score))

def calculate_ip_score(data: dict) -> int:
    score = 100
    if data.get("abuse_score", 0) > 50:
        score -= data["abuse_score"] // 2
    if data.get("threats"):
        score -= len(data["threats"]) * 20
    if data.get("is_exposed"):
        score -= 20
    return max(0, min(100, score))