import joblib
import pandas as pd
import re
from urllib.parse import urlparse

with open('cert_blocklist.txt', 'r') as f:
    cert_domains = set(line.strip().lower().replace('www.', '') for line in f)

model = joblib.load('phishing_model.pkl')

def extract_features(url, debug=False):
    features = {}
    parsed = urlparse(url)
    domain = parsed.netloc.lower().replace('www.', '')

    features['url_length'] = len(url)
    features['has_ip'] = 1 if re.search(r'(\d{1,3}\.){3}\d{1,3}', url) else 0
    features['has_at_symbol'] = 1 if '@' in url else 0
    features['has_https'] = 1 if url.startswith('https') else 0
    features['count_dots'] = url.count('.')
    features['count_slashes'] = url.count('/')
    features['has_dash'] = 1 if '-' in url else 0
    features['has_subdomain'] = 1 if domain.count('.') > 1 else 0
    features['uses_shortener'] = 1 if re.search(r'bit\.ly|tinyurl|goo\.gl|t\.co|redd\.it|allegro-24h\.pl|poczta-polska\.info|mbank\.verify-login\.com|bankmillennium\.login\.pl', url) else 0
    features['in_cert_blocklist'] = 1 if domain in cert_domains else 0

    features['has_equal'] = 1 if '=' in url else 0
    features['has_question_mark'] = 1 if '?' in url else 0
    features['has_percent'] = 1 if '%' in url else 0
    features['param_count'] = url.count('=')
    features['suspicious_tld'] = 1 if re.search(r'\.tk$|\.ru$|\.ml$|\.ga$|\.cf$', domain) else 0
    features['domain_length'] = len(domain)

    if debug:
        print("[DEBUG] URL features", url)
        for k, v in features.items():
            print(f"  {k}: {v}")

    return features, domain

url = input("URL: ")
features, domain = extract_features(url, debug=True)

df = pd.DataFrame([features])
prediction = model.predict(df)[0]

if prediction == 1:
    print("\n suspicious URL (phishing)")
else:
    print("\n URL looks safe")

if features['in_cert_blocklist'] == 1:
    print("\n Note: this domain is on the CERT.co.uk warning list (regardless of model predictions).Impact of features on model decisions")
