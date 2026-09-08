from fastapi import APIRouter, Depends, HTTPException
import uuid
from middleware.auth_middleware import get_current_user
from db.supabase_client import supabase
from services.sms_service import send_failure_alert
from services.email_service import send_failure_alert_email

router = APIRouter(prefix="/alerts", tags=["alerts"])

@router.get("/my")
async def get_my_alerts(user: dict = Depends(get_current_user)):
    resp = supabase.table("alerts").select("*").eq("user_id", user["user_id"]).execute()
    return resp.data

@router.post("/trigger")
async def trigger_alert(vehicle_id: str, component: str, severity: str, message: str, user: dict = Depends(get_current_user)):
    # Check vehicle
    v_resp = supabase.table("vehicles").select("*").eq("id", vehicle_id).execute()
    if not v_resp.data:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    
    vehicle = v_resp.data[0]
    
    alert_data = {
        "id": str(uuid.uuid4()),
        "user_id": vehicle["user_id"],
        "vehicle_id": vehicle_id,
        "alert_type": component,
        "severity": severity,
        "message": message,
        "is_acknowledged": False
    }
    
    resp = supabase.table("alerts").insert(alert_data).execute()
    
    # Fetch user for contact info
    u_resp = supabase.table("users").select("*").eq("id", vehicle["user_id"]).execute()
    if u_resp.data:
        user_info = u_resp.data[0]
        phone = user_info.get("phone", "+1234567890")
        email = user_info.get("email")
        
        send_failure_alert(phone, vehicle["plate_number"], component, 14)
        if email:
            send_failure_alert_email(email, vehicle["plate_number"], component, 14)

    return resp.data[0] if resp.data else {"message": "Alert triggered"}

@router.put("/{alert_id}/acknowledge")
async def acknowledge_alert(alert_id: str, user: dict = Depends(get_current_user)):
    resp = supabase.table("alerts").update({"is_acknowledged": True}).eq("id", alert_id).eq("user_id", user["user_id"]).execute()
    if not resp.data:
        raise HTTPException(status_code=404, detail="Alert not found")
    return resp.data[0]
