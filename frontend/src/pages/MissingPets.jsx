import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./missingPets.css";

export default function MissingPets() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    image: null,
    location: ""
  });
  const [missingPets, setMissingPets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch missing pets from backend
  useEffect(() => {
    const fetchMissingPets = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/missing-pets");
        if (res.ok) {
          const data = await res.json();
          setMissingPets(data);
        }
      } catch (error) {
        console.error("Failed to fetch missing pets:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMissingPets();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData(prev => ({
        ...prev,
        image: files[0] || null
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.image) {
      alert("Please upload an image");
      return;
    }

    if (!formData.location || formData.location.trim() === "") {
      alert("Please enter the last seen location");
      return;
    }

    try {
      // Create FormData
      const data = new FormData();
      data.append("image", formData.image);
      data.append("location", formData.location.trim());

      // Submit to backend
      const res = await fetch("http://127.0.0.1:8000/missing-pets", {
        method: "POST",
        body: data
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const result = await res.json();
      console.log("Backend response:", result);

      alert("✅ Missing pet report submitted successfully");

      // Reset form
      setFormData({
        image: null,
        location: ""
      });
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      // Refresh the missing pets list
      const refreshRes = await fetch("http://127.0.0.1:8000/missing-pets");
      if (refreshRes.ok) {
        const refreshData = await refreshRes.json();
        setMissingPets(refreshData);
      }

    } catch (error) {
      console.error("Submission error:", error);
      alert("❌ Failed to submit report. Please try again.");
    }
  };


  return (
    <div className="missing-pets-page">
      <button className="back-home-btn" onClick={() => navigate("/")}>
        ← Back to Home
      </button>
      {/* Page Header */}
      <header className="missing-header">
        <h1 className="missing-title">🐾 Missing Pets</h1>
        <p className="missing-subtitle">Help reunite lost pets with their families</p>
      </header>

      {/* Missing Pets Grid */}
      <section className="pets-grid-section">
        {loading ? (
          <div className="loading-message">Loading missing pets...</div>
        ) : missingPets.length === 0 ? (
          <div className="no-pets-message">No missing pets reported yet.</div>
        ) : (
          <div className="pets-grid">
            {missingPets.map((pet) => (
              <div key={pet.id} className="pet-card">
                <div className="pet-image-container">
                  <img 
                    src={`http://127.0.0.1:8000/${pet.image_path}`} 
                    alt={`Missing ${pet.animal_type || 'pet'}`} 
                    className="pet-image"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/400x300?text=No+Image";
                    }}
                  />
                </div>
                <div className="pet-info">
                  <h3 className="pet-name">{pet.animal_type || "Unknown Animal"}</h3>
                  <p className="pet-location">📍 {pet.location}</p>
                  {pet.created_at && (
                    <p className="pet-date">
                      Reported: {new Date(pet.created_at).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Report Missing Pet Form */}
      <section className="report-section">
        <div className="report-card">
          <h2 className="report-title">Report a Missing Pet</h2>
          <p className="report-description">
            If you've lost your pet or found a lost animal, please fill out the form below.
          </p>
          <form onSubmit={handleSubmit} className="report-form">
            <div className="form-group">
              <label htmlFor="image" className="form-label">
                Pet Photo
              </label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleInputChange}
                className="form-input-file"
                ref={fileInputRef}
              />
              {formData.image && (
                <p className="file-name">{formData.image.name}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="location" className="form-label">
                Last Seen Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="e.g., Central Park, Sector 15"
                className="form-input"
                required
              />
            </div>

            <button type="submit" className="submit-button">
              Submit Report
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
