from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import shutil, uuid, json, os, traceback
from ai_engine import analyze_image
from routes.missing_pets import router as missing_pets_router
from routes.auth_routes import router as auth_router


app = FastAPI()

# Enable CORS for React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (for development)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
    expose_headers=["*"]
)

# Serve static files (uploads folder)
os.makedirs("uploads", exist_ok=True)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# Include routers
app.include_router(missing_pets_router)
app.include_router(auth_router)

# Reports file for /upload-report endpoint
REPORTS_FILE = "data/reports.json"

# Ensure data folder and file exist
os.makedirs("data", exist_ok=True)
if not os.path.exists(REPORTS_FILE):
    with open(REPORTS_FILE, "w") as f:
        json.dump([], f)

def load_reports():
    if not os.path.exists(REPORTS_FILE):
        return []
    with open(REPORTS_FILE, "r") as f:
        return json.load(f)

def save_reports(data):
    os.makedirs("data", exist_ok=True)
    with open(REPORTS_FILE, "w") as f:
        json.dump(data, f, indent=2)

# 🚑 Upload + AI analysis endpoint
@app.post("/upload-report")
async def upload_report(
    image: UploadFile = File(...),
    lat: str = Form(...),
    lng: str = Form(...)
):
    try:
        # Validate image file
        if not image:
            raise HTTPException(status_code=400, detail="No image file provided")
        
        # Generate unique filename
        file_extension = os.path.splitext(image.filename)[1] if image.filename else ".jpg"
        filename = f"uploads/{uuid.uuid4()}{file_extension}"
        os.makedirs("uploads", exist_ok=True)

        # Save uploaded image
        with open(filename, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)

        # Run YOLO + injury analysis
        try:
            ai = analyze_image(filename)
        except Exception as ai_error:
            # If AI analysis fails, return a default response
            print(f"AI analysis error: {traceback.format_exc()}")
            ai = {
                "animal": "Unknown",
                "severity": "Low",
                "score": 0
            }

        reports = load_reports()

        description = f"{ai['animal']} detected with {ai['severity']} injury. AI score: {ai['score']}. Immediate attention required."

        new_case = {
            "id": len(reports) + 1,
            "animal": ai["animal"],
            "severity": ai["severity"],
            "score": ai["score"],
            "description": description,
            "lat": lat,
            "lng": lng,
            "status": "Pending",
            "image": filename
        }

        reports.append(new_case)
        save_reports(reports)

        return new_case
    
    except HTTPException:
        # Re-raise HTTP exceptions as-is
        raise
    except Exception as e:
        print(f"Error in upload_report: {traceback.format_exc()}")
        raise HTTPException(status_code=500, detail=f"Failed to process image: {str(e)}")

# 📋 Get all reports (NGO dashboard)
@app.get("/reports")
def get_reports():
    return load_reports()

# Injury reports file for /report-injury endpoint
INJURY_REPORTS_FILE = "data/injury_reports.json"

# Ensure data folder and injury reports file exist
os.makedirs("data", exist_ok=True)
if not os.path.exists(INJURY_REPORTS_FILE):
    with open(INJURY_REPORTS_FILE, "w") as f:
        json.dump([], f)

def load_injury_reports():
    if not os.path.exists(INJURY_REPORTS_FILE):
        return []
    with open(INJURY_REPORTS_FILE, "r") as f:
        return json.load(f)

def save_injury_reports(data):
    os.makedirs("data", exist_ok=True)
    with open(INJURY_REPORTS_FILE, "w") as f:
        json.dump(data, f, indent=2)

# ✅ ONLY endpoint you need
@app.post("/report-injury")
async def report_injury(
    image: UploadFile = File(...),
    place: str = Form(...)
):
    filename = f"uploads/{uuid.uuid4()}.jpg"

    # save image
    with open(filename, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)

    reports = load_injury_reports()

    new_report = {
        "id": len(reports) + 1,
        "image": filename,
        "place": place
    }

    reports.append(new_report)
    save_injury_reports(reports)

    return {
        "message": "Injury reported successfully",
        "report": new_report
    }

# (optional) view all reports
@app.get("/injury-reports")
def get_injury_reports():
    return load_injury_reports()