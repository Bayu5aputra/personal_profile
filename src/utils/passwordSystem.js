// Password System for Key Data Management
const KEYDATA_PASSWORD = "Password.123";
const SESSION_KEY = "keydata_session";
const SESSION_DURATION = 30 * 60 * 1000; // 30 minutes in milliseconds

// Check if user is authenticated
export const isAuthenticated = () => {
	const session = localStorage.getItem(SESSION_KEY);
	if (!session) return false;
	
	const sessionData = JSON.parse(session);
	const now = new Date().getTime();
	
	// Check if session is still valid
	if (now - sessionData.timestamp > SESSION_DURATION) {
		logout();
		return false;
	}
	
	return sessionData.authenticated === true;
};

// Login function
export const login = (password) => {
	if (password === KEYDATA_PASSWORD) {
		const sessionData = {
			authenticated: true,
			timestamp: new Date().getTime()
		};
		localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
		return { success: true, message: "Login successful" };
	}
	return { success: false, message: "Incorrect password" };
};

// Logout function
export const logout = () => {
	localStorage.removeItem(SESSION_KEY);
};

// Extend session (call this on user activity)
export const extendSession = () => {
	if (isAuthenticated()) {
		const sessionData = {
			authenticated: true,
			timestamp: new Date().getTime()
		};
		localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
	}
};