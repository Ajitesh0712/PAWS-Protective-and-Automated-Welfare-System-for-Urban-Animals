# 🐾 PAWS - Predictive and Automated Welfare System for Urban Animals

PAWS is a comprehensive platform designed to help citizens report injured animals, find missing pets, and connect with NGOs and veterinarians for animal welfare services.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [API Documentation](#api-documentation)
- [Usage Guide](#usage-guide)
- [Features Overview](#features-overview)

## ✨ Features

### For Citizens
- **Report Injured Animals**: Upload photos with AI-powered injury detection and severity analysis
- **Report Missing Pets**: Upload pet photos with last seen location
- **Community Feed**: View and interact with community posts about animal sightings and rescues
- **Find NGOs & Vets**: Browse nearby animal welfare organizations and veterinarians
- **User Authentication**: Secure login and registration system

### For NGOs/Partners
- **NGO Dashboard**: View and manage rescue requests
- **Request Management**: Accept, resolve, and track animal rescue cases
- **Priority Handling**: See severity levels and prioritize urgent cases

### AI-Powered Features
- **Animal Detection**: Automatically identifies animal type (Dog, Cat, etc.) from uploaded images
- **Injury Severity Analysis**: Analyzes images to determine injury severity (Low, Moderate, Critical)
- **Automated Form Filling**: Auto-fills animal type and severity level based on AI analysis

## 🛠 Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **YOLO (Ultralytics)** - Object detection for animal identification
- **OpenCV** - Image processing and injury analysis
- **JWT** - Token-based authentication
- **JSON File Storage** - Lightweight data persistence

### Frontend
- **React 18** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **CSS3** - Styling

## 📁 Project Structure

```
PAWS-Predictive-and-Automated-Welfare-System-for-Urban-Animals/
├── backend/
│   ├── main.py                 # FastAPI application entry point
│   ├── auth.py                 # Authentication utilities
│   ├── ai_engine.py           # AI image analysis (YOLO + injury detection)
│   ├── database.py            # JSON-based data storage functions
│   ├── models.py              # SQLAlchemy models
│   ├── routes/
│   │   ├── auth_routes.py     # Authentication endpoints
│   │   └── missing_pets.py    # Missing pets endpoints
│   ├── data/                  # JSON data storage
│   │   ├── users.json         # User accounts
│   │   ├── reports.json       # Injury reports
│   │   ├── missing_pets.json  # Missing pet reports
│   │   └── injury_reports.json
│   ├── uploads/               # Uploaded images
│   └── requirements.txt        # Python dependencies
│
└── frontend/
    ├── src/
    │   ├── App.js             # Main app component with routing
    │   ├── components/
    │   │   ├── Navbar.jsx     # Navigation component
    │   │   ├── UploadForm.jsx # Injury report form
    │   │   └── MapPicker.jsx  # Location picker
    │   ├── pages/
    │   │   ├── Home.jsx       # Home page with community feed
    │   │   ├── Login.jsx      # Authentication page
    │   │   ├── Report.jsx     # Report injured animal page
    │   │   ├── MissingPets.jsx # Missing pets page
    │   │   ├── NGODashboard.jsx # NGO dashboard
    │   │   ├── Partners.jsx   # NGOs & Vets directory
    │   │   └── About.jsx      # About page
    │   └── api.js             # API configuration
    └── package.json           # Node.js dependencies
```

## 🚀 Setup Instructions

### Prerequisites
- Python 3.8 or higher
- Node.js 16 or higher
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create virtual environment (recommended)**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```
   
   If `requirements.txt` is empty, install manually:
   ```bash
   pip install fastapi uvicorn python-multipart passlib python-jose[cryptography] opencv-python ultralytics numpy
   ```

4. **Download YOLO model** (if not present)
   - The `yolov8n.pt` model will be automatically downloaded on first run
   - Or download manually and place in `backend/` directory

5. **Start the FastAPI server**
   ```bash
   uvicorn main:app --reload
   ```
   
   The server will run on `http://127.0.0.1:8000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```
   
   The app will run on `http://localhost:3000`

## 📡 API Documentation

### Authentication Endpoints

#### `POST /auth/register`
Register a new user.

**Request (Form Data):**
- `email` (string, required)
- `password` (string, required)
- `role` (string, required) - "citizen" or "partner"
- `name` (string, optional)

**Response:**
```json
{
  "message": "User registered successfully",
  "success": true
}
```

#### `POST /auth/login`
Login a user.

**Request (Form Data):**
- `email` (string, required)
- `password` (string, required)
- `role` (string, required) - "citizen" or "partner"

**Response:**
```json
{
  "success": true,
  "role": "citizen",
  "id": 1,
  "message": "Login successful"
}
```

### Injury Report Endpoints

#### `POST /upload-report`
Upload an injured animal image with AI analysis.

**Request (Form Data):**
- `image` (file, required) - Image file
- `lat` (string, required) - Latitude
- `lng` (string, required) - Longitude

**Response:**
```json
{
  "id": 1,
  "animal": "Dog",
  "severity": "Critical",
  "score": 85,
  "description": "Dog detected with Critical injury...",
  "lat": "28.5355",
  "lng": "77.3910",
  "status": "Pending",
  "image": "uploads/uuid.jpg"
}
```

#### `GET /reports`
Get all injury reports (for NGO dashboard).

**Response:**
```json
[
  {
    "id": 1,
    "animal": "Dog",
    "severity": "Critical",
    "score": 85,
    "description": "...",
    "lat": "28.5355",
    "lng": "77.3910",
    "status": "Pending",
    "image": "uploads/uuid.jpg"
  }
]
```

### Missing Pets Endpoints

#### `POST /missing-pets`
Report a missing pet.

**Request (Form Data):**
- `image` (file, required) - Pet photo
- `location` (string, required) - Last seen location

**Response:**
```json
{
  "id": 1,
  "image_path": "uploads/uuid.jpg",
  "location": "Central Park, Sector 15",
  "animal_type": "Dog",
  "created_at": "2024-01-15T10:30:00"
}
```

#### `GET /missing-pets`
Get all missing pet reports.

**Response:**
```json
[
  {
    "id": 1,
    "image_path": "uploads/uuid.jpg",
    "location": "Central Park, Sector 15",
    "animal_type": "Dog",
    "created_at": "2024-01-15T10:30:00"
  }
]
```

### Other Endpoints

#### `POST /report-injury`
Legacy injury reporting endpoint.

#### `GET /injury-reports`
Get all injury reports.

#### `GET /uploads/{filename}`
Serve uploaded images statically.

## 📖 Usage Guide

### For Citizens

1. **Register/Login**
   - Navigate to Login page
   - Choose "User" or "NGO Organization"
   - Fill in details and submit
   - Citizens are redirected to Home page
   - Partners are redirected to NGO Dashboard

2. **Report Injured Animal**
   - Click "Report Animal" from navigation
   - Upload an image of the injured animal
   - AI automatically detects animal type and severity
   - Form auto-fills with AI results
   - Add location and submit

3. **Report Missing Pet**
   - Navigate to "Missing Pets" page
   - Upload pet photo
   - Enter last seen location
   - Submit report

4. **View Community Feed**
   - Home page shows community posts
   - View animal sightings, rescues, and updates

### For NGOs/Partners

1. **Login**
   - Select "NGO Organization" on login page
   - Enter credentials
   - Automatically redirected to NGO Dashboard

2. **Manage Requests**
   - View all rescue requests on dashboard
   - See severity levels and locations
   - Accept pending requests
   - Mark requests as resolved

### Role-Based Navigation

- **Citizens**: After login → Home page
- **Partners**: After login → NGO Dashboard (`/ngo-dashboard`)
- **Profile Icon**: Appears in navbar when logged in
  - Click to see dropdown menu
  - Options: My Account, Logout

## 🔐 Authentication

- **Storage**: User data stored in `backend/data/users.json`
- **Passwords**: Stored in plain text (hackathon prototype)
- **Session**: Managed via localStorage in frontend
- **Roles**: 
  - `citizen` - Regular users
  - `partner` - NGOs and Veterinarians

## 🤖 AI Features

### Animal Detection
- Uses YOLOv8 model to detect animals in images
- Supports: Dog, Cat, Cow, Horse
- Returns animal type with confidence score

### Injury Analysis
- Analyzes image for blood/injury indicators
- Calculates severity score (0-100)
- Categorizes as: Low, Moderate, or Critical
- Factors considered:
  - Blood ratio in image
  - Face damage detection
  - Animal size/closeness
  - Detection confidence

## 📝 Data Storage

All data is stored in JSON files:
- `data/users.json` - User accounts
- `data/reports.json` - Injury reports with AI analysis
- `data/missing_pets.json` - Missing pet reports
- `data/injury_reports.json` - Legacy injury reports

Images are stored in `uploads/` directory with UUID filenames.

## 🌐 CORS Configuration

Backend is configured to accept requests from all origins (development mode):
```python
allow_origins=["*"]
allow_methods=["*"]
allow_headers=["*"]
```

## 🎨 Frontend Routes

- `/` - Home page (community feed)
- `/login` - Authentication page
- `/report` - Report injured animal
- `/missing` - Missing pets page
- `/partners` - NGOs & Vets directory
- `/about` - About page
- `/ngo-dashboard` - NGO dashboard (partner role)
- `/dashboard` - User dashboard

## 🐛 Troubleshooting

### Backend Issues

**Port already in use:**
```bash
# Change port
uvicorn main:app --reload --port 8001
```

**YOLO model not found:**
- Model downloads automatically on first run
- Ensure internet connection for first run

**Import errors:**
- Ensure virtual environment is activated
- Reinstall dependencies: `pip install -r requirements.txt`

### Frontend Issues

**Cannot connect to backend:**
- Ensure backend is running on `http://127.0.0.1:8000`
- Check CORS configuration
- Verify API URLs in frontend code

**Port 3000 in use:**
```bash
# Change port
PORT=3001 npm start
```

## 📄 License

This project is developed for hackathon/demonstration purposes.

## 👥 Contributing

This is a hackathon project. For production use, consider:
- Implementing proper password hashing
- Using a production database (PostgreSQL, MongoDB)
- Adding input validation and sanitization
- Implementing proper error handling
- Adding unit tests
- Setting up CI/CD pipeline

## 🔮 Future Enhancements

- Real-time notifications
- Map integration for location visualization
- Email notifications for rescue requests
- Mobile app version
- Advanced AI models for better detection
- Integration with veterinary databases
- Payment gateway for donations

---

**Note**: This is a hackathon prototype. For production deployment, implement proper security measures, database systems, and error handling.
