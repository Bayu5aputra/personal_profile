import React from "react";
import Project from "./project";
import "./styles/allProjects.css";

const AllProjects = ({ projects }) => {
	return (
		<div className="all-projects-container">
			{projects && projects.length > 0 ? (
				projects.map((project, index) => (
					<div className="project-wrapper" key={index}>
						<Project
							logo={project.logo}
							title={project.title}
							description={project.description}
							linkText={project.linkText}
							link={project.link}
						/>
					</div>
				))
			) : (
				<div className="no-projects">
					<p>No projects available yet.</p>
				</div>
			)}
		</div>
	);
};

export default AllProjects;