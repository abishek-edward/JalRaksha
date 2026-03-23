import os
import joblib
import numpy as np
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.preprocessing import StandardScaler, LabelEncoder

def train_and_save_models():
    os.makedirs(os.path.dirname(os.path.abspath(__file__)), exist_ok=True)
    
    # 1. Disease Classifier (RandomForestClassifier, 8 classes)
    X_dummy = np.random.rand(100, 41)
    y_disease_dummy = np.random.randint(0, 8, 100)
    
    disease_model = RandomForestClassifier(n_estimators=10)
    disease_model.fit(X_dummy, y_disease_dummy)
    joblib.dump(disease_model, os.path.join(os.path.dirname(__file__), 'disease_classifier.joblib'))
    
    # 2. Risk Severity Classifier (Low, Medium, High, Critical -> 0, 1, 2, 3)
    y_risk_dummy = np.random.randint(0, 4, 100)
    
    risk_model = RandomForestClassifier(n_estimators=10)
    risk_model.fit(X_dummy, y_risk_dummy)
    joblib.dump(risk_model, os.path.join(os.path.dirname(__file__), 'risk_classifier.joblib'))
    
    # 3. Symptom Count Regressor
    y_symptoms_dummy = np.random.randint(0, 15, 100)
    
    symptom_model = RandomForestRegressor(n_estimators=10)
    symptom_model.fit(X_dummy, y_symptoms_dummy)
    joblib.dump(symptom_model, os.path.join(os.path.dirname(__file__), 'symptom_regressor.joblib'))
    
    # Preprocessors (StandardScaler and LabelEncoder mock)
    scaler = StandardScaler()
    scaler.fit(X_dummy)
    joblib.dump(scaler, os.path.join(os.path.dirname(__file__), 'scaler.joblib'))
    
    encoder = LabelEncoder()
    encoder.fit(["Cholera", "Typhoid", "Dysentery", "Hepatitis A", "Giardiasis", "Cryptosporidiosis", "Amoebiasis", "Leptospirosis"])
    joblib.dump(encoder, os.path.join(os.path.dirname(__file__), 'label_encoder.joblib'))
    
    print("Dummy models created and saved successfully into backend/ml/")

if __name__ == "__main__":
    train_and_save_models()
