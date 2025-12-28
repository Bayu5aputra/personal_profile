// TEST FILE: src/utils/firebaseTest.js
// Jalankan ini untuk test koneksi Firebase

import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';

export const testFirebaseConnection = async () => {
  try {
    console.log("🔍 Testing Firebase connection...");
    
    // Try to add a test document
    const docRef = await addDoc(collection(db, 'test'), {
      message: 'Firebase connection test',
      timestamp: new Date().toISOString()
    });
    
    console.log("✅ Firebase connected successfully! Doc ID:", docRef.id);
    return { success: true, docId: docRef.id };
  } catch (error) {
    console.error("❌ Firebase connection failed:", error);
    return { success: false, error: error.message };
  }
};

// Uncomment untuk auto-test saat import
// testFirebaseConnection();