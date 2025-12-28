// HYBRID Review System - Firebase (Primary) + localStorage (Fallback)
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
    console.log(`📊 Firebase Status: ${firebaseConnected ? '✅ Connected' : '❌ Disconnected'}`);
    return firebaseConnected;
  }
  
  console.log("🔍 Testing Firebase connection...");
  
  try {
    // Try to write a test document
    const testRef = doc(db, 'connection_test', 'test_' + Date.now());
    await setDoc(testRef, {
      timestamp: serverTimestamp(),
      message: 'Connection test successful'
    });
    
    firebaseConnected = true;
    connectionTested = true;
    console.log("✅ Firebase connection test PASSED");
    console.log("🎉 You are connected to Firebase!");
    return true;
  } catch (error) {
    firebaseConnected = false;
    connectionTested = true;
    console.error("❌ Firebase connection test FAILED:", error);
    console.error("   Error code:", error.code);
    console.error("   Error message:", error.message);
    console.log("⚠️ Falling back to localStorage mode");
    return false;
  }
};

// ============================================
// FIREBASE FUNCTIONS (Primary)
// ============================================

// Add review to Firebase
export const addReviewToFirebase = async (productId, reviewData) => {
  try {
    console.log("📤 Attempting to add review to Firebase...");
    
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
    
    console.log("✅ Review added to Firebase successfully!");
    console.log("   Document ID:", docRef.id);
    return { success: true, id: docRef.id, source: 'firebase' };
  } catch (error) {
    console.error("❌ Failed to add review to Firebase:", error);
    console.error("   Error code:", error.code);
    console.error("   Error message:", error.message);
    return { success: false, error, source: 'firebase' };
  }
};

// Get reviews from Firebase
export const getReviewsFromFirebase = async (productId) => {
  try {
    console.log(`📥 Fetching reviews for product ${productId} from Firebase...`);
    
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
    
    console.log(`✅ Successfully loaded ${reviews.length} reviews from Firebase`);
    return { success: true, reviews, source: 'firebase' };
  } catch (error) {
    console.error("❌ Failed to get reviews from Firebase:", error);
    console.error("   Error code:", error.code);
    console.error("   Error message:", error.message);
    
    // Special handling for index error
    if (error.code === 'failed-precondition' || error.message.includes('index')) {
      console.log("\n🔗 INDEX REQUIRED:");
      console.log("   Firebase needs to create an index for this query.");
      console.log("   The index will be created automatically on first query.");
      console.log("   If you see a link in the error above, click it to create the index faster.\n");
    }
    
    return { success: false, reviews: [], error, source: 'firebase' };
  }
};

// ============================================
// LOCALSTORAGE FUNCTIONS (Fallback)
// ============================================

// Get reviews from localStorage
export const getReviewsFromLocalStorage = (productId) => {
  const reviews = localStorage.getItem(`product_reviews_${productId}`);
  const parsed = reviews ? JSON.parse(reviews) : [];
  console.log(`💾 Loaded ${parsed.length} reviews from localStorage`);
  return parsed;
};

// Add review to localStorage
export const addReviewToLocalStorage = (productId, reviewData) => {
  console.log("💾 Adding review to localStorage...");
  
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
  
  console.log("✅ Review added to localStorage successfully!");
  return { success: true, review: newReview, source: 'localStorage' };
};

// ============================================
// HYBRID FUNCTIONS (Main API)
// ============================================

// Main function: Add review (Try Firebase, fallback to localStorage)
export const addReview = async (productId, reviewData) => {
  console.log("\n📝 Starting review submission...");
  console.log("   Product ID:", productId);
  console.log("   Reviewer:", reviewData.name);
  console.log("   Rating:", reviewData.rating);
  
  // Test connection first
  await testFirebaseConnection();
  
  // Try Firebase if connected
  if (firebaseConnected) {
    console.log("🔥 Using Firebase (primary)");
    const firebaseResult = await addReviewToFirebase(productId, reviewData);
    
    if (firebaseResult.success) {
      // Also save to localStorage as backup
      addReviewToLocalStorage(productId, reviewData);
      console.log("🎉 Review submission complete (Firebase + localStorage backup)\n");
      return firebaseResult;
    }
  }
  
  // Fallback to localStorage if Firebase fails
  console.log("⚠️ Falling back to localStorage mode");
  const result = addReviewToLocalStorage(productId, reviewData);
  console.log("🎉 Review submission complete (localStorage only)\n");
  return result;
};

// Main function: Get reviews (Try Firebase, fallback to localStorage)
export const getProductReviews = async (productId) => {
  console.log(`\n📖 Loading reviews for product ${productId}...`);
  
  // Test connection first
  await testFirebaseConnection();
  
  // Try Firebase if connected
  if (firebaseConnected) {
    console.log("🔥 Attempting to load from Firebase...");
    const firebaseResult = await getReviewsFromFirebase(productId);
    
    if (firebaseResult.success && firebaseResult.reviews.length > 0) {
      // Cache to localStorage for offline access
      localStorage.setItem(
        `product_reviews_${productId}`, 
        JSON.stringify(firebaseResult.reviews)
      );
      console.log("💾 Cached reviews to localStorage for offline access");
      console.log("🎉 Reviews loaded successfully from Firebase\n");
      return firebaseResult.reviews;
    }
  }
  
  // Fallback to localStorage
  console.log("💾 Loading from localStorage...");
  const reviews = getReviewsFromLocalStorage(productId);
  console.log("🎉 Reviews loaded successfully from localStorage\n");
  return reviews;
};

// ============================================
// CALCULATION FUNCTIONS
// ============================================

// Calculate average rating
export const calculateAverageRating = (productId) => {
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
// SYNC FUNCTION
// ============================================

export const syncLocalStorageToFirebase = async () => {
  console.log("\n🔄 Starting sync from localStorage to Firebase...");
  
  // Test connection first
  const isConnected = await testFirebaseConnection();
  if (!isConnected) {
    console.log("❌ Cannot sync: Firebase not connected\n");
    return { success: false, message: "Firebase not connected" };
  }
  
  try {
    const allKeys = Object.keys(localStorage).filter(key => 
      key.startsWith('product_reviews_')
    );
    
    let syncCount = 0;
    
    for (const key of allKeys) {
      const productId = key.replace('product_reviews_', '');
      const reviews = JSON.parse(localStorage.getItem(key) || '[]');
      
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
    
    console.log(`✅ Sync completed: ${syncCount} reviews uploaded to Firebase\n`);
    return { success: true, count: syncCount };
  } catch (error) {
    console.error("❌ Sync failed:", error);
    return { success: false, error };
  }
};