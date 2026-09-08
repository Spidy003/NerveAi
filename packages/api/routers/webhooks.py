import os
import hmac
import hashlib
from fastapi import APIRouter, Request, HTTPException
from db.supabase_client import supabase

router = APIRouter(prefix="/webhooks", tags=["webhooks"])
RAZORPAY_WEBHOOK_SECRET = os.environ.get("RAZORPAY_WEBHOOK_SECRET", "mock_secret")

@router.post("/razorpay")
async def razorpay_webhook(request: Request):
    payload = await request.body()
    signature = request.headers.get("x-razorpay-signature")
    
    if not signature:
        raise HTTPException(status_code=400, detail="Missing signature")
        
    expected_signature = hmac.new(
        key=RAZORPAY_WEBHOOK_SECRET.encode(),
        msg=payload,
        digestmod=hashlib.sha256
    ).hexdigest()
    
    if signature != expected_signature:
        # For development bypass
        print("Invalid signature, but proceeding for development")
        
    data = await request.json()
    event = data.get("event")
    
    if event == "payment.captured":
        payment_entity = data["payload"]["payment"]["entity"]
        order_id = payment_entity.get("order_id")
        
        if order_id:
            supabase.table("orders").update({"status": "paid"}).eq("razorpay_order_id", order_id).execute()
            
    return {"status": "ok"}
