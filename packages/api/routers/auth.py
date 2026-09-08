from fastapi import APIRouter, Depends, HTTPException
from middleware.auth_middleware import get_current_user
from db.supabase_client import supabase

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/verify-token")
async def verify_token(user: dict = Depends(get_current_user)):
    # Fetch user details from supabase
    resp = supabase.table("users").select("*").eq("id", user["user_id"]).execute()
    if not resp.data:
        raise HTTPException(status_code=404, detail="User not found")
    return {"user": resp.data[0]}

@router.get("/me")
async def get_me(user: dict = Depends(get_current_user)):
    resp = supabase.table("users").select("*").eq("id", user["user_id"]).execute()
    if not resp.data:
        raise HTTPException(status_code=404, detail="User not found")
    return resp.data[0]
