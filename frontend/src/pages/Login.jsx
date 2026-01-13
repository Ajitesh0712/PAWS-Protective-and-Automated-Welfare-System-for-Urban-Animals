import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [userType, setUserType] = useState("user"); // "user" or "ngo"
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    organizationName: "" // Only for NGO
  });
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError("");
  };

  const validateForm = () => {
    if (!formData.email.trim()) {
      setError("Please enter your email address");
      return false;
    }
    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address");
      return false;
    }
    if (!formData.password.trim()) {
      setError("Please enter your password");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    if (!isLogin && userType === "ngo" && !formData.organizationName.trim()) {
      setError("Please enter your organization name");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      // TODO: Replace with actual API call
      // const endpoint = isLogin ? "/login" : "/signup";
      // const response = await API.post(endpoint, {
      //   ...formData,
      //   userType
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // On success, redirect to dashboard or home
      alert(`✅ ${isLogin ? "Login" : "Registration"} successful! Welcome ${userType === "ngo" ? formData.organizationName || "NGO" : "User"}!`);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || `Failed to ${isLogin ? "login" : "register"}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <button className="back-home-btn" onClick={() => navigate("/")}>
          ← Back to Home
        </button>
        <div className="login-header">
          <h1 className="brand">🐾 PAWS</h1>
          <p className="login-subtitle">
            {isLogin ? "Welcome back!" : "Join our mission to help animals"}
          </p>
        </div>

        <div className="user-type-toggle">
          <button
            className={`toggle-btn ${userType === "user" ? "active" : ""}`}
            onClick={() => {
              setUserType("user");
              setError("");
            }}
          >
            👤 User
          </button>
          <button
            className={`toggle-btn ${userType === "ngo" ? "active" : ""}`}
            onClick={() => {
              setUserType("ngo");
              setError("");
            }}
          >
            🏢 NGO Organization
          </button>
        </div>

        <div className="login-card">
          <div className="auth-toggle">
            <button
              className={`auth-btn ${isLogin ? "active" : ""}`}
              onClick={() => {
                setIsLogin(true);
                setError("");
              }}
            >
              Login
            </button>
            <button
              className={`auth-btn ${!isLogin ? "active" : ""}`}
              onClick={() => {
                setIsLogin(false);
                setError("");
              }}
            >
              Sign Up
            </button>
          </div>

          {error && (
            <div className="alert alert-error">
              <span>⚠️</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            {!isLogin && userType === "ngo" && (
              <div className="form-group">
                <label className="form-label">
                  Organization Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="organizationName"
                  value={formData.organizationName}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter your organization name"
                />
              </div>
            )}

            <div className="form-group">
              <label className="form-label">
                Email Address <span className="required">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-input"
                placeholder="your.email@example.com"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Password <span className="required">*</span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter your password"
              />
            </div>

            {isLogin && (
              <div className="form-options">
                <label className="checkbox-label">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>
                <a href="#" className="forgot-link">Forgot password?</a>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="submit-btn"
            >
              {loading ? "Processing..." : isLogin ? "Login" : "Create Account"}
            </button>
          </form>

          {isLogin && (
            <div className="login-footer">
              <p>
                Don't have an account?{" "}
                <button
                  className="link-btn"
                  onClick={() => setIsLogin(false)}
                >
                  Sign up here
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
