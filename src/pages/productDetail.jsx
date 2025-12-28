import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faArrowLeft,
	faStar,
	faCheckCircle,
	faClock,
	faHeadset,
	faCertificate,
	faEnvelope,
	faPalette
} from "@fortawesome/free-solid-svg-icons";
import {
	faGithub,
	faLinkedin,
	faWhatsapp
} from "@fortawesome/free-brands-svg-icons";

import NavBar from "../components/common/navBar";
import Footer from "../components/common/footer";
import Logo from "../components/common/logo";
import ReviewSection from "../components/products/ReviewSection";

import INFO from "../data/user";
import SELL_PRODUCTS from "../data/sellProducts";
import { calculateAverageRating } from "../utils/reviewSystem";

import "./styles/productDetail.css";

const ProductDetail = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const [product, setProduct] = useState(null);
	const [averageRating, setAverageRating] = useState({ average: 0, count: 0 });

	// Function to reload rating (dipanggil setelah review baru)
	const reloadRating = async () => {
		if (product) {
			// Force reload from Firebase/localStorage
			const rating = calculateAverageRating(product.id);
			setAverageRating(rating);
		}
	};

	// Auto-reload rating saat component mount
	useEffect(() => {
		if (product) {
			reloadRating();
		}
	}, [product]);

	useEffect(() => {
		window.scrollTo(0, 0);
		const found = SELL_PRODUCTS.find(
			(p) => p.id === parseInt(id)
		);
		
		if (found) {
			setProduct(found);
			// Load average rating from localStorage
			const rating = calculateAverageRating(found.id);
			setAverageRating(rating);
		}
	}, [id]);

	if (!product) {
		return (
			<div className="page-content">
				<NavBar />
				<div className="content-wrapper">
					<div className="product-not-found">
						<h2>Product not found</h2>
						<button
							className="product-back-button"
							onClick={() => navigate("/projects")}
						>
							<FontAwesomeIcon icon={faArrowLeft} />
							Back to Projects
						</button>
					</div>
				</div>
			</div>
		);
	}

	const handleWhatsApp = () => {
		const message = encodeURIComponent(
			`Hi, I'm interested in "${product.title}". Can you give me more details?`
		);
		window.open(
			`https://wa.me/6285881770712?text=${message}`,
			"_blank"
		);
	};

	const handleEmail = () => {
		const subject = encodeURIComponent(
			`Inquiry about ${product.title}`
		);
		const body = encodeURIComponent(
			`Hi Bayu,\n\nI'm interested in "${product.title}".\nPlease share more details.\n\nThank you.`
		);
		window.location.href = `mailto:${INFO.main.email}?subject=${subject}&body=${body}`;
	};

	// Display rating - prioritize localStorage, fallback to product rating
	const displayRating = averageRating.count > 0 
	? averageRating.average 
	: 0;

	// SOLD = JUMLAH REVIEW
	const soldCount = averageRating.count;

	return (
		<>
			<Helmet>
				<title>{product.title} | {INFO.main.title}</title>
				<meta name="description" content={product.description} />
			</Helmet>

			<div className="page-content">
				<NavBar />

				<div className="content-wrapper">
					<div className="product-detail-logo-container">
						<div className="product-detail-logo">
							<Logo width={46} />
						</div>
					</div>

					<div className="product-detail-container">

						<button
							className="product-back-button"
							onClick={() => navigate("/projects")}
						>
							<FontAwesomeIcon icon={faArrowLeft} />
							<span>Back to Projects</span>
						</button>

						{/* ================= HEADER ================= */}
						<div className="product-detail-header">

							{/* LEFT - IMAGE */}
							<div className="product-detail-left">
								<div className="product-image-section">
									<img
										src={product.image}
										alt={product.title}
										className="product-detail-image"
									/>

									{product.featured && (
										<div className="featured-badge">
											<FontAwesomeIcon icon={faStar} />
											<span>Featured Product</span>
										</div>
									)}
								</div>
							</div>

							{/* RIGHT - INFO */}
							<div className="product-detail-right">
								<div className="product-category-badge">
									{product.category}
								</div>

								<h1 className="product-detail-title">
									{product.title}
								</h1>

								{/* Rating + Sold */}
								<div className="product-detail-stats">
									<div className="product-detail-rating">
										{[...Array(5)].map((_, i) => (
											<FontAwesomeIcon
												key={i}
												icon={faStar}
												className={
													i < Math.round(displayRating)
														? "star-filled"
														: "star-empty"
												}
											/>
										))}
										<span className="rating-text">
											({displayRating.toFixed(1)} / 5.0)
											{averageRating.count > 0 && ` • ${averageRating.count} reviews`}
										</span>
									</div>

									{/* SOLD = JUMLAH REVIEW */}
									{soldCount > 0 && (
										<div className="sold-badge-large">
											<span className="sold-icon">🔥</span>
											<span>{soldCount} sold</span>
										</div>
									)}
								</div>

								<p className="product-detail-description">
									{product.description}
								</p>

								{/* PRICE */}
								<div className="product-price-section">
									{product.originalPrice && (
										<div className="price-comparison">
											<span className="price-label">
												Original Price
											</span>
											<span className="price-original">
												Rp {product.originalPrice.toLocaleString("id-ID")}
											</span>
										</div>
									)}

									<div className="price-current">
										Rp {product.price.toLocaleString("id-ID")}
									</div>

									{product.originalPrice && (
										<div className="price-save">
											Save Rp {(product.originalPrice - product.price).toLocaleString("id-ID")}
										</div>
									)}
								</div>

								{/* CTA */}
								<div className="product-cta-buttons">
									<button
										className="cta-button primary"
										onClick={handleWhatsApp}
									>
										<FontAwesomeIcon icon={faWhatsapp} />
										WhatsApp
									</button>

									<button
										className="cta-button secondary"
										onClick={handleEmail}
									>
										<FontAwesomeIcon icon={faEnvelope} />
										Email
									</button>
								</div>

								{/* QUICK INFO */}
								<div className="product-quick-info">
									<div className="quick-info-item">
										<FontAwesomeIcon icon={faClock} />
										<div>
											<strong>Delivery</strong>
											<span>{product.delivery}</span>
										</div>
									</div>

									<div className="quick-info-item">
										<FontAwesomeIcon icon={faHeadset} />
										<div>
											<strong>Support</strong>
											<span>{product.support}</span>
										</div>
									</div>

									<div className="quick-info-item">
										<FontAwesomeIcon icon={faCertificate} />
										<div>
											<strong>License</strong>
											<span>{product.license}</span>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* ================= DETAILS ================= */}
						<div className="product-detail-tabs">

							<div className="detail-section">
								<h2 className="section-title">
									<FontAwesomeIcon icon={faCheckCircle} />
									Key Features
								</h2>

								<div className="features-grid">
									{product.features.map((f, i) => (
										<div key={i} className="feature-item">
											<FontAwesomeIcon
												icon={faCheckCircle}
												className="feature-icon"
											/>
											<span>{f}</span>
										</div>
									))}
								</div>
							</div>

							<div className="detail-section">
								<h2 className="section-title">
									<FontAwesomeIcon icon={faPalette} />
									Technologies
								</h2>

								<div className="technologies-tags">
									{product.technologies.map((t, i) => (
										<span key={i} className="tech-tag">
											{t}
										</span>
									))}
								</div>
							</div>

							<div className="detail-section contact-section">
								<h2 className="section-title">
									<FontAwesomeIcon icon={faEnvelope} />
									Contact
								</h2>

								<div className="contact-methods">
									<a
										href={`mailto:${INFO.main.email}`}
										className="contact-method"
									>
										<FontAwesomeIcon icon={faEnvelope} />
										{INFO.main.email}
									</a>

									<a
										href={INFO.socials.linkedin}
										target="_blank"
										rel="noreferrer"
										className="contact-method"
									>
										<FontAwesomeIcon icon={faLinkedin} />
										LinkedIn
									</a>

									<a
										href={INFO.socials.github}
										target="_blank"
										rel="noreferrer"
										className="contact-method"
									>
										<FontAwesomeIcon icon={faGithub} />
										GitHub
									</a>
								</div>
							</div>

						</div>

						{/* ================= REVIEW SECTION ================= */}
						<ReviewSection 
							productId={product.id}
							onReviewAdded={reloadRating}
						/>
					</div>

					<div className="page-footer">
						<Footer />
					</div>
				</div>
			</div>
		</>
	);
};

export default ProductDetail;