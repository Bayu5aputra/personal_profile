import { db } from './firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

// Clear all reviews
export const clearAllReviews = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'reviews'));
    let deleteCount = 0;
    
    for (const document of querySnapshot.docs) {
      await deleteDoc(doc(db, 'reviews', document.id));
      deleteCount++;
    }
    
    return { success: true, count: deleteCount };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Clear all keys
export const clearAllKeys = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'review_keys'));
    let deleteCount = 0;
    
    for (const document of querySnapshot.docs) {
      await deleteDoc(doc(db, 'review_keys', document.id));
      deleteCount++;
    }
    
    return { success: true, count: deleteCount };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Clear connection test documents
export const clearConnectionTests = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'connection_test'));
    let deleteCount = 0;
    
    for (const document of querySnapshot.docs) {
      await deleteDoc(doc(db, 'connection_test', document.id));
      deleteCount++;
    }
    
    return { success: true, count: deleteCount };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Clear ALL Firebase data (USE WITH CAUTION!)
export const clearAllFirebaseData = async () => {
  try {
    const reviews = await clearAllReviews();
    const keys = await clearAllKeys();
    const tests = await clearConnectionTests();
    
    return {
      success: true,
      reviews: reviews.count,
      keys: keys.count,
      tests: tests.count
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// DO NOT expose to window in production
// For development only, comment out in production
if (process.env.NODE_ENV === 'development') {
  window.firebaseCleaner = {
    clearAllReviews,
    clearAllKeys,
    clearConnectionTests,
    clearAllFirebaseData
  };
}