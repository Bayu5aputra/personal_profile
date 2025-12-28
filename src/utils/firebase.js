// Import fungsi yang dibutuhkan dari SDK
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Konfigurasi Firebase - menggunakan environment variables (lebih aman)
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyB1nzzukZL8BXg-pD7250z5FP0GFKbLrO0",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "planning-with-ai-ce3df.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "planning-with-ai-ce3df",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "planning-with-ai-ce3df.firebasestorage.app",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "21903232898",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:21903232898:web:f1c36a444b2e68b8a7099b"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);

// Inisialisasi Firestore (Database) dan Auth (Login)
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;