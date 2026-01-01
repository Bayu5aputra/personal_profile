import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPlus,
	faEdit,
	faTrash,
	faEye,
	faSave,
	faTimes,
	faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import {
	getAllArticles,
	addArticle,
	updateArticle,
	deleteArticle,
} from "../../utils/contentManagement";
import "./styles/articlesManagement.css";

const ArticlesManagement = () => {
	const [articles, setArticles] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [showForm, setShowForm] = useState(false);
	const [editingArticle, setEditingArticle] = useState(null);
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		date: "",
		content: "",
		keywords: [],
		slug: "",
	});

	useEffect(() => {
		loadArticles();
	}, []);

	const loadArticles = async () => {
		setIsLoading(true);
		const data = await getAllArticles();
		setArticles(data);
		setIsLoading(false);
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleArrayInput = (e) => {
		const value = e.target.value;
		const array = value.split(",").map((item) => item.trim()).filter((item) => item !== "");
		setFormData((prev) => ({
			...prev,
			keywords: array,
		}));
	};

	const generateSlug = (title) => {
		return title
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, "-")
			.replace(/(^-|-$)/g, "");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		const articleData = {
			...formData,
			slug: formData.slug || generateSlug(formData.title),
		};

		let result;
		if (editingArticle) {
			result = await updateArticle(editingArticle.id, articleData);
		} else {
			result = await addArticle(articleData);
		}

		if (result.success) {
			alert(
				editingArticle
					? "Article updated successfully!"
					: "Article added successfully!"
			);
			resetForm();
			loadArticles();
		} else {
			alert("Failed to save article: " + result.error);
		}

		setIsLoading(false);
	};

	const handleEdit = (article) => {
		setEditingArticle(article);
		setFormData({
			title: article.title || "",
			description: article.description || "",
			date: article.date || "",
			content: article.content || "",
			keywords: article.keywords || [],
			slug: article.slug || "",
		});
		setShowForm(true);
	};

	const handleDelete = async (articleId) => {
		if (
			window.confirm(
				"Are you sure you want to delete this article? This action cannot be undone."
			)
		) {
			const result = await deleteArticle(articleId);
			if (result.success) {
				alert("Article deleted successfully!");
				loadArticles();
			} else {
				alert("Failed to delete article: " + result.error);
			}
		}
	};

	const resetForm = () => {
		setFormData({
			title: "",
			description: "",
			date: "",
			content: "",
			keywords: [],
			slug: "",
		});
		setEditingArticle(null);
		setShowForm(false);
	};

	if (isLoading && articles.length === 0) {
		return (
			<div className="cms-loading">
				<FontAwesomeIcon icon={faSpinner} spin size="2x" />
				<p>Loading articles...</p>
			</div>
		);
	}

	return (
		<div className="articles-management">
			<div className="management-header">
				<h2>Articles Management</h2>
				{!showForm && (
					<button
						className="btn-add"
						onClick={() => setShowForm(true)}
					>
						<FontAwesomeIcon icon={faPlus} />
						Add New Article
					</button>
				)}
			</div>

			{showForm && (
				<div className="article-form-container">
					<div className="form-header">
						<h3>
							{editingArticle ? "Edit Article" : "Add New Article"}
						</h3>
						<button className="btn-close" onClick={resetForm}>
							<FontAwesomeIcon icon={faTimes} />
						</button>
					</div>

					<form onSubmit={handleSubmit} className="article-form">
						<div className="form-group">
							<label>Article Title *</label>
							<input
								type="text"
								name="title"
								value={formData.title}
								onChange={handleInputChange}
								placeholder="e.g., Building IoT Systems with ESP32"
								required
							/>
						</div>

						<div className="form-row">
							<div className="form-group">
								<label>Date *</label>
								<input
									type="text"
									name="date"
									value={formData.date}
									onChange={handleInputChange}
									placeholder="e.g., 15 September 2025"
									required
								/>
							</div>

							<div className="form-group">
								<label>Slug (URL-friendly)</label>
								<input
									type="text"
									name="slug"
									value={formData.slug}
									onChange={handleInputChange}
									placeholder="auto-generated from title"
								/>
								<small>Leave empty to auto-generate</small>
							</div>
						</div>

						<div className="form-group">
							<label>Description *</label>
							<textarea
								name="description"
								value={formData.description}
								onChange={handleInputChange}
								rows="3"
								placeholder="Brief description of the article..."
								required
							/>
						</div>

						<div className="form-group">
							<label>
								Keywords *
								<small>Separate with commas</small>
							</label>
							<input
								type="text"
								value={formData.keywords.join(", ")}
								onChange={handleArrayInput}
								placeholder="IoT, ESP32, Arduino, Programming"
								required
							/>
						</div>

						<div className="form-group">
							<label>Article Content *</label>
							<textarea
								name="content"
								value={formData.content}
								onChange={handleInputChange}
								rows="12"
								placeholder="Write your article content here... (Use Formatting Rules)"
								required
							/>
							<small>
								Formatting rules: <code>#</code> for <strong>Heading 1</strong>, <code>##</code> for <strong>Heading 2</strong>, <code>###</code> for <strong>Heading 3</strong>, <code>*text*</code> for <strong>bold text</strong>, <code>```code```</code> for <strong>code block</strong>.
							</small>

						</div>

						<div className="form-actions">
							<button
								type="submit"
								className="btn-save"
								disabled={isLoading}
							>
								<FontAwesomeIcon icon={faSave} />
								{editingArticle ? "Update Article" : "Save Article"}
							</button>
							<button
								type="button"
								className="btn-cancel"
								onClick={resetForm}
							>
								Cancel
							</button>
						</div>
					</form>
				</div>
			)}

			<div className="articles-list">
				<h3>Existing Articles ({articles.length})</h3>

				{articles.length === 0 ? (
					<div className="empty-state">
						<p>No articles yet. Add your first article!</p>
					</div>
				) : (
					<div className="articles-grid">
						{articles.map((article) => (
							<div key={article.id} className="article-card">
								<div className="article-card-header">
									<span className="article-date">
										{article.date}
									</span>
								</div>

								<div className="article-card-content">
									<h4>{article.title}</h4>
									<p className="article-description">
										{article.description.substring(0, 120)}
										{article.description.length > 120 && "..."}
									</p>

									<div className="article-keywords">
										{article.keywords?.slice(0, 3).map((keyword, idx) => (
											<span key={idx} className="keyword-tag">
												{keyword}
											</span>
										))}
									</div>
								</div>

								<div className="article-card-actions">
									<button
										className="btn-action btn-view"
										onClick={() =>
											window.open(
												`/article/${article.slug}`,
												"_blank"
											)
										}
										title="View Article"
									>
										<FontAwesomeIcon icon={faEye} />
									</button>
									<button
										className="btn-action btn-edit"
										onClick={() => handleEdit(article)}
										title="Edit Article"
									>
										<FontAwesomeIcon icon={faEdit} />
									</button>
									<button
										className="btn-action btn-delete"
										onClick={() =>
											handleDelete(article.id)
										}
										title="Delete Article"
									>
										<FontAwesomeIcon icon={faTrash} />
									</button>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default ArticlesManagement;