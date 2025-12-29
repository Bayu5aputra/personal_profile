import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { calculateAverageRating } from "../../utils/reviewSystem";

import "./styles/sellProduct.css";

const SellProduct = (props) => {
	const navigate = useNavigate();
	const { id, image, title, description, price, originalPrice, category, featured } = props;
	
	const { average: avgRating, count: reviewCount } = calculateAverageRating(id);
	const displayImage = image && image !== '/no_image.png' ? image : '/no_image.png';
	
	const discountPercentage = originalPrice && originalPrice > price 
		? Math.round(((originalPrice - price) / originalPrice) * 100)
		: 0;
	
	const saveAmount = originalPrice && originalPrice > price 
		? originalPrice - price
		: 0;

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
				
				{featured && (
					<div className="featured-badge-top">
						<span className="star-icon">⭐</span>
						Featured
					</div>
				)}
				
				{discountPercentage > 0 && (
					<div className="discount-badge-top">
						-{discountPercentage}%
					</div>
				)}
				
				<div className="product-category-badge">
					{category}
				</div>
				
				{reviewCount > 0 && (
					<div className="sold-count-badge">
						🔥 {reviewCount} sold
					</div>
				)}
			</div>

			<div className="sell-product-content">
				{avgRating > 0 && (
					<div className="product-rating-inline">
						{[...Array(5)].map((_, i) => (
							<FontAwesomeIcon
								key={i}
								icon={faStar}
								className={i < Math.round(avgRating) ? "star-filled" : "star-empty"}
							/>
						))}
						<span className="rating-count">({avgRating.toFixed(1)})</span>
					</div>
				)}

				<h3 className="sell-product-title">{title}</h3>
				
				<p className="sell-product-description">{description}</p>

				<div className="sell-product-footer">
					<div className="product-price-section">
						{originalPrice && originalPrice > price && (
							<>
								<span className="price-original">
									Rp {originalPrice.toLocaleString('id-ID')}
								</span>
								<div className="save-amount">
									Save Rp {saveAmount.toLocaleString('id-ID')}
								</div>
							</>
						)}
						<span className="price-current">
							Rp {price.toLocaleString('id-ID')}
						</span>
					</div>
					
					<div className="view-details-link">
						<span>View Details</span>
						<FontAwesomeIcon icon={faArrowRight} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default SellProduct;