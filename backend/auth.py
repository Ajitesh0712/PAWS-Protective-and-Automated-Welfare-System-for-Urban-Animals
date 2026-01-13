import jwt

SECRET_KEY = "paws_secret_key"

def hash_password(password):
    if password is None:
        raise ValueError("Password cannot be None")
    if isinstance(password, bytes):
        password = password.decode('utf-8')
    return str(password)

def verify_password(password, stored_password):
    if password is None or stored_password is None:
        return False
    if isinstance(password, bytes):
        password = password.decode('utf-8')
    if isinstance(stored_password, bytes):
        stored_password = stored_password.decode('utf-8')
    return str(password) == str(stored_password)

def create_token(user):
    payload = {"id": user.id, "role": user.role}
    return jwt.encode(payload, SECRET_KEY, algorithm="HS256")
