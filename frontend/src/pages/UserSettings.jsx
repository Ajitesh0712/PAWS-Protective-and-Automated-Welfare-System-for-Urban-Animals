import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserSettings.css";

export default function UserSettings() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  
  // Dummy form data
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 98765 43210",
    location: "Noida, UP"
  });

  const [notificationData, setNotificationData] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    rescueAlerts: true,
    communityUpdates: true,
    weeklyDigest: false
  });

  const [privacyData, setPrivacyData] = useState({
    profileVisibility: "public",
    showLocation: true,
    allowMessages: true,
    shareData: false
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotificationData(prev => ({ ...prev, [name]: checked }));
  };

  const handlePrivacyChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPrivacyData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
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
          <h1 className="settings-title">User Settings</h1>
          <p className="settings-subtitle">Manage your account preferences</p>
        </div>

        <div className="settings-tabs">
          <button
            className={`settings-tab ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            Profile Info
          </button>
          <button
            className={`settings-tab ${activeTab === "notifications" ? "active" : ""}`}
            onClick={() => setActiveTab("notifications")}
          >
            Notifications
          </button>
          <button
            className={`settings-tab ${activeTab === "privacy" ? "active" : ""}`}
            onClick={() => setActiveTab("privacy")}
          >
            Privacy
          </button>
        </div>

        <div className="settings-content">
          {activeTab === "profile" && (
            <div className="settings-card">
              <h2 className="card-title">Profile Information</h2>
              <form className="settings-form">
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleProfileChange}
                    className="form-input"
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                    className="form-input"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleProfileChange}
                    className="form-input"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={profileData.location}
                    onChange={handleProfileChange}
                    className="form-input"
                    placeholder="Enter your location"
                  />
                </div>
                <button type="button" className="save-btn" onClick={handleSave}>
                  Save Changes
                </button>
              </form>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="settings-card">
              <h2 className="card-title">Notification Preferences</h2>
              <form className="settings-form">
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="emailNotifications"
                      checked={notificationData.emailNotifications}
                      onChange={handleNotificationChange}
                    />
                    <span>Email Notifications</span>
                  </label>
                  <p className="checkbox-description">Receive updates via email</p>
                </div>
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="smsNotifications"
                      checked={notificationData.smsNotifications}
                      onChange={handleNotificationChange}
                    />
                    <span>SMS Notifications</span>
                  </label>
                  <p className="checkbox-description">Receive updates via SMS</p>
                </div>
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="pushNotifications"
                      checked={notificationData.pushNotifications}
                      onChange={handleNotificationChange}
                    />
                    <span>Push Notifications</span>
                  </label>
                  <p className="checkbox-description">Receive browser push notifications</p>
                </div>
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="rescueAlerts"
                      checked={notificationData.rescueAlerts}
                      onChange={handleNotificationChange}
                    />
                    <span>Rescue Alerts</span>
                  </label>
                  <p className="checkbox-description">Get notified about nearby rescue requests</p>
                </div>
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="communityUpdates"
                      checked={notificationData.communityUpdates}
                      onChange={handleNotificationChange}
                    />
                    <span>Community Updates</span>
                  </label>
                  <p className="checkbox-description">Stay updated with community posts</p>
                </div>
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="weeklyDigest"
                      checked={notificationData.weeklyDigest}
                      onChange={handleNotificationChange}
                    />
                    <span>Weekly Digest</span>
                  </label>
                  <p className="checkbox-description">Receive weekly summary of activities</p>
                </div>
                <button type="button" className="save-btn" onClick={handleSave}>
                  Save Changes
                </button>
              </form>
            </div>
          )}

          {activeTab === "privacy" && (
            <div className="settings-card">
              <h2 className="card-title">Privacy Settings</h2>
              <form className="settings-form">
                <div className="form-group">
                  <label className="form-label">Profile Visibility</label>
                  <select
                    name="profileVisibility"
                    value={privacyData.profileVisibility}
                    onChange={handlePrivacyChange}
                    className="form-input"
                  >
                    <option value="public">Public</option>
                    <option value="friends">Friends Only</option>
                    <option value="private">Private</option>
                  </select>
                </div>
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="showLocation"
                      checked={privacyData.showLocation}
                      onChange={handlePrivacyChange}
                    />
                    <span>Show Location in Posts</span>
                  </label>
                  <p className="checkbox-description">Display your location when posting</p>
                </div>
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="allowMessages"
                      checked={privacyData.allowMessages}
                      onChange={handlePrivacyChange}
                    />
                    <span>Allow Direct Messages</span>
                  </label>
                  <p className="checkbox-description">Let others send you messages</p>
                </div>
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="shareData"
                      checked={privacyData.shareData}
                      onChange={handlePrivacyChange}
                    />
                    <span>Share Data for Analytics</span>
                  </label>
                  <p className="checkbox-description">Help improve PAWS by sharing anonymous data</p>
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
