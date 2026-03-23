import os
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import predict, history

port = int(os.environ.get("PORT", 10000))

app = FastAPI(title="JalRaksha API", description="AI-Powered Water-Borne Disease Early Warning System")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(predict.router)
app.include_router(history.router)

@app.get("/health")
async def health_check():
    return {"status": "ok", "service": "JalRaksha API Backend"}
