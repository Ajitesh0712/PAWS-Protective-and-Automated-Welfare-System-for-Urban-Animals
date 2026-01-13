import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ngoDashboard.css";

export default function NGODashboard() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([
    {
      id: 1,
      animalType: "Dog",
      location: "Noida, Sector 62",
      severity: "Critical",
      timeReported: "2 hours ago",
      status: "Pending",
      description: "Injured dog found near metro station. Visible wounds on leg."
    },
    {
      id: 2,
      animalType: "Cat",
      location: "Noida, Sector 18",
      severity: "High",
      timeReported: "4 hours ago",
      status: "Accepted",
      description: "Stray cat appears malnourished. Needs medical attention."
    },
    {
      id: 3,
      animalType: "Bird",
      location: "Delhi NCR",
      severity: "Medium",
      timeReported: "6 hours ago",
      status: "Pending",
      description: "Injured bird found in park. Unable to fly."
    },
    {
      id: 4,
      animalType: "Dog",
      location: "Noida, Sector 50",
      severity: "Low",
      timeReported: "1 day ago",
      status: "Resolved",
      description: "Stray dog with minor injury. Treated and released."
    },
    {
      id: 5,
      animalType: "Cat",
      location: "Noida, Sector 21",
      severity: "Critical",
      timeReported: "30 minutes ago",
      status: "Pending",
      description: "Cat stuck in drain. Urgent rescue needed."
    }
  ]);

  const handleAccept = (id) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: "Accepted" } : req
    ));
  };

  const handleResolve = (id) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: "Resolved" } : req
    ));
  };

  const getSeverityClass = (severity) => {
    const severityMap = {
      "Critical": "severity-critical",
      "High": "severity-high",
      "Medium": "severity-medium",
      "Low": "severity-low"
    };
    return severityMap[severity] || "";
  };

  const getStatusClass = (status) => {
    const statusMap = {
      "Pending": "status-pending",
      "Accepted": "status-accepted",
      "Resolved": "status-resolved"
    };
    return statusMap[status] || "";
  };

  return (
    <div className="ngo-dashboard-page">
      <button className="back-home-btn" onClick={() => navigate("/")}>
        ← Back to Home
      </button>
      <header className="dashboard-header">
        <h1 className="dashboard-title">NGO Dashboard</h1>
        <p className="dashboard-subtitle">
          Manage and respond to rescue requests
        </p>
      </header>

      <section className="dashboard-content">
        <div className="dashboard-container">
          <div className="requests-header">
            <h2 className="requests-title">Rescue Requests</h2>
            <div className="requests-stats">
              <span className="stat-item">
                Pending: <strong>{requests.filter(r => r.status === "Pending").length}</strong>
              </span>
              <span className="stat-item">
                Accepted: <strong>{requests.filter(r => r.status === "Accepted").length}</strong>
              </span>
              <span className="stat-item">
                Resolved: <strong>{requests.filter(r => r.status === "Resolved").length}</strong>
              </span>
            </div>
          </div>

          <div className="requests-list">
            {requests.map((request) => (
              <div key={request.id} className="request-card">
                <div className="request-header">
                  <div className="request-info">
                    <h3 className="request-animal-type">{request.animalType}</h3>
                    <p className="request-location">📍 {request.location}</p>
                  </div>
                  <div className="request-badges">
                    <span className={`severity-badge ${getSeverityClass(request.severity)}`}>
                      {request.severity}
                    </span>
                    <span className={`status-badge ${getStatusClass(request.status)}`}>
                      {request.status}
                    </span>
                  </div>
                </div>

                <p className="request-description">{request.description}</p>
                <p className="request-time">⏰ Reported {request.timeReported}</p>

                <div className="request-actions">
                  {request.status === "Pending" && (
                    <button
                      className="action-btn accept-btn"
                      onClick={() => handleAccept(request.id)}
                    >
                      Accept
                    </button>
                  )}
                  {request.status === "Accepted" && (
                    <button
                      className="action-btn resolve-btn"
                      onClick={() => handleResolve(request.id)}
                    >
                      Resolve
                    </button>
                  )}
                  {request.status === "Resolved" && (
                    <span className="resolved-text">✓ Resolved</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
