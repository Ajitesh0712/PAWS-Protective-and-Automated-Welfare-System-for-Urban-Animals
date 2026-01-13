from passlib.context import CryptContext
import jwt

SECRET_KEY = "paws_secret_key"

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password):
    return pwd_context.hash(password)

def verify_password(password, hashed):
    return pwd_context.verify(password, hashed)

def create_token(user):
    payload = {"id": user.id, "role": user.role}
    return jwt.encode(payload, SECRET_KEY, algorithm="HS256")
