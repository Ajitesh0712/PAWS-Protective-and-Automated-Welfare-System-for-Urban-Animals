import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NGOSettings.css";

export default function NGOSettings() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("details");
  
  // Dummy form data
  const [orgData, setOrgData] = useState({
    name: "Animal Welfare Society",
    email: "contact@animalwelfare.org",
    phone: "+91 98765 43210",
    location: "Noida, Sector 62, UP",
    website: "www.animalwelfare.org",
    description: "Dedicated to rescuing and caring for urban animals"
  });

  const [availabilityData, setAvailabilityData] = useState({
    isAvailable: true,
    hours: "24×7",
    emergencyOnly: false,
    maxCapacity: 50
  });

  const [rescueData, setRescueData] = useState({
    animals: {
      dogs: true,
      cats: true,
      birds: false,
      other: true
    },
    maxDistance: 25,
    severityLevels: {
      critical: true,
      moderate: true,
      low: false
    }
  });

  const handleOrgChange = (e) => {
    const { name, value } = e.target;
    setOrgData(prev => ({ ...prev, [name]: value }));
  };

  const handleAvailabilityChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAvailabilityData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleRescueChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith("animal_")) {
      const animalType = name.replace("animal_", "");
      setRescueData(prev => ({
        ...prev,
        animals: {
          ...prev.animals,
          [animalType]: checked
        }
      }));
    } else if (name.startsWith("severity_")) {
      const severity = name.replace("severity_", "");
      setRescueData(prev => ({
        ...prev,
        severityLevels: {
          ...prev.severityLevels,
          [severity]: checked
        }
      }));
    } else {
      setRescueData(prev => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value
      }));
    }
  };

  const handleSave = () => {
    alert("Settings saved! (Demo mode - no data persisted)");
  };

  return (
    <div className="settings-page">
      <div className="settings-container">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
        
        <div className="settings-header">
          <h1 className="settings-title">NGO Settings</h1>
          <p className="settings-subtitle">Manage your organization preferences</p>
        </div>

        <div className="settings-tabs">
          <button
            className={`settings-tab ${activeTab === "details" ? "active" : ""}`}
            onClick={() => setActiveTab("details")}
          >
            Organization Details
          </button>
          <button
            className={`settings-tab ${activeTab === "availability" ? "active" : ""}`}
            onClick={() => setActiveTab("availability")}
          >
            Availability
          </button>
          <button
            className={`settings-tab ${activeTab === "rescue" ? "active" : ""}`}
            onClick={() => setActiveTab("rescue")}
          >
            Rescue Preferences
          </button>
        </div>

        <div className="settings-content">
          {activeTab === "details" && (
            <div className="settings-card">
              <h2 className="card-title">Organization Information</h2>
              <form className="settings-form">
                <div className="form-group">
                  <label className="form-label">Organization Name</label>
                  <input
                    type="text"
                    name="name"
                    value={orgData.name}
                    onChange={handleOrgChange}
                    className="form-input"
                    placeholder="Enter organization name"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={orgData.email}
                    onChange={handleOrgChange}
                    className="form-input"
                    placeholder="Enter organization email"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={orgData.phone}
                    onChange={handleOrgChange}
                    className="form-input"
                    placeholder="Enter contact number"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={orgData.location}
                    onChange={handleOrgChange}
                    className="form-input"
                    placeholder="Enter organization location"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Website</label>
                  <input
                    type="text"
                    name="website"
                    value={orgData.website}
                    onChange={handleOrgChange}
                    className="form-input"
                    placeholder="Enter website URL"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea
                    name="description"
                    value={orgData.description}
                    onChange={handleOrgChange}
                    className="form-input form-textarea"
                    placeholder="Describe your organization"
                    rows="4"
                  />
                </div>
                <button type="button" className="save-btn" onClick={handleSave}>
                  Save Changes
                </button>
              </form>
            </div>
          )}

          {activeTab === "availability" && (
            <div className="settings-card">
              <h2 className="card-title">Availability Settings</h2>
              <form className="settings-form">
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="isAvailable"
                      checked={availabilityData.isAvailable}
                      onChange={handleAvailabilityChange}
                    />
                    <span>Currently Available for Rescues</span>
                  </label>
                  <p className="checkbox-description">Toggle your availability status</p>
                </div>
                <div className="form-group">
                  <label className="form-label">Operating Hours</label>
                  <input
                    type="text"
                    name="hours"
                    value={availabilityData.hours}
                    onChange={handleAvailabilityChange}
                    className="form-input"
                    placeholder="e.g., 24×7, Mon-Sat: 9 AM - 8 PM"
                  />
                </div>
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="emergencyOnly"
                      checked={availabilityData.emergencyOnly}
                      onChange={handleAvailabilityChange}
                    />
                    <span>Emergency Cases Only</span>
                  </label>
                  <p className="checkbox-description">Accept only critical rescue requests</p>
                </div>
                <div className="form-group">
                  <label className="form-label">Maximum Capacity</label>
                  <input
                    type="number"
                    name="maxCapacity"
                    value={availabilityData.maxCapacity}
                    onChange={handleAvailabilityChange}
                    className="form-input"
                    placeholder="Enter maximum capacity"
                    min="1"
                  />
                </div>
                <button type="button" className="save-btn" onClick={handleSave}>
                  Save Changes
                </button>
              </form>
            </div>
          )}

          {activeTab === "rescue" && (
            <div className="settings-card">
              <h2 className="card-title">Rescue Preferences</h2>
              <form className="settings-form">
                <div className="form-group">
                  <label className="form-label">Types of Animals Handled</label>
                  <div className="checkbox-grid">
                    <div className="checkbox-group">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          name="animal_dogs"
                          checked={rescueData.animals.dogs}
                          onChange={handleRescueChange}
                        />
                        <span>🐕 Dogs</span>
                      </label>
                    </div>
                    <div className="checkbox-group">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          name="animal_cats"
                          checked={rescueData.animals.cats}
                          onChange={handleRescueChange}
                        />
                        <span>🐱 Cats</span>
                      </label>
                    </div>
                    <div className="checkbox-group">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          name="animal_birds"
                          checked={rescueData.animals.birds}
                          onChange={handleRescueChange}
                        />
                        <span>🐦 Birds</span>
                      </label>
                    </div>
                    <div className="checkbox-group">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          name="animal_other"
                          checked={rescueData.animals.other}
                          onChange={handleRescueChange}
                        />
                        <span>🐾 Other Animals</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Maximum Rescue Distance (km)</label>
                  <input
                    type="number"
                    name="maxDistance"
                    value={rescueData.maxDistance}
                    onChange={handleRescueChange}
                    className="form-input"
                    placeholder="Enter maximum distance"
                    min="1"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Severity Levels Accepted</label>
                  <div className="checkbox-grid">
                    <div className="checkbox-group">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          name="severity_critical"
                          checked={rescueData.severityLevels.critical}
                          onChange={handleRescueChange}
                        />
                        <span>🔴 Critical</span>
                      </label>
                    </div>
                    <div className="checkbox-group">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          name="severity_moderate"
                          checked={rescueData.severityLevels.moderate}
                          onChange={handleRescueChange}
                        />
                        <span>🟡 Moderate</span>
                      </label>
                    </div>
                    <div className="checkbox-group">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          name="severity_low"
                          checked={rescueData.severityLevels.low}
                          onChange={handleRescueChange}
                        />
                        <span>🟢 Low</span>
                      </label>
                    </div>
                  </div>
                </div>
                <button type="button" className="save-btn" onClick={handleSave}>
                  Save Changes
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
