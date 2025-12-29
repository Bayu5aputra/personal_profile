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
	getAllProjects,
	addProject,
	updateProject,
	deleteProject,
} from "../../utils/contentManagement";
import "./styles/projectsManagement.css";

const ProjectsManagement = () => {
	const [projects, setProjects] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [showForm, setShowForm] = useState(false);
	const [editingProject, setEditingProject] = useState(null);
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		logo: "",
		linkText: "",
		link: "",
	});

	useEffect(() => {
		loadProjects();
	}, []);

	const loadProjects = async () => {
		setIsLoading(true);
		const data = await getAllProjects();
		setProjects(data);
		setIsLoading(false);
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		let result;
		if (editingProject) {
			result = await updateProject(editingProject.id, formData);
		} else {
			result = await addProject(formData);
		}

		if (result.success) {
			alert(
				editingProject
					? "Project updated successfully!"
					: "Project added successfully!"
			);
			resetForm();
			loadProjects();
		} else {
			alert("Failed to save project: " + result.error);
		}

		setIsLoading(false);
	};

	const handleEdit = (project) => {
		setEditingProject(project);
		setFormData({
			title: project.title || "",
			description: project.description || "",
			logo: project.logo || "",
			linkText: project.linkText || "",
			link: project.link || "",
		});
		setShowForm(true);
	};

	const handleDelete = async (projectId) => {
		if (
			window.confirm(
				"Are you sure you want to delete this project? This action cannot be undone."
			)
		) {
			const result = await deleteProject(projectId);
			if (result.success) {
				alert("Project deleted successfully!");
				loadProjects();
			} else {
				alert("Failed to delete project: " + result.error);
			}
		}
	};

	const resetForm = () => {
		setFormData({
			title: "",
			description: "",
			logo: "",
			linkText: "",
			link: "",
		});
		setEditingProject(null);
		setShowForm(false);
	};

	if (isLoading && projects.length === 0) {
		return (
			<div className="cms-loading">
				<FontAwesomeIcon icon={faSpinner} spin size="2x" />
				<p>Loading projects...</p>
			</div>
		);
	}

	return (
		<div className="projects-management">
			<div className="management-header">
				<h2>Projects Management</h2>
				{!showForm && (
					<button
						className="btn-add"
						onClick={() => setShowForm(true)}
					>
						<FontAwesomeIcon icon={faPlus} />
						Add New Project
					</button>
				)}
			</div>

			{showForm && (
				<div className="project-form-container">
					<div className="form-header">
						<h3>
							{editingProject ? "Edit Project" : "Add New Project"}
						</h3>
						<button className="btn-close" onClick={resetForm}>
							<FontAwesomeIcon icon={faTimes} />
						</button>
					</div>

					<form onSubmit={handleSubmit} className="project-form">
						<div className="form-group">
							<label>Project Title *</label>
							<input
								type="text"
								name="title"
								value={formData.title}
								onChange={handleInputChange}
								placeholder="e.g., IoT-Based Emergency System"
								required
							/>
						</div>

						<div className="form-group">
							<label>Description *</label>
							<textarea
								name="description"
								value={formData.description}
								onChange={handleInputChange}
								rows="4"
								placeholder="Describe your project..."
								required
							/>
						</div>

						<div className="form-group">
							<label>Logo URL *</label>
							<input
								type="text"
								name="logo"
								value={formData.logo}
								onChange={handleInputChange}
								placeholder="https://cdn.jsdelivr.net/npm/programming-languages-logos/src/javascript/javascript.png"
								required
							/>
							<small>Use CDN URLs or local paths like /images/logo.png</small>
						</div>

						<div className="form-row">
							<div className="form-group">
								<label>Link Text *</label>
								<input
									type="text"
									name="linkText"
									value={formData.linkText}
									onChange={handleInputChange}
									placeholder="e.g., View Project"
									required
								/>
							</div>

							<div className="form-group">
								<label>Project Link *</label>
								<input
									type="text"
									name="link"
									value={formData.link}
									onChange={handleInputChange}
									placeholder="https://github.com/username/project"
									required
								/>
							</div>
						</div>

						<div className="form-actions">
							<button
								type="submit"
								className="btn-save"
								disabled={isLoading}
							>
								<FontAwesomeIcon icon={faSave} />
								{editingProject ? "Update Project" : "Save Project"}
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

			<div className="projects-list">
				<h3>Existing Projects ({projects.length})</h3>

				{projects.length === 0 ? (
					<div className="empty-state">
						<p>No projects yet. Add your first project!</p>
					</div>
				) : (
					<div className="projects-grid">
						{projects.map((project) => (
							<div key={project.id} className="project-card">
								<div className="project-card-logo">
									<img
										src={project.logo}
										alt={project.title}
										onError={(e) => {
											e.target.src = "/logo.png";
										}}
									/>
								</div>

								<div className="project-card-content">
									<h4>{project.title}</h4>
									<p className="project-description">
										{project.description.substring(0, 100)}
										{project.description.length > 100 && "..."}
									</p>

									<div className="project-card-actions">
										<button
											className="btn-action btn-view"
											onClick={() =>
												window.open(project.link, "_blank")
											}
											title="View Project"
										>
											<FontAwesomeIcon icon={faEye} />
										</button>
										<button
											className="btn-action btn-edit"
											onClick={() => handleEdit(project)}
											title="Edit Project"
										>
											<FontAwesomeIcon icon={faEdit} />
										</button>
										<button
											className="btn-action btn-delete"
											onClick={() =>
												handleDelete(project.id)
											}
											title="Delete Project"
										>
											<FontAwesomeIcon icon={faTrash} />
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default ProjectsManagement;