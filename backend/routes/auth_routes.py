from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
from models import User
from auth import hash_password, verify_password, create_token


router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/register")
def register(name: str, email: str, password: str, db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == email).first():
        raise HTTPException(status_code=400, detail="Email already exists")

    user = User(
        name=name,
        email=email,
        password=hash_password(password),
        role="citizen"   # force all new users to be normal citizens
    )

    db.add(user)
    db.commit()
    return {"message": "User registered successfully"}


@router.post("/login")
def login(email: str, password: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == email).first()

    if not user or not verify_password(password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_token(user)

    return {
        "token": token,
        "role": user.role,
        "name": user.name
    }
