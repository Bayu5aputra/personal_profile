import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faExclamationTriangle, faSync, faRocket } from "@fortawesome/free-solid-svg-icons";
import Project from "./project";
import { getAllProjects } from "../../utils/contentManagement";

import "./styles/allProjects.css";

const AllProjects = () => {
	const [projects, setProjects] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		loadProjects();
	}, []);

	const loadProjects = async () => {
		setIsLoading(true);
		setError(null);
		
		try {
			const firebaseProjects = await getAllProjects();
			
			if (firebaseProjects.length > 0) {
				setProjects(firebaseProjects);
			} else {
				// Tidak set error, biarkan projects kosong untuk menampilkan empty state
				setProjects([]);
			}
		} catch (error) {
			console.error("Failed to load projects:", error);
			setError("Failed to load projects from server. Please try refreshing the page.");
		}
		
		setIsLoading(false);
	};

	const handleRefresh = () => {
		loadProjects();
	};

	// Loading state
	if (isLoading) {
		return (
			<div className="projects-container">
				<div className="projects-loading">
					<FontAwesomeIcon icon={faSpinner} spin size="2x" />
					<p>Loading projects...</p>
				</div>
			</div>
		);
	}

	// Error state (only for actual errors, not empty data)
	if (error) {
		return (
			<div className="projects-container">
				<div className="projects-error">
					<FontAwesomeIcon icon={faExclamationTriangle} size="3x" />
					<p>{error}</p>
					<button className="retry-button" onClick={handleRefresh}>
						<FontAwesomeIcon icon={faSync} />
						<span>Refresh</span>
					</button>
				</div>
			</div>
		);
	}

	// Empty state (no projects available - this is NOT an error)
	if (projects.length === 0) {
		return (
			<div className="projects-container">
				<div className="projects-empty">
					<div className="empty-icon">
						<FontAwesomeIcon icon={faRocket} size="3x" />
					</div>
					<h3>No Projects Yet</h3>
					<p>Projects will appear here once they are added through the CMS.</p>
					<button className="retry-button-secondary" onClick={handleRefresh}>
						<FontAwesomeIcon icon={faSync} />
						<span>Check Again</span>
					</button>
				</div>
			</div>
		);
	}

	// Success state with projects
	return (
		<div className="projects-container">
			{projects.map((project) => (
				<div className="projects-project" key={project.id}>
					<Project
						logo={project.logo}
						title={project.title}
						description={project.description}
						linkText={project.linkText}
						link={project.link}
					/>
				</div>
			))}
		</div>
	);
};

export default AllProjects;