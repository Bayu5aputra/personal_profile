import { db } from './firebase';
import { 
  collection, 
  addDoc, 
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  query,
  where,
  updateDoc,
  serverTimestamp,
  setDoc
} from 'firebase/firestore';

// ============================================
// PRODUCTS MANAGEMENT
// ============================================

export const getAllProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'products'));
    const products = [];
    
    querySnapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return products;
  } catch (error) {
    console.error("❌ Get products failed:", error.message);
    return [];
  }
};

export const getProductById = async (productId) => {
  try {
    // Jika productId adalah string dan bukan numeric string, anggap sebagai Firebase doc ID
    if (typeof productId === 'string' && isNaN(productId)) {
      const docRef = doc(db, 'products', productId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      }
    }
    
    // Convert to number jika perlu
    const numericId = typeof productId === 'string' ? parseInt(productId) : productId;
    
    // Query by numeric ID field (untuk kompatibilitas dengan data lokal)
    const q = query(
      collection(db, 'products'),
      where('id', '==', numericId)
    );
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return { id: doc.id, ...doc.data() };
    }
    
    console.log("ℹ️ Product not found in Firebase:", productId);
    return null;
  } catch (error) {
    console.error("❌ Get product by ID failed:", error.message);
    return null;
  }
};

export const addProduct = async (productData) => {
  try {
    const docRef = await addDoc(collection(db, 'products'), {
      ...productData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    
    console.log("✅ Product added:", docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("❌ Add product failed:", error.message);
    return { success: false, error: error.message };
  }
};

export const updateProduct = async (productId, productData) => {
  try {
    const productRef = doc(db, 'products', productId);
    await updateDoc(productRef, {
      ...productData,
      updatedAt: serverTimestamp()
    });
    
    console.log("✅ Product updated:", productId);
    return { success: true };
  } catch (error) {
    console.error("❌ Update product failed:", error.message);
    return { success: false, error: error.message };
  }
};

export const deleteProduct = async (productId) => {
  try {
    await deleteDoc(doc(db, 'products', productId));
    console.log("✅ Product deleted:", productId);
    return { success: true };
  } catch (error) {
    console.error("❌ Delete product failed:", error.message);
    return { success: false, error: error.message };
  }
};

// Fungsi tambahan untuk mendapatkan product dengan field ID numerik
export const getProductByNumericId = async (numericId) => {
  return await getProductById(numericId);
};

// Fungsi untuk mendapatkan product berdasarkan Firebase document ID
export const getProductByDocId = async (docId) => {
  try {
    const docRef = doc(db, 'products', docId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error("❌ Get product by doc ID failed:", error.message);
    return null;
  }
};

// ============================================
// PROJECTS MANAGEMENT
// ============================================

export const getAllProjects = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'projects'));
    const projects = [];
    
    querySnapshot.forEach((doc) => {
      projects.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return projects;
  } catch (error) {
    console.error("❌ Get projects failed:", error.message);
    return [];
  }
};

export const addProject = async (projectData) => {
  try {
    const docRef = await addDoc(collection(db, 'projects'), {
      ...projectData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    
    console.log("✅ Project added:", docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("❌ Add project failed:", error.message);
    return { success: false, error: error.message };
  }
};

export const updateProject = async (projectId, projectData) => {
  try {
    const projectRef = doc(db, 'projects', projectId);
    await updateDoc(projectRef, {
      ...projectData,
      updatedAt: serverTimestamp()
    });
    
    console.log("✅ Project updated:", projectId);
    return { success: true };
  } catch (error) {
    console.error("❌ Update project failed:", error.message);
    return { success: false, error: error.message };
  }
};

export const deleteProject = async (projectId) => {
  try {
    await deleteDoc(doc(db, 'projects', projectId));
    console.log("✅ Project deleted:", projectId);
    return { success: true };
  } catch (error) {
    console.error("❌ Delete project failed:", error.message);
    return { success: false, error: error.message };
  }
};

// ============================================
// ARTICLES MANAGEMENT
// ============================================

export const getAllArticles = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'articles'));
    const articles = [];
    
    querySnapshot.forEach((doc) => {
      articles.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return articles;
  } catch (error) {
    console.error("❌ Get articles failed:", error.message);
    return [];
  }
};

export const addArticle = async (articleData) => {
  try {
    const docRef = await addDoc(collection(db, 'articles'), {
      ...articleData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    
    console.log("✅ Article added:", docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("❌ Add article failed:", error.message);
    return { success: false, error: error.message };
  }
};

export const updateArticle = async (articleId, articleData) => {
  try {
    const articleRef = doc(db, 'articles', articleId);
    await updateDoc(articleRef, {
      ...articleData,
      updatedAt: serverTimestamp()
    });
    
    console.log("✅ Article updated:", articleId);
    return { success: true };
  } catch (error) {
    console.error("❌ Update article failed:", error.message);
    return { success: false, error: error.message };
  }
};

export const deleteArticle = async (articleId) => {
  try {
    await deleteDoc(doc(db, 'articles', articleId));
    console.log("✅ Article deleted:", articleId);
    return { success: true };
  } catch (error) {
    console.error("❌ Delete article failed:", error.message);
    return { success: false, error: error.message };
  }
};

// ============================================
// AUTHORIZED USERS MANAGEMENT
// ============================================

export const getAllAuthorizedUsers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'authorized_users'));
    const users = [];
    
    querySnapshot.forEach((doc) => {
      users.push({
        email: doc.id,
        ...doc.data()
      });
    });
    
    return users;
  } catch (error) {
    console.error("❌ Get users failed:", error.message);
    return [];
  }
};

export const addAuthorizedUser = async (email, userData) => {
  try {
    await setDoc(doc(db, 'authorized_users', email), {
      ...userData,
      addedAt: serverTimestamp()
    });
    
    console.log("✅ User added:", email);
    return { success: true };
  } catch (error) {
    console.error("❌ Add user failed:", error.message);
    return { success: false, error: error.message };
  }
};

export const deleteAuthorizedUser = async (email) => {
  try {
    await deleteDoc(doc(db, 'authorized_users', email));
    console.log("✅ User deleted:", email);
    return { success: true };
  } catch (error) {
    console.error("❌ Delete user failed:", error.message);
    return { success: false, error: error.message };
  }
};

// ============================================
// DASHBOARD STATISTICS
// ============================================

export const getDashboardStats = async () => {
  try {
    const [products, projects, articles, reviews, keys, users] = await Promise.all([
      getAllProducts(),
      getAllProjects(),
      getAllArticles(),
      getDocs(collection(db, 'reviews')),
      getDocs(collection(db, 'review_keys')),
      getAllAuthorizedUsers()
    ]);
    
    return {
      products: products.length,
      projects: projects.length,
      articles: articles.length,
      reviews: reviews.size,
      keys: keys.size,
      users: users.length
    };
  } catch (error) {
    console.error("❌ Get stats failed:", error.message);
    return {
      products: 0,
      projects: 0,
      articles: 0,
      reviews: 0,
      keys: 0,
      users: 0
    };
  }
};

// Fungsi utilitas untuk migrasi data lokal ke Firebase
export const migrateLocalProductsToFirebase = async (localProducts) => {
  try {
    const results = [];
    
    for (const product of localProducts) {
      try {
        // Cek apakah product sudah ada di Firebase
        const existingProduct = await getProductById(product.id);
        
        if (!existingProduct) {
          // Tambahkan ke Firebase
          const result = await addProduct({
            id: product.id, // Simpan ID numerik di field 'id'
            title: product.title,
            description: product.description,
            price: product.price,
            originalPrice: product.originalPrice || null,
            image: product.image,
            category: product.category || 'Digital Product',
            featured: product.featured || false,
            delivery: product.delivery || 'Instant download',
            support: product.support || 'Email support',
            license: product.license || 'Personal & Commercial Use',
            features: product.features || [],
            technologies: product.technologies || [],
            createdAt: new Date().toISOString()
          });
          
          if (result.success) {
            results.push({ id: product.id, firebaseId: result.id, status: 'success' });
          } else {
            results.push({ id: product.id, status: 'failed', error: result.error });
          }
        } else {
          results.push({ id: product.id, status: 'already_exists' });
        }
      } catch (error) {
        results.push({ id: product.id, status: 'error', error: error.message });
      }
    }
    
    return results;
  } catch (error) {
    console.error("❌ Migration failed:", error.message);
    return [];
  }
};