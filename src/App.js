import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedProducts from './components/FeaturedProducts';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-gray-50">
      <Navbar />
      <main>
        <Hero />
        <FeaturedProducts />
      </main>
      <Footer />
    </div>
  );
}

export default App;
