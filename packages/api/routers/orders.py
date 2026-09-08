import os
import uuid
import razorpay
from fastapi import APIRouter, Depends, HTTPException
from middleware.auth_middleware import get_current_user
from models.schemas import OrderCreate, OrderResponse, PaymentVerify
from db.supabase_client import supabase
from services.edi_service import generate_edi_850
from services.email_service import send_order_confirmation

router = APIRouter(prefix="/orders", tags=["orders"])

razorpay_client = razorpay.Client(auth=(os.environ.get("RAZORPAY_KEY_ID"), os.environ.get("RAZORPAY_KEY_SECRET")))

@router.post("", response_model=OrderResponse)
async def create_order(order: OrderCreate, user: dict = Depends(get_current_user)):
    # Create Razorpay order
    amount_in_paise = int(order.amount * 100)
    rzp_order = razorpay_client.order.create({"amount": amount_in_paise, "currency": "INR", "payment_capture": "1"})
    
    order_data = {
        "id": str(uuid.uuid4()),
        "user_id": user["user_id"],
        "amount": order.amount,
        "hardware_qty": order.hardware_qty,
        "shipping_address": order.shipping_address,
        "status": "pending_payment",
        "razorpay_order_id": rzp_order["id"]
    }
    
    # Insert to Supabase
    resp = supabase.table("orders").insert(order_data).execute()
    if not resp.data:
        raise HTTPException(status_code=500, detail="Failed to create order")
    
    return resp.data[0]

@router.get("/my")
async def get_my_orders(user: dict = Depends(get_current_user)):
    resp = supabase.table("orders").select("*").eq("user_id", user["user_id"]).execute()
    return resp.data

@router.get("/{order_id}")
async def get_order(order_id: str, user: dict = Depends(get_current_user)):
    resp = supabase.table("orders").select("*").eq("id", order_id).execute()
    if not resp.data:
        raise HTTPException(status_code=404, detail="Order not found")
    return resp.data[0]

@router.post("/verify-payment")
async def verify_payment(payment: PaymentVerify, user: dict = Depends(get_current_user)):
    try:
        razorpay_client.utility.verify_payment_signature({
            'razorpay_order_id': payment.razorpay_order_id,
            'razorpay_payment_id': payment.razorpay_payment_id,
            'razorpay_signature': payment.razorpay_signature
        })
    except razorpay.errors.SignatureVerificationError:
        raise HTTPException(status_code=400, detail="Invalid payment signature")
    
    # Update order status
    resp = supabase.table("orders").update({"status": "paid"}).eq("razorpay_order_id", payment.razorpay_order_id).execute()
    if not resp.data:
        raise HTTPException(status_code=404, detail="Order not found")
        
    order = resp.data[0]
    
    # Simulate EDI 850
    edi_data = generate_edi_850(order["id"], [{"item": "OBD2_DEVICE", "qty": order["hardware_qty"]}])
    print(f"Generated EDI: {edi_data}")
    
    # Send email
    send_order_confirmation(user.get("email", "customer@example.com"), order["id"], order["amount"], order["hardware_qty"])
    
    return {"message": "Payment verified and order processed"}
