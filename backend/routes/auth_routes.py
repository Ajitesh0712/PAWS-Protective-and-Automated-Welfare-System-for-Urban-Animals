from fastapi import APIRouter, HTTPException, Form
from typing import Optional
from database import get_user_by_email, create_user
from auth import hash_password, verify_password


router = APIRouter(prefix="/auth", tags=["authentication"])

@router.post("/register")
async def register(
    email: str = Form(...),
    password: str = Form(...),
    role: str = Form(...),
    name: Optional[str] = Form(None)
):
    """
    Register a new user.
    
    Accepts: email, password, role (citizen or partner), name (optional)
    Returns: success message
    """
    try:
        # Validate role
        if role not in ["citizen", "partner"]:
            raise HTTPException(status_code=400, detail="Role must be 'citizen' or 'partner'")
        
        # Check if user already exists
        existing_user = get_user_by_email(email)
        if existing_user:
            raise HTTPException(status_code=400, detail="Email already exists")
        
        # Hash password
        password_hash = hash_password(password)
        
        # Create user
        user = create_user(email, password_hash, role, name=name)
        
        if not user:
            raise HTTPException(status_code=500, detail="Failed to create user")
        
        return {
            "message": "User registered successfully",
            "success": True
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Registration failed: {str(e)}")


@router.post("/login")
async def login(
    email: str = Form(...),
    password: str = Form(...),
    role: str = Form(...)
):
    """
    Login a user.
    
    Accepts: email, password, role (citizen or partner)
    Returns: success (bool), role, id, message
    """
    try:
        # Get user by email
        user = get_user_by_email(email)
        
        if not user:
            raise HTTPException(status_code=401, detail="Invalid email or password")
        
        # Verify password
        if not verify_password(password, user["password"]):
            raise HTTPException(status_code=401, detail="Invalid email or password")
        
        # Verify role matches
        if user["role"] != role:
            raise HTTPException(
                status_code=403, 
                detail=f"User role mismatch. Expected {role}, but user is {user['role']}"
            )
        
        return {
            "success": True,
            "role": user["role"],
            "id": user["id"],
            "message": "Login successful"
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Login failed: {str(e)}")
