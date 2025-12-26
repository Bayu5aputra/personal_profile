import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faUser, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import {
	getProductReviews,
	addReview,
	calculateAverageRating,
	getRatingDistribution,
	hasUserReviewed
} from "../../utils/reviewSystem";
import "./styles/reviewSection.css";

const ReviewSection = ({ productId }) => {
	const [reviews, setReviews] = useState([]);
	const [averageRating, setAverageRating] = useState({ average: 0, count: 0 });
	const [distribution, setDistribution] = useState({});
	const [showForm, setShowForm] = useState(false);
	
	// Form state
	const [formData, setFormData] = useState({
		name: "",
		rating: 5,
		comment: ""
	});
	const [formError, setFormError] = useState("");
	const [formSuccess, setFormSuccess] = useState("");

	// Load reviews on mount
	useEffect(() => {
		loadReviews();
	}, [productId]);

	const loadReviews = () => {
		const productReviews = getProductReviews(productId);
		setReviews(productReviews);
		
		const avgRating = calculateAverageRating(productId);
		setAverageRating(avgRating);
		
		const dist = getRatingDistribution(productId);
		setDistribution(dist);
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
		setFormError("");
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		
		// Validation
		if (!formData.name.trim()) {
			setFormError("Please enter your name");
			return;
		}
		
		if (!formData.comment.trim()) {
			setFormError("Please write a review");
			return;
		}
		
		if (formData.comment.trim().length < 10) {
			setFormError("Review must be at least 10 characters");
			return;
		}
		
		// Check if user already reviewed
		if (hasUserReviewed(productId, formData.name)) {
			setFormError("You have already submitted a review for this product");
			return;
		}
		
		// Add review
		addReview(productId, formData);
		
		// Reset form
		setFormData({
			name: "",
			rating: 5,
			comment: ""
		});
		
		setFormSuccess("Thank you for your review! It has been submitted successfully.");
		setShowForm(false);
		
		// Reload reviews
		loadReviews();
		
		// Clear success message after 3 seconds
		setTimeout(() => {
			setFormSuccess("");
		}, 3000);
	};

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', { 
			year: 'numeric', 
			month: 'long', 
			day: 'numeric' 
		});
	};

	const renderStars = (rating, interactive = false, onRatingChange = null) => {
		return [...Array(5)].map((_, index) => (
			<FontAwesomeIcon
				key={index}
				icon={faStar}
				className={`star ${index < rating ? 'star-filled' : 'star-empty'} ${interactive ? 'star-interactive' : ''}`}
				onClick={interactive && onRatingChange ? () => onRatingChange(index + 1) : null}
			/>
		));
	};

	return (
		<div className="review-section">
			<div className="review-header">
				<h2 className="review-title">Customer Reviews</h2>
				
				{/* Overall Rating Summary */}
				<div className="rating-summary">
					<div className="rating-summary-left">
						<div className="overall-rating">
							{averageRating.average > 0 ? averageRating.average.toFixed(1) : '0.0'}
						</div>
						<div className="overall-stars">
							{renderStars(Math.round(averageRating.average))}
						</div>
						<div className="total-reviews">
							Based on {averageRating.count} {averageRating.count === 1 ? 'review' : 'reviews'}
						</div>
					</div>
					
					{/* Rating Distribution */}
					<div className="rating-distribution">
						{[5, 4, 3, 2, 1].map(star => {
							const count = distribution[star] || 0;
							const percentage = averageRating.count > 0 
								? (count / averageRating.count * 100).toFixed(0) 
								: 0;
							
							return (
								<div key={star} className="distribution-row">
									<span className="star-label">{star} ★</span>
									<div className="distribution-bar">
										<div 
											className="distribution-fill" 
											style={{ width: `${percentage}%` }}
										></div>
									</div>
									<span className="distribution-count">{count}</span>
								</div>
							);
						})}
					</div>
				</div>
			</div>

			{/* Success Message */}
			{formSuccess && (
				<div className="review-success-message">
					<FontAwesomeIcon icon={faCheckCircle} />
					<span>{formSuccess}</span>
				</div>
			)}

			{/* Write Review Button */}
			{!showForm && (
				<button 
					className="write-review-button"
					onClick={() => setShowForm(true)}
				>
					Write a Review
				</button>
			)}

			{/* Review Form */}
			{showForm && (
				<div className="review-form-container">
					<h3>Write Your Review</h3>
					<form onSubmit={handleSubmit} className="review-form">
						<div className="form-group">
							<label>Your Name *</label>
							<input
								type="text"
								name="name"
								value={formData.name}
								onChange={handleInputChange}
								placeholder="Enter your name"
								className="form-input"
							/>
						</div>

						<div className="form-group">
							<label>Your Rating *</label>
							<div className="rating-input">
								{renderStars(formData.rating, true, (rating) => 
									setFormData(prev => ({ ...prev, rating }))
								)}
							</div>
						</div>

						<div className="form-group">
							<label>Your Review *</label>
							<textarea
								name="comment"
								value={formData.comment}
								onChange={handleInputChange}
								placeholder="Share your experience with this product..."
								rows="5"
								className="form-textarea"
							/>
							<small className="char-count">
								{formData.comment.length} characters (minimum 10)
							</small>
						</div>

						{formError && (
							<div className="form-error">{formError}</div>
						)}

						<div className="form-actions">
							<button type="submit" className="submit-button">
								Submit Review
							</button>
							<button 
								type="button" 
								className="cancel-button"
								onClick={() => {
									setShowForm(false);
									setFormError("");
									setFormData({ name: "", rating: 5, comment: "" });
								}}
							>
								Cancel
							</button>
						</div>
					</form>
				</div>
			)}

			{/* Reviews List */}
			<div className="reviews-list">
				{reviews.length === 0 ? (
					<div className="no-reviews">
						<p>No reviews yet. Be the first to review this product!</p>
					</div>
				) : (
					reviews.map(review => (
						<div key={review.id} className="review-item">
							<div className="review-item-header">
								<div className="reviewer-info">
									<div className="reviewer-avatar">
										<FontAwesomeIcon icon={faUser} />
									</div>
									<div className="reviewer-details">
										<div className="reviewer-name">
											{review.name}
											{review.verified && (
												<span className="verified-badge">
													<FontAwesomeIcon icon={faCheckCircle} />
													Verified
												</span>
											)}
										</div>
										<div className="review-date">{formatDate(review.date)}</div>
									</div>
								</div>
								<div className="review-rating">
									{renderStars(review.rating)}
								</div>
							</div>
							<div className="review-comment">
								{review.comment}
							</div>
						</div>
					))
				)}
			</div>
		</div>
	);
};

export default ReviewSection;