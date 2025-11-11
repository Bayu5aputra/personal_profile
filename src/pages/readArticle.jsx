import React, { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import NavBar from "../components/common/navBar";
import Footer from "../components/common/footer";
import Logo from "../components/common/logo";

import INFO from "../data/user";
import myArticles from "../data/articles";

import "./styles/readArticle.css";

const ReadArticle = () => {
	const navigate = useNavigate();
	const { slug } = useParams();

	// Get article data with useMemo
	const articleData = useMemo(() => {
		const article = myArticles[slug - 1];
		return article ? article() : null;
	}, [slug]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	// If article not found, show error
	if (!articleData) {
		return <div>Article not found</div>;
	}

	return (
		<React.Fragment>
			<Helmet>
				<title>{`${articleData.title} | ${INFO.main.title}`}</title>
				<meta name="description" content={articleData.description} />
				<meta name="keywords" content={articleData.keywords.join(", ")} />
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
								src="../back-button.png"
								alt="back"
								className="read-article-back-button"
								onClick={() => navigate(-1)}
							/>
						</div>

						<div className="read-article-wrapper">
							<div className="read-article-date-container">
								<div className="read-article-date">
									{articleData.date}
								</div>
							</div>

							<div className="title read-article-title">
								{articleData.title}
							</div>

							<div className="read-article-body">
								<style>{articleData.style}</style>
								<div className="article-content">
									{articleData.body}
								</div>
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