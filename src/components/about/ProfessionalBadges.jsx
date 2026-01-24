import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAward } from "@fortawesome/free-solid-svg-icons";
import "./styles/professionalBadges.css";

const ProfessionalBadges = () => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const certifications = [
		{
			id: 1,
			name: "MTCNA",
			fullName: "MikroTik Certified Network Associate",
			issuer: "MikroTik",
			color: "#293239",
			icon: "/certifications/mikrotik_academy_logo.png"
		},
		{
			id: 2,
			name: "BNSP Network",
			fullName: "Network and Infrastructure",
			issuer: "BNSP",
			color: "#C41E3A",
			icon: "/certifications/bnsp_logo.png"
		},
		{
			id: 3,
			name: "CCNA ITN",
			fullName: "Introduction to Networks",
			issuer: "Cisco",
			color: "#1BA0D7",
			icon: "/certifications/CCNAITN__1_.png"
		},
		{
			id: 4,
			name: "CCNA SRWE",
			fullName: "Switching, Routing & Wireless",
			issuer: "Cisco",
			color: "#049FD9",
			icon: "/certifications/CCNASRWE__1_.png"
		},
		{
			id: 5,
			name: "Java Programming",
			fullName: "Java Programming",
			issuer: "Oracle",
			color: "#F80000",
			icon: "/certifications/oracle_logo.jpg"
		},
		{
			id: 6,
			name: "IT Essentials",
			fullName: "IT Essentials",
			issuer: "Cisco",
			color: "#1BA0D7",
			icon: "/certifications/ITE.png"
		}
	];

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex((prevIndex) => 
				(prevIndex + 1) % certifications.length
			);
		}, 3000); // Switch every 3 seconds

		return () => clearInterval(interval);
	}, [certifications.length]);

	const currentCert = certifications[currentIndex];

	return (
		<div className="professional-badges-container">
			<div className="badges-header">
				<FontAwesomeIcon icon={faAward} className="badges-icon" />
				<span className="badges-title">Professional Certifications</span>
			</div>
			
			<div 
				className="badge-display"
				style={{ "--badge-color": currentCert.color }}
			>
				<div className="badge-content">
					<div className="badge-logo-wrapper">
						<img 
							src={currentCert.icon} 
							alt={currentCert.name}
							className="badge-logo"
							onError={(e) => {
								e.target.style.display = 'none';
							}}
						/>
					</div>
					
					<div className="badge-info">
						<div className="badge-name">{currentCert.name}</div>
						<div className="badge-issuer">{currentCert.issuer}</div>
					</div>
				</div>
				
				<div className="badge-progress">
					{certifications.map((_, index) => (
						<div 
							key={index}
							className={`progress-dot ${index === currentIndex ? 'active' : ''}`}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default ProfessionalBadges;