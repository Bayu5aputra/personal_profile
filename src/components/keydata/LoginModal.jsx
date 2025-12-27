import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./styles/loginModal.css";

const LoginModal = ({ onLogin }) => {
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		const result = onLogin(password);
		
		if (!result.success) {
			setError(result.message);
			setTimeout(() => setError(""), 3000);
		}
		
		setPassword("");
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
						Please enter the password to continue
					</p>
					
					<form onSubmit={handleSubmit} className="login-modal-form">
						<div className="password-input-wrapper">
							<input
								type={showPassword ? "text" : "password"}
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder="Enter password"
								className="password-input"
								autoFocus
							/>
							<button
								type="button"
								className="password-toggle"
								onClick={() => setShowPassword(!showPassword)}
							>
								<FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
							</button>
						</div>
						
						{error && (
							<div className="login-error-message">
								{error}
							</div>
						)}
						
						<button type="submit" className="login-submit-button">
							Login
						</button>
					</form>
					
					<div className="login-modal-hint">
						<small>Hint: Default password is "Default Password"</small>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginModal;