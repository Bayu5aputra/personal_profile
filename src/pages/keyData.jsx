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
	faExclamationTriangle
} from "@fortawesome/free-solid-svg-icons";

import NavBar from "../components/common/navBar";
import Footer from "../components/common/footer";
import Logo from "../components/common/logo";
import INFO from "../data/user";

import {
	getAllKeys,
	addKeys,
	deleteKey,
	deleteAllKeys,
	getKeyStatistics,
	initializeKeys
} from "../utils/keyDataSystem";

import "./styles/keyData.css";

const KeyData = () => {
	const [keys, setKeys] = useState([]);
	const [stats, setStats] = useState({ total: 0, available: 0, used: 0, usageRate: 0 });
	const [generateCount, setGenerateCount] = useState(10);
	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
	const [copiedKey, setCopiedKey] = useState(null);

	useEffect(() => {
		window.scrollTo(0, 0);
		loadKeys();
	}, []);

	const loadKeys = () => {
		// Initialize keys if empty
		initializeKeys();
		
		const allKeys = getAllKeys();
		setKeys(allKeys);
		
		const statistics = getKeyStatistics();
		setStats(statistics);
	};

	const handleGenerateKeys = () => {
		const count = parseInt(generateCount) || 10;
		addKeys(count);
		loadKeys();
	};

	const handleDeleteKey = (keyToDelete) => {
		if (window.confirm(`Are you sure you want to delete key: ${keyToDelete}?`)) {
			deleteKey(keyToDelete);
			loadKeys();
		}
	};

	const handleDeleteAllKeys = () => {
		deleteAllKeys();
		loadKeys();
		setShowDeleteConfirm(false);
	};

	// 🔥 FIX: Fallback copy method untuk environment non-HTTPS
	const handleCopyKey = (key) => {
		// Method 1: Try modern clipboard API (HTTPS only)
		if (navigator.clipboard && navigator.clipboard.writeText) {
			navigator.clipboard.writeText(key)
				.then(() => {
					setCopiedKey(key);
					setTimeout(() => setCopiedKey(null), 2000);
				})
				.catch(err => {
					console.error('Clipboard API failed, using fallback:', err);
					copyTextFallback(key);
				});
		} else {
			// Method 2: Fallback for non-HTTPS or unsupported browsers
			copyTextFallback(key);
		}
	};

	// Fallback copy method (works everywhere)
	const copyTextFallback = (text) => {
		const textArea = document.createElement('textarea');
		textArea.value = text;
		textArea.style.position = 'fixed';
		textArea.style.top = '-9999px';
		textArea.style.left = '-9999px';
		document.body.appendChild(textArea);
		textArea.focus();
		textArea.select();
		
		try {
			const successful = document.execCommand('copy');
			if (successful) {
				setCopiedKey(text);
				setTimeout(() => setCopiedKey(null), 2000);
			} else {
				alert('Failed to copy key. Please copy manually: ' + text);
			}
		} catch (err) {
			console.error('Fallback copy failed:', err);
			alert('Failed to copy key. Please copy manually: ' + text);
		}
		
		document.body.removeChild(textArea);
	};

	const formatDate = (dateString) => {
		if (!dateString) return '-';
		const date = new Date(dateString);
		return date.toLocaleString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	};

	return (
		<>
			<Helmet>
				<title>Key Data Management | {INFO.main.title}</title>
				<meta name="description" content="Manage review key data" />
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
							<h1 className="keydata-title">
								<FontAwesomeIcon icon={faKey} />
								Key Data Management
							</h1>
							<p className="keydata-subtitle">
								Generate and manage review authentication keys. Each key can only be used once to submit a review.
							</p>
						</div>

						{/* Statistics Cards */}
						<div className="keydata-stats">
							<div className="stat-card stat-total">
								<div className="stat-icon">
									<FontAwesomeIcon icon={faChartBar} />
								</div>
								<div className="stat-content">
									<div className="stat-label">Total Keys</div>
									<div className="stat-value">{stats.total}</div>
								</div>
							</div>

							<div className="stat-card stat-available">
								<div className="stat-icon">
									<FontAwesomeIcon icon={faCheckCircle} />
								</div>
								<div className="stat-content">
									<div className="stat-label">Available</div>
									<div className="stat-value">{stats.available}</div>
								</div>
							</div>

							<div className="stat-card stat-used">
								<div className="stat-icon">
									<FontAwesomeIcon icon={faTimesCircle} />
								</div>
								<div className="stat-content">
									<div className="stat-label">Used</div>
									<div className="stat-value">{stats.used}</div>
								</div>
							</div>

							<div className="stat-card stat-rate">
								<div className="stat-icon">
									<FontAwesomeIcon icon={faChartBar} />
								</div>
								<div className="stat-content">
									<div className="stat-label">Usage Rate</div>
									<div className="stat-value">{stats.usageRate}%</div>
								</div>
							</div>
						</div>

						{/* Actions */}
						<div className="keydata-actions">
							<div className="action-group">
								<input
									type="number"
									min="1"
									max="100"
									value={generateCount}
									onChange={(e) => setGenerateCount(e.target.value)}
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
							>
								<FontAwesomeIcon icon={faTrash} />
								Delete All Keys
							</button>
						</div>

						{/* Delete Confirmation Modal */}
						{showDeleteConfirm && (
							<div className="delete-confirm-modal">
								<div className="delete-confirm-content">
									<div className="delete-confirm-icon">
										<FontAwesomeIcon icon={faExclamationTriangle} />
									</div>
									<h3>Delete All Keys?</h3>
									<p>This will delete all keys including used keys and review data. This action cannot be undone.</p>
									<div className="delete-confirm-actions">
										<button
											className="confirm-delete-button"
											onClick={handleDeleteAllKeys}
										>
											Yes, Delete All
										</button>
										<button
											className="cancel-delete-button"
											onClick={() => setShowDeleteConfirm(false)}
										>
											Cancel
										</button>
									</div>
								</div>
							</div>
						)}

						{/* Keys Table */}
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
												No keys available. Generate some keys to get started.
											</td>
										</tr>
									) : (
										keys.map((keyData, index) => (
											<tr key={index} className={keyData.used ? 'key-used' : 'key-available'}>
												<td>
													<div className="key-cell">
														<code className="key-code">{keyData.key}</code>
														<button
															className="copy-key-button"
															onClick={() => handleCopyKey(keyData.key)}
															title="Copy key"
														>
															<FontAwesomeIcon icon={faCopy} />
															{copiedKey === keyData.key && (
																<span className="copied-tooltip">Copied!</span>
															)}
														</button>
													</div>
												</td>
												<td>
													<span className={`status-badge ${keyData.used ? 'status-used' : 'status-available'}`}>
														<FontAwesomeIcon icon={keyData.used ? faTimesCircle : faCheckCircle} />
														{keyData.used ? 'Used' : 'Available'}
													</span>
												</td>
												<td className="date-cell">{formatDate(keyData.createdAt)}</td>
												<td>{keyData.usedBy || '-'}</td>
												<td className="date-cell">{formatDate(keyData.usedAt)}</td>
												<td>{keyData.productId || '-'}</td>
												<td>
													<button
														className="delete-key-button"
														onClick={() => handleDeleteKey(keyData.key)}
														title="Delete key"
													>
														<FontAwesomeIcon icon={faTrash} />
													</button>
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