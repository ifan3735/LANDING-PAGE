import React from 'react';

const Features: React.FC = () => {
  return (
    <section className="p-8 bg-gray-100 text-center">
      <h2 className="text-4xl font-bold mb-8">Why Choose Lurex</h2>
      <div className="flex justify-center space-x-4">
        <div className="p-4 border rounded-lg w-1/3">
          <div className="text-yellow-500 text-4xl mb-2">💰</div>
          <h3 className="text-2xl font-bold">Best Price</h3>
          <p>Lurex guarantees the best prices for car rentals, ensuring affordability without compromising on quality.</p>
        </div>
        <div className="p-4 border rounded-lg w-1/3">
          <div className="text-yellow-500 text-4xl mb-2">⚡</div>
          <h3 className="text-2xl font-bold">Fast And Safe</h3>
          <p>Lurex is dedicated to providing a fast and safe car rental management experience.</p>
        </div>
        <div className="p-4 border rounded-lg w-1/3">
          <div className="text-yellow-500 text-4xl mb-2">🚗</div>
          <h3 className="text-2xl font-bold">Experienced Drivers</h3>
          <p>Lurex ensures you travel with confidence by offering a selection of experienced drivers.</p>
        </div>
      </div>
    </section>
  );
};

export default Features;
