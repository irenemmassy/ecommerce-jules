// Sample product data structure for Firestore
// Use this as a reference when adding products to your Firestore database

export const sampleProducts = [
  {
    slug: "modern-chair",
    name: "Modern Ergonomic Chair",
    price: 299.99,
    image: "https://picsum.photos/600/400?random=1",
    images: [
      "https://picsum.photos/600/400?random=1",
      "https://picsum.photos/600/400?random=11",
      "https://picsum.photos/600/400?random=12",
      "https://picsum.photos/600/400?random=13"
    ],
    description: "A premium ergonomic office chair designed for maximum comfort during long work sessions. Features adjustable lumbar support, breathable mesh back, and customizable armrests.",
    features: [
      "Ergonomic design with adjustable lumbar support",
      "Breathable mesh back for temperature regulation",
      "Adjustable armrests and seat height",
      "360-degree swivel with smooth rolling casters",
      "Weight capacity up to 300 lbs"
    ],
    category: "Chairs",
    rating: 4.8,
    inStock: true,
    tags: ["office", "ergonomic", "adjustable", "mesh"]
  },
  {
    slug: "sleek-table-lamp",
    name: "Sleek Modern Table Lamp",
    price: 89.99,
    image: "https://picsum.photos/600/400?random=2",
    images: [
      "https://picsum.photos/600/400?random=2",
      "https://picsum.photos/600/400?random=21",
      "https://picsum.photos/600/400?random=22"
    ],
    description: "Contemporary table lamp featuring clean lines and warm LED lighting. Perfect for bedside tables, desks, or as accent lighting in any room.",
    features: [
      "LED lighting with warm white glow",
      "Touch-sensitive controls",
      "Adjustable brightness levels",
      "Modern minimalist design",
      "Energy efficient and long-lasting"
    ],
    category: "Lighting",
    rating: 4.6,
    inStock: true,
    tags: ["lighting", "LED", "modern", "touch-control"]
  },
  {
    slug: "wooden-desk",
    name: "Solid Wood Writing Desk",
    price: 449.99,
    image: "https://picsum.photos/600/400?random=3",
    images: [
      "https://picsum.photos/600/400?random=3",
      "https://picsum.photos/600/400?random=31",
      "https://picsum.photos/600/400?random=32",
      "https://picsum.photos/600/400?random=33"
    ],
    description: "Handcrafted solid wood desk with a rich walnut finish. Features a spacious work surface, built-in cable management, and elegant brass hardware.",
    features: [
      "Solid walnut wood construction",
      "Built-in cable management system",
      "Spacious 48\" x 24\" work surface",
      "Elegant brass hardware accents",
      "Easy assembly with included tools"
    ],
    category: "Desks",
    rating: 4.9,
    inStock: true,
    tags: ["wood", "desk", "walnut", "cable-management"]
  },
  {
    slug: "cozy-sofa",
    name: "Cozy 3-Seater Sofa",
    price: 899.99,
    image: "https://picsum.photos/600/400?random=4",
    images: [
      "https://picsum.photos/600/400?random=4",
      "https://picsum.photos/600/400?random=41",
      "https://picsum.photos/600/400?random=42",
      "https://picsum.photos/600/400?random=43"
    ],
    description: "Plush 3-seater sofa with premium fabric upholstery and deep seating. Perfect for family rooms and living spaces, offering both style and comfort.",
    features: [
      "Premium fabric upholstery",
      "Deep, comfortable seating",
      "High-density foam cushions",
      "Sturdy hardwood frame",
      "Available in multiple colors"
    ],
    category: "Sofas",
    rating: 4.7,
    inStock: true,
    tags: ["sofa", "fabric", "comfortable", "3-seater"]
  },
  {
    slug: "bookshelf",
    name: "Modern Bookshelf",
    price: 199.99,
    image: "https://picsum.photos/600/400?random=5",
    images: [
      "https://picsum.photos/600/400?random=5",
      "https://picsum.photos/600/400?random=51",
      "https://picsum.photos/600/400?random=52"
    ],
    description: "Contemporary bookshelf with adjustable shelves and clean geometric design. Perfect for organizing books, decorative items, and personal collections.",
    features: [
      "Adjustable shelf heights",
      "Modern geometric design",
      "Sturdy metal frame construction",
      "Easy assembly",
      "Multiple size options available"
    ],
    category: "Storage",
    rating: 4.5,
    inStock: true,
    tags: ["bookshelf", "storage", "adjustable", "modern"]
  },
  {
    slug: "dining-table",
    name: "Extendable Dining Table",
    price: 649.99,
    image: "https://picsum.photos/600/400?random=6",
    images: [
      "https://picsum.photos/600/400?random=6",
      "https://picsum.photos/600/400?random=61",
      "https://picsum.photos/600/400?random=62",
      "https://picsum.photos/600/400?random=63"
    ],
    description: "Versatile extendable dining table that seats 4-8 people. Features a beautiful oak finish and smooth extension mechanism for flexible entertaining.",
    features: [
      "Extends from 60\" to 96\" length",
      "Solid oak wood construction",
      "Seats 4-8 people comfortably",
      "Smooth extension mechanism",
      "Matching chairs available separately"
    ],
    category: "Dining",
    rating: 4.8,
    inStock: true,
    tags: ["dining", "extendable", "oak", "entertaining"]
  },
  {
    slug: "floor-rug",
    name: "Handcrafted Area Rug",
    price: 159.99,
    image: "https://picsum.photos/600/400?random=7",
    images: [
      "https://picsum.photos/600/400?random=7",
      "https://picsum.photos/600/400?random=71",
      "https://picsum.photos/600/400?random=72"
    ],
    description: "Beautiful handcrafted area rug with traditional patterns and premium wool construction. Adds warmth and character to any room.",
    features: [
      "100% premium wool construction",
      "Handcrafted traditional patterns",
      "Non-slip backing",
      "Easy to clean and maintain",
      "Available in multiple sizes"
    ],
    category: "Rugs",
    rating: 4.6,
    inStock: true,
    tags: ["rug", "wool", "handcrafted", "traditional"]
  },
  {
    slug: "wall-art",
    name: "Abstract Canvas Wall Art",
    price: 129.99,
    image: "https://picsum.photos/600/400?random=8",
    images: [
      "https://picsum.photos/600/400?random=8",
      "https://picsum.photos/600/400?random=81",
      "https://picsum.photos/600/400?random=82"
    ],
    description: "Stunning abstract canvas wall art that adds a modern artistic touch to any space. Features vibrant colors and contemporary design.",
    features: [
      "Gallery-wrapped canvas",
      "Vibrant, fade-resistant inks",
      "Ready to hang",
      "Multiple size options",
      "Contemporary abstract design"
    ],
    category: "Wall Art",
    rating: 4.4,
    inStock: true,
    tags: ["art", "canvas", "abstract", "modern"]
  }
];

// Firestore collection structure:
// Collection: "products"
// Documents: Each product with auto-generated ID
// Fields: All the properties above (slug, name, price, image, images[], description, features[], category, rating, inStock, tags[])

// To add to Firestore:
// 1. Go to Firebase Console
// 2. Navigate to Firestore Database
// 3. Create collection named "products"
// 4. Add documents with the structure above
// 5. The app will automatically fetch and display them in real-time
