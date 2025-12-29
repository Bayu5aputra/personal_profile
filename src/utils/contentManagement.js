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
  setDoc,
  orderBy
} from 'firebase/firestore';

// ============================================
// PRODUCTS MANAGEMENT
// ============================================

export const getAllProducts = async () => {
  try {
    const querySnapshot = await getDocs(
      query(collection(db, 'products'), orderBy('createdAt', 'desc'))
    );
    const products = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      products.push({
        documentId: doc.id, // Firebase document ID
        id: data.id || doc.id, // Numeric or document ID
        ...data
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
    // Try numeric ID first
    const numericId = typeof productId === 'string' ? parseInt(productId) : productId;
    
    if (!isNaN(numericId)) {
      const q = query(
        collection(db, 'products'),
        where('id', '==', numericId)
      );
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        return { documentId: doc.id, id: doc.data().id, ...doc.data() };
      }
    }
    
    // Try as document ID
    if (typeof productId === 'string') {
      const docRef = doc(db, 'products', productId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { documentId: docSnap.id, id: docSnap.data().id, ...docSnap.data() };
      }
    }
    
    return null;
  } catch (error) {
    console.error("❌ Get product by ID failed:", error.message);
    return null;
  }
};

export const addProduct = async (productData) => {
  try {
    // Ensure image path or use placeholder
    if (!productData.image || productData.image.trim() === '') {
      productData.image = '/no_image.png';
    }
    
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
    // Ensure image path or use placeholder
    if (!productData.image || productData.image.trim() === '') {
      productData.image = '/no_image.png';
    }
    
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

// ============================================
// PROJECTS MANAGEMENT
// ============================================

export const getAllProjects = async () => {
  try {
    const querySnapshot = await getDocs(
      query(collection(db, 'projects'), orderBy('createdAt', 'desc'))
    );
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
    const querySnapshot = await getDocs(
      query(collection(db, 'articles'), orderBy('createdAt', 'desc'))
    );
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

export const getArticleBySlug = async (slug) => {
  try {
    const q = query(
      collection(db, 'articles'),
      where('slug', '==', slug)
    );
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return { id: doc.id, ...doc.data() };
    }
    
    return null;
  } catch (error) {
    console.error("❌ Get article by slug failed:", error.message);
    return null;
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