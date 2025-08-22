import React, { useState } from 'react';

const ProductDetails = ({ product, onAddToCart, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Use product.images array if available, otherwise fallback to single image
  const images = product.images && product.images.length > 0 
    ? product.images 
    : [product.image];

  const handleAddToCart = () => {
    onAddToCart({
      ...product,
      quantity: quantity
    });
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      ></div>
      
      {/* Product Details Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
                {product.category && (
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                    {product.category}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 transition-colors p-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Image Gallery */}
              <div className="space-y-4">
                <div className="aspect-w-1 aspect-h-1">
                  <img
                    src={images[selectedImage]}
                    alt={product.name}
                    className="w-full h-96 object-cover rounded-lg"
                  />
                </div>
                {images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`aspect-w-1 aspect-h-1 rounded-lg overflow-hidden border-2 ${
                          selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${product.name} ${index + 1}`}
                          className="w-full h-20 object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    ${product.price.toFixed(2)}
                  </h2>
                  {product.rating && (
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-5 h-5 ${
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
                      <span className="ml-2 text-gray-600">({product.rating})</span>
                    </div>
                  )}
                  <p className="text-gray-600 text-lg">
                    Free shipping on orders over $100
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Description</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {product.description || 
                      `This beautifully crafted ${product.name.toLowerCase()} combines modern design with exceptional quality. 
                      Perfect for contemporary homes, it features clean lines, premium materials, and thoughtful details 
                      that make it both functional and stylish. Whether you're furnishing a new space or updating your 
                      current decor, this piece will add sophistication and comfort to any room.`
                    }
                  </p>
                </div>

                {product.features && product.features.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Features</h3>
                    <ul className="space-y-2 text-gray-600">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Quantity and Add to Cart */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quantity
                    </label>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                      >
                        -
                      </button>
                      <span className="w-16 text-center text-lg font-medium">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center space-x-2"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                    </svg>
                    <span>Add to Cart - ${(product.price * quantity).toFixed(2)}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
