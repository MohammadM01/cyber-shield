def calculate_score(dork_results, api_results):
    score = 100
    deductions = {
        "exposed_admin_panels": 20,
        "public_env_files": 25,
        "db_dumps_found": 30,
        "shodan_exposed_ports": 15,
        "pwned_email": 10
    }
    for issue, penalty in deductions.items():
        if dork_results.get(issue) or api_results.get(issue):
            score -= penalty
    return max(score, 0)