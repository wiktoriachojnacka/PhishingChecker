from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd
import re
from urllib.parse import urlparse
from typing import Dict, Any

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  #React frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#models
rf_model = joblib.load('phishing_model.pkl')
xgb_model = joblib.load('phishing_model_xgb.pkl')

# blocklist
with open('cert_blocklist.txt', 'r') as f:
    cert_domains = set(line.strip().lower().replace('www.', '') for line in f)

class URLRequest(BaseModel):
    url: str

def extract_features(url: str) -> Dict[str, Any]:
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

    return features

@app.post("/predict")
async def predict(request: URLRequest):
    try:
        features = extract_features(request.url)
        df = pd.DataFrame([features])
        
        prediction = rf_model.predict(df)[0]
        
        # Hardcoded metrics from training results
        return {
            "is_phishing": bool(prediction),
            "recall": 0.60,
            "precision": 0.58,
            "f1_score": 0.59,
            "accuracy": 0.76,
            "features": features
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/predict/xgb")
async def predict_xgb(request: URLRequest):
    try:
        features = extract_features(request.url)
        df = pd.DataFrame([features])
        
        
        prediction = xgb_model.predict(df)[0]
        
        # Hardcoded metrics fro training results
        return {
            "is_phishing": bool(prediction),
            "recall": 0.73,
            "precision": 0.49,
            "f1_score": 0.59,
            "accuracy": 0.71,
            "features": features
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/compare")
async def compare_models(request: URLRequest):
    try:
        features = extract_features(request.url)
        df = pd.DataFrame([features])
        
        # Get predictions and metrics from both models
        rf_pred = rf_model.predict(df)[0]
        rf_prob = rf_model.predict_proba(df)[0][1]
        
        xgb_pred = xgb_model.predict(df)[0]
        xgb_prob = xgb_model.predict_proba(df)[0][1]
        
        # Hardcoded metrics from training results
        return {
            "rf": {
                "is_phishing": bool(rf_pred),
                "recall": 0.60,  
                "precision": 0.58,
                "f1_score": 0.59,
                "accuracy": 0.76,
                "features": features
            },
            "xgb": {
                "is_phishing": bool(xgb_pred),
                "recall": 0.73,  
                "precision": 0.49,
                "f1_score": 0.59,
                "accuracy": 0.71,
                "features": features
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 