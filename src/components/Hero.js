import React from 'react';

const Hero = () => {
  return (
    <section className="bg-gray-100 pt-16">
      <div className="container mx-auto px-6 py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800">
          Find Your Style
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-600">
          Modern and minimalist furniture for your home
        </p>
        <button className="mt-8 px-8 py-3 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-700">
          Shop Now
        </button>
      </div>
    </section>
  );
};

export default Hero;
