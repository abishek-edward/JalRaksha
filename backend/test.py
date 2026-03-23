import asyncio
import os
import sys

# Ensure backend is in python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from models.schemas import AshaWorkerInput
from routes.predict import predict_outbreak

async def test():
    data = AshaWorkerInput(
        village_name="Test", district="Test Dist", population=1000,
        water_source="Well", ph_level=7.0, turbidity=1.0, chlorine_level=0.5,
        open_defecation_status="No", waste_disposal_method="Bin",
        temperature=30.0, rainfall_mm=10.0,
        fever_cases=5, diarrhea_cases=2, vomiting_cases=1, stomach_pain_cases=3
    )
    try:
        res = await predict_outbreak(data)
        print("Success:", res)
    except Exception as e:
        print("Error:", str(e))

asyncio.run(test())
