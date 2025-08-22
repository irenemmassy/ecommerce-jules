import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  const handleShopCollection = () => {
    navigate('/products');
  };

  const handleViewGallery = () => {
    // Scroll to the products section on the homepage
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If not on homepage, navigate to products page
      navigate('/products');
    }
  };

  const handleCategoryClick = (category) => {
    navigate('/products');
    // You can add category filtering logic here later
  };

  const categories = [
    { name: 'Sofas', icon: '🛋️', count: '24' },
    { name: 'Chairs', icon: '🪑', count: '18' },
    { name: 'Tables', icon: '🪑', count: '32' },
    { name: 'Storage', icon: '📚', count: '15' },
    { name: 'Lighting', icon: '💡', count: '28' },
    { name: 'Beds', icon: '🛏️', count: '12' },
    { name: 'Office', icon: '💼', count: '20' },
    { name: 'Outdoor', icon: '🌿', count: '16' },
  ];

  return (
    <section className="relative min-h-[70vh] bg-gradient-to-br from-gray-50 to-blue-50 pt-20 sm:pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* Left Sidebar - Categories */}
          <div className="lg:w-80 lg:flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              {/* Categories Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Categories</h2>
                <button 
                  onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                  className="lg:hidden p-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              {/* Categories List */}
              <div className={`${isCategoriesOpen ? 'block' : 'hidden lg:block'}`}>
                <div className="space-y-2">
                  {categories.map((category, index) => (
                    <button
                      key={index}
                      onClick={() => handleCategoryClick(category.name)}
                      className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 group"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">{category.icon}</span>
                        <span className="font-medium text-gray-700 group-hover:text-gray-900">
                          {category.name}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">{category.count}</span>
                        <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </button>
                  ))}
                </div>

                {/* View All Categories Button */}
                <button
                  onClick={handleShopCollection}
                  className="w-full mt-6 p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  View All Categories
                </button>
              </div>
            </div>

            {/* Hot Deals Section */}
            <div className="mt-6 bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">🔥 Hot Deals</h3>
              <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-4 border border-red-100">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600 mb-2">50% OFF</div>
                  <p className="text-sm text-gray-600 mb-3">Selected Furniture</p>
                  <button 
                    onClick={handleShopCollection}
                    className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </div>

            {/* Special Offer Section */}
            <div className="mt-6 bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">🎁 Special Offer</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-lg">💼</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">Premium Handbag</p>
                    <p className="text-xs text-gray-600">4.5★ Rating</p>
                    <p className="text-lg font-bold text-orange-600">$450.99</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-lg">👟</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">Designer Sneakers</p>
                    <p className="text-xs text-gray-600">4.5★ Rating</p>
                    <p className="text-lg font-bold text-blue-600">$380.99</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-lg">⌚</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">Luxury Watch</p>
                    <p className="text-xs text-gray-600">4.5★ Rating</p>
                    <p className="text-lg font-bold text-green-600">$520.99</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Tags Section */}
            <div className="mt-6 bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">🏷️ Product Tags</h3>
              <div className="flex flex-wrap gap-2">
                {['Phone', 'Vest', 'Smartphone', 'Furniture', 'T-shirt', 'Sneaker', 'Toys', 'Rose'].map((tag, index) => (
                  <button
                    key={index}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${
                      tag === 'Vest' 
                        ? 'bg-blue-100 text-blue-800 border border-blue-200' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Newsletter Section */}
            <div className="mt-6 bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">📧 Newsletter</h3>
              <p className="text-sm text-gray-600 mb-4">Sign up for our newsletter!</p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Testimonial Section */}
            <div className="mt-6 bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">💬 Testimonial</h3>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white text-xl">👤</span>
                </div>
                <p className="text-sm text-gray-600 mb-3 italic">
                  "Vtae sodales aliquam morbi non sem lacus port mollis. Nunc condime tum metus eud molest sed consectetuer."
                </p>
                <p className="text-sm font-medium text-gray-800">John Doe</p>
                <p className="text-xs text-gray-500">Abc Company</p>
                <div className="flex justify-center space-x-1 mt-3">
                  {[1, 2, 3].map((dot) => (
                    <div
                      key={dot}
                      className={`w-2 h-2 rounded-full ${
                        dot === 1 ? 'bg-blue-500' : 'bg-gray-300'
                      }`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Hero Content */}
          <div className="flex-1">
            <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 rounded-2xl shadow-2xl overflow-hidden relative">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}></div>
              </div>

              {/* Floating Elements */}
              <div className="hidden sm:block absolute top-10 right-10 w-16 h-16 bg-blue-500 rounded-full opacity-20 animate-pulse"></div>
              <div className="hidden sm:block absolute bottom-10 left-10 w-24 h-24 bg-purple-500 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>

              {/* Hero Content */}
              <div className="relative z-10 p-8 sm:p-12 lg:p-16">
                <div className="max-w-2xl">
                  {/* Badge */}
                  <div className="mb-6">
                    <span className="inline-block px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-full shadow-lg">
                      ✨ Premium Furniture Collection
                    </span>
                  </div>
                  
                  {/* Main Heading */}
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                    <span className="block">Transform Your</span>
                    <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      Living Space
                    </span>
                  </h1>
                  
                  {/* Description */}
                  <p className="text-lg sm:text-xl text-gray-200 mb-8 max-w-xl leading-relaxed">
                    Discover our curated collection of modern, minimalist furniture that combines 
                    exceptional craftsmanship with contemporary design. Create the home of your dreams.
                  </p>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <button 
                      onClick={handleShopCollection}
                      className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 active:scale-95"
                      aria-label="Shop our complete furniture collection"
                    >
                      <span className="flex items-center justify-center space-x-2">
                        <span>Shop Collection</span>
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </button>
                    
                    <button 
                      onClick={handleViewGallery}
                      className="px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105 cursor-pointer focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50 active:scale-95"
                      aria-label="View our furniture gallery"
                    >
                      View Gallery
                    </button>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-6 max-w-md">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white mb-1">500+</div>
                      <div className="text-gray-300 text-sm">Happy Customers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white mb-1">50+</div>
                      <div className="text-gray-300 text-sm">Unique Designs</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white mb-1">24/7</div>
                      <div className="text-gray-300 text-sm">Support</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
