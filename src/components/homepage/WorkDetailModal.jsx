import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faMapMarkerAlt, faBriefcase, faCalendar, faCheckCircle, faMicrochip } from "@fortawesome/free-solid-svg-icons";
import "./styles/workDetailModal.css";

const WorkDetailModal = ({ work, onClose }) => {
	useEffect(() => {
		// Prevent body scroll when modal is open
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = "unset";
		};
	}, []);

	const handleBackdropClick = (e) => {
		// FIX: Check if click is on backdrop using classList
		if (e.target.classList && e.target.classList.contains('modal-backdrop')) {
			onClose();
		}
	};

	return (
		<div className="modal-backdrop" onClick={handleBackdropClick}>
			<div className="modal-container">
				<div className="modal-content">
					{/* Close Button */}
					<button className="modal-close" onClick={onClose}>
						<FontAwesomeIcon icon={faTimes} />
					</button>

					{/* Header Section */}
					<div className="modal-header">
						<div className="modal-header-left">
							<div className="modal-company-logo">
								<img src={work.logo} alt={work.company} />
							</div>
							<div className="modal-header-info">
								<h2 className="modal-company-name">{work.company}</h2>
								<div className="modal-position">
									<FontAwesomeIcon icon={faBriefcase} />
									<span>{work.position}</span>
								</div>
								<div className="modal-meta">
									<div className="modal-meta-item">
										<FontAwesomeIcon icon={faCalendar} />
										<span>{work.duration}</span>
									</div>
									<div className="modal-meta-item">
										<FontAwesomeIcon icon={faMapMarkerAlt} />
										<span>{work.location}</span>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Content Sections */}
					<div className="modal-body">
						{/* Responsibilities */}
						<div className="modal-section">
							<h3 className="modal-section-title">
								<span className="section-icon">📋</span>
								Core Responsibilities
							</h3>
							<ul className="modal-list">
								{work.responsibilities.map((resp, index) => (
									<li key={index} className="modal-list-item">
										<FontAwesomeIcon icon={faCheckCircle} className="list-icon" />
										<span>{resp}</span>
									</li>
								))}
							</ul>
						</div>

						{/* Technologies */}
						<div className="modal-section">
							<h3 className="modal-section-title">
								<span className="section-icon">🛠️</span>
								Technologies & Tools
							</h3>
							<div className="modal-tech-tags">
								{work.technologies.map((tech, index) => (
									<span key={index} className="tech-tag">
										<FontAwesomeIcon icon={faMicrochip} />
										{tech}
									</span>
								))}
							</div>
						</div>

						{/* Achievements */}
						<div className="modal-section">
							<h3 className="modal-section-title">
								<span className="section-icon">🏆</span>
								Key Achievements
							</h3>
							<div className="modal-achievements">
								{work.achievements.map((achievement, index) => (
									<div key={index} className="achievement-card">
										<div className="achievement-icon">✨</div>
										<p>{achievement}</p>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default WorkDetailModal;