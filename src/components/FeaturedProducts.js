import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';
import { ProductSkeletonGrid } from './ProductSkeleton';
import { subscribeToProducts } from '../services/productsService';

// Fallback products in case Firebase is not available
const fallbackProducts = [
  { id: 1, name: "Modern Chair", price: 180, image: "https://picsum.photos/300/200?random=1", category: "Chairs" },
  { id: 2, name: "Sleek Lamp", price: 60, image: "https://picsum.photos/300/200?random=2", category: "Lighting" },
  { id: 3, name: "Wooden Desk", price: 320, image: "https://picsum.photos/300/200?random=3", category: "Tables" },
  { id: 4, name: "Cozy Sofa", price: 750, image: "https://picsum.photos/300/200?random=4", category: "Sofas" },
  { id: 5, name: "Elegant Dining Table", price: 450, image: "https://picsum.photos/300/200?random=5", category: "Tables" },
  { id: 6, name: "Comfortable Armchair", price: 280, image: "https://picsum.photos/300/200?random=6", category: "Chairs" },
  { id: 7, name: "Modern Floor Lamp", price: 120, image: "https://picsum.photos/300/200?random=7", category: "Lighting" },
  { id: 8, name: "Luxury Bed Frame", price: 890, image: "https://picsum.photos/300/200?random=8", category: "Beds" },
  { id: 9, name: "Coffee Table", price: 220, image: "https://picsum.photos/300/200?random=9", category: "Tables" },
  { id: 10, name: "Accent Chair", price: 190, image: "https://picsum.photos/300/200?random=10", category: "Chairs" },
  { id: 11, name: "Wall Sconce", price: 85, image: "https://picsum.photos/300/200?random=11", category: "Lighting" },
  { id: 12, name: "Sectional Sofa", price: 1200, image: "https://picsum.photos/300/200?random=12", category: "Sofas" },
  { id: 13, name: "Nightstand", price: 150, image: "https://picsum.photos/300/200?random=13", category: "Tables" },
  { id: 14, name: "Dining Chairs Set", price: 380, image: "https://picsum.photos/300/200?random=14", category: "Chairs" },
  { id: 15, name: "Pendant Light", price: 95, image: "https://picsum.photos/300/200?random=15", category: "Lighting" },
  { id: 16, name: "Queen Bed", price: 650, image: "https://picsum.photos/300/200?random=16", category: "Beds" }
];

