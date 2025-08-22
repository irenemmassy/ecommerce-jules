import React from 'react';
import { useNavigate } from 'react-router-dom';

const CartPage = ({ cartItems, onRemoveItem, onUpdateQuantity, onClearCart }) => {
  const navigate = useNavigate();

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    // TODO: Implement checkout functionality
    alert('Checkout functionality coming soon!');
  };

  const handleContinueShopping = () => {
    navigate('/products');
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 sm:pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 lg:p-12">
              <svg className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 text-gray-300 mx-auto mb-4 sm:mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">Your cart is empty</h1>
              <p className="text-gray-600 text-base sm:text-lg mb-6 sm:mb-8 px-4">
                Looks like you haven't added any products to your cart yet.
              </p>
              <button
                onClick={handleContinueShopping}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base"
              >
                Start Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16 sm:pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Shopping Cart</h1>
            <p className="text-gray-600 text-sm sm:text-base">
              {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Cart Items</h2>
                
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 text-lg">{item.name}</h3>
                        <p className="text-gray-600">${item.price.toFixed(2)}</p>
                        {item.category && (
                          <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full mt-1">
                            {item.category}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-sm transition-colors"
                          >
                            -
                          </button>
                          <span className="w-12 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-sm transition-colors"
                          >
                            +
                          </button>
                        </div>
                        
                        <div className="text-right min-w-[80px]">
                          <p className="font-semibold text-gray-800">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-red-500 hover:text-red-700 transition-colors p-2"
                          title="Remove item"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Cart Actions */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <button
                      onClick={onClearCart}
                      className="text-red-600 hover:text-red-800 font-medium transition-colors"
                    >
                      Clear Cart
                    </button>
                    <button
                      onClick={handleContinueShopping}
                      className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                    >
                      Continue Shopping
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className={total >= 100 ? 'text-green-600' : 'text-gray-600'}>
                      {total >= 100 ? 'Free' : '$9.99'}
                    </span>
                  </div>
                  
                  {total < 100 && (
                    <div className="text-sm text-gray-500">
                      Add ${(100 - total).toFixed(2)} more for free shipping
                    </div>
                  )}
                  
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-lg font-semibold text-gray-800">
                      <span>Total</span>
                      <span>${total >= 100 ? total.toFixed(2) : (total + 9.99).toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
                >
                  Proceed to Checkout
                </button>

                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-500">
                    Secure checkout powered by Stripe
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
