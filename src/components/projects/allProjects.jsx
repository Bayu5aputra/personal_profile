import React, { useState, useEffect } from "react";
import Project from "./project";
import { getAllProjects } from "../../utils/contentManagement";
import INFO from "../../data/user";
import "./styles/allProjects.css";

const AllProjects = () => {
	const [projects, setProjects] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [useFirebase, setUseFirebase] = useState(true);

	useEffect(() => {
		loadProjects();
	}, []);

	const loadProjects = async () => {
		setIsLoading(true);
		
		try {
			// Try to load from Firebase first
			const firebaseProjects = await getAllProjects();
			
			if (firebaseProjects.length > 0) {
				setProjects(firebaseProjects);
				setUseFirebase(true);
			} else {
				// Fallback to local data if Firebase is empty
				setProjects(INFO.projects);
				setUseFirebase(false);
			}
		} catch (error) {
			console.error("Failed to load projects from Firebase, using local data:", error);
			setProjects(INFO.projects);
			setUseFirebase(false);
		}
		
		setIsLoading(false);
	};

	if (isLoading) {
		return (
			<div className="all-projects-container">
				<div className="projects-loading">
					<p>Loading projects...</p>
				</div>
			</div>
		);
	}

	if (projects.length === 0) {
		return (
			<div className="all-projects-container">
				<div className="projects-empty">
					<p>No projects available yet.</p>
				</div>
			</div>
		);
	}

	return (
		<div className="all-projects-container">
			{projects.map((project, index) => (
				<div className="all-projects-project" key={project.id || index}>
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