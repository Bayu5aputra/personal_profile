import { auth, googleProvider } from './firebase';
import { 
  signInWithPopup, 
  signOut as firebaseSignOut,
  onAuthStateChanged 
} from 'firebase/auth';
import { db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';

// Check if user is authorized in Firebase
export const isUserAuthorized = async (email) => {
  try {
    const userRef = doc(db, 'authorized_users', email.toLowerCase());
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      return {
        authorized: true,
        name: userDoc.data().name || ''
      };
    }
    
    return { authorized: false };
  } catch (error) {
    console.error("Check authorization failed:", error.message);
    return { authorized: false };
  }
};

// Sign in with Google
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Check if user is authorized in Firebase
    const authCheck = await isUserAuthorized(user.email);
    
    if (!authCheck.authorized) {
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
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      const authCheck = await isUserAuthorized(user.email);
      
      if (authCheck.authorized) {
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
    } else {
      callback({ authenticated: false, user: null });
    }
  });
};

// Get current user
export const getCurrentUser = async () => {
  const user = auth.currentUser;
  
  if (user) {
    const authCheck = await isUserAuthorized(user.email);
    
    if (authCheck.authorized) {
      return {
        authenticated: true,
        user: {
          email: user.email,
          name: user.displayName,
          photo: user.photoURL
        }
      };
    }
  }
  
  return { authenticated: false, user: null };
};