// Review System using localStorage (No Database Required)

// Get all reviews for a product
export const getProductReviews = (productId) => {
	const reviews = localStorage.getItem(`product_reviews_${productId}`);
	return reviews ? JSON.parse(reviews) : [];
};

// Add a new review
export const addReview = (productId, reviewData) => {
	const reviews = getProductReviews(productId);
	
	const newReview = {
		id: Date.now(),
		productId,
		name: reviewData.name,
		rating: reviewData.rating,
		comment: reviewData.comment,
		date: new Date().toISOString(),
		verified: false // Bisa diset true untuk review yang terverifikasi
	};
	
	reviews.push(newReview);
	localStorage.setItem(`product_reviews_${productId}`, JSON.stringify(reviews));
	
	return newReview;
};

// Calculate average rating from reviews
export const calculateAverageRating = (productId) => {
	const reviews = getProductReviews(productId);
	
	if (reviews.length === 0) {
		return { average: 0, count: 0 };
	}
	
	const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
	const average = sum / reviews.length;
	
	return {
		average: Math.round(average * 10) / 10, // Round to 1 decimal
		count: reviews.length
	};
};

// Get rating distribution (how many 5-star, 4-star, etc.)
export const getRatingDistribution = (productId) => {
	const reviews = getProductReviews(productId);
	
	const distribution = {
		5: 0,
		4: 0,
		3: 0,
		2: 0,
		1: 0
	};
	
	reviews.forEach(review => {
		distribution[review.rating]++;
	});
	
	return distribution;
};

// Delete a review (optional - untuk admin)
export const deleteReview = (productId, reviewId) => {
	const reviews = getProductReviews(productId);
	const filteredReviews = reviews.filter(review => review.id !== reviewId);
	localStorage.setItem(`product_reviews_${productId}`, JSON.stringify(filteredReviews));
};

// Check if user has already reviewed (by name - simple approach)
export const hasUserReviewed = (productId, userName) => {
	const reviews = getProductReviews(productId);
	return reviews.some(review => review.name.toLowerCase() === userName.toLowerCase());
};