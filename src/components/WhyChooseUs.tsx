import React from 'react';

const WhyChooseUs: React.FC = () => {
  return (
    <section className="bg-yellow-100 py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-10">Why Choose Lurex</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-md shadow-md">
            <div className="text-yellow-500 text-4xl mb-4">💰</div>
            <h3 className="text-xl font-bold mb-2">Best Price</h3>
            <p>Lurex guarantees the best prices for car rentals, ensuring affordability without compromising on quality.</p>
          </div>
          <div className="bg-white p-6 rounded-md shadow-md">
            <div className="text-yellow-500 text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-bold mb-2">Fast And Safe</h3>
            <p>Lurex is dedicated to providing a fast and safe car rental management experience.</p>
          </div>
          <div className="bg-white p-6 rounded-md shadow-md">
            <div className="text-yellow-500 text-4xl mb-4">🚗</div>
            <h3 className="text-xl font-bold mb-2">Experienced Drivers</h3>
            <p>Lurex ensures you travel with confidence by offering a selection of experienced drivers.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
