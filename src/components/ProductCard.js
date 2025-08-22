import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 hover:shadow-2xl transition-all duration-300">
      <img className="w-full h-64 object-cover" src={product.image} alt={product.name} />
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="mt-2 text-gray-600">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductCard;
