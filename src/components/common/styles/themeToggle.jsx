// src/components/common/themeToggle.jsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import "./styles/themeToggle.css";

const ThemeToggle = ({ isDark, toggleTheme }) => {
	return (
		<div className="theme-toggle" onClick={toggleTheme}>
			<FontAwesomeIcon 
				icon={isDark ? faSun : faMoon} 
				className="theme-icon"
			/>
		</div>
	);
};

export default ThemeToggle;