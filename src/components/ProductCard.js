import React from 'react';

const ProductCard = ({ product, onViewDetails, onAddToCart }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300 h-full flex flex-col">
      <div className="relative group cursor-pointer flex-shrink-0" onClick={() => onViewDetails(product)}>
        <img 
          className="w-full h-40 xs:h-44 sm:h-48 md:h-52 lg:h-56 object-cover" 
          src={product.image} 
          alt={product.name}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-white font-semibold text-xs sm:text-sm lg:text-base px-3 py-1 bg-black bg-opacity-50 rounded-full">
              View Details
            </span>
          </div>
        </div>
        {product.category && (
          <div className="absolute top-2 left-2">
            <span className="px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
              {product.category}
            </span>
          </div>
        )}
      </div>
      
      <div className="p-3 sm:p-4 lg:p-5 flex-1 flex flex-col">
        <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800 mb-2 line-clamp-2 flex-1">
          {product.name}
        </h3>
        
        {product.rating && (
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-3 h-3 sm:w-4 sm:h-4 ${
                    i < Math.floor(product.rating) 
                      ? 'text-yellow-400' 
                      : 'text-gray-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="ml-1 text-xs sm:text-sm text-gray-600">({product.rating})</span>
          </div>
        )}
        
        <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-2 xs:gap-3 mt-auto">
          <p className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600">
            ${product.price.toFixed(2)}
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart({ ...product, quantity: 1 });
            }}
            className="w-full xs:w-auto bg-blue-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors duration-200 flex items-center justify-center space-x-1.5 text-xs sm:text-sm font-medium"
          >
            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
            </svg>
            <span className="hidden xs:inline sm:hidden lg:inline">Add to Cart</span>
            <span className="xs:hidden sm:inline lg:hidden">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
