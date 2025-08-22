import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  query, 
  orderBy,
  onSnapshot,
  where
} from "firebase/firestore";
import { db } from "../lib/firebase";

// Check if Firebase is available
const isFirebaseAvailable = () => {
  return db !== null;
};

// Collection reference
const getProductsCollection = () => {
  if (!isFirebaseAvailable()) {
    throw new Error("Firebase is not available");
  }
  return collection(db, "products");
};

// Get all products with real-time updates
export const subscribeToProducts = (callback) => {
  try {
    if (!isFirebaseAvailable()) {
      console.warn("Firebase not available, using fallback mode");
      callback([]);
      return () => {};
    }

    const productsCollection = getProductsCollection();
    const q = query(productsCollection, orderBy("name"));
    
    return onSnapshot(q, (querySnapshot) => {
      const products = [];
      querySnapshot.forEach((doc) => {
        products.push({
          id: doc.id,
          ...doc.data()
        });
      });
      callback(products);
    }, (error) => {
      console.error("Error in products subscription:", error);
      
      // Check if it's a database not found error
      if (error.code === 'failed-precondition' || error.code === 'unavailable' || error.message?.includes('400')) {
        console.warn("Firestore database not found or not accessible. Please create the database first.");
        callback([]);
      } else {
        // Return empty products array on other errors
        callback([]);
      }
    });
  } catch (error) {
    console.error("Error setting up products subscription:", error);
    
    // Check if it's a collection/database error
    if (error.message?.includes('Firestore') || error.message?.includes('collection')) {
      console.warn("Firestore collection error. Database may not be created yet.");
    }
    
    // Return empty products array on error
    callback([]);
    return () => {}; // Return empty cleanup function
  }
};

// Get all products (one-time fetch)
export const getAllProducts = async () => {
  try {
    if (!isFirebaseAvailable()) {
      throw new Error("Firebase is not available");
    }

    const productsCollection = getProductsCollection();
    const querySnapshot = await getDocs(productsCollection);
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data()
      });
    });
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    
    // Check if it's a database not found error
    if (error.code === 'failed-precondition' || error.code === 'unavailable' || error.message?.includes('400')) {
      console.warn("Firestore database not found. Please create the database first.");
      return [];
    }
    
    throw error;
  }
};

// Get product by slug
export const getProductBySlug = async (slug) => {
  try {
    if (!isFirebaseAvailable()) {
      throw new Error("Firebase is not available");
    }

    const productsCollection = getProductsCollection();
    const q = query(productsCollection, where("slug", "==", slug));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return null;
    }
    
    const doc = querySnapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data()
    };
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    throw error;
  }
};

// Get product by ID
export const getProductById = async (id) => {
  try {
    if (!isFirebaseAvailable()) {
      throw new Error("Firebase is not available");
    }

    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw error;
  }
};

// Get products by category
export const getProductsByCategory = async (category) => {
  try {
    if (!isFirebaseAvailable()) {
      throw new Error("Firebase is not available");
    }

    const productsCollection = getProductsCollection();
    const q = query(
      productsCollection, 
      where("category", "==", category),
      orderBy("name")
    );
    const querySnapshot = await getDocs(q);
    
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data()
      });
    });
    return products;
  } catch (error) {
    console.error("Error fetching products by category:", error);
    throw error;
  }
};

// Subscribe to products by category with real-time updates
export const subscribeToProductsByCategory = (category, callback) => {
  try {
    if (!isFirebaseAvailable()) {
      console.warn("Firebase not available, using fallback mode");
      callback([]);
      return () => {};
    }

    const productsCollection = getProductsCollection();
    const q = query(
      productsCollection, 
      where("category", "==", category),
      orderBy("name")
    );
    
    return onSnapshot(q, (querySnapshot) => {
      const products = [];
      querySnapshot.forEach((doc) => {
        products.push({
          id: doc.id,
          ...doc.data()
        });
      });
      callback(products);
    }, (error) => {
      console.error("Error in category subscription:", error);
      callback([]);
    });
  } catch (error) {
    console.error("Error setting up category subscription:", error);
    callback([]);
    return () => {};
  }
};
