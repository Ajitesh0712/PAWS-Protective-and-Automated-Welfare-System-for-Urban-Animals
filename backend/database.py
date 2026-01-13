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
