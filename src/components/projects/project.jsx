import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import "./styles/project.css";

const Project = (props) => {
	const { logo, title, description, linkText, link } = props;

	return (
		<div className="project-card">
			<div className="project-icon">
				<img src={logo} alt={`${title} logo`} />
			</div>
			
			<div className="project-title">{title}</div>
			
			<div className="project-description">{description}</div>
			
			{link && (
				<Link to={link} className="project-link">
					<FontAwesomeIcon icon={faLink} />
					<span>{linkText || "View Project"}</span>
				</Link>
			)}
		</div>
	);
};

export default Project;