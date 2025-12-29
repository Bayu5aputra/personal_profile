import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faSpinner, 
  faExclamationTriangle, 
  faSync,
  faNewspaper
} from "@fortawesome/free-solid-svg-icons";
import Article from "./article";
import { getAllArticles } from "../../utils/contentManagement";

import "./styles/articlesList.css";

const ArticlesList = () => {
	const [articles, setArticles] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
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

	if (isLoading) {
		return (
			<div className="homepage-articles-section">
				<div className="title articles-section-title">
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
		);
	}

	if (error) {
		return (
			<div className="homepage-articles-section">
				<div className="title articles-section-title">
					Sharing insights on IT infrastructure, networking, and emerging technologies.
				</div>
				<div className="subtitle articles-subtitle">
					Collection of my thoughts on network administration, IT infrastructure best practices, IoT implementations, and technology trends.
				</div>
				<div className="articles-error">
					<FontAwesomeIcon icon={faExclamationTriangle} size="3x" />
					<p>{error}</p>
					<button className="articles-retry-button" onClick={handleRefresh}>
						<FontAwesomeIcon icon={faSync} />
						<span>Refresh</span>
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="homepage-articles-section">
			<div className="title articles-section-title">
				Sharing insights on IT infrastructure, networking, and emerging technologies.
			</div>
			<div className="subtitle articles-subtitle">
				Collection of my thoughts on network administration, IT infrastructure best practices, IoT implementations, and technology trends.
			</div>
			
			{articles.length === 0 ? (
				<div className="homepage-articles-empty">
					<div className="empty-icon">
						<FontAwesomeIcon icon={faNewspaper} />
					</div>
					<p className="empty-message">No articles published yet</p>
					<p className="empty-hint">Check back soon for insights on IT infrastructure and technology trends</p>
				</div>
			) : (
				<div className="homepage-articles-container">
					{articles.map((article) => (
						<Article
							key={article.id}
							slug={article.slug}
							title={article.title}
							description={article.description}
							date={article.date}
							category={article.category}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default ArticlesList;