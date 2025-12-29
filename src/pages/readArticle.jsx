import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

import NavBar from "../components/common/navBar";
import Footer from "../components/common/footer";
import Logo from "../components/common/logo";

import INFO from "../data/user";
import { getArticleBySlug } from "../utils/contentManagement";

import "./styles/readArticle.css";

const ReadArticle = () => {
	const navigate = useNavigate();
	const { slug } = useParams();
	
	const [article, setArticle] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		window.scrollTo(0, 0);
		loadArticle();
	}, [slug]);

	const loadArticle = async () => {
		setIsLoading(true);
		setError(null);
		
		try {
			const articleData = await getArticleBySlug(slug);
			
			if (articleData) {
				setArticle(articleData);
			} else {
				setError("Article not found");
			}
		} catch (error) {
			console.error("Failed to load article:", error);
			setError("Failed to load article from server");
		}
		
		setIsLoading(false);
	};

	if (isLoading) {
		return (
			<React.Fragment>
				<Helmet>
					<title>{`Loading... | ${INFO.main.title}`}</title>
				</Helmet>
				<div className="page-content">
					<NavBar />
					<div className="content-wrapper">
						<div className="article-loading">
							<FontAwesomeIcon icon={faSpinner} spin size="3x" />
							<p>Loading article...</p>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}

	if (error || !article) {
		return (
			<React.Fragment>
				<Helmet>
					<title>{`Article Not Found | ${INFO.main.title}`}</title>
				</Helmet>
				<div className="page-content">
					<NavBar />
					<div className="content-wrapper">
						<div className="article-error">
							<FontAwesomeIcon icon={faExclamationTriangle} size="3x" />
							<h2>{error || "Article Not Found"}</h2>
							<button 
								className="back-to-articles-button"
								onClick={() => navigate('/articles')}
							>
								Back to Articles
							</button>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}

	return (
		<React.Fragment>
			<Helmet>
				<title>{`${article.title} | ${INFO.main.title}`}</title>
				<meta name="description" content={article.description} />
				<meta name="keywords" content={article.keywords?.join(", ") || ""} />
			</Helmet>

			<div className="page-content">
				<NavBar />

				<div className="content-wrapper">
					<div className="read-article-logo-container">
						<div className="read-article-logo">
							<Logo width={46} />
						</div>
					</div>

					<div className="read-article-container">
						<div className="read-article-back">
							<img
								src="/back-button.png"
								alt="back"
								className="read-article-back-button"
								onClick={() => navigate(-1)}
							/>
						</div>

						<div className="read-article-wrapper">
							<div className="read-article-date-container">
								<div className="read-article-date">
									{article.date}
								</div>
							</div>

							<div className="title read-article-title">
								{article.title}
							</div>

							<div className="read-article-body">
								<div 
									className="article-content"
									dangerouslySetInnerHTML={{ __html: article.content }}
								/>
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

export default ReadArticle;