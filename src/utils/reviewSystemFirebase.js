import { db } from './firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where,
  orderBy 
} from 'firebase/firestore';

// Add review to Firebase
export const addReview = async (productId, reviewData) => {
  try {
    const docRef = await addDoc(collection(db, 'reviews'), {
      productId,
      name: reviewData.name,
      rating: reviewData.rating,
      comment: reviewData.comment,
      date: new Date().toISOString(),
      verified: false
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding review:", error);
    return { success: false, error };
  }
};

// Get reviews from Firebase
export const getProductReviews = async (productId) => {
  try {
    const q = query(
      collection(db, 'reviews'),
      where('productId', '==', productId),
      orderBy('date', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const reviews = [];
    querySnapshot.forEach((doc) => {
      reviews.push({ id: doc.id, ...doc.data() });
    });
    return reviews;
  } catch (error) {
    console.error("Error getting reviews:", error);
    return [];
  }
};

// Calculate average rating
export const calculateAverageRating = async (productId) => {
  const reviews = await getProductReviews(productId);
  if (reviews.length === 0) {
    return { average: 0, count: 0 };
  }
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return {
    average: Math.round((sum / reviews.length) * 10) / 10,
    count: reviews.length
  };
};