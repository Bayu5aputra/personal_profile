import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
	faArrowLeft, 
	faShoppingCart, 
	faStar, 
	faCheckCircle, 
	faClock, 
	faHeadset, 
	faFileAlt,
	faPalette,
	faCertificate,
	faEnvelope,
	faPhone,
	faWhatsapp
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

import NavBar from "../components/common/navBar";
import Footer from "../components/common/footer";
import Logo from "../components/common/logo";

import INFO from "../data/user";
import SELL_PRODUCTS from "../data/sellProducts";

import "./styles/productDetail.css";

const ProductDetail = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const [product, setProduct] = useState(null);

	useEffect(() => {
		window.scrollTo(0, 0);
		
		// Find product by id
		const foundProduct = SELL_PRODUCTS.find(p => p.id === parseInt(id));
		setProduct(foundProduct);
	}, [id]);

	if (!product) {
		return (
			<div className="page-content">
				<NavBar />
				<div className="content-wrapper">
					<div className="product-not-found">
						<h2>Product not found</h2>
						<button onClick={() => navigate('/projects')} className="back-button">
							<FontAwesomeIcon icon={faArrowLeft} />
							Back to Projects
						</button>
					</div>
				</div>
			</div>
		);
	}

	const handleContactWhatsApp = () => {
		const message = encodeURIComponent(
			`Hi, I'm interested in "${product.title}". Can you provide more information?`
		);
		window.open(`https://wa.me/6281234567890?text=${message}`, '_blank'); // Ganti dengan nomor WA Anda
	};

	const handleContactEmail = () => {
		const subject = encodeURIComponent(`Inquiry about ${product.title}`);
		const body = encodeURIComponent(
			`Hi Bayu,\n\nI'm interested in purchasing "${product.title}".\n\nPlease provide more information about:\n- Payment methods\n- Delivery timeline\n- Customization options\n\nThank you!`
		);
		window.location.href = `mailto:${INFO.main.email}?subject=${subject}&body=${body}`;
	};

	return (
		<React.Fragment>
			<Helmet>
				<title>{`${product.title} | ${INFO.main.title}`}</title>
				<meta name="description" content={product.description} />
				<meta name="keywords" content={`${product.category}, ${product.technologies.join(', ')}`} />
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
						{/* Back Button */}
						<button 
							className="product-back-button" 
							onClick={() => navigate('/projects')}
						>
							<FontAwesomeIcon icon={faArrowLeft} />
							<span>Back to Projects</span>
						</button>

						{/* Product Header */}
						<div className="product-detail-header">
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

							<div className="product-detail-right">
								<div className="product-category-badge">{product.category}</div>
								<h1 className="product-detail-title">{product.title}</h1>
								
								{/* Rating */}
								<div className="product-detail-rating">
									{[...Array(5)].map((_, index) => (
										<FontAwesomeIcon
											key={index}
											icon={faStar}
											className={index < product.rating ? 'star-filled' : 'star-empty'}
										/>
									))}
									<span className="rating-text">({product.rating}.0 / 5.0)</span>
								</div>

								<p className="product-detail-description">{product.description}</p>

								{/* Price Section */}
								<div className="product-price-section">
									{product.originalPrice && (
										<div className="price-comparison">
											<span className="price-label">Original Price:</span>
											<span className="price-original">
												Rp {product.originalPrice.toLocaleString('id-ID')}
											</span>
										</div>
									)}
									<div className="price-current-wrapper">
										<span className="price-label">Special Price:</span>
										<div className="price-current">
											Rp {product.price.toLocaleString('id-ID')}
										</div>
									</div>
									{product.originalPrice && (
										<div className="price-save">
											You save: Rp {(product.originalPrice - product.price).toLocaleString('id-ID')} 
											({Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF)
										</div>
									)}
								</div>

								{/* CTA Buttons */}
								<div className="product-cta-buttons">
									<button className="cta-button primary" onClick={handleContactWhatsApp}>
										<FontAwesomeIcon icon={faWhatsapp} />
										<span>Contact via WhatsApp</span>
									</button>
									<button className="cta-button secondary" onClick={handleContactEmail}>
										<FontAwesomeIcon icon={faEnvelope} />
										<span>Email Inquiry</span>
									</button>
								</div>

								{/* Quick Info */}
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

						{/* Product Details Tabs */}
						<div className="product-detail-tabs">
							{/* Features */}
							<div className="detail-section">
								<h2 className="section-title">
									<FontAwesomeIcon icon={faCheckCircle} />
									Key Features
								</h2>
								<div className="features-grid">
									{product.features.map((feature, index) => (
										<div key={index} className="feature-item">
											<FontAwesomeIcon icon={faCheckCircle} className="feature-icon" />
											<span>{feature}</span>
										</div>
									))}
								</div>
							</div>

							{/* Technologies */}
							<div className="detail-section">
								<h2 className="section-title">
									<FontAwesomeIcon icon={faPalette} />
									Technologies Used
								</h2>
								<div className="technologies-tags">
									{product.technologies.map((tech, index) => (
										<span key={index} className="tech-tag">
											{tech}
										</span>
									))}
								</div>
							</div>

							{/* Additional Info */}
							<div className="detail-section">
								<h2 className="section-title">
									<FontAwesomeIcon icon={faFileAlt} />
									What's Included
								</h2>
								<div className="included-items">
									<div className="included-item">
										<FontAwesomeIcon icon={faCheckCircle} className="check-icon" />
										<div>
											<strong>Documentation:</strong> {product.documentation}
										</div>
									</div>
									<div className="included-item">
										<FontAwesomeIcon icon={faCheckCircle} className="check-icon" />
										<div>
											<strong>Technical Support:</strong> {product.support}
										</div>
									</div>
									<div className="included-item">
										<FontAwesomeIcon icon={faCheckCircle} className="check-icon" />
										<div>
											<strong>Customization:</strong> {product.customization}
										</div>
									</div>
									<div className="included-item">
										<FontAwesomeIcon icon={faCheckCircle} className="check-icon" />
										<div>
											<strong>Delivery Time:</strong> {product.delivery}
										</div>
									</div>
									{product.demoUrl && (
										<div className="included-item">
											<FontAwesomeIcon icon={faCheckCircle} className="check-icon" />
											<div>
												<strong>Live Demo:</strong> 
												<a href={product.demoUrl} target="_blank" rel="noopener noreferrer">
													{product.demoUrl}
												</a>
											</div>
										</div>
									)}
								</div>
							</div>

							{/* Contact Section */}
							<div className="detail-section contact-section">
								<h2 className="section-title">
									<FontAwesomeIcon icon={faEnvelope} />
									Interested? Let's Talk!
								</h2>
								<p className="contact-description">
									Have questions or ready to purchase? Contact me through any of these channels:
								</p>
								<div className="contact-methods">
									<a href={`mailto:${INFO.main.email}`} className="contact-method">
										<FontAwesomeIcon icon={faEnvelope} />
										<span>{INFO.main.email}</span>
									</a>
									<a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="contact-method">
										<FontAwesomeIcon icon={faWhatsapp} />
										<span>WhatsApp: +62 812-3456-7890</span>
									</a>
									<a href={INFO.socials.linkedin} target="_blank" rel="noopener noreferrer" className="contact-method">
										<FontAwesomeIcon icon={faLinkedin} />
										<span>LinkedIn Profile</span>
									</a>
									<a href={INFO.socials.github} target="_blank" rel="noopener noreferrer" className="contact-method">
										<FontAwesomeIcon icon={faGithub} />
										<span>GitHub Portfolio</span>
									</a>
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

export default ProductDetail;