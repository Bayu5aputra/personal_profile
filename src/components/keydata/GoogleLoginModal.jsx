import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import "./styles/googleLoginModal.css";

const GoogleLoginModal = ({ onLogin }) => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError("");
    
    const result = await onLogin();
    
    if (!result.success) {
      setError(result.message);
      setTimeout(() => setError(""), 5000);
    }
    
    setIsLoading(false);
  };

  return (
    <div className="login-modal-backdrop">
      <div className="login-modal-container">
        <div className="login-modal-content">
          <div className="login-modal-icon">
            <FontAwesomeIcon icon={faLock} />
          </div>
          
          <h2 className="login-modal-title">Access Key Data Management</h2>
          <p className="login-modal-subtitle">
            Sign in with your authorized Google account
          </p>
          
          {error && (
            <div className="login-error-message">
              {error}
            </div>
          )}
          
          <button
            className="google-login-button"
            onClick={handleGoogleLogin}
            disabled={isLoading}
          >
            <FontAwesomeIcon icon={faGoogle} />
            <span>{isLoading ? 'Signing in...' : 'Sign in with Google'}</span>
          </button>
          
          <div className="login-modal-hint">
            <small>Only authorized emails can access this system</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleLoginModal;