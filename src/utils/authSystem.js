import { auth, googleProvider } from './firebase';
import { 
  signInWithPopup, 
  signOut as firebaseSignOut,
  onAuthStateChanged 
} from 'firebase/auth';

// Allowed emails untuk akses Key Data Management
const ALLOWED_EMAILS = [
  'bayusaputra.005.003@gmail.com',
  // Tambahkan email lain di sini jika diperlukan
];

// Check if email is allowed
export const isEmailAllowed = (email) => {
  return ALLOWED_EMAILS.includes(email.toLowerCase());
};

// Sign in with Google
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    if (!isEmailAllowed(user.email)) {
      await firebaseSignOut(auth);
      return {
        success: false,
        message: 'Your email is not authorized to access this system'
      };
    }
    
    return {
      success: true,
      user: {
        email: user.email,
        name: user.displayName,
        photo: user.photoURL
      }
    };
  } catch (error) {
    console.error("Google sign in failed:", error.message);
    return {
      success: false,
      message: error.message
    };
  }
};

// Sign out
export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
    return { success: true };
  } catch (error) {
    console.error("Sign out failed:", error.message);
    return { success: false };
  }
};

// Listen to auth state changes
export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, (user) => {
    if (user && isEmailAllowed(user.email)) {
      callback({
        authenticated: true,
        user: {
          email: user.email,
          name: user.displayName,
          photo: user.photoURL
        }
      });
    } else {
      callback({ authenticated: false, user: null });
    }
  });
};

// Get current user
export const getCurrentUser = () => {
  const user = auth.currentUser;
  if (user && isEmailAllowed(user.email)) {
    return {
      authenticated: true,
      user: {
        email: user.email,
        name: user.displayName,
        photo: user.photoURL
      }
    };
  }
  return { authenticated: false, user: null };
};