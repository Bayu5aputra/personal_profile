import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import NavBar from "../components/common/navBar";
import Footer from "../components/common/footer";
import Logo from "../components/common/logo";
import AllProjects from "../components/projects/allProjects";
import INFO from "../data/user";
import { getAllProjects } from "../utils/contentManagement";

import "./styles/projects.css";

const Projects = () => {
	const [projects, setProjects] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		document.title = `Projects | ${INFO.main.title}`;
		loadProjects();
	}, []);

	const loadProjects = async () => {
		setIsLoading(true);
		const projectsData = await getAllProjects();
		
		// Transform data for component
		const transformedProjects = projectsData.map((project) => ({
			logo: project.logo || "/default-project-icon.png",
			title: project.title,
			description: project.description,
			linkText: "View Project",
			link: project.link || `/project/${project.id}`,
		}));
		
		setProjects(transformedProjects);
		setIsLoading(false);
	};

	return (
		<React.Fragment>
			<Helmet>
				<title>{`Projects | ${INFO.main.title}`}</title>
				<meta name="description" content={INFO.projects.description} />
			</Helmet>

			<div className="page-content">
				<NavBar active="projects" />
				<div className="content-wrapper">
					<div className="projects-logo-container">
						<div className="projects-logo">
							<Logo width={46} />
						</div>
					</div>

					<div className="projects-container">
						<div className="projects-header">
							<div className="title projects-title">
								{INFO.projects.title}
							</div>
							<div className="subtitle projects-subtitle">
								{INFO.projects.description}
							</div>
						</div>

						{isLoading ? (
							<div className="projects-loading">
								<p>Loading projects...</p>
							</div>
						) : (
							<div className="projects-content">
								<AllProjects projects={projects} />
							</div>
						)}
					</div>

					<div className="page-footer">
						<Footer />
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Projects;