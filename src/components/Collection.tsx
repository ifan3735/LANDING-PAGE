import React from 'react';
import CarCard from './CarCard';

const cars = [
  { id: 1, name: '2020 Hyundai Sonata', price: '$70/day', distance: '12 Km', image: '../assets/images/car1.png' },
  { id: 2, name: '2019 Ford Fusion', price: '$70/day', distance: '12 Km', image: '../assets/images/car2.png' },
  { id: 3, name: '2024 BMW X6', price: '$70/day', distance: '12 Km', image: '../assets/images/car3.png' },
  { id: 4, name: '2024 BMW X6', price: '$70/day', distance: '12 Km', image: '../assets/images/car4.png' },
];

const Collection: React.FC = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-10">Book from our collection</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {cars.map(car => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
        <button className="bg-yellow-500 text-white py-2 px-6 rounded-full font-semibold mt-10">See All Cars</button>
      </div>
    </section>
  );
}

export default Collection;
