import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedProducts from './components/FeaturedProducts';
import Footer from './components/Footer';
import Cart from './components/Cart';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';

// Wrapper component to use useNavigate hook
const AppContent = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      }
      return [...prevItems, product];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateCartItemQuantity = (productId, newQuantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleViewDetails = (product) => {
    if (product.slug) {
      navigate(`/product/${product.slug}`);
    }
  };

  return (
    <div className="bg-gray-50">
      <Navbar 
        cartItemsCount={cartItemsCount}
        onOpenCart={() => setIsCartOpen(true)}
      />
      
      <Routes>
        <Route path="/" element={
          <main>
            <Hero />
            <FeaturedProducts 
              onViewDetails={handleViewDetails}
              onAddToCart={addToCart}
            />
          </main>
        } />
        
        <Route path="/products" element={
          <ProductsPage 
            onViewDetails={handleViewDetails}
            onAddToCart={addToCart}
          />
        } />
        
        <Route path="/product/:slug" element={
          <ProductDetailPage onAddToCart={addToCart} />
        } />
        
        <Route path="/cart" element={
          <CartPage 
            cartItems={cartItems}
            onRemoveItem={removeFromCart}
            onUpdateQuantity={updateCartItemQuantity}
            onClearCart={clearCart}
          />
        } />
      </Routes>
      
      <Footer />
      
      {/* Cart Sidebar */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateCartItemQuantity}
      />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
