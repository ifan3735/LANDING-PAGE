import React from 'react';

const Hero: React.FC = () => {
  const HeroImage = 'https://i.pinimg.com/564x/4d/8a/55/4d8a552692d0ddb2870131d83e9dfbf4.jpg';

  return (
    <section className="bg-white p-8 md:p-16 flex flex-col md:flex-row items-center min-h-[60vh] md:min-h-[50vh]">
      <div className="md:w-1/2 flex flex-col items-start space-y-4 md:ml-16">
        <div>
          <h1 className="text-8xl font-semibold">Rent cars</h1>
          <h1 className="text-9xl font-extrabold italic text-black-500">Easily</h1>
        </div>
        <p className="text-lg mb-4">
          Get access to rent our Luxury cars for your premium events at affordable prices. Experience the convenience and luxury of driving top-class vehicles with ease. Whether you need a car for a special occasion, a business trip, or a weekend getaway, we have the perfect car for you.
        </p>
        <button className="bg-yellow-500 text-black px-6 py-3 rounded-lg flex items-center space-x-2">
          <span>GET STARTED</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      <div className="md:w-1/2 flex justify-center mt-8 md:mt-0">
        <img src={HeroImage} alt="Luxury Car" className="max-w-full h-auto" />
      </div>
    </section>
  );
};

export default Hero;
