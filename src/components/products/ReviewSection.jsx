import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faUser, faCheckCircle, faKey, faSpinner } from "@fortawesome/free-solid-svg-icons";
import {
	getProductReviews,
	addReview,
	calculateAverageRating,
	getRatingDistribution,
	hasUserReviewed
} from "../../utils/reviewSystem";
import { validateKey, useKey } from "../../utils/keyDataSystem";
import "./styles/reviewSection.css";

const ReviewSection = ({ productId, onReviewAdded }) => {
	const [reviews, setReviews] = useState([]);
	const [averageRating, setAverageRating] = useState({ average: 0, count: 0 });
	const [distribution, setDistribution] = useState({});
	const [showForm, setShowForm] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [isSubmitting, setIsSubmitting] = useState(false);
	
	// Form state
	const [formData, setFormData] = useState({
		name: "",
		rating: 5,
		comment: "",
		keyData: ""
	});
	const [formError, setFormError] = useState("");
	const [formSuccess, setFormSuccess] = useState("");

	// Load reviews on mount
	useEffect(() => {
		loadReviews();
	}, [productId]);

	const loadReviews = async () => {
		setIsLoading(true);
		try {
			// Get reviews (will try Firebase first, then localStorage)
			const productReviews = await getProductReviews(productId);
			setReviews(productReviews);
			
			// Calculate statistics
			const avgRating = calculateAverageRating(productId);
			setAverageRating(avgRating);
			
			const dist = getRatingDistribution(productId);
			setDistribution(dist);
		} catch (error) {
			console.error("Error loading reviews:", error);
			setFormError("Failed to load reviews. Please refresh the page.");
		} finally {
			setIsLoading(false);
		}
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
		setFormError("");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		setFormError("");
		
		// Validation
		if (!formData.name.trim()) {
			setFormError("Please enter your name");
			setIsSubmitting(false);
			return;
		}
		
		if (!formData.keyData.trim()) {
			setFormError("Please enter your key data");
			setIsSubmitting(false);
			return;
		}
		
		// Validate key data
		const keyValidation = validateKey(formData.keyData);
		if (!keyValidation.valid) {
			setFormError(keyValidation.message);
			setIsSubmitting(false);
			return;
		}
		
		if (!formData.comment.trim()) {
			setFormError("Please write a review");
			setIsSubmitting(false);
			return;
		}
		
		if (formData.comment.trim().length < 10) {
			setFormError("Review must be at least 10 characters");
			setIsSubmitting(false);
			return;
		}
		
		// Check if user already reviewed
		if (hasUserReviewed(productId, formData.name)) {
			setFormError("You have already submitted a review for this product");
			setIsSubmitting(false);
			return;
		}
		
		try {
			// Mark key as used
			const keyUsed = useKey(formData.keyData, formData.name, productId);
			if (!keyUsed) {
				setFormError("Failed to use key. Please try again.");
				setIsSubmitting(false);
				return;
			}
			
			// Add review to Firebase (with localStorage fallback)
			const result = await addReview(productId, {
				name: formData.name,
				rating: formData.rating,
				comment: formData.comment
			});
			
			if (result.success) {
				// Reset form
				setFormData({
					name: "",
					rating: 5,
					comment: "",
					keyData: ""
				});
				
				const source = result.source === 'firebase' ? 'Firebase' : 'Local Storage';
				setFormSuccess(`Thank you for your review! It has been submitted successfully (Saved to ${source}).`);
				setShowForm(false);
				
				// Reload reviews
				await loadReviews();
				
				// Callback to parent untuk update rating di header
				if (onReviewAdded) {
					onReviewAdded();
				}
				
				// Clear success message after 5 seconds
				setTimeout(() => {
					setFormSuccess("");
				}, 5000);
			} else {
				setFormError("Failed to submit review. Please try again.");
			}
		} catch (error) {
			console.error("Error submitting review:", error);
			setFormError("An error occurred. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
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

	if (isLoading) {
		return (
			<div className="review-section">
				<div className="review-loading">
					<FontAwesomeIcon icon={faSpinner} spin size="2x" />
					<p>Loading reviews...</p>
				</div>
			</div>
		);
	}

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
								disabled={isSubmitting}
							/>
						</div>

						<div className="form-group">
							<label>
								Key Data *
								<span className="key-info-icon" title="You need a valid key to submit a review. Keys are single-use only.">
									<FontAwesomeIcon icon={faKey} />
								</span>
							</label>
							<input
								type="text"
								name="keyData"
								value={formData.keyData}
								onChange={handleInputChange}
								placeholder="Enter your key (e.g., XXXX-XXXX-XXXX)"
								className="form-input key-input"
								maxLength="14"
								disabled={isSubmitting}
							/>
							<small className="key-help">
								Enter the key provided to you. Each key can only be used once.
							</small>
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
								disabled={isSubmitting}
							/>
							<small className="char-count">
								{formData.comment.length} characters (minimum 10)
							</small>
						</div>

						{formError && (
							<div className="form-error">{formError}</div>
						)}

						<div className="form-actions">
							<button 
								type="submit" 
								className="submit-button"
								disabled={isSubmitting}
							>
								{isSubmitting ? (
									<>
										<FontAwesomeIcon icon={faSpinner} spin />
										<span>Submitting...</span>
									</>
								) : (
									<span>Submit Review</span>
								)}
							</button>
							<button 
								type="button" 
								className="cancel-button"
								onClick={() => {
									setShowForm(false);
									setFormError("");
									setFormData({ name: "", rating: 5, comment: "", keyData: "" });
								}}
								disabled={isSubmitting}
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
											{review.source && (
												<span className={`source-badge source-${review.source}`}>
													{review.source === 'firebase' ? '☁️ Cloud' : '💾 Local'}
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