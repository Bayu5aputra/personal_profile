import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
    faGithub,
    faLinkedin,
    faInstagram,
} from "@fortawesome/free-brands-svg-icons";

import INFO from "../../data/user";

import "./styles/socials.css";

const Socials = () => {
    return (
        <div className="socials">
            <div className="social">
                <a href={INFO.socials.github} target="_blank" rel="noreferrer">
                    <div className="social-icon">
                        <FontAwesomeIcon icon={faGithub} />
                    </div>
                    <div className="social-text">GitHub</div>
                </a>
            </div>

            <div className="social">
                <a href={INFO.socials.linkedin} target="_blank" rel="noreferrer">
                    <div className="social-icon">
                        <FontAwesomeIcon icon={faLinkedin} />
                    </div>
                    <div className="social-text">LinkedIn</div>
                </a>
            </div>

            <div className="social">
                <a href={INFO.socials.instagram} target="_blank" rel="noreferrer">
                    <div className="social-icon">
                        <FontAwesomeIcon icon={faInstagram} />
                    </div>
                    <div className="social-text">Instagram</div>
                </a>
            </div>

            <div className="email">
                <div className="email-wrapper">
                    <a href={`mailto:${INFO.main.email}`} target="_blank" rel="noreferrer">
                        <div className="social-icon">
                            <FontAwesomeIcon icon={faEnvelope} />
                        </div>
                        <div className="social-text">Email</div>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Socials;