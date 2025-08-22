import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { ProductSkeletonGrid } from '../components/ProductSkeleton';
import { subscribeToProducts, subscribeToProductsByCategory } from '../services/productsService';

const ProductsPage = ({ onViewDetails, onAddToCart }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    let unsubscribe = () => {};

    const initializeProducts = async () => {
      try {
        if (selectedCategory === 'all') {
          unsubscribe = subscribeToProducts((fetchedProducts) => {
            setProducts(fetchedProducts);
            setLoading(false);
            setError(null);
            
            // Extract unique categories
            const uniqueCategories = [...new Set(fetchedProducts.map(p => p.category).filter(Boolean))];
            setCategories(uniqueCategories);
          });
        } else {
          unsubscribe = subscribeToProductsByCategory(selectedCategory, (fetchedProducts) => {
            setProducts(fetchedProducts);
            setLoading(false);
            setError(null);
          });
        }
      } catch (error) {
        console.error("Error setting up products subscription:", error);
        setProducts([]);
        setLoading(false);
        setError('Failed to load products');
      }
    };

    setLoading(true);
    initializeProducts();

    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, [selectedCategory]);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.category && product.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSearchTerm('');
  };

  const handleProductClick = (product) => {
    if (product.slug) {
      navigate(`/product/${product.slug}`);
    } else {
      onViewDetails(product);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-16 sm:pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Hero Loading Section */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-6 animate-pulse">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
              Our Collection
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Loading our complete collection of premium furniture pieces...
            </p>
          </div>
          <ProductSkeletonGrid count={12} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-16 sm:pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-red-500 to-pink-600 rounded-full mb-6">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
              Oops! Something went wrong
            </h1>
            <div className="bg-white rounded-2xl p-8 max-w-md mx-auto shadow-xl border border-gray-100">
              <p className="text-red-600 text-lg mb-6">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold rounded-xl hover:from-red-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-16 sm:pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Header Section */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-6 shadow-lg">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
            Our Collection
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our complete collection of premium furniture pieces that combine 
            style, comfort, and functionality. Each piece is carefully curated to transform your space.
          </p>
          {products.length > 0 && (
            <div className="mt-6 inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-md border border-gray-100">
              <span className="text-sm text-gray-600">Found</span>
              <span className="text-lg font-bold text-blue-600">{filteredProducts.length}</span>
              <span className="text-sm text-gray-600">of</span>
              <span className="text-lg font-bold text-purple-600">{products.length}</span>
              <span className="text-sm text-gray-600">products</span>
            </div>
          )}
        </div>

        {/* Enhanced Search and Filters Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 mb-8 sm:mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md lg:max-w-lg">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search for furniture, styles, or categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 sm:py-4 text-base border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 bg-gray-50 hover:bg-white"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => handleCategoryChange('all')}
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === 'all'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                }`}
              >
                ✨ All Categories
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Active Filters Display */}
          {(searchTerm || selectedCategory !== 'all') && (
            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm text-gray-500">Active filters:</span>
                {searchTerm && (
                  <span className="inline-flex items-center px-3 py-1.5 bg-blue-100 text-blue-800 text-sm font-medium rounded-lg">
                    Search: "{searchTerm}"
                    <button
                      onClick={() => setSearchTerm('')}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                )}
                {selectedCategory !== 'all' && (
                  <span className="inline-flex items-center px-3 py-1.5 bg-purple-100 text-purple-800 text-sm font-medium rounded-lg">
                    Category: {selectedCategory}
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className="ml-2 text-purple-600 hover:text-purple-800"
                    >
                      ×
                    </button>
                  </span>
                )}
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                  className="text-sm text-gray-500 hover:text-gray-700 underline"
                >
                  Clear all filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Products Grid with Enhanced Layout */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group">
                <ProductCard 
                  product={product} 
                  onViewDetails={handleProductClick}
                  onAddToCart={onAddToCart}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 sm:py-20">
            <div className="bg-white rounded-2xl p-8 sm:p-12 max-w-lg mx-auto shadow-xl border border-gray-100">
              <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mb-6">
                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">No products found</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {searchTerm 
                  ? `We couldn't find any products matching "${searchTerm}"`
                  : `No products available in the "${selectedCategory}" category`
                }
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Browse All Products
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
