import pandas as pd
import re
from urllib.parse import urlparse
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report
import joblib
import matplotlib.pyplot as plt

# I took this list from cert.pl site approved by gov.pl, where they created a report that have listed dangerous sites
with open('cert_blocklist.txt', 'r') as f:
    cert_domains = set(line.strip().lower().replace('www.', '') for line in f)
    cert_urls = [f"https://{d}/login" for d in list(cert_domains)[:30]]

good_urls = [
    "https://www.google.com",
    "https://gov.pl",
    "https://www.wikipedia.org",
    "https://bankier.pl",
    "https://www.onet.pl",
    "https://www.wp.pl",
    "https://www.allegro.pl",
    "https://www.mbank.pl",
    "https://www.bnpparibas.pl",
    "https://www.pekao.com.pl",
    "https://www.policja.pl",
    "https://www.sejm.gov.pl",
    "https://www.podatki.gov.pl"
]
good_df = pd.DataFrame({"URL": good_urls, "Label": [0] * len(good_urls)})
cert_df = pd.DataFrame({"URL": cert_urls, "Label": [1] * len(cert_urls)})

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
        print("[DEBUG] URL features:", url)
        for k, v in features.items():
            print(f"  {k}: {v}")

    return features

original_df = pd.read_csv('phishing_data.csv')
original_df['Label'] = original_df['Label'].map({'bad': 1, 'good': 0})
df = pd.concat([original_df, good_df, cert_df], ignore_index=True)

features = df['URL'].apply(lambda x: extract_features(x))
features_df = pd.DataFrame(list(features))
features_df['Label'] = df['Label']

X = features_df.drop('Label', axis=1)
y = features_df['Label']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model = RandomForestClassifier(class_weight={0: 1, 1: 2}, verbose=1)
model.fit(X_train, y_train)

y_pred = model.predict(X_test)
print("Report:\n", classification_report(y_test, y_pred))

# rank
importances = model.feature_importances_
feature_names = X.columns
sorted_indices = importances.argsort()[::-1]

print("\n rank")
for idx in sorted_indices:
    print(f"{feature_names[idx]}: {importances[idx]:.4f}")

# data visualization
plt.figure(figsize=(10,6))
plt.bar([feature_names[i] for i in sorted_indices], [importances[i] for i in sorted_indices])
plt.xticks(rotation=45, ha='right')
plt.title("Impact of features on model decisions")
plt.tight_layout()
plt.savefig("feature_importance.png")
plt.show()

joblib.dump(model, 'phishing_model.pkl')
print("model saved as phishing_model.pkl")