const FeaturedProducts = ({ onAddToCart }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [useFallback, setUseFallback] = useState(false);
  const [firebaseStatus, setFirebaseStatus] = useState('initializing');


  useEffect(() => {
    let unsubscribe = () => {};
    
    const initializeProducts = async () => {
      try {
        // Try to subscribe to Firebase products
        unsubscribe = subscribeToProducts((fetchedProducts) => {
          if (fetchedProducts && fetchedProducts.length > 0) {
            setProducts(fetchedProducts);
            setLoading(false);
            setError(null);
            setUseFallback(false);
            setFirebaseStatus('connected');
          } else {
            // If no products from Firebase, use fallback
            setProducts(fallbackProducts);
            setLoading(false);
            setUseFallback(true);
            setFirebaseStatus('no-data');
          }
        });
      } catch (error) {
        console.error("Error setting up Firebase subscription:", error);
        // Use fallback products if Firebase fails
        setProducts(fallbackProducts);
        setLoading(false);
        setUseFallback(true);
        setFirebaseStatus('fallback');
      }
    };

    // Small delay to ensure Firebase is initialized
    const timer = setTimeout(() => {
      initializeProducts();
    }, 100);

    // Cleanup subscription on unmount
    return () => {
      clearTimeout(timer);
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);

  const handleViewDetails = (product) => {
    if (product.slug) {
      navigate(`/product/${product.slug}`);
    }
  };

  const handleViewAllProducts = () => {
    navigate('/products');
  };

  // Use all products since filtering is now handled in the sidebar
  const filteredProducts = products;

  // Get products for different sections
  const featuredProducts = filteredProducts.slice(0, 4);
  const bestSellerProducts = filteredProducts.slice(4, 10); // 6 products
  const newArrivalProducts = filteredProducts.slice(10, 14); // 4 products

  if (loading) {
    return (
      <section id="products" className="bg-gradient-to-br from-gray-50 to-blue-50 pt-8 sm:pt-12 pb-12 sm:pb-16 lg:pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-6">
              <svg className="w-10 h-10 text-white animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Our Collection
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Loading our handpicked collection of premium furniture pieces...
            </p>
          </div>
          <ProductSkeletonGrid count={16} />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="products" className="bg-gradient-to-br from-gray-50 to-blue-50 pt-8 sm:pt-12 pb-12 sm:pb-16 lg:pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-500 to-pink-600 rounded-full mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Oops! Something went wrong
            </h2>
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 max-w-lg mx-auto">
              <p className="text-gray-600 mb-6">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="px-8 py-4 bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold rounded-xl hover:from-red-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="products" className="bg-gradient-to-br from-gray-50 to-blue-50 pt-8 sm:pt-12 pb-12 sm:pb-16 lg:pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 1. FEATURED PRODUCTS Section */}
        <div className="mb-16 sm:mb-20">
          {/* Hero Header */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Discover our handpicked collection of premium furniture pieces that combine 
              style, comfort, and functionality. Each piece is carefully curated to transform your space.
            </p>
            {products.length > 0 && (
              <div className="mt-6 inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-xl shadow-lg border border-gray-100">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-600">Found</span>
                <span className="text-lg font-bold text-blue-600">{filteredProducts.length}</span>
                <span className="text-xs text-gray-600">of</span>
                <span className="text-lg font-bold text-purple-600">{products.length}</span>
                <span className="text-xs text-gray-600">products</span>
              </div>
            )}
          </div>



          {/* Featured Products Grid */}
          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <div key={product.id} className="group">
                  <ProductCard 
                    product={product} 
                    onViewDetails={handleViewDetails}
                    onAddToCart={onAddToCart}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="bg-white rounded-3xl p-12 max-w-2xl mx-auto shadow-2xl border border-gray-100">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mb-8">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">No products found</h3>
                <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                  We couldn't find any products at the moment. Please check back later.
                </p>
                <button
                  onClick={handleViewAllProducts}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-2xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-xl text-lg"
                >
                  Browse All Products
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 2. ENHANCED MID-PAGE BANNER - NEW MENS FASHION */}
        <div className="mb-16 sm:mb-20">
          <div className="relative overflow-hidden rounded-2xl shadow-xl">
            <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-8 sm:p-12 lg:p-16 relative">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}></div>
              </div>
              
              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between">
                <div className="text-center lg:text-left mb-8 lg:mb-0 lg:mr-8">
                  <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-yellow-900 text-xs font-bold rounded-full mb-4 shadow-lg">
                    <span className="mr-2">🔥</span>
                    NEW ARRIVAL
                  </div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                    NEW MENS
                    <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      FASHION
                    </span>
                  </h2>
                  <p className="text-xl sm:text-2xl lg:text-3xl text-blue-200 font-bold mb-6">
                    SAVE UP TO <span className="text-yellow-400">40% OFF</span>
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button className="px-8 py-4 bg-gradient-to-r from-white to-gray-100 text-slate-900 font-bold text-lg rounded-xl hover:from-gray-100 hover:to-white transition-all duration-300 transform hover:scale-105 shadow-xl border-2 border-transparent hover:border-white">
                      🛍️ Shop Now
                    </button>
                    <button className="px-8 py-4 border-2 border-white text-white font-bold text-lg rounded-xl hover:bg-white hover:text-slate-900 transition-all duration-300 transform hover:scale-105">
                      👀 View Collection
                    </button>
                  </div>
                </div>
                <div className="relative">
                  <div className="w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 bg-gradient-to-br from-blue-400 via-purple-500 to-indigo-600 rounded-full opacity-20 animate-pulse"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 text-white opacity-60" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. ENHANCED BEST SELLER Section */}
        <div className="mb-16 sm:mb-20">
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
              Best Seller
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Our most popular and highly-rated furniture pieces that customers love and trust
            </p>
          </div>

          {bestSellerProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {bestSellerProducts.map((product) => (
                <div key={product.id} className="group">
                  <ProductCard 
                    product={product} 
                    onViewDetails={handleViewDetails}
                    onAddToCart={onAddToCart}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-white rounded-2xl p-6 max-w-lg mx-auto shadow-xl border border-gray-100">
                <p className="text-gray-500 text-base">No best seller products available</p>
              </div>
            </div>
          )}
        </div>

        {/* 4. ENHANCED NEW ARRIVALS Section */}
        <div className="mb-16 sm:mb-20">
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-4">
              New Arrivals
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Fresh additions to our collection - be the first to discover these exciting new pieces
            </p>
          </div>

          {newArrivalProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {newArrivalProducts.map((product) => (
                <div key={product.id} className="group">
                  <ProductCard 
                    product={product} 
                    onViewDetails={handleViewDetails}
                    onAddToCart={onAddToCart}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-white rounded-2xl p-6 max-w-lg mx-auto shadow-xl border border-gray-100">
                <p className="text-gray-500 text-base">No new arrival products available</p>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced View All Products Button */}
        {filteredProducts.length > 0 && (
          <div className="text-center">
            <button 
              onClick={handleViewAllProducts}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-slate-800 to-slate-900 text-white font-bold text-lg rounded-xl hover:from-slate-700 hover:to-slate-800 transition-all duration-300 transform hover:scale-105 shadow-xl border-2 border-transparent hover:border-slate-600"
            >
              <span>View All Products</span>
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        )}

        {/* Enhanced Firebase Status Info */}
        {useFallback && (
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-2xl p-6 max-w-xl mx-auto shadow-xl">
              <div className="text-yellow-800">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl mb-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <p className="font-bold text-base mb-2">Demo Mode</p>
                <p className="text-sm mb-3">Using sample data - Firebase not connected</p>
                <a 
                  href="https://console.firebase.google.com/project/ecommerce-jules--test/firestore" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg text-sm"
                >
                  Set up Firestore →
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
