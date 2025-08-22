import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCQqujoHtv5mbM18xMzIGHqXW1v03CnAIU",
  authDomain: "ecommerce-jules--test.firebaseapp.com",
  projectId: "ecommerce-jules--test",
  storageBucket: "ecommerce-jules--test.firebasestorage.app",
  messagingSenderId: "837579081562",
  appId: "1:837579081562:web:6338f6d31df03a16135563"
};

// Initialize Firebase with error handling
let app;
let firestoreDB;

try {
  console.log("🚀 Initializing Firebase...");
  console.log("📋 Project ID:", firebaseConfig.projectId);
  
  app = initializeApp(firebaseConfig);
  firestoreDB = getFirestore(app);
  
  console.log("✅ Firebase initialized successfully");
  console.log("🔥 Firestore database instance created");
} catch (error) {
  console.error("❌ Error initializing Firebase:", error);
  console.error("🔧 Please check your Firebase configuration");
  
  // Set fallback values
  app = null;
  firestoreDB = null;
}

// Export with fallback handling
export const db = firestoreDB;
export default app;
