import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import NavBar from "../components/common/navBar";
import Footer from "../components/common/footer";
import Logo from "../components/common/logo";
import AllProjects from "../components/projects/allProjects";
import AllSellProducts from "../components/projects/allSellProducts";
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
				<meta name="description" content="Explore my portfolio of projects showcasing expertise in IT infrastructure, IoT systems, and full-stack development." />
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
						{/* HEADER SECTION */}
						<div className="projects-header">
							<div className="title projects-title">
								Things I've made trying to put my dent in the universe.
							</div>
							<div className="subtitle projects-subtitle">
								I've worked on a variety of projects over the years and I'm proud of the progress I've made. Many of these projects are open-source and available for others to explore and contribute to. If you're interested in any of the projects I've worked on, please feel free to check out the code and suggest any improvements or enhancements you might have in mind. Collaborating with others is a great way to learn and grow, and I'm always open to new ideas and feedback.
							</div>
						</div>

						{/* PROJECTS SECTION */}
						{isLoading ? (
							<div className="projects-loading">
								<p>Loading projects...</p>
							</div>
						) : (
							<div className="projects-content">
								<AllProjects projects={projects} />
							</div>
						)}

						{/* SELLS PRODUCTS SECTION */}
						<AllSellProducts />
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