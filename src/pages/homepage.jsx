import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

import { faMailBulk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faStackOverflow,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

import Logo from "../components/common/logo";
import Footer from "../components/common/footer";
import NavBar from "../components/common/navBar";
import Article from "../components/homepage/article";
import Works from "../components/homepage/works";
import AllProjects from "../components/projects/allProjects";
import TechStackCarousel from "../components/homepage/TechStackCarousel";

import INFO from "../data/user";
import SEO from "../data/seo";
import { getAllArticles, getAllProjects } from "../utils/contentManagement";

import "./styles/homepage.css";

const Homepage = () => {
  const [stayLogo, setStayLogo] = useState(false);
  const [logoSize, setLogoSize] = useState(80);
  const [oldLogoSize, setOldLogoSize] = useState(80);
  const [latestArticles, setLatestArticles] = useState([]);
  const [projects, setProjects] = useState([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    loadLatestArticles();
    loadProjects();
  }, []);

  const loadLatestArticles = async () => {
    try {
      const articles = await getAllArticles();
      setLatestArticles(articles.slice(0, 2));
    } catch (error) {
      console.error("Failed to load articles:", error);
      setLatestArticles([]);
    }
  };

  const loadProjects = async () => {
    setIsLoadingProjects(true);
    try {
      const projectsData = await getAllProjects();
      console.log("📦 Loaded projects:", projectsData);

      // Transform data untuk AllProjects component
      const transformedProjects = projectsData.map((project) => ({
        logo: project.logo || "/default-project-icon.png",
        title: project.title,
        description: project.description,
        linkText: project.linkText || "View Project",
        link: project.link || `/project/${project.id}`,
      }));

      setProjects(transformedProjects);
    } catch (error) {
      console.error("Failed to load projects:", error);
      setProjects([]);
    } finally {
      setIsLoadingProjects(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      let scroll = Math.round(window.pageYOffset, 2);

      let newLogoSize = 80 - (scroll * 4) / 10;

      if (newLogoSize < oldLogoSize) {
        if (newLogoSize > 40) {
          setLogoSize(newLogoSize);
          setOldLogoSize(newLogoSize);
          setStayLogo(false);
        } else {
          setStayLogo(true);
        }
      } else {
        setLogoSize(newLogoSize);
        setStayLogo(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [logoSize, oldLogoSize]);

  const currentSEO = SEO.find((item) => item.page === "home");

  const logoStyle = {
    display: "flex",
    position: stayLogo ? "fixed" : "relative",
    top: stayLogo ? "3vh" : "auto",
    zIndex: 999,
    border: stayLogo ? "1px solid white" : "none",
    borderRadius: stayLogo ? "50%" : "none",
    boxShadow: stayLogo ? "0px 4px 10px rgba(0, 0, 0, 0.25)" : "none",
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>{INFO.main.title}</title>
        <meta name="description" content={currentSEO.description} />
        <meta
          name="keywords"
          content={currentSEO.keywords.join(", ")}
        />
      </Helmet>

      <div className="page-content">
        <NavBar active="home" />
        <div className="content-wrapper">
          <div className="homepage-logo-container">
            <div style={logoStyle}>
              <Logo width={logoSize} link={false} />
            </div>
          </div>

          <div className="homepage-container">
            <div className="homepage-first-area">
              <div className="homepage-first-area-left-side">
                <div className="title homepage-title">
                  {INFO.homepage.title}
                </div>

                <div className="subtitle homepage-subtitle">
                  {INFO.homepage.description}
                </div>
              </div>

              <div className="homepage-first-area-right-side">
                <div className="homepage-image-container">
                  <div className="homepage-image-wrapper">
                    <TechStackCarousel />
                  </div>
                </div>
              </div>
            </div>

            <div className="homepage-socials">
              <a
                href={INFO.socials.github}
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon
                  icon={faGithub}
                  className="homepage-social-icon"
                />
              </a>

              {INFO.socials.stackoverflow && (
                <a
                  href={INFO.socials.stackoverflow}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FontAwesomeIcon
                    icon={faStackOverflow}
                    className="homepage-social-icon"
                  />
                </a>
              )}

              {INFO.socials.instagram && (
                <a
                  href={INFO.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FontAwesomeIcon
                    icon={faInstagram}
                    className="homepage-social-icon"
                  />
                </a>
              )}

              <a
                href={`mailto:${INFO.main.email}`}
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon
                  icon={faMailBulk}
                  className="homepage-social-icon"
                />
              </a>
            </div>

            {/* <div className="homepage-projects">
              {isLoadingProjects ? (
                <div className="homepage-projects-loading">
                  <p>Loading projects...</p>
                </div>
              ) : projects.length === 0 ? (
                <div className="homepage-projects-empty">
                  <p>No projects available yet.</p>
                </div>
              ) : (
                <AllProjects projects={projects} />
              )}
            </div> */}

            <div className="homepage-projects">
              {isLoadingProjects ? (
                <div className="homepage-projects-loading">
                  <p>Loading projects...</p>
                </div>
              ) : projects.length === 0 ? (
                <div className="homepage-projects-empty">
                  <p>No projects available yet.</p>
                </div>
              ) : (
                <>
                  {/* Homepage Projects - Show only 3 */}
                  <AllProjects projects={projects.slice(0, 3)} />

                  {/* View More Projects Button */}
                  {projects.length > 3 && (
                    <div className="homepage-view-more-container">
                      <Link to="/projects" className="homepage-view-more-button">
                        View More Projects
                      </Link>
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="homepage-after-title">
              <div className="homepage-articles">
                {latestArticles.length > 0 ? (
                  <>
                    {latestArticles.map((article) => (
                      <div
                        className="homepage-article"
                        key={article.id}
                      >
                        <Article
                          date={article.date}
                          title={article.title}
                          description={article.description}
                          link={`/article/${article.slug}`}
                        />
                      </div>
                    ))}

                    <div className="homepage-view-more-container">
                      <Link to="/articles" className="homepage-view-more-button">
                        View More Articles
                      </Link>
                    </div>
                  </>
                ) : (
                  <div className="homepage-articles-empty">
                    <p>No articles available yet.</p>
                  </div>
                )}
              </div>

              {/* <div className="homepage-works">
                <Works />
              </div> */}
              <Works />

            </div>

            <div className="page-footer">
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Homepage;