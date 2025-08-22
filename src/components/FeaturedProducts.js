import React from 'react';
import ProductCard from './ProductCard';

const products = [
  { id: 1, name: "Modern Chair", price: 180, image: "https://picsum.photos/300/200?random=1" },
  { id: 2, name: "Sleek Lamp", price: 60, image: "https://picsum.photos/300/200?random=2" },
  { id: 3, name: "Wooden Desk", price: 320, image: "https://picsum.photos/300/200?random=3" },
  { id: 4, name: "Cozy Sofa", price: 750, image: "https://picsum.photos/300/200?random=4" },
  { id: 5, name: "Bookshelf", price: 200, image: "https://picsum.photos/300/200?random=5" },
  { id: 6, name: "Dining Table", price: 500, image: "https://picsum.photos/300/200?random=6" },
  { id: 7, name: "Floor Rug", price: 120, image: "https://picsum.photos/300/200?random=7" },
  { id: 8, name: "Wall Art", price: 90, image: "https://picsum.photos/300/200?random=8" }
];

const FeaturedProducts = () => {
  return (
    <section className="bg-white py-28">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
