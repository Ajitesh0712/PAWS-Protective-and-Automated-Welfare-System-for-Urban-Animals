from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import json
import os
from datetime import datetime

DATABASE_URL = "sqlite:///./data/paws.db"

engine = create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Missing Pets JSON storage functions
MISSING_PETS_FILE = "data/missing_pets.json"

def ensure_missing_pets_file():
    """Ensure the missing pets JSON file exists"""
    os.makedirs("data", exist_ok=True)
    if not os.path.exists(MISSING_PETS_FILE):
        with open(MISSING_PETS_FILE, "w") as f:
            json.dump([], f)

def add_missing_pet(missing_pet):
    """
    Add a missing pet record to the JSON file.
    
    Args:
        missing_pet: dict with keys: image_path, location, animal_type
    
    Returns:
        dict: The saved missing pet record with id and created_at
    """
    ensure_missing_pets_file()
    
    with open(MISSING_PETS_FILE, "r") as f:
        pets = json.load(f)
    
    # Generate ID (increment from highest existing ID or start at 1)
    if pets:
        new_id = max(pet.get("id", 0) for pet in pets) + 1
    else:
        new_id = 1
    
    # Create the record
    pet_record = {
        "id": new_id,
        "image_path": missing_pet["image_path"],
        "location": missing_pet["location"],
        "animal_type": missing_pet["animal_type"],
        "created_at": datetime.now().isoformat()
    }
    
    pets.append(pet_record)
    
    with open(MISSING_PETS_FILE, "w") as f:
        json.dump(pets, f, indent=2)
    
    return pet_record

def get_all_missing_pets():
    """
    Retrieve all missing pet records from the JSON file.
    
    Returns:
        list: List of all missing pet records
    """
    ensure_missing_pets_file()
    
    if not os.path.exists(MISSING_PETS_FILE):
        return []
    
    with open(MISSING_PETS_FILE, "r") as f:
        pets = json.load(f)
    
    return pets

# User authentication JSON storage functions
USERS_FILE = "data/users.json"

def ensure_users_file():
    """Ensure the users JSON file exists"""
    os.makedirs("data", exist_ok=True)
    if not os.path.exists(USERS_FILE):
        with open(USERS_FILE, "w") as f:
            json.dump([], f)

def get_user_by_email(email):
    """
    Retrieve a user by email from the JSON file.
    
    Args:
        email: Email address to search for
    
    Returns:
        dict: User record if found, None otherwise
    """
    ensure_users_file()
    
    if not os.path.exists(USERS_FILE):
        return None
    
    with open(USERS_FILE, "r") as f:
        users = json.load(f)
    
    for user in users:
        if user.get("email") == email:
            return user
    
    return None

def create_user(email, password_hash, role, name=None):
    """
    Create a new user in the JSON file.
    
    Args:
        email: User's email address
        password_hash: Hashed password
        role: User role (citizen or partner)
        name: Optional user name
    
    Returns:
        dict: The created user record with id
    """
    ensure_users_file()
    
    with open(USERS_FILE, "r") as f:
        users = json.load(f)
    
    # Check if user already exists
    for user in users:
        if user.get("email") == email:
            return None  # User already exists
    
    # Generate ID (increment from highest existing ID or start at 1)
    if users:
        new_id = max(user.get("id", 0) for user in users) + 1
    else:
        new_id = 1
    
    # Create the user record
    user_record = {
        "id": new_id,
        "email": email,
        "password": password_hash,
        "role": role,
        "name": name or "",
        "created_at": datetime.now().isoformat()
    }
    
    users.append(user_record)
    
    with open(USERS_FILE, "w") as f:
        json.dump(users, f, indent=2)
    
    return user_record
