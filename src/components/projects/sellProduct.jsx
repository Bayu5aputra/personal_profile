import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { calculateAverageRating } from "../../utils/reviewSystem";

import "./styles/sellProduct.css";

const SellProduct = (props) => {
	const navigate = useNavigate();
	const { id, image, title, description, price, category } = props;
	
	// Calculate average rating
	const { average: avgRating, count: reviewCount } = calculateAverageRating(id);
	
	// Default placeholder image
	const displayImage = image && image !== '/no_image.png' ? image : '/no_image.png';

	const handleClick = () => {
		navigate(`/product/${id}`);
	};

	return (
		<div className="sell-product" onClick={handleClick}>
			<div className="sell-product-image-container">
				<img 
					src={displayImage}
					alt={title}
					className="sell-product-image"
					loading="lazy"
					onError={(e) => {
						e.target.onerror = null;
						e.target.src = '/no_image.png';
					}}
				/>
				{reviewCount > 0 && (
					<div className="sold-badge">
						<span className="sold-icon">🔥</span>
						<span>{reviewCount} sold</span>
					</div>
				)}
			</div>

			<div className="sell-product-content">
				<div className="sell-product-header">
					<span className="product-category">{category}</span>
					{avgRating > 0 && (
						<div className="product-rating">
							<FontAwesomeIcon icon={faStar} className="star-icon" />
							<span>{avgRating.toFixed(1)}</span>
						</div>
					)}
				</div>

				<h3 className="sell-product-title">{title}</h3>
				
				<p className="sell-product-description">{description}</p>

				<div className="sell-product-footer">
					<div className="product-price">
						Rp {price.toLocaleString('id-ID')}
					</div>
					<button className="view-details-btn">
						View Details
					</button>
				</div>
			</div>
		</div>
	);
};

export default SellProduct;