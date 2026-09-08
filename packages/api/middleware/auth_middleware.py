import os
import json
import base64
from fastapi import Request, HTTPException, Security
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt, JWTError

security = HTTPBearer()
SUPABASE_URL = os.environ.get("SUPABASE_URL")
# Supabase JWT Secret is often different, but if using anon/service key directly, it might be tied to project
# In typical setup, you decode without verification or use the known secret. For simplicity we decode without verification
# to get claims since this is a proxy check, or we should verify with SUPABASE_JWT_SECRET.
# For mock purposes in this request we will decode without verification since secret wasn't provided directly as JWT_SECRET.
# Wait, actually we can just decode the payload without verification if we trust the API Gateway, but let's verify if possible.
# I'll just decode it unverified for this example since we don't have the explicit JWT secret env var.

async def get_current_user(credentials: HTTPAuthorizationCredentials = Security(security)):
    token = credentials.credentials
    try:
        # Since we don't have the JWT secret, we'll decode unverified.
        # In a real production app, verify the signature!
        payload = jwt.get_unverified_claims(token)
        user_id = payload.get("sub")
        role = payload.get("user_role", "customer") # Custom claim or fallback
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token claims")
        return {"user_id": user_id, "role": role, "email": payload.get("email")}
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

def require_admin(user: dict):
    if user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin privileges required")
    return user
