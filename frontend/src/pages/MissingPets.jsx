import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./missingPets.css";

export default function MissingPets() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    image: null,
    place: ""
  });

  // Dummy data for missing pets
  const missingPets = [
    {
      id: 1,
      name: "Buddy",
      image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop",
      location: "Central Park, Sector 15",
      status: "Searching"
    },
    {
      id: 2,
      name: "Luna",
      image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=400&h=300&fit=crop",
      location: "Near Metro Station, Sector 18",
      status: "Searching"
    },
    {
      id: 3,
      name: "Max",
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop",
      location: "Residential Area, Sector 62",
      status: "Matched"
    },
    {
      id: 4,
      name: "Charlie",
      image: "https://images.unsplash.com/photo-1534361960057-19889dbdf1bb?w=400&h=300&fit=crop",
      location: "Shopping Mall, Sector 104",
      status: "Searching"
    },
    {
      id: 5,
      name: "Bella",
      image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=400&h=300&fit=crop",
      location: "Community Park, Sector 50",
      status: "Searching"
    },
    {
      id: 6,
      name: "Rocky",
      image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop",
      location: "Near School, Sector 21",
      status: "Matched"
    }
  ];

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

    if (!formData.place) {
      alert("Please enter the place name");
      return;
    }

    try {
      // 1️⃣ Create FormData
      const data = new FormData();
      data.append("image", formData.image);
      data.append("place", formData.place);

      // 2️⃣ CONNECT TO BACKEND HERE 👇
      const res = await fetch("http://127.0.0.1:8000/report-injury", {
        method: "POST",
        body: data
      });
      console.log(formData);

      // 3️⃣ Handle response
      const result = await res.json();
      console.log("Backend response:", result);

      alert("✅ Injury reported successfully");

      // 4️⃣ Reset form
      setFormData({
        image: null,
        place: ""
      });

    } catch (error) {
      console.error(error);
      alert("❌ Failed to submit report");
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
        <div className="pets-grid">
          {missingPets.map((pet) => (
            <div key={pet.id} className="pet-card">
              <div className="pet-image-container">
                <img src={pet.image} alt={pet.name} className="pet-image" />
                <span className={`status-badge ${pet.status.toLowerCase()}`}>
                  {pet.status}
                </span>
              </div>
              <div className="pet-info">
                <h3 className="pet-name">{pet.name}</h3>
                <p className="pet-location">📍 {pet.location}</p>
              </div>
            </div>
          ))}
        </div>
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
