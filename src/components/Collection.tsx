import React from 'react';

const Collection: React.FC = () => {
  const cars = [
    { id: 1, name: '2020 Hyundai Sonata', price: '$70/day', image: '/images/sonata.png' },
    { id: 2, name: '2019 Ford Fusion', price: '$70/day', image: '/images/fusion.png' },
    { id: 3, name: '2024 BMW X6', price: '$70/day', image: '/images/bmw.png' },
  ];

  return (
    <section className="p-8">
      <h2 className="text-4xl font-bold italic mb-8 text-center">Book from our collection</h2>
      <div className="flex justify-center space-x-8">
        {cars.map((car) => (
          <div key={car.id} className="border p-4 rounded-lg text-center">
            <img src={car.image} alt={car.name} className="w-48 h-32 mx-auto mb-4" />
            <h3 className="text-2xl font-bold">{car.name}</h3>
            <p className="text-yellow-500 text-xl">{car.price}</p>
            <button className="bg-yellow-500 text-white px-4 py-2 mt-4 rounded-lg">Details</button>
          </div>
        ))}
      </div>
      <button className="bg-yellow-500 text-white px-6 py-3 mt-8 rounded-lg mx-auto block">See All Cars</button>
    </section>
  );
};

export default Collection;
