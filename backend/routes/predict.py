from fastapi import APIRouter, HTTPException
from models.schemas import AshaWorkerInput, PredictionResponse
from ml.model_loader import model_instance
from ml.preprocess import preprocess_input
import random

router = APIRouter()

DISEASE_CLASSES = ["Cholera", "Typhoid", "Dysentery", "Hepatitis A", "Giardiasis", "Cryptosporidiosis", "Amoebiasis", "Leptospirosis"]
RISK_LEVELS = ["Low", "Medium", "High", "Critical"]

@router.post("/predict", response_model=PredictionResponse)
async def predict_outbreak(data: AshaWorkerInput):
    if not model_instance.loaded:
        raise HTTPException(status_code=500, detail="Models not loaded")

    features = preprocess_input(data)
    
    # Simulate inference
    disease_pred_idx = model_instance.disease_model.predict(features)[0]
    risk_pred_idx = model_instance.risk_model.predict(features)[0]
    symptom_count_pred = model_instance.symptom_model.predict(features)[0]
    
    disease_probs = model_instance.disease_model.predict_proba(features)[0].tolist()
    
    disease_name = DISEASE_CLASSES[disease_pred_idx]
    risk_name = RISK_LEVELS[risk_pred_idx]
    
    # Generate dummy lat/lng for map within India bounds (approx)
    lat = random.uniform(20.0, 25.0)
    lng = random.uniform(75.0, 85.0)
    
    from routes.history import save_prediction
    
    pred_res = PredictionResponse(
        id=str(random.randint(1000, 9999)),
        village_name=data.village_name,
        district=data.district,
        disease=disease_name,
        risk_level=risk_name,
        symptom_count=round(symptom_count_pred, 2),
        probabilities=disease_probs,
        recommended_actions=[
            f"Alert District Health Officer in {data.district}",
            f"Initiate water purification protocol for {data.water_source}",
            "Deploy standard medical kits to ASHA workers"
        ],
        latitude=lat,
        longitude=lng
    )
    save_prediction(pred_res)
    return pred_res
