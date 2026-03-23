import os
import joblib

class ModelLoader:
    _instance = None
    
    def __new__(cls, *args, **kwargs):
        if not cls._instance:
            cls._instance = super(ModelLoader, cls).__new__(cls, *args, **kwargs)
            cls._instance._load_models()
        return cls._instance
        
    def _load_models(self):
        base_dir = os.path.dirname(os.path.abspath(__file__))
        try:
            self.disease_model = joblib.load(os.path.join(base_dir, 'disease_classifier.joblib'))
            self.risk_model = joblib.load(os.path.join(base_dir, 'risk_classifier.joblib'))
            self.symptom_model = joblib.load(os.path.join(base_dir, 'symptom_regressor.joblib'))
            self.scaler = joblib.load(os.path.join(base_dir, 'scaler.joblib'))
            self.encoder = joblib.load(os.path.join(base_dir, 'label_encoder.joblib'))
            self.loaded = True
        except FileNotFoundError:
            self.loaded = False
            self.disease_model = None
            self.risk_model = None
            self.symptom_model = None
            self.scaler = None
            self.encoder = None
            print("Warning: Models not found. Please run train_dummy_models.py first.")

model_instance = ModelLoader()
