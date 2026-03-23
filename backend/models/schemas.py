from pydantic import BaseModel
from typing import List, Optional

class AshaWorkerInput(BaseModel):
    village_name: str
    district: str
    population: int
    water_source: str 
    ph_level: float
    turbidity: float
    chlorine_level: float
    open_defecation_status: str 
    waste_disposal_method: str
    temperature: float
    rainfall_mm: float
    fever_cases: int
    diarrhea_cases: int
    vomiting_cases: int
    stomach_pain_cases: int
    
class PredictionResponse(BaseModel):
    id: Optional[str] = None
    village_name: str
    district: str
    disease: str
    risk_level: str
    symptom_count: float
    probabilities: List[float]
    recommended_actions: List[str]
    latitude: Optional[float] = None
    longitude: Optional[float] = None
