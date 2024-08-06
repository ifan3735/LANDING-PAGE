import React from 'react';

const Features: React.FC = () => {
  return (
    <section className="p-8 bg-gray-100 text-center">
      <h2 className="text-4xl font-bold mb-8">Why Choose Lurex</h2>
      <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
        <div className="p-8 border rounded-lg w-full md:w-1/3">
          <div className="text-yellow-500 text-6xl mb-4">💰</div>
          <h3 className="text-3xl font-bold mb-4">Best Price</h3>
          <p className="text-lg">Lurex guarantees the best prices for car rentals, ensuring affordability without compromising on quality.</p>
        </div>
        <div className="p-8 border rounded-lg w-full md:w-1/3">
          <div className="text-yellow-500 text-6xl mb-4">⚡</div>
          <h3 className="text-3xl font-bold mb-4">Fast And Safe</h3>
          <p className="text-lg">Lurex is dedicated to providing a fast and safe car rental management experience.</p>
        </div>
        <div className="p-8 border rounded-lg w-full md:w-1/3">
          <div className="text-yellow-500 text-6xl mb-4">🚗</div>
          <h3 className="text-3xl font-bold mb-4">Experienced Drivers</h3>
          <p className="text-lg">Lurex ensures you travel with confidence by offering a selection of experienced drivers.</p>
        </div>
      </div>
    </section>
  );
};

export default Features;
