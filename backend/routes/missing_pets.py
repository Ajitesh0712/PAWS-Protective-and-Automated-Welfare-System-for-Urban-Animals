from fastapi import APIRouter, File, UploadFile, Form, HTTPException
import shutil
import uuid
import os
from ai_engine import analyze_image
from database import add_missing_pet, get_all_missing_pets

router = APIRouter()

@router.post("/missing-pets")
async def create_missing_pet(
    image: UploadFile = File(...),
    location: str = Form(...)
):
    """
    Create a new missing pet report.
    
    Accepts an image file and location string.
    Uses AI engine to detect animal type from the image.
    Saves the image and stores the record.
    """
    # Ensure uploads directory exists
    os.makedirs("uploads", exist_ok=True)
    
    # Generate unique filename
    file_extension = os.path.splitext(image.filename)[1] or ".jpg"
    filename = f"uploads/{uuid.uuid4()}{file_extension}"
    
    # Save the uploaded image
    try:
        with open(filename, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save image: {str(e)}")
    
    # Use AI engine to detect animal type
    try:
        ai_result = analyze_image(filename)
        animal_type = ai_result.get("animal", "Unknown")
    except Exception as e:
        # If AI detection fails, default to Unknown
        animal_type = "Unknown"
    
    # Create missing pet record
    missing_pet_data = {
        "image_path": filename,
        "location": location,
        "animal_type": animal_type
    }
    
    # Save to database (JSON file)
    try:
        saved_pet = add_missing_pet(missing_pet_data)
        return saved_pet
    except Exception as e:
        # If saving fails, optionally clean up the uploaded image
        if os.path.exists(filename):
            os.remove(filename)
        raise HTTPException(status_code=500, detail=f"Failed to save missing pet record: {str(e)}")

@router.get("/missing-pets")
def get_missing_pets():
    """
    Retrieve all missing pet reports.
    
    Returns a list of all stored missing pet records.
    """
    try:
        pets = get_all_missing_pets()
        return pets
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to retrieve missing pets: {str(e)}")
