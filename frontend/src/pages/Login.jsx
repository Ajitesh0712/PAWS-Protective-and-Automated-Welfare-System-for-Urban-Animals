import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [userType, setUserType] = useState("user"); // "user" or "ngo"
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    organizationName: "", // Only for NGO
    individualName: "" // Only for User
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
    if (!isLogin && userType === "user" && !formData.individualName.trim()) {
      setError("Please enter your name");
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
      // Map frontend userType to backend role
      const role = userType === "ngo" ? "partner" : "citizen";
      
      // Get name from form (organizationName for NGO, individualName for User)
      const name = userType === "ngo" ? formData.organizationName : formData.individualName;
      
      // Create FormData for the request
      const formDataToSend = new FormData();
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("role", role);
      if (name && name.trim()) {
        formDataToSend.append("name", name.trim());
      }

      const endpoint = isLogin ? "/auth/login" : "/auth/register";
      let response;
      
      try {
        response = await fetch(`http://127.0.0.1:8000${endpoint}`, {
          method: "POST",
          body: formDataToSend
        });
      } catch (networkError) {
        // Handle network errors (Failed to fetch)
        console.error("Network error:", networkError);
        throw new Error("Cannot connect to server. Please ensure the backend is running at http://127.0.0.1:8000");
      }

      if (!response.ok) {
        let errorMessage = `Failed to ${isLogin ? "login" : "register"}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.detail || errorData.message || errorMessage;
        } catch (parseError) {
          // If response is not JSON, try to get text
          const textError = await response.text().catch(() => "");
          errorMessage = textError || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      
      let userRole = role;
      
      // Store authentication info in localStorage
      if (isLogin && data.success) {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userRole", data.role);
        localStorage.setItem("userId", data.id.toString());
        localStorage.setItem("userEmail", formData.email);
        userRole = data.role;
      } else if (!isLogin && data.success) {
        // After registration, automatically log in
        const loginFormData = new FormData();
        loginFormData.append("email", formData.email);
        loginFormData.append("password", formData.password);
        loginFormData.append("role", role);
        
        const loginResponse = await fetch("http://127.0.0.1:8000/auth/login", {
          method: "POST",
          body: loginFormData
        });
        
        if (loginResponse.ok) {
          const loginData = await loginResponse.json();
          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem("userRole", loginData.role);
          localStorage.setItem("userId", loginData.id.toString());
          localStorage.setItem("userEmail", formData.email);
          userRole = loginData.role;
        }
      }
      
      // Role-based redirection
      const welcomeName = userType === "ngo" ? formData.organizationName || "NGO" : formData.individualName || "User";
      alert(`✅ ${isLogin ? "Login" : "Registration"} successful! Welcome ${welcomeName}!`);
      
      if (userRole === "partner") {
        navigate("/ngo-dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error("Authentication error:", err);
      setError(err.message || `Failed to ${isLogin ? "login" : "register"}. Please try again.`);
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
          <div className="brand-header">
            <img src="/icon.png" alt="PAWS Logo" className="logo-icon" />
            <h1 className="brand">PAWS</h1>
          </div>
          <p className="login-subtitle">
            {isLogin 
              ? (userType === "user" ? "Welcome back!" : "Welcome back, Partner!") 
              : (userType === "user" ? "Join our mission to help animals" : "Partner with us to save lives")
            }
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

            {!isLogin && userType === "user" && (
              <div className="form-group">
                <label className="form-label">
                  Your Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="individualName"
                  value={formData.individualName}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter your full name"
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
