import { useState } from "react";
import { uploadReport } from "../api";
import MapPicker from "./MapPicker";
import "./UploadForm.css";

export default function UploadForm() {
  const [formData, setFormData] = useState({
    image: null,
    animalType: "",
    severity: "",
    description: "",
    contactName: "",
    contactPhone: "",
    contactEmail: ""
  });
  const [animal, setAnimal] = useState("");
  const [severity, setSeverity] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const submitReport = async (file) => {
    if (!file) {
      return;
    }

    // Use default location if not available yet (backend requires lat/lng)
    const defaultLat = location?.lat || "28.5355";
    const defaultLng = location?.lng || "77.3910";

    const data = new FormData();
    data.append("image", file);
    data.append("lat", defaultLat);
    data.append("lng", defaultLng);

    try {
      setError(""); // Clear any previous errors
      setAnalyzing(true); // Show analyzing state
      
      // Verify file is attached
      if (!file || !(file instanceof File)) {
        throw new Error("Invalid file. Please select an image file.");
      }

      console.log("Sending request to:", "http://127.0.0.1:8000/upload-report");
      console.log("File:", file.name, "Size:", file.size, "Type:", file.type);
      console.log("Location:", defaultLat, defaultLng);

      const res = await fetch("http://127.0.0.1:8000/upload-report", {
        method: "POST",
        body: data
        // Note: Don't set Content-Type header - browser sets it automatically with boundary for FormData
      });

      console.log("Response status:", res.status, res.statusText);

      if (!res.ok) {
        let errorMessage = `Server error: ${res.status}`;
        try {
          const errorData = await res.json();
          errorMessage = errorData.detail || errorData.message || errorMessage;
        } catch (parseError) {
          // If response is not JSON, try to get text
          const textError = await res.text().catch(() => "");
          errorMessage = textError || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const ai = await res.json();
      console.log("AI response:", ai);

      // Validate response has required fields
      if (!ai || typeof ai.animal === "undefined") {
        throw new Error("Invalid response from server. Missing animal detection data.");
      }

      // Map backend severity to frontend select values
      // Backend returns: "Low", "Moderate", "Critical"
      // Frontend expects: "Low", "Medium", "High", "Critical"
      let mappedSeverity = ai.severity || "";
      if (mappedSeverity === "Moderate") {
        mappedSeverity = "Medium"; // Map Moderate to Medium
      } else if (mappedSeverity === "Low") {
        mappedSeverity = "Low";
      } else if (mappedSeverity === "Critical") {
        mappedSeverity = "Critical";
      }

      setFormData(prev => ({
        ...prev,
        animalType: ai.animal || "",
        severity: mappedSeverity,
        description: ai.description || `Detected ${ai.animal} with ${ai.severity} severity (AI score: ${ai.score}). Immediate attention required.`
      }));

      // Clear error on success
      setError("");

    } catch (err) {
      console.error("AI analysis error:", err);
      
      // Handle different types of errors
      let errorMessage = "AI analysis failed. ";
      
      if (err instanceof TypeError && err.message.includes("fetch")) {
        errorMessage += "Cannot connect to server. Please ensure the backend is running at http://127.0.0.1:8000";
      } else if (err instanceof TypeError) {
        errorMessage += "Network error. Please check your connection.";
      } else if (err.message) {
        errorMessage = err.message;
      } else {
        errorMessage += "Please check your connection and try again.";
      }
      
      setError(errorMessage);
    } finally {
      setAnalyzing(false);
    }
  };


  const handleImageChange = async(e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      
      // Trigger AI analysis after image is set
      await submitReport(file);
    }
  };


  const validateForm = () => {
    if (!formData.image) {
      setError("Please upload an image of the injured animal");
      return false;
    }
    if (!formData.animalType) {
      setError("Please select the animal type");
      return false;
    }
    if (!formData.severity) {
      setError("Please select the severity level");
      return false;
    }
    if (!formData.description.trim()) {
      setError("Please provide a description of the situation");
      return false;
    }
    if (!formData.contactName.trim()) {
      setError("Please provide your name");
      return false;
    }
    if (!formData.contactPhone.trim()) {
      setError("Please provide your phone number");
      return false;
    }
    if (!location) {
      setError("Please wait for location to be detected or select manually");
      return false;
    }
    return true;
  };

  const submit = async () => {
    setError("");
    setSuccess(false);

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const data = new FormData();
      data.append("image", formData.image);
      data.append("animal", formData.animalType);
      data.append("severity", formData.severity);
      data.append("description", formData.description);
      data.append("contact_name", formData.contactName);
      data.append("contact_phone", formData.contactPhone);
      data.append("contact_email", formData.contactEmail || "");
      data.append("lat", location.lat);
      data.append("lng", location.lng);

      await uploadReport(data);
      setSuccess(true);
      
      // Reset form
      setFormData({
        image: null,
        animalType: "",
        severity: "",
        description: "",
        contactName: "",
        contactPhone: "",
        contactEmail: ""
      });
      setImagePreview(null);
      
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch (err) {
      setError("Failed to submit report. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-form-container">
      <div className="form-card">
        <h3>Report Injured Animal</h3>
        <p className="form-subtitle">Help us rescue animals in need by providing the following information</p>

        {analyzing && (
          <div className="alert alert-info">
            <span>🔍</span> Analyzing image with AI... Please wait.
          </div>
        )}

        {error && (
          <div className="alert alert-error">
            <span>⚠️</span> {error}
          </div>
        )}

        {success && (
          <div className="alert alert-success">
            <span>✅</span> Rescue request submitted successfully! Our team will respond shortly.
          </div>
        )}

        <div className="form-section">
          <label className="form-label">
            Upload Photo <span className="required">*</span>
          </label>
          <div className="image-upload-container">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input"
              id="image-upload"
            />
            <label htmlFor="image-upload" className="file-label">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="image-preview" />
              ) : (
                <div className="file-placeholder">
                  <span className="upload-icon">📷</span>
                  <span>Click to upload photo</span>
                </div>
              )}
            </label>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">
              Animal Type <span className="required">*</span>
            </label>
            <select
              name="animalType"
              value={formData.animalType}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="">Select animal type</option>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Bird">Bird</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">
              Severity Level <span className="required">*</span>
            </label>
            <select
              name="severity"
              value={formData.severity}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="">Select severity</option>
              <option value="Critical">Critical - Immediate attention needed</option>
              <option value="High">High - Urgent care required</option>
              <option value="Medium">Medium - Needs medical attention</option>
              <option value="Low">Low - Monitoring recommended</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">
            Description <span className="required">*</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="form-textarea"
            placeholder="Describe the animal's condition, location details, and any other relevant information..."
            rows="4"
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Location <span className="required">*</span>
          </label>
          <MapPicker setLocation={setLocation} />
          {location && (
            <p className="location-confirmed">
              ✅ Location confirmed: {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
            </p>
          )}
        </div>

        <div className="form-section">
          <h4 className="section-title">Contact Information</h4>
          
          <div className="form-group">
            <label className="form-label">
              Your Name <span className="required">*</span>
            </label>
            <input
              type="text"
              name="contactName"
              value={formData.contactName}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Enter your full name"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">
                Phone Number <span className="required">*</span>
              </label>
              <input
                type="tel"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleInputChange}
                className="form-input"
                placeholder="+91 xxxxxxxxxx"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email (Optional)</label>
              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleInputChange}
                className="form-input"
                placeholder="your.email@example.com"
              />
            </div>
          </div>
        </div>

        <button
          onClick={submit}
          disabled={loading}
          className="submit-button"
        >
          {loading ? "Submitting..." : "🚑 Send Rescue Alert"}
        </button>
      </div>
    </div>
  );
}
