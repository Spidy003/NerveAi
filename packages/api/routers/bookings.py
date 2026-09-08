from fastapi import APIRouter, Depends, HTTPException
import uuid
from datetime import datetime, timedelta
from middleware.auth_middleware import get_current_user
from models.schemas import BookingCreate, BookingResponse
from db.supabase_client import supabase

router = APIRouter(prefix="/bookings", tags=["bookings"])

@router.post("", response_model=BookingResponse)
async def create_booking(booking: BookingCreate, user: dict = Depends(get_current_user)):
    booking_data = {
        "id": str(uuid.uuid4()),
        "user_id": user["user_id"],
        "vehicle_id": booking.vehicle_id,
        "slot_time": booking.slot_time.isoformat(),
        "status": "confirmed"
    }
    resp = supabase.table("bookings").insert(booking_data).execute()
    if not resp.data:
        raise HTTPException(status_code=500, detail="Failed to create booking")
    return resp.data[0]

@router.get("/my")
async def get_my_bookings(user: dict = Depends(get_current_user)):
    resp = supabase.table("bookings").select("*").eq("user_id", user["user_id"]).execute()
    return resp.data

@router.get("/available-slots")
async def get_available_slots():
    slots = []
    now = datetime.now()
    # Next 14 days
    for day in range(1, 15):
        date = now + timedelta(days=day)
        # 9am to 6pm
        for hour in range(9, 18):
            for minute in (0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55):
                slot = datetime(date.year, date.month, date.day, hour, minute)
                slots.append(slot.isoformat())
    return {"slots": slots}
