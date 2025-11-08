import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
    faGithub,
    faLinkedin,
    faInstagram,
} from "@fortawesome/free-brands-svg-icons";

import NavBar from "../components/common/navBar";
import Footer from "../components/common/footer";
import Logo from "../components/common/logo";

import INFO from "../data/user";
import SEO from "../data/seo";

import "./styles/contact.css";

const Contact = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const currentSEO = SEO.find((item) => item.page === "contact");

    return (
        <React.Fragment>
            <Helmet>
                <title>{`Contact | ${INFO.main.title}`}</title>
                <meta name="description" content={currentSEO.description} />
                <meta name="keywords" content={currentSEO.keywords.join(", ")} />
            </Helmet>

            <div className="page-content">
                <NavBar active="contact" />
                <div className="content-wrapper">
                    <div className="contact-logo-container">
                        <div className="contact-logo">
                            <Logo width={46} />
                        </div>
                    </div>

                    <div className="contact-container">
                        <div className="title contact-title">
                            Let's Get in Touch: Ways to Connect with Me
                        </div>

                        <div className="subtitle contact-subtitle">
                            Thank you for your interest in getting in touch with
                            me. I welcome your feedback, questions, and
                            suggestions. If you have a specific question or
                            comment, please feel free to email me directly at
                            &nbsp;{" "}
                            <a href={`mailto:${INFO.main.email}`}>
                                {INFO.main.email}
                            </a>
                            . I make an effort to respond to all messages within
                            24 hours, although it may take me longer during busy
                            periods. Alternatively, you can connect with me on
                            social media through the platforms below.
                        </div>
                    </div>

                    <div className="contact-socials-container">
                        <div className="contact-socials-horizontal">
                            <div className="contact-social-card" data-social="github">
                                <a href={INFO.socials.github} target="_blank" rel="noreferrer">
                                    <div className="contact-social-card-inner">
                                        <div className="contact-social-icon">
                                            <FontAwesomeIcon icon={faGithub} />
                                        </div>
                                        <div className="contact-social-text">GitHub</div>
                                        <div className="contact-social-glow"></div>
                                    </div>
                                </a>
                            </div>

                            <div className="contact-social-card" data-social="linkedin">
                                <a href={INFO.socials.linkedin} target="_blank" rel="noreferrer">
                                    <div className="contact-social-card-inner">
                                        <div className="contact-social-icon">
                                            <FontAwesomeIcon icon={faLinkedin} />
                                        </div>
                                        <div className="contact-social-text">LinkedIn</div>
                                        <div className="contact-social-glow"></div>
                                    </div>
                                </a>
                            </div>

                            <div className="contact-social-card" data-social="instagram">
                                <a href={INFO.socials.instagram} target="_blank" rel="noreferrer">
                                    <div className="contact-social-card-inner">
                                        <div className="contact-social-icon">
                                            <FontAwesomeIcon icon={faInstagram} />
                                        </div>
                                        <div className="contact-social-text">Instagram</div>
                                        <div className="contact-social-glow"></div>
                                    </div>
                                </a>
                            </div>
                        </div>

                        <div className="contact-email-special">
                            <div className="contact-email-card">
                                <a href={`mailto:${INFO.main.email}`} target="_blank" rel="noreferrer">
                                    <div className="contact-email-card-inner">
                                        <div className="contact-email-icon-wrapper">
                                            <FontAwesomeIcon icon={faEnvelope} className="contact-email-icon" />
                                            <div className="contact-email-pulse"></div>
                                        </div>
                                        <div className="contact-email-content">
                                            <div className="contact-email-label">Send me an email</div>
                                            <div className="contact-email-address">{INFO.main.email}</div>
                                        </div>
                                        <div className="contact-email-arrow">→</div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="page-footer">
                        <Footer />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Contact;