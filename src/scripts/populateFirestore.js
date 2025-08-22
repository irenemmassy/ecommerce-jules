import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, deleteDoc, getDocs, doc } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQqujoHtv5mbM18xMzIGHqXW1v03CnAIU",
  authDomain: "ecommerce-jules--test.firebaseapp.com",
  projectId: "ecommerce-jules--test",
  storageBucket: "ecommerce-jules--test.firebasestorage.app",
  messagingSenderId: "837579081562",
  appId: "1:837579081562:web:6338f6f31df03a16135563"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Sample products data with proper structure
const sampleProducts = [
  {
    name: "Modern Leather Sofa",
    slug: "modern-leather-sofa",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500"
    ],
    description: "Premium leather sofa with modern design and comfortable seating. Perfect for living rooms and family spaces.",
    features: ["Premium leather", "Modern design", "Comfortable seating", "Durable construction"],
    category: "Sofas",
    rating: 4.8
  },
  {
    name: "Elegant Dining Table",
    slug: "elegant-dining-table",
    price: 899.99,
    image: "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=500",
    images: [
      "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=500",
      "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=500"
    ],
    description: "Beautiful wooden dining table perfect for family gatherings and dinner parties.",
    features: ["Solid wood construction", "Seats 6-8 people", "Classic design", "Easy to clean"],
    category: "Tables",
    rating: 4.6
  },
  {
    name: "Ergonomic Office Chair",
    slug: "ergonomic-office-chair",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500"
    ],
    description: "Comfortable office chair with ergonomic design for long working hours.",
    features: ["Ergonomic design", "Adjustable height", "Lumbar support", "Breathable mesh"],
    category: "Chairs",
    rating: 4.7
  },
  {
    name: "Vintage Bookshelf",
    slug: "vintage-bookshelf",
    price: 449.99,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500"
    ],
    description: "Classic vintage bookshelf with multiple shelves for organizing books and decorative items.",
    features: ["Vintage design", "Multiple shelves", "Solid wood", "Classic finish"],
    category: "Storage",
    rating: 4.5
  },
  {
    name: "Contemporary Coffee Table",
    slug: "contemporary-coffee-table",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500"
    ],
    description: "Modern coffee table with clean lines and versatile design for any living room.",
    features: ["Contemporary design", "Clean lines", "Versatile use", "Easy maintenance"],
    category: "Tables",
    rating: 4.4
  },
  {
    name: "Accent Armchair",
    slug: "accent-armchair",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500"
    ],
    description: "Stylish accent chair perfect for adding personality to any room.",
    features: ["Stylish design", "Comfortable seating", "Versatile placement", "Quality fabric"],
    category: "Chairs",
    rating: 4.3
  },
  {
    name: "Floor Lamp",
    slug: "floor-lamp",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500"
    ],
    description: "Modern floor lamp providing ambient lighting for any space.",
    features: ["Modern design", "Adjustable head", "LED compatible", "Stable base"],
    category: "Lighting",
    rating: 4.2
  },
  {
    name: "Console Table",
    slug: "console-table",
    price: 279.99,
    image: "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=500",
    images: [
      "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=500",
      "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=500"
    ],
    description: "Elegant console table perfect for entryways and behind sofas.",
    features: ["Elegant design", "Perfect height", "Multiple uses", "Quality finish"],
    category: "Tables",
    rating: 4.1
  },
  {
    name: "Sectional Sofa",
    slug: "sectional-sofa",
    price: 1899.99,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500"
    ],
    description: "Spacious sectional sofa perfect for large families and entertaining guests.",
    features: ["Spacious seating", "Modular design", "Premium fabric", "Family friendly"],
    category: "Sofas",
    rating: 4.9
  },
  {
    name: "Bar Stools Set",
    slug: "bar-stools-set",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500"
    ],
    description: "Set of 4 modern bar stools perfect for kitchen islands and bars.",
    features: ["Set of 4", "Modern design", "Comfortable seating", "Easy to clean"],
    category: "Chairs",
    rating: 4.6
  },
  {
    name: "Wall Shelf Unit",
    slug: "wall-shelf-unit",
    price: 179.99,
    image: "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=500",
    images: [
      "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=500",
      "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=500"
    ],
    description: "Versatile wall shelf unit for organizing and displaying items.",
    features: ["Wall mounted", "Multiple shelves", "Versatile use", "Easy installation"],
    category: "Storage",
    rating: 4.3
  },
  {
    name: "Table Lamp",
    slug: "table-lamp",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500"
    ],
    description: "Elegant table lamp perfect for bedside tables and desks.",
    features: ["Elegant design", "Perfect size", "LED compatible", "Touch control"],
    category: "Lighting",
    rating: 4.4
  }
];

// Function to clear existing products
async function clearExistingProducts() {
  try {
    console.log("🗑️ Clearing existing products...");
    const productsCollection = collection(db, "products");
    const querySnapshot = await getDocs(productsCollection);
    
    const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(deletePromises);
    
    console.log(`✅ Deleted ${querySnapshot.docs.length} existing products`);
  } catch (error) {
    console.error("❌ Error clearing products:", error);
  }
}

// Function to add products
async function addProducts() {
  try {
    console.log("🚀 Adding products to Firestore...");
    
    const productsCollection = collection(db, "products");
    const addPromises = sampleProducts.map(product => addDoc(productsCollection, product));
    
    await Promise.all(addPromises);
    
    console.log(`✅ Successfully added ${sampleProducts.length} products to Firestore!`);
    console.log("🎉 Your database is now populated with sample data!");
    
  } catch (error) {
    console.error("❌ Error adding products:", error);
  }
}

// Main function
async function populateDatabase() {
  try {
    console.log("🔥 Starting Firestore population...");
    
    // Clear existing products first
    await clearExistingProducts();
    
    // Add new products
    await addProducts();
    
    console.log("🎯 Database population complete!");
    console.log("📱 Refresh your React app to see the new products!");
    
  } catch (error) {
    console.error("💥 Fatal error:", error);
  }
}

// Export for use in other files
export { populateDatabase, sampleProducts };

// If running directly, execute
if (typeof window !== 'undefined') {
  // Browser environment
  window.populateDatabase = populateDatabase;
  console.log("🌐 Script loaded! Run 'populateDatabase()' in the console to populate your database.");
} else {
  // Node.js environment
  populateDatabase();
}
