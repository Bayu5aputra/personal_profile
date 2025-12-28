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
    
    // HAPUS log "Loaded X keys from Firebase"
    return keys;
  } catch (error) {
    console.error("❌ Get keys failed:", error.message);
    
    if (error.code === 'permission-denied') {
      console.error("🚫 Permission denied");
    }
    
    return [];
  }
};

// Add new keys to Firebase
export const addKeys = async (count = 1) => {
  try {
    const newKeys = [];
    
    // HAPUS log "Generating X keys..."
    
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
      
      // HAPUS log per-key generation
    }
    
    // Hanya log hasil akhir
    console.log(`✅ Generated ${newKeys.length} keys`);
    return newKeys;
  } catch (error) {
    console.error("❌ Generate keys failed:", error.message);
    
    if (error.code === 'permission-denied') {
      console.error("🚫 Permission denied");
      alert('Permission denied. Please make sure you are logged in with an authorized email address.');
    }
    
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
    console.error("❌ Validate key failed:", error.message);
    return { valid: false, message: 'Validation error: ' + error.message };
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
    
    // HAPUS log "Key X marked as used"
    return true;
  } catch (error) {
    console.error("❌ Use key failed:", error.message);
    return false;
  }
};

// Delete specific key
export const deleteKey = async (keyId) => {
  try {
    const keyRef = doc(db, 'review_keys', keyId);
    await deleteDoc(keyRef);
    // HAPUS log per-deletion
    return { success: true, message: 'Key deleted successfully' };
  } catch (error) {
    console.error("❌ Delete key failed:", error.message);
    
    if (error.code === 'permission-denied') {
      return { success: false, message: 'Cannot delete protected key' };
    }
    
    return { success: false, message: error.message };
  }
};

// Delete all unused keys
export const deleteAllUnusedKeys = async () => {
  try {
    const keys = await getAllKeys();
    const unusedKeys = keys.filter(k => !k.used && !k.protected);
    
    // HAPUS log "Deleting X unused keys..."
    
    let deleteCount = 0;
    for (const key of unusedKeys) {
      const result = await deleteKey(key.id);
      if (result.success) {
        deleteCount++;
      }
    }
    
    const protectedCount = keys.filter(k => k.protected).length;
    
    // Hanya log hasil akhir
    console.log(`✅ Deleted ${deleteCount} keys (${protectedCount} protected)`);
    
    return {
      deleted: deleteCount,
      protected: protectedCount
    };
  } catch (error) {
    console.error("❌ Delete unused keys failed:", error.message);
    return { deleted: 0, protected: 0 };
  }
};

// Get key statistics
export const getKeyStatistics = async () => {
  try {
    const keys = await getAllKeys();
    
    const stats = {
      total: keys.length,
      available: keys.filter(k => !k.used).length,
      used: keys.filter(k => k.used).length,
      protected: keys.filter(k => k.protected).length,
      usageRate: keys.length > 0 ? ((keys.filter(k => k.used).length / keys.length) * 100).toFixed(1) : 0
    };
    
    // HAPUS log statistics
    return stats;
  } catch (error) {
    console.error("❌ Get statistics failed:", error.message);
    return {
      total: 0,
      available: 0,
      used: 0,
      protected: 0,
      usageRate: 0
    };
  }
};