import React from 'react';

const ProductSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="w-full h-48 sm:h-56 md:h-64 bg-gray-300"></div>
      
      {/* Content skeleton */}
      <div className="p-4 sm:p-6">
        {/* Title skeleton */}
        <div className="h-4 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
        
        {/* Price and button skeleton */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
          <div className="h-6 bg-gray-300 rounded w-20"></div>
          <div className="h-10 bg-gray-300 rounded w-full sm:w-32"></div>
        </div>
      </div>
    </div>
  );
};

// Multiple skeleton loader
export const ProductSkeletonGrid = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
      {Array.from({ length: count }).map((_, index) => (
        <ProductSkeleton key={index} />
      ))}
    </div>
  );
};

export default ProductSkeleton;
