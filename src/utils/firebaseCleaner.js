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
    console.error('❌ Clear reviews failed:', error.message);
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
    console.error('❌ Clear keys failed:', error.message);
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
    console.error('❌ Clear tests failed:', error.message);
    return { success: false, error: error.message };
  }
};

// Clear ALL Firebase data (USE WITH CAUTION!)
export const clearAllFirebaseData = async () => {
  try {
    const reviews = await clearAllReviews();
    const keys = await clearAllKeys();
    const tests = await clearConnectionTests();
    
    console.log(`✅ Cleared: ${reviews.count} reviews, ${keys.count} keys, ${tests.count} tests`);
    
    return {
      success: true,
      reviews: reviews.count,
      keys: keys.count,
      tests: tests.count
    };
  } catch (error) {
    console.error('❌ Clear all failed:', error.message);
    return { success: false, error: error.message };
  }
};

// Expose to window - SILENT MODE (no startup logs)
if (typeof window !== 'undefined') {
  window.firebaseCleaner = {
    clearAllReviews,
    clearAllKeys,
    clearConnectionTests,
    clearAllFirebaseData
  };
}