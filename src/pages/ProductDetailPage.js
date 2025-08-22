import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductBySlug } from '../services/productsService';

const ProductDetailPage = ({ onAddToCart }) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const fetchedProduct = await getProductBySlug(slug);
        if (fetchedProduct) {
          setProduct(fetchedProduct);
        } else {
          setError('Product not found');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  const handleAddToCart = () => {
    if (product) {
      onAddToCart({
        ...product,
        quantity: quantity
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 sm:pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
              <div className="space-y-4">
                <div className="h-64 sm:h-80 lg:h-96 bg-gray-300 rounded-lg animate-pulse"></div>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-16 sm:h-20 bg-gray-300 rounded animate-pulse"></div>
                  ))}
                </div>
              </div>
              <div className="space-y-4 sm:space-y-6">
                <div className="h-6 sm:h-8 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-4 sm:h-6 bg-gray-300 rounded w-1/3 animate-pulse"></div>
                <div className="h-3 sm:h-4 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-3 sm:h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
                <div className="h-24 sm:h-32 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-10 sm:h-12 bg-gray-300 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-8">
              <svg className="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <h2 className="text-2xl font-bold text-red-800 mb-2">Product Not Found</h2>
              <p className="text-red-600 mb-6">
                {error || 'The product you are looking for does not exist.'}
              </p>
              <button
                onClick={() => navigate('/')}
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Use product.images array if available, otherwise fallback to single image
  const images = product.images && product.images.length > 0 
    ? product.images 
    : [product.image];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-gray-500">
              <li>
                <button 
                  onClick={() => navigate('/')}
                  className="hover:text-blue-600 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <span className="mx-2">/</span>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/products')}
                  className="hover:text-blue-600 transition-colors"
                >
                  Products
                </button>
              </li>
              <li>
                <span className="mx-2">/</span>
              </li>
              <li className="text-gray-900 font-medium">{product.name}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div className="space-y-6">
              <div className="aspect-w-1 aspect-h-1">
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-full h-96 object-cover rounded-lg shadow-lg"
                />
              </div>
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-w-1 aspect-h-1 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index 
                          ? 'border-blue-500 ring-2 ring-blue-200' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-24 object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-8">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
                  {product.category && (
                    <span className="px-4 py-2 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                      {product.category}
                    </span>
                  )}
                </div>
                
                {product.rating && (
                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-6 h-6 ${
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
                    <span className="ml-3 text-gray-600">({product.rating})</span>
                  </div>
                )}

                <div className="text-4xl font-bold text-blue-600 mb-4">
                  ${product.price.toFixed(2)}
                </div>

                <p className="text-gray-600 text-lg">
                  Free shipping on orders over $100
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Description</h3>
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
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Features</h3>
                  <ul className="space-y-3">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Quantity and Add to Cart */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Quantity
                  </label>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                      </svg>
                    </button>
                    <span className="w-20 text-center text-xl font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-full bg-blue-600 text-white py-4 px-8 rounded-lg font-semibold text-xl hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl"
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
  );
};

export default ProductDetailPage;
