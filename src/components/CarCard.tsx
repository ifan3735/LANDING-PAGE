import React from 'react';

interface CarCardProps {
  car: {
    id: number;
    name: string;
    price: string;
    distance: string;
    image: string;
  };
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  return (
    <div className="bg-white p-6 rounded-md shadow-md text-center">
      <img src={car.image} alt={car.name} className="w-full h-48 object-cover mb-4 rounded-md" />
      <h3 className="text-xl font-bold mb-2">{car.name}</h3>
      <p className="text-lg font-semibold mb-2">{car.price}</p>
      <p className="text-gray-600">{car.distance}</p>
      <button className="bg-yellow-500 text-white py-2 px-6 rounded-full font-semibold mt-4">Details</button>
    </div>
  );
}

export default CarCard;
