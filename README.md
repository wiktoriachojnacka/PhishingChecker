# PhishingChecker 🔐🌐

PhishingChecker to projekt wykrywający złośliwe adresy URL za pomocą modelu machine learning. Celem jest rozpoznanie, czy dana strona internetowa to potencjalna próba phishingu.

## 📊 Dane treningowe

Zbiór danych pochodzi z Kaggle:

🔗 [Phishing Site URLs Dataset by Tarun Tiwari](https://www.kaggle.com/datasets/taruntiwarihp/phishing-site-urls?resource=download)

Plik `phishing_data.csv` należy pobrać ręcznie z Kaggle i umieścić go w głównym folderze projektu (jeśli jeszcze go tam nie ma).

## 🛠️ Wymagania

Projekt korzysta z Pythona i bibliotek ML. Wszystkie zależności znajdują się w pliku `requirements.txt`.

### Instalacja:

1. Sklonuj repozytorium:

```bash
git clone https://github.com/wiktoriachojnacka/PhishingChecker.git
cd PhishingChecker
```

2. (Opcjonalnie) Utwórz środowisko wirtualne:

python -m venv venv
source venv/bin/activate  # dla Linux/macOS
venv\Scripts\activate     # dla Windows

3. Zainstaluj zależności:

```bash
pip install -r requirements.txt
```
4. Upewnij się, że plik phishing_data.csv jest w folderze projektu.

## ⚙️ Uruchomienie
1.  Trenowanie i zapis modelu:
```bash   
python phishing_detector.py
```

lub (dla wersji z XGBoost):

```bash
python phishing_detector_xgb.py
```

Modele zostaną zapisane jako:

- phishing_model.pkl
- phishing_model_xgb.pkl

2. Klasyfikacja nowego URL-a:

Przykład użycia klasyfikatora:
```bash
python predict_url.py
```
lub
```bash
python predict_url_xgb.py
```

Program poprosi o podanie URL-a i wyświetli, czy jest phishingowy.

## Dodatkowe pliki
feature_importance.png – wykres ważności cech dla modelu bazowego
feature_importance_xgb.png – wykres ważności cech dla modelu XGBoost
