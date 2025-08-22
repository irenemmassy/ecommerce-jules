import React from 'react';
import { Link } from 'react-router-dom';

const Cart = ({ isOpen, onClose, cartItems, onRemoveItem, onUpdateQuantity }) => {
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        ></div>
      )}
      
      {/* Cart Sidebar */}
      <div className={`fixed right-0 top-0 h-full w-full sm:w-96 max-w-sm bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Quick Cart</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-lg hover:bg-gray-100"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-6 sm:py-8">
                <svg className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-3 sm:mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <p className="text-gray-500 mb-3 sm:mb-4 text-sm sm:text-base">Your cart is empty</p>
                <Link
                  to="/products"
                  onClick={onClose}
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm sm:text-base"
                >
                  Start Shopping
                </Link>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-gray-50 rounded-lg">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-800 text-sm sm:text-base truncate">{item.name}</h3>
                      <p className="text-gray-600 text-sm">${item.price.toFixed(2)}</p>
                      <div className="flex items-center space-x-2 mt-1 sm:mt-2">
                        <button
                          onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-xs sm:text-sm transition-colors"
                        >
                          -
                        </button>
                        <span className="w-6 sm:w-8 text-center text-sm">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-xs sm:text-sm transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-red-500 hover:text-red-700 transition-colors p-1 rounded-lg hover:bg-red-50 flex-shrink-0"
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t p-4 sm:p-6">
            {cartItems.length > 0 && (
              <>
                <div className="flex justify-between items-center mb-3 sm:mb-4">
                  <span className="text-base sm:text-lg font-semibold text-gray-800">Total:</span>
                  <span className="text-lg sm:text-xl font-bold text-gray-800">${total.toFixed(2)}</span>
                </div>
                
                {/* View Full Cart Button */}
                <Link
                  to="/cart"
                  onClick={onClose}
                  className="w-full mb-2 sm:mb-3 py-2.5 sm:py-3 px-4 bg-gray-100 text-gray-800 rounded-lg font-medium hover:bg-gray-200 active:bg-gray-300 transition-colors text-center block text-sm sm:text-base"
                >
                  View Full Cart
                </Link>
              </>
            )}
            
            <button
              disabled={cartItems.length === 0}
              className={`w-full py-2.5 sm:py-3 px-4 rounded-lg font-medium transition-colors text-sm sm:text-base ${
                cartItems.length === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
              }`}
            >
              {cartItems.length === 0 ? 'Cart Empty' : 'Checkout'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
