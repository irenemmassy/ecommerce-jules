import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ cartItemsCount, onOpenCart }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50 top-0">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <div className="flex items-center min-w-0">
            <Link to="/" className="flex-shrink-0 group">
              <div className="flex items-center space-x-2">
                {/* Logo Icon */}
                <div className="relative">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
                    </svg>
                  </div>
                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-400 rounded-lg opacity-20 blur-sm group-hover:opacity-30 transition-opacity duration-300"></div>
                </div>
                
                {/* Logo Text */}
                <div className="flex flex-col">
                  <span className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
                    <span className="hidden sm:inline">Modern</span>
                    <span className="sm:hidden">M</span>
                  </span>
                  <span className="text-xs sm:text-sm lg:text-base xl:text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent leading-tight -mt-1">
                    <span className="hidden sm:inline">Furnishings</span>
                    <span className="sm:hidden">F</span>
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-6 lg:ml-10 flex items-baseline space-x-2 lg:space-x-4">
              <Link to="/" className="text-gray-600 hover:text-blue-600 px-2 lg:px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                Home
              </Link>
              <Link to="/products" className="text-gray-600 hover:text-blue-600 px-2 lg:px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                Products
              </Link>
              <Link to="/cart" className="text-gray-600 hover:text-blue-600 px-2 lg:px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                Cart
              </Link>
            </div>
          </div>

          {/* Cart and Mobile Menu Button */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-1.5 sm:p-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 rounded-lg hover:bg-gray-100"
              title="Quick Cart View"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
              </svg>
              {cartItemsCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center font-bold text-[10px] sm:text-xs">
                  {cartItemsCount > 99 ? '99+' : cartItemsCount}
                </span>
              )}
            </button>

            {/* Full Cart Page Link */}
            <Link 
              to="/cart"
              className="hidden sm:block px-3 lg:px-4 py-1.5 lg:py-2 bg-blue-600 text-white text-xs lg:text-sm font-medium rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors duration-200"
            >
              <span className="hidden lg:inline">View Cart</span>
              <span className="lg:hidden">Cart</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="md:hidden bg-gray-100 inline-flex items-center justify-center p-1.5 sm:p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-5 w-5 sm:h-6 sm:w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-5 w-5 sm:h-6 sm:w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg" id="mobile-menu">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-3 space-y-1">
            <Link 
              to="/" 
              onClick={() => setIsOpen(false)}
              className="text-gray-600 hover:text-blue-600 hover:bg-gray-50 active:bg-gray-100 block px-3 py-3 rounded-md text-base font-medium transition-colors duration-200"
            >
              🏠 Home
            </Link>
            <Link 
              to="/products" 
              onClick={() => setIsOpen(false)}
              className="text-gray-600 hover:text-blue-600 hover:bg-gray-50 active:bg-gray-100 block px-3 py-3 rounded-md text-base font-medium transition-colors duration-200"
            >
              🛍️ Products
            </Link>
            <Link 
              to="/cart" 
              onClick={() => setIsOpen(false)}
              className="text-gray-600 hover:text-blue-600 hover:bg-gray-50 active:bg-gray-100 block px-3 py-3 rounded-md text-base font-medium transition-colors duration-200 flex items-center justify-between"
            >
              <span>🛒 Cart</span>
              {cartItemsCount > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {cartItemsCount > 99 ? '99+' : cartItemsCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
