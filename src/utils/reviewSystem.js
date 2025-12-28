import { db } from './firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where,
  orderBy,
  serverTimestamp,
  doc,
  setDoc
} from 'firebase/firestore';

// ============================================
// CONNECTION TESTING
// ============================================

let firebaseConnected = false;
let connectionTested = false;

// Test Firebase connection
export const testFirebaseConnection = async () => {
  if (connectionTested) {
    return firebaseConnected;
  }
  
  try {
    const testRef = doc(db, 'connection_test', 'test_' + Date.now());
    await setDoc(testRef, {
      timestamp: serverTimestamp(),
      message: 'Connection test successful'
    });
    
    firebaseConnected = true;
    connectionTested = true;
    console.log("✅ Firebase reviews ready");
    return true;
  } catch (error) {
    firebaseConnected = false;
    connectionTested = true;
    console.error("❌ Firebase reviews failed:", error.message);
    return false;
  }
};

// ============================================
// FIREBASE FUNCTIONS
// ============================================

// Add review to Firebase
export const addReview = async (productId, reviewData) => {
  try {
    const docRef = await addDoc(collection(db, 'reviews'), {
      productId: parseInt(productId),
      name: reviewData.name,
      rating: reviewData.rating,
      comment: reviewData.comment,
      date: serverTimestamp(),
      dateString: new Date().toISOString(),
      verified: false,
      source: 'firebase'
    });
    
    return { success: true, id: docRef.id, source: 'firebase' };
  } catch (error) {
    console.error("Failed to add review:", error.message);
    return { success: false, error, source: 'firebase' };
  }
};

// Get reviews from Firebase
export const getProductReviews = async (productId) => {
  try {
    const q = query(
      collection(db, 'reviews'),
      where('productId', '==', parseInt(productId)),
      orderBy('dateString', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const reviews = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      reviews.push({
        id: doc.id,
        ...data,
        date: data.dateString || new Date().toISOString()
      });
    });
    
    return reviews;
  } catch (error) {
    console.error("Failed to get reviews:", error.message);
    return [];
  }
};

// ============================================
// CALCULATION FUNCTIONS
// ============================================

// Calculate average rating
export const calculateAverageRating = async (productId) => {
  const reviews = await getProductReviews(productId);
  
  if (reviews.length === 0) {
    return { average: 0, count: 0 };
  }
  
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  const average = sum / reviews.length;
  
  return {
    average: Math.round(average * 10) / 10,
    count: reviews.length
  };
};

// Get rating distribution
export const getRatingDistribution = async (productId) => {
  const reviews = await getProductReviews(productId);
  
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

// Check if user has already reviewed
export const hasUserReviewed = async (productId, userName) => {
  const reviews = await getProductReviews(productId);
  return reviews.some(review => 
    review.name.toLowerCase() === userName.toLowerCase()
  );
};