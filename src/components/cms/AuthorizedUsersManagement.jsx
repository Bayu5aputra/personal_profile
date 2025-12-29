import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPlus,
	faTrash,
	faSave,
	faTimes,
	faSpinner,
	faCheckCircle,
	faUserShield,
	faEnvelope,
	faClock,
} from "@fortawesome/free-solid-svg-icons";
import {
	getAllAuthorizedUsers,
	addAuthorizedUser,
	deleteAuthorizedUser,
} from "../../utils/contentManagement";
import "./styles/authorizedUsersManagement.css";

const AuthorizedUsersManagement = () => {
	const [users, setUsers] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [showForm, setShowForm] = useState(false);
	const [formData, setFormData] = useState({
		email: "",
		name: "",
		role: "admin",
	});

	useEffect(() => {
		loadUsers();
	}, []);

	const loadUsers = async () => {
		setIsLoading(true);
		const data = await getAllAuthorizedUsers();
		setUsers(data);
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

		// Validate email format
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(formData.email)) {
			alert("Please enter a valid email address");
			setIsLoading(false);
			return;
		}

		const userData = {
			name: formData.name,
			role: formData.role,
		};

		const result = await addAuthorizedUser(formData.email, userData);

		if (result.success) {
			alert("User added successfully!");
			resetForm();
			loadUsers();
		} else {
			alert("Failed to add user: " + result.error);
		}

		setIsLoading(false);
	};

	const handleDelete = async (userEmail) => {
		if (
			window.confirm(
				`Are you sure you want to remove ${userEmail} from authorized users? They will no longer be able to access the CMS.`
			)
		) {
			const result = await deleteAuthorizedUser(userEmail);
			if (result.success) {
				alert("User removed successfully!");
				loadUsers();
			} else {
				alert("Failed to remove user: " + result.error);
			}
		}
	};

	const resetForm = () => {
		setFormData({
			email: "",
			name: "",
			role: "admin",
		});
		setShowForm(false);
	};

	const formatDate = (timestamp) => {
		if (!timestamp) return "N/A";

		let date;
		if (timestamp.toDate) {
			date = timestamp.toDate();
		} else if (timestamp instanceof Date) {
			date = timestamp;
		} else {
			date = new Date(timestamp);
		}

		return date.toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	if (isLoading && users.length === 0) {
		return (
			<div className="cms-loading">
				<FontAwesomeIcon icon={faSpinner} spin size="2x" />
				<p>Loading authorized users...</p>
			</div>
		);
	}

	return (
		<div className="authorized-users-management">
			<div className="management-header">
				<div className="header-info">
					<h2>Authorized Users</h2>
					<p className="header-subtitle">
						Manage who can access the Content Management System
					</p>
				</div>
				{!showForm && (
					<button
						className="btn-add"
						onClick={() => setShowForm(true)}
					>
						<FontAwesomeIcon icon={faPlus} />
						Add New User
					</button>
				)}
			</div>

			{showForm && (
				<div className="user-form-container">
					<div className="form-header">
						<h3>Add New Authorized User</h3>
						<button className="btn-close" onClick={resetForm}>
							<FontAwesomeIcon icon={faTimes} />
						</button>
					</div>

					<form onSubmit={handleSubmit} className="user-form">
						<div className="form-group">
							<label>Email Address *</label>
							<input
								type="email"
								name="email"
								value={formData.email}
								onChange={handleInputChange}
								placeholder="user@example.com"
								required
							/>
							<small>
								This email will be allowed to access the CMS
							</small>
						</div>

						<div className="form-group">
							<label>Full Name *</label>
							<input
								type="text"
								name="name"
								value={formData.name}
								onChange={handleInputChange}
								placeholder="John Doe"
								required
							/>
						</div>

						<div className="form-group">
							<label>Role *</label>
							<select
								name="role"
								value={formData.role}
								onChange={handleInputChange}
								required
							>
								<option value="admin">Admin</option>
								<option value="editor">Editor</option>
								<option value="viewer">Viewer</option>
							</select>
							<small>
								<strong>Admin:</strong> Full access | <strong>Editor:</strong> Can edit content | <strong>Viewer:</strong> Read-only
							</small>
						</div>

						<div className="form-actions">
							<button
								type="submit"
								className="btn-save"
								disabled={isLoading}
							>
								<FontAwesomeIcon icon={faSave} />
								Add User
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

			<div className="users-list">
				<div className="list-header">
					<h3>Current Authorized Users ({users.length})</h3>
					<div className="list-info">
						<FontAwesomeIcon icon={faUserShield} />
						<span>All users listed can access the CMS</span>
					</div>
				</div>

				{users.length === 0 ? (
					<div className="empty-state">
						<FontAwesomeIcon icon={faUserShield} size="3x" />
						<p>No authorized users yet.</p>
						<small>Add users to allow them to access the CMS</small>
					</div>
				) : (
					<div className="users-table-container">
						<table className="users-table">
							<thead>
								<tr>
									<th>User</th>
									<th>Role</th>
									<th>Added On</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{users.map((user) => (
									<tr key={user.email}>
										<td>
											<div className="user-info-cell">
												<div className="user-avatar">
													<FontAwesomeIcon icon={faUserShield} />
												</div>
												<div className="user-details">
													<div className="user-name">
														{user.name || "Unknown"}
													</div>
													<div className="user-email">
														<FontAwesomeIcon icon={faEnvelope} />
														{user.email}
													</div>
												</div>
											</div>
										</td>
										<td>
											<span className={`role-badge role-${user.role}`}>
												{user.role || "admin"}
											</span>
										</td>
										<td>
											<div className="date-cell">
												<FontAwesomeIcon icon={faClock} />
												{formatDate(user.addedAt)}
											</div>
										</td>
										<td>
											<button
												className="btn-delete-user"
												onClick={() => handleDelete(user.email)}
												title="Remove user"
											>
												<FontAwesomeIcon icon={faTrash} />
												Remove
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</div>

			<div className="security-notice">
				<FontAwesomeIcon icon={faCheckCircle} />
				<div>
					<strong>Security Notice:</strong> Only add users you trust. Authorized users can manage all content in the CMS.
				</div>
			</div>
		</div>
	);
};

export default AuthorizedUsersManagement;