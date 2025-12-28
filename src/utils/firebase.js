// Import fungsi yang dibutuhkan dari SDK
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Konfigurasi Firebase
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyB1nzzukZL8BXg-pD7250z5FP0GFKbLrO0",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "planning-with-ai-ce3df.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "planning-with-ai-ce3df",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "planning-with-ai-ce3df.firebasestorage.app",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "21903232898",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:21903232898:web:f1c36a444b2e68b8a7099b"
};

// Log Firebase Configuration (HANYA PROJECT ID untuk keamanan)
console.log("🔥 Firebase Configuration:");
console.log("   Project ID:", firebaseConfig.projectId);
console.log("   Auth Domain:", firebaseConfig.authDomain);

// Inisialisasi Firebase
let app;
let db;
let auth;

try {
  app = initializeApp(firebaseConfig);
  console.log("✅ Firebase App initialized successfully");
  
  // Inisialisasi Firestore
  db = getFirestore(app);
  console.log("✅ Firestore initialized successfully");
  
  // Inisialisasi Auth
  auth = getAuth(app);
  console.log("✅ Firebase Auth initialized successfully");
  
  console.log("🎉 All Firebase services are ready!");
} catch (error) {
  console.error("❌ Firebase initialization error:", error);
  console.error("   Error code:", error.code);
  console.error("   Error message:", error.message);
}

export { db, auth };
export default app;