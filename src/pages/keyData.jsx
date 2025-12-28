import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faKey,
	faPlus,
	faTrash,
	faCheckCircle,
	faTimesCircle,
	faChartBar,
	faCopy,
	faExclamationTriangle,
	faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

import NavBar from "../components/common/navBar";
import Footer from "../components/common/footer";
import Logo from "../components/common/logo";
import GoogleLoginModal from "../components/keydata/GoogleLoginModal";
import INFO from "../data/user";

import {
	getAllKeys,
	addKeys,
	deleteKey,
	deleteAllUnusedKeys,
	getKeyStatistics,
} from "../utils/keyDataSystem";

import {
	signInWithGoogle,
	signOut,
	onAuthChange,
	getCurrentUser,
} from "../utils/authSystem";

import "./styles/keyData.css";

const KeyData = () => {
	const [authenticated, setAuthenticated] = useState(false);
	const [user, setUser] = useState(null);
	const [keys, setKeys] = useState([]);
	const [stats, setStats] = useState({
		total: 0,
		available: 0,
		used: 0,
		usageRate: 0,
	});
	const [generateCount, setGenerateCount] = useState(10);
	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
	const [copiedKey, setCopiedKey] = useState(null);
	const [deleteMessage, setDeleteMessage] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// Check authentication status
		const currentUser = getCurrentUser();
		if (currentUser.authenticated) {
			setAuthenticated(true);
			setUser(currentUser.user);
			loadKeys();
		}

		// Listen to auth changes
		const unsubscribe = onAuthChange((authState) => {
			setAuthenticated(authState.authenticated);
			setUser(authState.user);
			if (authState.authenticated) {
				loadKeys();
			}
			setIsLoading(false);
		});

		return () => unsubscribe();
	}, []);

	const handleLogin = async () => {
		const result = await signInWithGoogle();
		if (result.success) {
			setAuthenticated(true);
			setUser(result.user);
			loadKeys();
		}
		return result;
	};

	const handleLogout = async () => {
		await signOut();
		setAuthenticated(false);
		setUser(null);
	};

	const loadKeys = async () => {
		const allKeys = await getAllKeys();
		setKeys(allKeys);

		const statistics = await getKeyStatistics();
		setStats(statistics);
	};

	const handleGenerateKeys = async () => {
		const count = parseInt(generateCount) || 10;

		// Show loading state
		setDeleteMessage({
			type: "info",
			text: `Generating ${count} keys...`,
		});

		const newKeys = await addKeys(count);

		if (newKeys.length === 0) {
			setDeleteMessage({
				type: "error",
				text: "Failed to generate keys. Please check your permissions.",
			});
		} else {
			setDeleteMessage({
				type: "success",
				text: `Successfully generated ${newKeys.length} keys!`,
			});
			loadKeys();
		}

		setTimeout(() => setDeleteMessage(null), 5000);
	};

	const handleDeleteKey = async (keyData) => {
		if (
			window.confirm(
				`Are you sure you want to delete key: ${keyData.key}?`
			)
		) {
			const result = await deleteKey(keyData.id);

			if (!result.success) {
				setDeleteMessage({
					type: "error",
					text: result.message,
				});
			} else {
				setDeleteMessage({
					type: "success",
					text: "Key deleted successfully",
				});
				loadKeys();
			}

			setTimeout(() => setDeleteMessage(null), 3000);
		}
	};

	const handleDeleteAllKeys = async () => {
		const result = await deleteAllUnusedKeys();
		loadKeys();
		setShowDeleteConfirm(false);

		if (result.protected > 0) {
			setDeleteMessage({
				type: "warning",
				text: `Deleted ${result.deleted} unused keys. ${result.protected} used keys are protected.`,
			});
		} else {
			setDeleteMessage({
				type: "success",
				text: `All ${result.deleted} unused keys deleted successfully.`,
			});
		}

		setTimeout(() => setDeleteMessage(null), 5000);
	};

	const handleCopyKey = (key) => {
		if (navigator.clipboard && navigator.clipboard.writeText) {
			navigator.clipboard
				.writeText(key)
				.then(() => {
					setCopiedKey(key);
					setTimeout(() => setCopiedKey(null), 2000);
				})
				.catch(() => copyTextFallback(key));
		} else {
			copyTextFallback(key);
		}
	};

	const copyTextFallback = (text) => {
		const textArea = document.createElement("textarea");
		textArea.value = text;
		textArea.style.position = "fixed";
		textArea.style.top = "-9999px";
		document.body.appendChild(textArea);
		textArea.select();

		try {
			document.execCommand("copy");
			setCopiedKey(text);
			setTimeout(() => setCopiedKey(null), 2000);
		} catch (err) {
			alert("Failed to copy. Please copy manually: " + text);
		}

		document.body.removeChild(textArea);
	};

	const formatDate = (timestamp) => {
		if (!timestamp) return "-";

		let date;
		if (timestamp.toDate) {
			date = timestamp.toDate();
		} else if (timestamp instanceof Date) {
			date = timestamp;
		} else {
			date = new Date(timestamp);
		}

		return date.toLocaleString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	if (isLoading) {
		return (
			<>
				<Helmet>
					<title>Key Data Management | {INFO.main.title}</title>
				</Helmet>
				<div className="page-content">
					<NavBar />
					<div className="content-wrapper">
						<div className="keydata-loading">
							<p>Loading...</p>
						</div>
					</div>
				</div>
			</>
		);
	}

	if (!authenticated) {
		return (
			<>
				<Helmet>
					<title>Key Data Management | {INFO.main.title}</title>
				</Helmet>
				<GoogleLoginModal onLogin={handleLogin} />
			</>
		);
	}

	return (
		<>
			<Helmet>
				<title>Key Data Management | {INFO.main.title}</title>
			</Helmet>

			<div className="page-content">
				<NavBar />

				<div className="content-wrapper">
					<div className="keydata-logo-container">
						<div className="keydata-logo">
							<Logo width={46} />
						</div>
					</div>

					<div className="keydata-container">
						<div className="keydata-header">
							<div className="keydata-header-content">
								<div className="keydata-header-left">
									<h1 className="keydata-title">
										<FontAwesomeIcon icon={faKey} />
										Key Data Management
									</h1>
									<p className="keydata-subtitle">
										Generate and manage review
										authentication keys
									</p>
								</div>

								<div className="keydata-header-right">
									{user && (
										<div className="user-info">
											{user.photo && (
												<img
													src={user.photo}
													alt={user.name}
													className="user-photo"
												/>
											)}
											<div className="user-details">
												<div className="user-name">
													{user.name}
												</div>
												<div className="user-email">
													{user.email}
												</div>
											</div>
										</div>
									)}
									<button
										className="logout-button"
										onClick={handleLogout}
									>
										<FontAwesomeIcon icon={faSignOutAlt} />
										<span>Logout</span>
									</button>
								</div>
							</div>
						</div>

						{deleteMessage && (
							<div
								className={`delete-message delete-message-${deleteMessage.type}`}
							>
								<div className="delete-message-icon">
									{deleteMessage.type === "error" && (
										<FontAwesomeIcon icon={faTimesCircle} />
									)}
									{deleteMessage.type === "success" && (
										<FontAwesomeIcon icon={faCheckCircle} />
									)}
									{deleteMessage.type === "warning" && (
										<FontAwesomeIcon
											icon={faExclamationTriangle}
										/>
									)}
								</div>
								<span>{deleteMessage.text}</span>
							</div>
						)}

						<div className="keydata-stats">
							<div className="stat-card stat-total">
								<div className="stat-icon">
									<FontAwesomeIcon icon={faChartBar} />
								</div>
								<div className="stat-content">
									<div className="stat-label">Total Keys</div>
									<div className="stat-value">
										{stats.total}
									</div>
								</div>
							</div>

							<div className="stat-card stat-available">
								<div className="stat-icon">
									<FontAwesomeIcon icon={faCheckCircle} />
								</div>
								<div className="stat-content">
									<div className="stat-label">Available</div>
									<div className="stat-value">
										{stats.available}
									</div>
								</div>
							</div>

							<div className="stat-card stat-used">
								<div className="stat-icon">
									<FontAwesomeIcon icon={faTimesCircle} />
								</div>
								<div className="stat-content">
									<div className="stat-label">Used</div>
									<div className="stat-value">
										{stats.used}
									</div>
								</div>
							</div>

							<div className="stat-card stat-rate">
								<div className="stat-icon">
									<FontAwesomeIcon icon={faChartBar} />
								</div>
								<div className="stat-content">
									<div className="stat-label">Usage Rate</div>
									<div className="stat-value">
										{stats.usageRate}%
									</div>
								</div>
							</div>
						</div>

						<div className="keydata-actions">
							<div className="action-group">
								<input
									type="number"
									min="1"
									max="100"
									value={generateCount}
									onChange={(e) =>
										setGenerateCount(e.target.value)
									}
									className="generate-input"
									placeholder="Number of keys"
								/>
								<button
									className="action-button generate-button"
									onClick={handleGenerateKeys}
								>
									<FontAwesomeIcon icon={faPlus} />
									Generate Keys
								</button>
							</div>

							<button
								className="action-button delete-all-button"
								onClick={() => setShowDeleteConfirm(true)}
								disabled={keys.length === 0}
							>
								<FontAwesomeIcon icon={faTrash} />
								Delete All Unused Keys
							</button>
						</div>

						{showDeleteConfirm && (
							<div className="delete-confirm-modal">
								<div className="delete-confirm-content">
									<div className="delete-confirm-icon">
										<FontAwesomeIcon
											icon={faExclamationTriangle}
										/>
									</div>
									<h3>Delete All Unused Keys?</h3>
									<p>
										This will delete all unused keys (
										{keys.filter((k) => !k.used).length}{" "}
										keys).
										<br />
										<strong>
											Used keys are protected and will not
											be deleted.
										</strong>
									</p>
									<div className="delete-confirm-actions">
										<button
											className="confirm-delete-button"
											onClick={handleDeleteAllKeys}
										>
											Yes, Delete Unused Keys
										</button>
										<button
											className="cancel-delete-button"
											onClick={() =>
												setShowDeleteConfirm(false)
											}
										>
											Cancel
										</button>
									</div>
								</div>
							</div>
						)}

						<div className="keydata-table-container">
							<table className="keydata-table">
								<thead>
									<tr>
										<th>Key</th>
										<th>Status</th>
										<th>Created At</th>
										<th>Used By</th>
										<th>Used At</th>
										<th>Product ID</th>
										<th>Actions</th>
									</tr>
								</thead>
								<tbody>
									{keys.length === 0 ? (
										<tr>
											<td colSpan="7" className="no-keys">
												No keys available. Generate some
												keys to get started.
											</td>
										</tr>
									) : (
										keys.map((keyData) => (
											<tr
												key={keyData.id}
												className={
													keyData.used
														? "key-used key-protected"
														: "key-available"
												}
											>
												<td>
													<div className="key-cell">
														<code className="key-code">
															{keyData.key}
														</code>
														<button
															className="copy-key-button"
															onClick={() =>
																handleCopyKey(
																	keyData.key
																)
															}
															title="Copy key"
														>
															<FontAwesomeIcon
																icon={faCopy}
															/>
															{copiedKey ===
																keyData.key && (
																<span className="copied-tooltip">
																	Copied!
																</span>
															)}
														</button>
													</div>
												</td>
												<td>
													<span
														className={`status-badge ${
															keyData.used
																? "status-used"
																: "status-available"
														}`}
													>
														<FontAwesomeIcon
															icon={
																keyData.used
																	? faTimesCircle
																	: faCheckCircle
															}
														/>
														{keyData.used
															? "Used (Protected)"
															: "Available"}
													</span>
												</td>
												<td className="date-cell">
													{formatDate(
														keyData.createdAt
													)}
												</td>
												<td>{keyData.usedBy || "-"}</td>
												<td className="date-cell">
													{formatDate(keyData.usedAt)}
												</td>
												<td>
													{keyData.productId || "-"}
												</td>
												<td>
													{keyData.used ? (
														<button
															className="delete-key-button protected-button"
															title="Cannot delete protected key"
															disabled
														>
															<FontAwesomeIcon
																icon={faTrash}
															/>
														</button>
													) : (
														<button
															className="delete-key-button"
															onClick={() =>
																handleDeleteKey(
																	keyData
																)
															}
															title="Delete key"
														>
															<FontAwesomeIcon
																icon={faTrash}
															/>
														</button>
													)}
												</td>
											</tr>
										))
									)}
								</tbody>
							</table>
						</div>
					</div>

					<div className="page-footer">
						<Footer />
					</div>
				</div>
			</div>
		</>
	);
};

export default KeyData;
