import React, { useEffect, useState } from 'react';
import { testFirebaseConnection } from '../../utils/reviewSystem';
import './styles/firebaseStatus.css';

const FirebaseStatus = () => {
	const [status, setStatus] = useState('testing');
	const [visible, setVisible] = useState(true);

	useEffect(() => {
		checkConnection();
		
		// Hide after 5 seconds
		const timer = setTimeout(() => {
			setVisible(false);
		}, 5000);

		return () => clearTimeout(timer);
	}, []);

	const checkConnection = async () => {
		const isConnected = await testFirebaseConnection();
		setStatus(isConnected ? 'connected' : 'disconnected');
	};

	if (!visible) return null;

	return (
		<div className={`firebase-status firebase-status-${status}`}>
			<div className="firebase-status-content">
				{status === 'testing' && (
					<>
						<div className="firebase-spinner"></div>
						<span>Testing Firebase connection...</span>
					</>
				)}
				{status === 'connected' && (
					<>
						<span className="firebase-icon">✅</span>
						<span>Firebase Connected</span>
					</>
				)}
				{status === 'disconnected' && (
					<>
						<span className="firebase-icon">⚠️</span>
						<span>Using localStorage mode</span>
					</>
				)}
			</div>
		</div>
	);
};

export default FirebaseStatus;