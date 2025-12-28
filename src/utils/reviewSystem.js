// HYBRID Review System - Firebase (Primary) + localStorage (Fallback)
// Sistem akan otomatis fallback ke localStorage jika Firebase gagal

import { db } from './firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where,
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';

// ============================================
// FIREBASE FUNCTIONS (Primary)
// ============================================

// Add review to Firebase
export const addReviewToFirebase = async (productId, reviewData) => {
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
    
    console.log("✅ Review added to Firebase:", docRef.id);
    return { success: true, id: docRef.id, source: 'firebase' };
  } catch (error) {
    console.error("❌ Error adding review to Firebase:", error);
    return { success: false, error, source: 'firebase' };
  }
};

// Get reviews from Firebase
export const getReviewsFromFirebase = async (productId) => {
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
    
    console.log(`✅ Loaded ${reviews.length} reviews from Firebase`);
    return { success: true, reviews, source: 'firebase' };
  } catch (error) {
    console.error("❌ Error getting reviews from Firebase:", error);
    return { success: false, reviews: [], error, source: 'firebase' };
  }
};

// ============================================
// LOCALSTORAGE FUNCTIONS (Fallback)
// ============================================

// Get reviews from localStorage
export const getReviewsFromLocalStorage = (productId) => {
  const reviews = localStorage.getItem(`product_reviews_${productId}`);
  return reviews ? JSON.parse(reviews) : [];
};

// Add review to localStorage
export const addReviewToLocalStorage = (productId, reviewData) => {
  const reviews = getReviewsFromLocalStorage(productId);
  
  const newReview = {
    id: Date.now(),
    productId: parseInt(productId),
    name: reviewData.name,
    rating: reviewData.rating,
    comment: reviewData.comment,
    date: new Date().toISOString(),
    verified: false,
    source: 'localStorage'
  };
  
  reviews.push(newReview);
  localStorage.setItem(`product_reviews_${productId}`, JSON.stringify(reviews));
  
  console.log("✅ Review added to localStorage");
  return { success: true, review: newReview, source: 'localStorage' };
};

// ============================================
// HYBRID FUNCTIONS (Main API)
// ============================================

// Main function: Add review (Try Firebase, fallback to localStorage)
export const addReview = async (productId, reviewData) => {
  // Try Firebase first
  const firebaseResult = await addReviewToFirebase(productId, reviewData);
  
  if (firebaseResult.success) {
    // Juga simpan ke localStorage sebagai backup
    addReviewToLocalStorage(productId, reviewData);
    return firebaseResult;
  }
  
  // Fallback to localStorage if Firebase fails
  console.log("⚠️ Falling back to localStorage");
  return addReviewToLocalStorage(productId, reviewData);
};

// Main function: Get reviews (Try Firebase, fallback to localStorage)
export const getProductReviews = async (productId) => {
  // Try Firebase first
  const firebaseResult = await getReviewsFromFirebase(productId);
  
  if (firebaseResult.success && firebaseResult.reviews.length > 0) {
    // Cache to localStorage for offline access
    localStorage.setItem(
      `product_reviews_${productId}`, 
      JSON.stringify(firebaseResult.reviews)
    );
    return firebaseResult.reviews;
  }
  
  // Fallback to localStorage if Firebase fails or empty
  console.log("⚠️ Falling back to localStorage");
  return getReviewsFromLocalStorage(productId);
};

// ============================================
// CALCULATION FUNCTIONS
// ============================================

// Calculate average rating
export const calculateAverageRating = (productId) => {
  // Gunakan data dari localStorage untuk kalkulasi cepat
  const reviews = getReviewsFromLocalStorage(productId);
  
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
export const getRatingDistribution = (productId) => {
  const reviews = getReviewsFromLocalStorage(productId);
  
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
export const hasUserReviewed = (productId, userName) => {
  const reviews = getReviewsFromLocalStorage(productId);
  return reviews.some(review => 
    review.name.toLowerCase() === userName.toLowerCase()
  );
};

// ============================================
// SYNC FUNCTION (Optional - untuk sync localStorage ke Firebase)
// ============================================

export const syncLocalStorageToFirebase = async () => {
  console.log("🔄 Starting sync from localStorage to Firebase...");
  
  try {
    // Get all products with reviews from localStorage
    const allKeys = Object.keys(localStorage).filter(key => 
      key.startsWith('product_reviews_')
    );
    
    let syncCount = 0;
    
    for (const key of allKeys) {
      const productId = key.replace('product_reviews_', '');
      const reviews = JSON.parse(localStorage.getItem(key) || '[]');
      
      // Upload reviews that are from localStorage only
      for (const review of reviews) {
        if (review.source === 'localStorage') {
          const result = await addReviewToFirebase(productId, {
            name: review.name,
            rating: review.rating,
            comment: review.comment
          });
          
          if (result.success) {
            syncCount++;
          }
        }
      }
    }
    
    console.log(`✅ Sync completed: ${syncCount} reviews uploaded to Firebase`);
    return { success: true, count: syncCount };
  } catch (error) {
    console.error("❌ Sync failed:", error);
    return { success: false, error };
  }
};