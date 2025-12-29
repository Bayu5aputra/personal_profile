import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faSpinner, 
  faExclamationTriangle, 
  faSync,
  faNewspaper
} from "@fortawesome/free-solid-svg-icons";

import NavBar from "../components/common/navBar";
import Footer from "../components/common/footer";
import Logo from "../components/common/logo";
import Article from "../components/articles/article";

import INFO from "../data/user";
import SEO from "../data/seo";
import { getAllArticles } from "../utils/contentManagement";

import "./styles/articles.css";

const Articles = () => {
	const [articles, setArticles] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		window.scrollTo(0, 0);
		loadArticles();
	}, []);

	const loadArticles = async () => {
		setIsLoading(true);
		setError(null);
		
		try {
			const firebaseArticles = await getAllArticles();
			setArticles(firebaseArticles);
		} catch (error) {
			console.error("Failed to load articles:", error);
			setError("Failed to load articles from server. Please try refreshing the page.");
		}
		
		setIsLoading(false);
	};

	const handleRefresh = () => {
		loadArticles();
	};

	const currentSEO = SEO.find((item) => item.page === "articles");

	if (isLoading) {
		return (
			<React.Fragment>
				<Helmet>
					<title>{`Articles | ${INFO.main.title}`}</title>
					<meta name="description" content={currentSEO.description} />
					<meta name="keywords" content={currentSEO.keywords.join(", ")} />
				</Helmet>

				<div className="page-content">
					<NavBar active="articles" />
					<div className="content-wrapper">
						<div className="articles-logo-container">
							<div className="articles-logo">
								<Logo width={46} />
							</div>
						</div>

						<div className="articles-main-container">
							<div className="title articles-title">
								Sharing insights on IT infrastructure, networking, and emerging technologies.
							</div>
							<div className="subtitle articles-subtitle">
								Collection of my thoughts on network administration, IT infrastructure best practices, IoT implementations, and technology trends.
							</div>

							<div className="articles-loading">
								<FontAwesomeIcon icon={faSpinner} spin size="2x" />
								<p>Loading articles...</p>
							</div>
						</div>

						<div className="page-footer">
							<Footer />
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}

	if (error) {
		return (
			<React.Fragment>
				<Helmet>
					<title>{`Articles | ${INFO.main.title}`}</title>
					<meta name="description" content={currentSEO.description} />
					<meta name="keywords" content={currentSEO.keywords.join(", ")} />
				</Helmet>

				<div className="page-content">
					<NavBar active="articles" />
					<div className="content-wrapper">
						<div className="articles-logo-container">
							<div className="articles-logo">
								<Logo width={46} />
							</div>
						</div>

						<div className="articles-main-container">
							<div className="articles-header">
								<div className="articles-header-content">
									<div className="title articles-title">
										Sharing insights on IT infrastructure, networking, and emerging technologies.
									</div>
									<div className="subtitle articles-subtitle">
										Collection of my thoughts on network administration, IT infrastructure best practices, IoT implementations, and technology trends.
									</div>
								</div>
								<button className="articles-refresh-button" onClick={handleRefresh}>
									<FontAwesomeIcon icon={faSync} />
									<span>Refresh</span>
								</button>
							</div>

							<div className="articles-error">
								<FontAwesomeIcon icon={faExclamationTriangle} size="3x" />
								<p>{error}</p>
								<button className="articles-retry-button" onClick={handleRefresh}>
									<FontAwesomeIcon icon={faSync} />
									<span>Try Again</span>
								</button>
							</div>
						</div>

						<div className="page-footer">
							<Footer />
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}

	return (
		<React.Fragment>
			<Helmet>
				<title>{`Articles | ${INFO.main.title}`}</title>
				<meta name="description" content={currentSEO.description} />
				<meta name="keywords" content={currentSEO.keywords.join(", ")} />
			</Helmet>

			<div className="page-content">
				<NavBar active="articles" />
				<div className="content-wrapper">
					<div className="articles-logo-container">
						<div className="articles-logo">
							<Logo width={46} />
						</div>
					</div>

					<div className="articles-main-container">
						<div className="articles-header">
							<div className="articles-header-content">
								<div className="title articles-title">
									Sharing insights on IT infrastructure, networking, and emerging technologies.
								</div>
								<div className="subtitle articles-subtitle">
									Collection of my thoughts on network administration, IT infrastructure best practices, IoT implementations, and technology trends.
								</div>
							</div>
							<button className="articles-refresh-button" onClick={handleRefresh}>
								<FontAwesomeIcon icon={faSync} />
								<span>Refresh</span>
							</button>
						</div>

						{articles.length === 0 ? (
							<div className="articles-empty">
								<div className="empty-icon">
									<FontAwesomeIcon icon={faNewspaper} />
								</div>
								<p className="empty-message">No articles published yet</p>
								<p className="empty-hint">Check back soon for insights on IT infrastructure and technology trends</p>
							</div>
						) : (
							<div className="articles-container">
								<div className="articles-wrapper">
									{articles.map((article) => (
										<div className="articles-article" key={article.id}>
											<Article
												date={article.date}
												title={article.title}
												description={article.description}
												link={`/article/${article.slug}`}
											/>
										</div>
									))}
								</div>
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

export default Articles;