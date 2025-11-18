import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import NavBar from "../components/common/navBar";
import Logo from "../components/common/logo";

import INFO from "../data/user";

import "./styles/404.css";

const Notfound = () => {
	useEffect(() => {
		document.title = `404 - Page Not Found | ${INFO.main.title}`;
	}, []);

	return (
		<React.Fragment>
			<div className="not-found page-content">
				<NavBar />
				<div className="content-wrapper">
					<div className="notfound-logo-container">
						<div className="projects-logo">
							<Logo width={46} />
						</div>
					</div>
					
					<div className="notfound-container">
						<div className="notfound-background-text">404</div>
						
						<div className="notfound-content">
							<div className="notfound-glitch-wrapper">
								<div className="notfound-glitch" data-text="404">404</div>
							</div>
							
							<h1 className="notfound-title">Page Not Found</h1>
							
							<p className="notfound-description">
								Oops! The page you're looking for seems to have wandered off into the digital void.
								<br />
								Don't worry, even the best networks have their dead ends.
							</p>
							
							<div className="notfound-url">
								<span className="notfound-url-label">Requested URL:</span>
								<code className="notfound-url-text">{window.location.pathname}</code>
							</div>
							
							<div className="notfound-actions">
								<Link to="/" className="notfound-button notfound-button-primary">
									<FontAwesomeIcon icon={faHome} />
									<span>Back to Home</span>
								</Link>
								
								<button 
									onClick={() => window.history.back()} 
									className="notfound-button notfound-button-secondary"
								>
									<FontAwesomeIcon icon={faArrowLeft} />
									<span>Go Back</span>
								</button>
							</div>
							
							<div className="notfound-suggestions">
								<p className="notfound-suggestions-title">Quick Links:</p>
								<div className="notfound-links">
									<Link to="/about" className="notfound-link">About</Link>
									<Link to="/projects" className="notfound-link">Projects</Link>
									<Link to="/articles" className="notfound-link">Articles</Link>
									<Link to="/contact" className="notfound-link">Contact</Link>
								</div>
							</div>
						</div>
						
						{/* Animated background elements */}
						<div className="notfound-particles">
							<div className="notfound-particle"></div>
							<div className="notfound-particle"></div>
							<div className="notfound-particle"></div>
							<div className="notfound-particle"></div>
							<div className="notfound-particle"></div>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Notfound;