import React from 'react';

const Hero: React.FC = () => {
    const carImage = 'https://i.pinimg.com/236x/d9/5c/d0/d95cd04d85043401df2b957eeba934cd.jpg'
  return (
    <section className="bg-yellow-100 py-20">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl font-bold mb-4">Rent cars <span className="text-yellow-500">Easily</span></h1>
        <p className="text-lg mb-6">Get access to rent our Luxury cars for your premium events at affordable prices</p>
        <button className="bg-yellow-500 text-white py-2 px-6 rounded-full font-semibold">Get Started</button>
        <div className="mt-8">
          <img src={carImage} alt="Luxury Car" className="mx-auto" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
