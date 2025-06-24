# PhishingChecker 

PhishingChecker is a machine learning project for detecting malicious (phishing) URLs. The goal is to identify whether a given website is a potential phishing attempt.

---
##  Preview

![2025-06-2419-02-10-ezgif com-optimize](https://github.com/user-attachments/assets/7de9cf52-306d-431c-97d0-c9c15f42f7d7)


---
##  Training Data

The dataset comes from Kaggle:

[Phishing Site URLs Dataset by Tarun Tiwari](https://www.kaggle.com/datasets/taruntiwarihp/phishing-site-urls?resource=download)

Please download the `phishing_data.csv` file manually from Kaggle and place it in the main project folder (if it is not already there).

Additionally, the `cert_blocklist.txt` file was sourced from the official [cert.pl](https://www.cert.pl/) site, approved by [gov.pl](https://www.gov.pl/).

---

## Requirements

The project uses Python and several ML libraries. All dependencies are listed in `requirements.txt`.

### Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/wiktoriachojnacka/PhishingChecker.git
    cd PhishingChecker
    ```
2. **Install Python dependencies:**
    ```bash
    py -3.11 -m pip install -r requirements.txt
    ```

3. **Make sure the `phishing_data.csv` file is in the project folder.**

---

## How to Run the Project

### 1. Install backend and frontend dependencies

```bash
# In the main project directory:
py -3.11 -m pip install -r requirements.txt

# Then, go to the frontend directory:
cd frontend
npm install
```

### 2. Start the backend and frontend servers

Open **two terminal windows**:

**Terminal 1 (Backend):**
```bash
# From the main project directory:
py -3.11 -m uvicorn main:app --reload
```

**Terminal 2 (Frontend):**
```bash
# From the frontend directory:
npm run dev
```

- The backend will be available at: [http://127.0.0.1:8000](http://127.0.0.1:8000)
- The frontend will be available at: [http://localhost:3000](http://localhost:3000)

---

## Model Training

1. **Train and save the model:**
    ```bash
    python phishing_detector.py
    ```
    or (for the XGBoost version):
    ```bash
    python phishing_detector_xgb.py
    ```
    The models will be saved as:
    - `phishing_model.pkl`
    - `phishing_model_xgb.pkl`

2. **Classify a new URL:**
    ```bash
    python predict_url.py
    ```
    or
    ```bash
    python predict_url_xgb.py
    ```
    The program will prompt you to enter a URL and will display whether it is phishing.

---

## Feature Importance Graphs

- `feature_importance.png` – feature importance plot for the base model
- `feature_importance_xgb.png` – feature importance plot for the XGBoost model

**Note:**  
All graphs were created by myself using [Miro](https://miro.com/).

---

## References & Sources

- **XGBoost algorithm:**
  - [GeeksforGeeks: XGBoost](https://www.geeksforgeeks.org/machine-learning/xgboost/)
  - [IBM: XGBoost](https://www.ibm.com/think/topics/xgboost)
- **Random Forest algorithm:**
  - [IBM: Random Forest](https://www.ibm.com/think/topics/random-forest)
  - [GeeksforGeeks: Random Forest](https://www.geeksforgeeks.org/random-forest-algorithm-in-machine-learning/?ref=ml_lbp)
- **Dataset:**
  - [Kaggle: Phishing Site URLs Dataset by Tarun Tiwari](https://www.kaggle.com/datasets/taruntiwarihp/phishing-site-urls?resource=download)
- **Blocklist:**
  - `cert_blocklist.txt` was sourced from [cert.pl](https://www.cert.pl/) (site approved by [gov.pl](https://www.gov.pl/))

---

## Author

Wiktoria Chojnacka

--- 
