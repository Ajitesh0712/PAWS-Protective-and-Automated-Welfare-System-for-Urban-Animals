from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
import shutil, uuid, json
from ai_engine import analyze_image

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

DATA_FILE = "data/reports.json"

def load_reports():
    with open(DATA_FILE) as f:
        return json.load(f)

def save_reports(data):
    with open(DATA_FILE, "w") as f:
        json.dump(data, f, indent=2)

@app.post("/upload-report")
async def upload_report(
    image: UploadFile = File(...),
    lat: str = Form(...),
    lng: str = Form(...)
):
    filename = f"uploads/{uuid.uuid4()}.jpg"
    with open(filename, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)

    ai = analyze_image(filename)
    reports = load_reports()

    new_case = {
        "id": len(reports) + 1,
        "animal": ai["animal"],
        "severity": ai["severity"],
        "score": ai["score"],
        "lat": lat,
        "lng": lng,
        "status": "Pending",
        "image": filename
    }

    reports.append(new_case)
    save_reports(reports)

    return new_case

@app.get("/reports")
def get_reports():
    return load_reports()
