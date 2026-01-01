import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { calculateAverageRating } from "../../utils/reviewSystem";

import "./styles/sellProduct.css";

const SellProduct = (props) => {
	const navigate = useNavigate();
	const { id, image, title, description, price, originalPrice, category, featured } = props;
	
	const [ratingData, setRatingData] = useState({ average: 0, count: 0 });
	
	useEffect(() => {
		const loadRating = async () => {
			const rating = await calculateAverageRating(id);
			setRatingData(rating);
		};
		loadRating();
	}, [id]);
	
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

	const renderStars = () => {
		const stars = [];
		const roundedRating = Math.round(ratingData.average);
		
		for (let i = 1; i <= 5; i++) {
			stars.push(
				<FontAwesomeIcon
					key={i}
					icon={faStar}
					className={i <= roundedRating ? "star-filled" : "star-empty"}
				/>
			);
		}
		
		return stars;
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
			</div>

			<div className="sell-product-content">
				<div className="product-rating-inline">
					<div className="product-rating-stars">
						{renderStars()}
					</div>
					<span className="rating-count">
						({ratingData.average.toFixed(1)})
					</span>
					{ratingData.count > 0 && (
						<span className="sold-count-inline">
							{ratingData.count} sold
						</span>
					)}
				</div>

				<h3 className="sell-product-title">{title}</h3>
				
				<p className="sell-product-description">{description}</p>

				<div className="sell-product-footer">
					<div className="product-price-section">
						{originalPrice && originalPrice > price ? (
							<div className="prices-container">
								{/* BARIS PERTAMA: Save dulu, lalu harga lama */}
								<div className="discount-row">
									<span className="save-amount">
										Save Rp {saveAmount.toLocaleString('id-ID')}
									</span>
									<span className="price-original">
										Rp {originalPrice.toLocaleString('id-ID')}
									</span>
								</div>
								
								{/* BARIS KEDUA: Harga sekarang */}
								<div className="price-row price-current-row">
									<span className="price-currency">Rp</span>
									<span className="price-current">
										{price.toLocaleString('id-ID')}
									</span>
								</div>
							</div>
						) : (
							/* Hanya harga normal (tidak ada diskon) */
							<div className="price-row price-current-row">
								<span className="price-currency">Rp</span>
								<span className="price-current">
									{price.toLocaleString('id-ID')}
								</span>
							</div>
						)}
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