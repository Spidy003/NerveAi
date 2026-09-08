from fastapi import APIRouter, Depends, HTTPException
from middleware.auth_middleware import get_current_user, require_admin
from db.supabase_client import supabase
from models.schemas import AdminStats
from datetime import datetime, timedelta

router = APIRouter(prefix="/admin", tags=["admin"])

@router.get("/stats", response_model=AdminStats)
async def get_stats(user: dict = Depends(get_current_user)):
    require_admin(user)
    
    # Mock some data or fetch from supabase
    orders_resp = supabase.table("orders").select("amount", count="exact").execute()
    subs_resp = supabase.table("subscriptions").select("*", count="exact").eq("status", "active").execute()
    devices_resp = supabase.table("vehicles").select("*", count="exact").execute()
    
    total_revenue = sum(o["amount"] for o in orders_resp.data) if orders_resp.data else 0
    total_orders = orders_resp.count if orders_resp.count else 0
    active_subscriptions = subs_resp.count if subs_resp.count else 0
    total_devices = devices_resp.count if devices_resp.count else 0
    mrr = active_subscriptions * 29.99 # Mock MRR value
    
    return AdminStats(
        total_revenue=total_revenue,
        active_subscriptions=active_subscriptions,
        total_orders=total_orders,
        total_devices=total_devices,
        mrr=mrr
    )

@router.get("/revenue")
async def get_daily_revenue(user: dict = Depends(get_current_user)):
    require_admin(user)
    
    last_30_days = datetime.utcnow() - timedelta(days=30)
    resp = supabase.table("orders").select("amount, created_at").gte("created_at", last_30_days.isoformat()).execute()
    
    # Group by day
    daily_revenue = {}
    for o in resp.data:
        day = o["created_at"].split("T")[0]
        daily_revenue[day] = daily_revenue.get(day, 0) + o["amount"]
        
    return [{"date": k, "revenue": v} for k, v in daily_revenue.items()]

@router.get("/customers")
async def get_customers(skip: int = 0, limit: int = 50, user: dict = Depends(get_current_user)):
    require_admin(user)
    resp = supabase.table("users").select("*").range(skip, skip + limit - 1).execute()
    return resp.data

@router.get("/customers/{user_id}")
async def get_customer_details(user_id: str, user: dict = Depends(get_current_user)):
    require_admin(user)
    u_resp = supabase.table("users").select("*").eq("id", user_id).execute()
    if not u_resp.data:
        raise HTTPException(status_code=404, detail="Customer not found")
        
    v_resp = supabase.table("vehicles").select("*").eq("user_id", user_id).execute()
    o_resp = supabase.table("orders").select("*").eq("user_id", user_id).execute()
    a_resp = supabase.table("alerts").select("*").eq("user_id", user_id).execute()
    
    return {
        "customer": u_resp.data[0],
        "vehicles": v_resp.data,
        "orders": o_resp.data,
        "alerts": a_resp.data
    }

@router.get("/subscriptions")
async def get_subscriptions(user: dict = Depends(get_current_user)):
    require_admin(user)
    resp = supabase.table("subscriptions").select("*").execute()
    return resp.data

@router.put("/subscriptions/{sub_id}")
async def update_subscription(sub_id: str, status: str, user: dict = Depends(get_current_user)):
    require_admin(user)
    resp = supabase.table("subscriptions").update({"status": status}).eq("id", sub_id).execute()
    if not resp.data:
        raise HTTPException(status_code=404, detail="Subscription not found")
    return resp.data[0]

@router.get("/alerts")
async def get_all_alerts(user: dict = Depends(get_current_user)):
    require_admin(user)
    resp = supabase.table("alerts").select("*").execute()
    return resp.data
