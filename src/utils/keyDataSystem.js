import { db } from './firebase';
import { 
  collection, 
  addDoc, 
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
  updateDoc,
  serverTimestamp
} from 'firebase/firestore';

// Generate random key (format: XXXX-XXXX-XXXX)
export const generateKey = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const segments = 3;
  const segmentLength = 4;
  
  let key = '';
  for (let i = 0; i < segments; i++) {
    if (i > 0) key += '-';
    for (let j = 0; j < segmentLength; j++) {
      key += chars.charAt(Math.floor(Math.random() * chars.length));
    }
  }
  
  return key;
};

// Get all keys from Firebase
export const getAllKeys = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'review_keys'));
    const keys = [];
    
    querySnapshot.forEach((doc) => {
      keys.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return keys;
  } catch (error) {
    console.error("Failed to get keys:", error.message);
    return [];
  }
};

// Add new keys to Firebase
export const addKeys = async (count = 1) => {
  try {
    const newKeys = [];
    
    for (let i = 0; i < count; i++) {
      const keyData = {
        key: generateKey(),
        used: false,
        usedBy: null,
        usedAt: null,
        productId: null,
        createdAt: serverTimestamp(),
        protected: false
      };
      
      const docRef = await addDoc(collection(db, 'review_keys'), keyData);
      newKeys.push({ id: docRef.id, ...keyData });
    }
    
    return newKeys;
  } catch (error) {
    console.error("Failed to add keys:", error.message);
    return [];
  }
};

// Validate key
export const validateKey = async (keyToValidate) => {
  try {
    const q = query(
      collection(db, 'review_keys'),
      where('key', '==', keyToValidate.toUpperCase())
    );
    
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return { valid: false, message: 'Invalid key' };
    }
    
    const keyData = querySnapshot.docs[0].data();
    
    if (keyData.used) {
      return { valid: false, message: 'This key has already been used' };
    }
    
    return { valid: true, message: 'Valid key', id: querySnapshot.docs[0].id };
  } catch (error) {
    console.error("Failed to validate key:", error.message);
    return { valid: false, message: 'Validation error' };
  }
};

// Mark key as used
export const useKey = async (keyToUse, userName, productId) => {
  try {
    const validation = await validateKey(keyToUse);
    
    if (!validation.valid) {
      return false;
    }
    
    const keyRef = doc(db, 'review_keys', validation.id);
    await updateDoc(keyRef, {
      used: true,
      usedBy: userName,
      usedAt: serverTimestamp(),
      productId: productId,
      protected: true
    });
    
    return true;
  } catch (error) {
    console.error("Failed to use key:", error.message);
    return false;
  }
};

// Delete specific key
export const deleteKey = async (keyId) => {
  try {
    const keyRef = doc(db, 'review_keys', keyId);
    await deleteDoc(keyRef);
    return { success: true, message: 'Key deleted successfully' };
  } catch (error) {
    console.error("Failed to delete key:", error.message);
    return { success: false, message: error.message };
  }
};

// Delete all unused keys
export const deleteAllUnusedKeys = async () => {
  try {
    const keys = await getAllKeys();
    const unusedKeys = keys.filter(k => !k.used && !k.protected);
    
    let deleteCount = 0;
    for (const key of unusedKeys) {
      await deleteKey(key.id);
      deleteCount++;
    }
    
    const protectedCount = keys.filter(k => k.protected).length;
    
    return {
      deleted: deleteCount,
      protected: protectedCount
    };
  } catch (error) {
    console.error("Failed to delete unused keys:", error.message);
    return { deleted: 0, protected: 0 };
  }
};

// Get key statistics
export const getKeyStatistics = async () => {
  try {
    const keys = await getAllKeys();
    
    return {
      total: keys.length,
      available: keys.filter(k => !k.used).length,
      used: keys.filter(k => k.used).length,
      protected: keys.filter(k => k.protected).length,
      usageRate: keys.length > 0 ? ((keys.filter(k => k.used).length / keys.length) * 100).toFixed(1) : 0
    };
  } catch (error) {
    console.error("Failed to get statistics:", error.message);
    return {
      total: 0,
      available: 0,
      used: 0,
      protected: 0,
      usageRate: 0
    };
  }
};