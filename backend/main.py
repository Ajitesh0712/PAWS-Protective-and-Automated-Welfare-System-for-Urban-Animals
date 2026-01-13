from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
import shutil, uuid, json, os
from ai_engine import analyze_image

app = FastAPI()

# Enable CORS for React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

DATA_FILE = "data/reports.json"

# Ensure data folder and file exist
os.makedirs("data", exist_ok=True)
if not os.path.exists(DATA_FILE):
    with open(DATA_FILE, "w") as f:
        json.dump([], f)

def load_reports():
    with open(DATA_FILE) as f:
        return json.load(f)

def save_reports(data):
    with open(DATA_FILE, "w") as f:
        json.dump(data, f, indent=2)

# 🚑 Upload + AI analysis endpoint
@app.post("/upload-report")
async def upload_report(
    image: UploadFile = File(...),
    lat: str = Form(...),
    lng: str = Form(...)
):
    filename = f"uploads/{uuid.uuid4()}.jpg"
    os.makedirs("uploads", exist_ok=True)

    with open(filename, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)

    # Run YOLO + injury analysis
    ai = analyze_image(filename)

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

# 📋 Get all reports (NGO dashboard)
@app.get("/reports")
def get_reports():
    return load_reports()
