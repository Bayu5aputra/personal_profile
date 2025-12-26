import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faShoppingCart,
	faStar,
	faEye,
	faFire,
} from "@fortawesome/free-solid-svg-icons";

import "./styles/sellProduct.css";

const SellProduct = ({
	id,
	title,
	description,
	price,
	originalPrice,
	image,
	rating,
	category,
	featured,
	sold,
}) => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`/product/${id}`);
	};

	const discount = originalPrice
		? Math.round(((originalPrice - price) / originalPrice) * 100)
		: 0;

	return (
		<div
			className={`sell-product ${featured ? "featured" : ""}`}
			onClick={handleClick}
		>
			<div className="sell-product-container">

				{/* Badge */}
				<div className="sell-product-badges">
					{featured && (
						<span className="badge badge-featured">⭐ Featured</span>
					)}
					{discount > 0 && (
						<span className="badge badge-discount">
							-{discount}%
						</span>
					)}
				</div>

				{/* Image */}
				<div className="sell-product-image-wrapper">
					<img
						src={image}
						alt={title}
						className="sell-product-image"
					/>
					<div className="sell-product-overlay">
						<FontAwesomeIcon icon={faEye} />
						<span>View Details</span>
					</div>
				</div>

				{/* Content */}
				<div className="sell-product-content">
					<div className="sell-product-category">{category}</div>
					<h3 className="sell-product-title">{title}</h3>
					<p className="sell-product-description">{description}</p>

					{/* Rating & Sold */}
					<div className="sell-product-stats">
						<div className="sell-product-rating">
							{[...Array(5)].map((_, i) => (
								<FontAwesomeIcon
									key={i}
									icon={faStar}
									className={
										i < rating ? "star-filled" : "star-empty"
									}
								/>
							))}
							<span className="rating-text">
								({rating}.0)
							</span>
						</div>

						{sold > 0 && (
							<div className="sold-badge">
								<FontAwesomeIcon icon={faFire} />
								<span>{sold} sold</span>
							</div>
						)}
					</div>

					{/* Price */}
					<div className="sell-product-footer">
						<div className="sell-product-price">
							{originalPrice && (
								<span className="price-original">
									Rp {originalPrice.toLocaleString("id-ID")}
								</span>
							)}
							<span className="price-current">
								Rp {price.toLocaleString("id-ID")}
							</span>
						</div>

						<button
							className="sell-product-button"
							onClick={handleClick}
						>
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
