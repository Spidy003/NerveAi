from fastapi import APIRouter, Depends
from typing import List
from middleware.auth_middleware import get_current_user
from models.schemas import TelemetryData
from db.mongo_client import mongo_client

router = APIRouter(prefix="/telemetry", tags=["telemetry"])

@router.post("")
async def ingest_telemetry(data: TelemetryData):
    # Depending on auth, might be a device token. Bypassing user auth for ingestion simulation.
    doc = data.dict()
    await mongo_client.db.telemetry.insert_one(doc)
    return {"message": "Data ingested successfully"}

@router.get("/{vehicle_id}/latest")
async def get_latest_telemetry(vehicle_id: str, user: dict = Depends(get_current_user)):
    cursor = mongo_client.db.telemetry.find({"vehicle_id": vehicle_id}, {"_id": 0}).sort("timestamp", -1).limit(100)
    data = await cursor.to_list(length=100)
    return data

@router.get("/{vehicle_id}/health-score")
async def compute_health_score(vehicle_id: str, user: dict = Depends(get_current_user)):
    cursor = mongo_client.db.telemetry.find({"vehicle_id": vehicle_id}).sort("timestamp", -1).limit(10)
    data = await cursor.to_list(length=10)
    
    if not data:
        return {"health_score": 100}
        
    avg_temp = sum(d.get("engine_temp", 90) for d in data) / len(data)
    score = 100
    if avg_temp > 105:
        score -= 20
    
    return {"health_score": score, "metrics": {"avg_temp": avg_temp}}
