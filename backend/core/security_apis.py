import aiohttp
from config.config import config
from urllib.parse import urlparse
from utils.logger import logger

async def check_shodan_host(target: str) -> dict:
    # Extract domain or IP from the target
    parsed = urlparse(target) if target.startswith(("http://", "https://")) else urlparse(f"http://{target}")
    host = parsed.hostname or target
    url = f"https://api.shodan.io/shodan/host/{host}?key={config.SHODAN_API_KEY}"
    
    async with aiohttp.ClientSession() as session:
        try:
            async with session.get(url) as response:
                if response.status == 200:
                    data = await response.json()
                    return {
                        "open_ports": data.get("ports", []),
                        "vulnerabilities": data.get("vulns", []),
                        "os": data.get("os", "Unknown"),
                        "threats": [f"Vulnerability: {vuln}" for vuln in data.get("vulns", [])],
                        "is_exposed": len(data.get("ports", [])) > 0
                    }
                else:
                    return {"open_ports": [], "vulnerabilities": [], "os": "Unknown", "threats": [], "is_exposed": False}
        except Exception as e:
            logger.error(f"Shodan error: {e}")
            return {"open_ports": [], "vulnerabilities": [], "os": "Unknown", "threats": [], "is_exposed": False}

async def check_email_reputation(email: str) -> dict:
    if not config.EMAILREP_API_KEY:
        logger.warning("EmailRep API key is missing; using mocked response")
        return {
            "domain_age": 5,
            "spf_record": False,
            "dmarc_record": False,
            "dkim_record": False,
            "blacklisted": True,
            "reputation": "poor",
            "phishing_indicators": ["Recent domain", "Suspicious pattern"]
        }
    # Placeholder for real EmailRep API call
    logger.info("EmailRep API key provided, but real implementation pending")
    return {
        "domain_age": 5,
        "spf_record": False,
        "dmarc_record": False,
        "dkim_record": False,
        "blacklisted": True,
        "reputation": "poor",
        "phishing_indicators": ["Recent domain", "Suspicious pattern"]
    }

async def check_url_security(url: str) -> dict:
    # Use Shodan for network-related checks
    shodan_data = await check_shodan_host(url)
    
    # Mocked VirusTotal/Google Safe Browsing (replace with real APIs)
    base_data = {
        "ssl_valid": False,
        "malware_detected": True,
        "phishing_detected": True,
        "blacklisted": True,
        "scan_results": {"virustotal": {"malicious": 15, "suspicious": 8}}
    }
    base_data.update(shodan_data)
    return base_data

async def check_ip_reputation(ip: str) -> dict:
    # Use Shodan for IP reputation
    shodan_data = await check_shodan_host(ip)
    
    # Mocked AbuseIPDB-like data
    base_data = {
        "abuse_score": 85 if ip.startswith("192") else 10,
        "threats": ["DDoS source"] if ip.startswith("192") else []
    }
    base_data.update(shodan_data)
    return base_data