from fastapi import APIRouter
from models.schemas import PredictionResponse
from typing import List

router = APIRouter()

# In-memory storage for demonstration
mock_mongo_db = []

def save_prediction(prediction: PredictionResponse):
    mock_mongo_db.append(prediction)

@router.get("/history", response_model=List[PredictionResponse])
async def get_history():
    return mock_mongo_db
