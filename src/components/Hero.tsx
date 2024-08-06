import React from 'react';

const Hero: React.FC = () => {
  const HeroImage = 'https://i.pinimg.com/236x/d6/1d/e1/d61de11dae45fe1c793d94681daf236b.jpg'
  return (
    <section className="bg-yellow-100 p-8 flex flex-col items-center text-center">
      <h1 className="text-5xl font-bold mb-4">Rent cars <br /> Easily</h1>
      <p className="mb-8">Get access to rent our Luxury cars for your premium events at affordable prices</p>
      <button className="bg-yellow-500 text-white px-6 py-3 rounded-lg">GET STARTED</button>
      <img src={HeroImage} alt="Luxury Car" className="mt-8" />
    </section>
  );
};

export default Hero;
