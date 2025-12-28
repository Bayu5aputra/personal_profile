// Import fungsi yang dibutuhkan dari SDK
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Konfigurasi Firebase
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyB1nzzukZL8BXg-pD7250z5FP0GFKbLrO0",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "planning-with-ai-ce3df.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "planning-with-ai-ce3df",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "planning-with-ai-ce3df.firebasestorage.app",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "21903232898",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:21903232898:web:f1c36a444b2e68b8a7099b"
};

// Inisialisasi Firebase
let app;
let db;
let auth;
let googleProvider;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  auth = getAuth(app);
  googleProvider = new GoogleAuthProvider();
  
  // HAPUS log ini atau ganti dengan yang lebih sederhana
  // console.log("✅ Firebase connection successful");
} catch (error) {
  console.error("❌ Firebase init failed:", error.message);
}

export { db, auth, googleProvider };
export default app;