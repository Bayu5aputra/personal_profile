import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faStar, faEye } from "@fortawesome/free-solid-svg-icons";
import "./styles/sellProduct.css";

const SellProduct = (props) => {
	const { id, title, description, price, originalPrice, image, rating, category, featured } = props;
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`/product/${id}`);
	};

	const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

	return (
		<div className={`sell-product ${featured ? 'featured' : ''}`} onClick={handleClick}>
			<div className="sell-product-container">
				{/* Badge Section */}
				<div className="sell-product-badges">
					{featured && (
						<span className="badge badge-featured">⭐ Featured</span>
					)}
					{discount > 0 && (
						<span className="badge badge-discount">-{discount}%</span>
					)}
				</div>

				{/* Image Section */}
				<div className="sell-product-image-wrapper">
					<img src={image} alt={title} className="sell-product-image" />
					<div className="sell-product-overlay">
						<FontAwesomeIcon icon={faEye} className="overlay-icon" />
						<span className="overlay-text">View Details</span>
					</div>
				</div>

				{/* Content Section */}
				<div className="sell-product-content">
					<div className="sell-product-category">{category}</div>
					<h3 className="sell-product-title">{title}</h3>
					<p className="sell-product-description">{description}</p>

					{/* Rating */}
					<div className="sell-product-rating">
						{[...Array(5)].map((_, index) => (
							<FontAwesomeIcon
								key={index}
								icon={faStar}
								className={index < rating ? 'star-filled' : 'star-empty'}
							/>
						))}
						<span className="rating-text">({rating}.0)</span>
					</div>

					{/* Price Section */}
					<div className="sell-product-footer">
						<div className="sell-product-price">
							{originalPrice && (
								<span className="price-original">Rp {originalPrice.toLocaleString('id-ID')}</span>
							)}
							<span className="price-current">Rp {price.toLocaleString('id-ID')}</span>
						</div>
						<button className="sell-product-button" onClick={handleClick}>
							<FontAwesomeIcon icon={faShoppingCart} />
							<span>View Details</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SellProduct;