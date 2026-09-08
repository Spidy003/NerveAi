from fastapi import APIRouter, Depends, HTTPException
import uuid
from middleware.auth_middleware import get_current_user
from models.schemas import VehicleCreate, VehicleResponse
from db.supabase_client import supabase
from db.mongo_client import mongo_client

router = APIRouter(prefix="/fleet", tags=["fleet"])

@router.get("/vehicles")
async def list_vehicles(user: dict = Depends(get_current_user)):
    resp = supabase.table("vehicles").select("*").eq("user_id", user["user_id"]).execute()
    return resp.data

@router.post("/vehicles", response_model=VehicleResponse)
async def add_vehicle(vehicle: VehicleCreate, user: dict = Depends(get_current_user)):
    vehicle_data = {
        "id": str(uuid.uuid4()),
        "user_id": user["user_id"],
        "plate_number": vehicle.plate_number,
        "make": vehicle.make,
        "model": vehicle.model,
        "year": vehicle.year
    }
    resp = supabase.table("vehicles").insert(vehicle_data).execute()
    if not resp.data:
        raise HTTPException(status_code=500, detail="Failed to add vehicle")
    return resp.data[0]

@router.delete("/vehicles/{vehicle_id}")
async def remove_vehicle(vehicle_id: str, user: dict = Depends(get_current_user)):
    resp = supabase.table("vehicles").delete().eq("id", vehicle_id).eq("user_id", user["user_id"]).execute()
    return {"message": "Vehicle removed successfully"}

@router.get("/vehicles/{vehicle_id}/health")
async def get_vehicle_health(vehicle_id: str, user: dict = Depends(get_current_user)):
    # In a real app, verify user owns vehicle first.
    # Get latest telemetry
    cursor = mongo_client.db.telemetry.find({"vehicle_id": vehicle_id}).sort("timestamp", -1).limit(1)
    telemetry = await cursor.to_list(length=1)
    if not telemetry:
        return {"health_score": 100, "status": "Unknown", "message": "No telemetry data found"}
    
    last = telemetry[0]
    # Simple mock calculation
    score = 100
    if last.get("engine_temp", 0) > 105:
        score -= 20
    if last.get("vibration", 0) > 2.0:
        score -= 30
    
    status = "Healthy"
    if score < 70:
        status = "Warning"
    if score < 50:
        status = "Critical"
        
    return {"health_score": max(0, score), "status": status}
