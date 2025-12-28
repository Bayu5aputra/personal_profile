import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCog,
	faChartBar,
	faBoxes,
	faProjectDiagram,
	faNewspaper,
	faUsers,
	faKey,
	faSignOutAlt,
	faPlus,
	faEdit,
	faTrash,
	faEye,
} from "@fortawesome/free-solid-svg-icons";

import NavBar from "../components/common/navBar";
import Footer from "../components/common/footer";
import Logo from "../components/common/logo";
import GoogleLoginModal from "../components/keydata/GoogleLoginModal";
import INFO from "../data/user";

import {
	signInWithGoogle,
	signOut,
	onAuthChange,
	getCurrentUser,
} from "../utils/authSystem";

import {
	getDashboardStats,
	getAllProducts,
	getAllProjects,
	getAllArticles,
	getAllAuthorizedUsers,
} from "../utils/contentManagement";

import "./styles/contentManagement.css";

const ContentManagement = () => {
	const [authenticated, setAuthenticated] = useState(false);
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [activeTab, setActiveTab] = useState("dashboard");
	
	// Dashboard stats
	const [stats, setStats] = useState({
		products: 0,
		projects: 0,
		articles: 0,
		reviews: 0,
		keys: 0,
		users: 0
	});

	useEffect(() => {
		const currentUser = getCurrentUser();
		if (currentUser.authenticated) {
			setAuthenticated(true);
			setUser(currentUser.user);
			loadData();
		}

		const unsubscribe = onAuthChange((authState) => {
			setAuthenticated(authState.authenticated);
			setUser(authState.user);
			if (authState.authenticated) {
				loadData();
			}
			setIsLoading(false);
		});

		return () => unsubscribe();
	}, []);

	const loadData = async () => {
		const dashboardStats = await getDashboardStats();
		setStats(dashboardStats);
	};

	const handleLogin = async () => {
		const result = await signInWithGoogle();
		if (result.success) {
			setAuthenticated(true);
			setUser(result.user);
			loadData();
		}
		return result;
	};

	const handleLogout = async () => {
		await signOut();
		setAuthenticated(false);
		setUser(null);
	};

	if (isLoading) {
		return (
			<>
				<Helmet>
					<title>Content Management | {INFO.main.title}</title>
				</Helmet>
				<div className="page-content">
					<NavBar />
					<div className="content-wrapper">
						<div className="cms-loading">
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
					<title>Content Management | {INFO.main.title}</title>
				</Helmet>
				<GoogleLoginModal onLogin={handleLogin} />
			</>
		);
	}

	return (
		<>
			<Helmet>
				<title>Content Management System | {INFO.main.title}</title>
			</Helmet>

			<div className="page-content">
				<NavBar />

				<div className="content-wrapper">
					<div className="cms-logo-container">
						<div className="cms-logo">
							<Logo width={46} />
						</div>
					</div>

					<div className="cms-container">
						{/* Header */}
						<div className="cms-header">
							<div className="cms-header-content">
								<div className="cms-header-left">
									<h1 className="cms-title">
										<FontAwesomeIcon icon={faCog} />
										Content Management System
									</h1>
									<p className="cms-subtitle">
										Manage all your portfolio content in one place
									</p>
								</div>

								<div className="cms-header-right">
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

						{/* Navigation Tabs */}
						<div className="cms-tabs">
							<button
								className={`cms-tab ${activeTab === 'dashboard' ? 'active' : ''}`}
								onClick={() => setActiveTab('dashboard')}
							>
								<FontAwesomeIcon icon={faChartBar} />
								Dashboard
							</button>
							
							<button
								className={`cms-tab ${activeTab === 'products' ? 'active' : ''}`}
								onClick={() => setActiveTab('products')}
							>
								<FontAwesomeIcon icon={faBoxes} />
								Products
							</button>
							
							<button
								className={`cms-tab ${activeTab === 'projects' ? 'active' : ''}`}
								onClick={() => setActiveTab('projects')}
							>
								<FontAwesomeIcon icon={faProjectDiagram} />
								Projects
							</button>
							
							<button
								className={`cms-tab ${activeTab === 'articles' ? 'active' : ''}`}
								onClick={() => setActiveTab('articles')}
							>
								<FontAwesomeIcon icon={faNewspaper} />
								Articles
							</button>
							
							<button
								className={`cms-tab ${activeTab === 'users' ? 'active' : ''}`}
								onClick={() => setActiveTab('users')}
							>
								<FontAwesomeIcon icon={faUsers} />
								Users
							</button>
							
							<button
								className={`cms-tab ${activeTab === 'keys' ? 'active' : ''}`}
								onClick={() => setActiveTab('keys')}
							>
								<FontAwesomeIcon icon={faKey} />
								Review Keys
							</button>
						</div>

						{/* Content Area */}
						<div className="cms-content">
							{activeTab === 'dashboard' && (
								<div className="cms-dashboard">
									<h2>Dashboard Overview</h2>
									
									<div className="dashboard-stats-grid">
										<div className="dashboard-stat-card stat-products">
											<div className="stat-icon">
												<FontAwesomeIcon icon={faBoxes} />
											</div>
											<div className="stat-info">
												<div className="stat-value">{stats.products}</div>
												<div className="stat-label">Products</div>
											</div>
										</div>
										
										<div className="dashboard-stat-card stat-projects">
											<div className="stat-icon">
												<FontAwesomeIcon icon={faProjectDiagram} />
											</div>
											<div className="stat-info">
												<div className="stat-value">{stats.projects}</div>
												<div className="stat-label">Projects</div>
											</div>
										</div>
										
										<div className="dashboard-stat-card stat-articles">
											<div className="stat-icon">
												<FontAwesomeIcon icon={faNewspaper} />
											</div>
											<div className="stat-info">
												<div className="stat-value">{stats.articles}</div>
												<div className="stat-label">Articles</div>
											</div>
										</div>
										
										<div className="dashboard-stat-card stat-reviews">
											<div className="stat-icon">
												<FontAwesomeIcon icon={faEye} />
											</div>
											<div className="stat-info">
												<div className="stat-value">{stats.reviews}</div>
												<div className="stat-label">Reviews</div>
											</div>
										</div>
										
										<div className="dashboard-stat-card stat-keys">
											<div className="stat-icon">
												<FontAwesomeIcon icon={faKey} />
											</div>
											<div className="stat-info">
												<div className="stat-value">{stats.keys}</div>
												<div className="stat-label">Review Keys</div>
											</div>
										</div>
										
										<div className="dashboard-stat-card stat-users">
											<div className="stat-icon">
												<FontAwesomeIcon icon={faUsers} />
											</div>
											<div className="stat-info">
												<div className="stat-value">{stats.users}</div>
												<div className="stat-label">Authorized Users</div>
											</div>
										</div>
									</div>
								</div>
							)}
							
							{activeTab === 'products' && (
								<div className="cms-section">
									<h2>Products Management</h2>
									<p>Manage your sellable products here (Coming Soon)</p>
								</div>
							)}
							
							{activeTab === 'projects' && (
								<div className="cms-section">
									<h2>Projects Management</h2>
									<p>Manage your portfolio projects here (Coming Soon)</p>
								</div>
							)}
							
							{activeTab === 'articles' && (
								<div className="cms-section">
									<h2>Articles Management</h2>
									<p>Manage your blog articles here (Coming Soon)</p>
								</div>
							)}
							
							{activeTab === 'users' && (
								<div className="cms-section">
									<h2>Authorized Users</h2>
									<p>Manage who can access this CMS (Coming Soon)</p>
								</div>
							)}
							
							{activeTab === 'keys' && (
								<div className="cms-section">
									<h2>Review Keys Management</h2>
									<p>This redirects to /keydata page</p>
									<button 
										className="redirect-button"
										onClick={() => window.location.href = '/keydata'}
									>
										Go to Key Data Management
									</button>
								</div>
							)}
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

export default ContentManagement;