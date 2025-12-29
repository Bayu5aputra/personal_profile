import React from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../../utils/authSystem";

import "./styles/navBar.css";

const NavBar = (props) => {
	const { active } = props;
	const authState = getCurrentUser();

	return (
		<React.Fragment>
			<div className="nav-container">
				<nav className="navbar">
					<div className="nav-background">
						<ul className="nav-list">
							<li
								className={
									active === "home"
										? "nav-item active"
										: "nav-item"
								}
							>
								<Link to="/">Home</Link>
							</li>
							<li
								className={
									active === "about"
										? "nav-item active"
										: "nav-item"
								}
							>
								<Link to="/about">About</Link>
							</li>
							<li
								className={
									active === "projects"
										? "nav-item active"
										: "nav-item"
								}
							>
								<Link to="/projects">Projects</Link>
							</li>
							<li
								className={
									active === "articles"
										? "nav-item active"
										: "nav-item"
								}
							>
								<Link to="/articles">Articles</Link>
							</li>
							<li
								className={
									active === "contact"
										? "nav-item active"
										: "nav-item"
								}
							>
								<Link to="/contact">Contact</Link>
							</li>
							
							{/* CMS Link - Only for authenticated users */}
							{authState.authenticated && (
								<li
									className={
										active === "cms"
											? "nav-item active cms-item"
											: "nav-item cms-item"
									}
								>
									<Link to="/cms">CMS</Link>
								</li>
							)}
						</ul>
					</div>
				</nav>
			</div>
		</React.Fragment>
	);
};

export default NavBar;