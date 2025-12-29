import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faExclamationTriangle, faSync } from "@fortawesome/free-solid-svg-icons";
import Article from "./article";
import { getAllArticles } from "../../utils/contentManagement";

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
			
			if (firebaseArticles.length > 0) {
				setArticles(firebaseArticles);
			} else {
				setError("No articles found. Please add articles in the CMS.");
			}
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
			<div className="articles-loading-container">
				<FontAwesomeIcon icon={faSpinner} spin size="2x" />
				<p>Loading articles from server...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className="articles-error-container">
				<FontAwesomeIcon icon={faExclamationTriangle} size="3x" />
				<p>{error}</p>
				<button className="retry-button" onClick={handleRefresh}>
					<FontAwesomeIcon icon={faSync} />
					<span>Refresh</span>
				</button>
			</div>
		);
	}

	if (articles.length === 0) {
		return (
			<div className="articles-empty-container">
				<p>No articles available. Add articles via CMS.</p>
				<button className="retry-button" onClick={handleRefresh}>
					<FontAwesomeIcon icon={faSync} />
					<span>Refresh</span>
				</button>
			</div>
		);
	}

	return (
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
	);
};

export default ArticlesList;