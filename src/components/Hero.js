import React from 'react';

const Hero = () => {
  const backgroundImageUrl = 'https://picsum.photos/1200/800?image=1060'; // A nice furniture-like image

  return (
    <section
      className="relative h-screen bg-cover bg-center flex items-center justify-center text-white"
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-center px-6">
        <h1 className="text-5xl md:text-7xl font-bold">
          Find Your Style
        </h1>
        <p className="mt-4 text-xl md:text-2xl">
          Modern and minimalist furniture for your home
        </p>
        <button className="mt-8 px-10 py-4 bg-blue-600 font-semibold rounded-full hover:bg-blue-500 transition-colors duration-300">
          Shop Now
        </button>
      </div>
    </section>
  );
};

export default Hero;
