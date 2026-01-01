import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faSpinner, 
  faExclamationTriangle, 
  faCopy,
  faCheck
} from "@fortawesome/free-solid-svg-icons";

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
	const [copiedCodeIndex, setCopiedCodeIndex] = useState(null);
	const codeRefs = useRef([]);

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
				// Process the content to add proper formatting
				const processedContent = processArticleContent(articleData.content);
				setArticle({
					...articleData,
					content: processedContent
				});
			} else {
				setError("Article not found");
			}
		} catch (error) {
			console.error("Failed to load article:", error);
			setError("Failed to load article from server");
		}
		
		setIsLoading(false);
	};

	// Helper function to escape HTML
	const escapeHtml = (text) => {
		if (!text) return "";
		const div = document.createElement('div');
		div.textContent = text;
		return div.innerHTML;
	};

	// Helper function to format text with bold
	const formatText = (text) => {
		if (!text) return "";
		// Convert *bold* to <strong>bold</strong>
		return text.replace(/\*(.*?)\*/g, '<strong>$1</strong>');
	};

	// Helper function to format list items
	const formatListItem = (text) => {
		if (!text) return "";
		// Replace the number and dot with styled version
		const parts = text.match(/^(\d+\.)\s*(.*)/);
		if (parts) {
			return `<span class="list-number">${parts[1]}</span> ${formatText(parts[2])}`;
		}
		return formatText(text);
	};

	// Main function to process article content
	const processArticleContent = (content) => {
		if (!content) return "";
		
		// Split content into lines
		const lines = content.split('\n');
		let formattedContent = "";
		let inCodeBlock = false;
		let codeBlockContent = "";
		let codeLanguage = "";
		let codeBlockCount = 0;
		
		// First, check if content uses triple backticks
		const usesTripleBackticks = content.includes('```');
		
		if (usesTripleBackticks) {
			// Process with triple backticks
			for (let i = 0; i < lines.length; i++) {
				const line = lines[i];
				const trimmedLine = line.trim();
				
				// Check for triple backticks
				if (trimmedLine.startsWith('```')) {
					if (!inCodeBlock) {
						// Start of code block
						inCodeBlock = true;
						codeLanguage = trimmedLine.substring(3).trim() || 'text';
						codeBlockContent = "";
						codeBlockCount++;
					} else {
						// End of code block
						inCodeBlock = false;
						formattedContent += `
							<div class="code-block-container" id="code-block-${codeBlockCount}">
								<div class="code-header">
									<span class="code-language">${codeLanguage}</span>
									<button class="copy-code-button" data-index="${codeBlockCount}">
										<FontAwesomeIcon icon="${copiedCodeIndex === codeBlockCount ? 'check' : 'copy'}" />
										${copiedCodeIndex === codeBlockCount ? 'Copied!' : 'Copy'}
									</button>
								</div>
								<pre><code>${escapeHtml(codeBlockContent)}</code></pre>
							</div>
						`;
						codeBlockContent = "";
					}
					continue;
				}
				
				if (inCodeBlock) {
					codeBlockContent += line + '\n';
				} else {
					formattedContent += processContentLine(trimmedLine);
				}
			}
			
			// Handle unclosed code block
			if (inCodeBlock) {
				formattedContent += `
					<div class="code-block-container" id="code-block-${codeBlockCount}">
						<div class="code-header">
							<span class="code-language">${codeLanguage}</span>
							<button class="copy-code-button" data-index="${codeBlockCount}">
								<FontAwesomeIcon icon="${copiedCodeIndex === codeBlockCount ? 'check' : 'copy'}" />
								${copiedCodeIndex === codeBlockCount ? 'Copied!' : 'Copy'}
							</button>
						</div>
						<pre><code>${escapeHtml(codeBlockContent)}</code></pre>
					</div>
				`;
			}
		} else {
			// Process with old format (using "Code:" keyword)
			let isInCodeSection = false;
			
			for (let i = 0; i < lines.length; i++) {
				const line = lines[i];
				const trimmedLine = line.trim();
				const nextLine = i + 1 < lines.length ? lines[i + 1].trim() : '';
				
				// Check for code section start
				if (trimmedLine.toLowerCase() === "code:" || trimmedLine.toLowerCase().startsWith("code:")) {
					isInCodeSection = true;
					codeBlockCount++;
					codeBlockContent = "";
					
					// If there's code on the same line after "Code:"
					if (trimmedLine.toLowerCase().startsWith("code:") && trimmedLine.length > 5) {
						const afterCode = trimmedLine.substring(5).trim();
						if (afterCode) {
							codeBlockContent = afterCode + '\n';
						}
					}
					continue;
				}
				
				// If we're in a code section
				if (isInCodeSection) {
					// Check if we should end the code section
					// Code section ends when we hit a new header or a numbered list
					const isHeader = trimmedLine.startsWith('#') && trimmedLine.includes(' ');
					const isNumberedList = /^\d+\.\s/.test(trimmedLine);
					const isEmptyLine = trimmedLine === '';
					const nextIsHeader = nextLine.startsWith('#') && nextLine.includes(' ');
					
					if ((isHeader || isNumberedList) || (isEmptyLine && nextIsHeader)) {
						// End code section
						isInCodeSection = false;
						formattedContent += `
							<div class="code-block-container" id="code-block-${codeBlockCount}">
								<div class="code-header">
									<span class="code-language">cpp</span>
									<button class="copy-code-button" data-index="${codeBlockCount}">
										<FontAwesomeIcon icon="${copiedCodeIndex === codeBlockCount ? 'check' : 'copy'}" />
										${copiedCodeIndex === codeBlockCount ? 'Copied!' : 'Copy'}
									</button>
								</div>
								<pre><code>${escapeHtml(codeBlockContent.trim())}</code></pre>
							</div>
						`;
						
						// Process current line normally
						if (trimmedLine && !isEmptyLine) {
							formattedContent += processContentLine(trimmedLine);
						}
					} else {
						// Continue adding to code block
						codeBlockContent += line + '\n';
					}
				} else {
					// Process normal content
					formattedContent += processContentLine(trimmedLine);
				}
			}
			
			// Handle unclosed code section
			if (isInCodeSection && codeBlockContent) {
				formattedContent += `
					<div class="code-block-container" id="code-block-${codeBlockCount}">
						<div class="code-header">
							<span class="code-language">cpp</span>
							<button class="copy-code-button" data-index="${codeBlockCount}">
								<FontAwesomeIcon icon="${copiedCodeIndex === codeBlockCount ? 'check' : 'copy'}" />
								${copiedCodeIndex === codeBlockCount ? 'Copied!' : 'Copy'}
							</button>
						</div>
						<pre><code>${escapeHtml(codeBlockContent.trim())}</code></pre>
					</div>
				`;
			}
		}
		
		return formattedContent;
	};

	// Helper function to process a single content line
	const processContentLine = (trimmedLine) => {
		if (!trimmedLine) {
			return `<div class="article-spacing"></div>`;
		}
		
		if (trimmedLine.startsWith("# ")) {
			return `<h1 class="article-h1">${formatText(trimmedLine.substring(2))}</h1>`;
		} else if (trimmedLine.startsWith("## ")) {
			return `<h2 class="article-h2">${formatText(trimmedLine.substring(3))}</h2>`;
		} else if (trimmedLine.startsWith("### ")) {
			return `<h3 class="article-h3">${formatText(trimmedLine.substring(4))}</h3>`;
		} else if (/^\d+\.\s/.test(trimmedLine)) {
			return `<p class="article-list-item">${formatListItem(trimmedLine)}</p>`;
		} else {
			return `<p>${formatText(trimmedLine)}</p>`;
		}
	};

	// Handle copy code button click
	const handleCopyCode = (codeContent, index) => {
		navigator.clipboard.writeText(codeContent)
			.then(() => {
				setCopiedCodeIndex(index);
				setTimeout(() => {
					setCopiedCodeIndex(null);
				}, 2000);
			})
			.catch(err => {
				console.error('Failed to copy code:', err);
			});
	};

	// Effect to handle copy button clicks after content is loaded
	useEffect(() => {
		if (article) {
			// Add click handlers to copy buttons
			const copyButtons = document.querySelectorAll('.copy-code-button');
			copyButtons.forEach((button, index) => {
				button.addEventListener('click', () => {
					const codeBlock = button.closest('.code-block-container');
					const codeElement = codeBlock?.querySelector('code');
					if (codeElement) {
						const codeContent = codeElement.textContent;
						handleCopyCode(codeContent, index + 1);
					}
				});
			});
			
			// Cleanup event listeners
			return () => {
				copyButtons.forEach(button => {
					button.removeEventListener('click', () => {});
				});
			};
		}
	}, [article]);

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