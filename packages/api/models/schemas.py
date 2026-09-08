from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from datetime import datetime

class UserCreate(BaseModel):
    email: str
    password: str
    name: Optional[str] = None
    role: str = "customer"

class UserResponse(BaseModel):
    id: str
    email: str
    role: str
    name: Optional[str] = None
    created_at: Optional[datetime] = None

class OrderCreate(BaseModel):
    amount: float
    hardware_qty: int
    shipping_address: str

class OrderResponse(BaseModel):
    id: str
    user_id: str
    amount: float
    hardware_qty: int
    status: str
    created_at: datetime
    razorpay_order_id: Optional[str] = None

class VehicleCreate(BaseModel):
    plate_number: str
    make: str
    model: str
    year: int

class VehicleResponse(BaseModel):
    id: str
    user_id: str
    plate_number: str
    make: str
    model: str
    year: int
    created_at: datetime

class SubscriptionResponse(BaseModel):
    id: str
    user_id: str
    plan_id: str
    status: str
    next_billing_date: datetime
    created_at: datetime

class TelemetryData(BaseModel):
    vehicle_id: str
    timestamp: datetime
    rpm: float
    engine_temp: float
    battery_voltage: float
    fuel_pressure: float
    vibration: float
    speed: float
    gear: int

class AlertResponse(BaseModel):
    id: str
    vehicle_id: str
    user_id: str
    alert_type: str
    severity: str
    message: str
    is_acknowledged: bool
    created_at: datetime

class PaymentVerify(BaseModel):
    razorpay_order_id: str
    razorpay_payment_id: str
    razorpay_signature: str

class BookingCreate(BaseModel):
    slot_time: datetime
    vehicle_id: str

class BookingResponse(BaseModel):
    id: str
    user_id: str
    vehicle_id: str
    slot_time: datetime
    status: str
    created_at: datetime

class AdminStats(BaseModel):
    total_revenue: float
    active_subscriptions: int
    total_orders: int
    total_devices: int
    mrr: float
