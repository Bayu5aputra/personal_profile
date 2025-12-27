// Import fungsi yang dibutuhkan dari SDK
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Konfigurasi Firebase asli milikmu
const firebaseConfig = {
  apiKey: "AIzaSyB1nzzukZL8BXg-pD7250z5FP0GFKbLrO0",
  authDomain: "planning-with-ai-ce3df.firebaseapp.com",
  projectId: "planning-with-ai-ce3df",
  storageBucket: "planning-with-ai-ce3df.firebasestorage.app",
  messagingSenderId: "21903232898",
  appId: "1:21903232898:web:f1c36a444b2e68b8a7099b"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);

// Inisialisasi Firestore (Database) dan Auth (Login)
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;