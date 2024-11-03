import React from 'react';

interface CarCardProps {
  name: string;
  style: string;
  type: string;
  color: string;
  price: string;
  imageUrl: string;
}

const CarCard = ({ name, style, type, color, price, imageUrl }: CarCardProps) => (
  <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-r from-gray-100 to-gray-200">
    <img src={imageUrl} alt={name} className="w-full h-40 object-cover rounded-t-lg mb-5 shadow-md" />
    <div className="text-center w-full px-4">
      <h3 className="font-semibold text-lg text-gray-800 mb-2">{name}</h3>
      <p className="text-gray-600 text-sm mb-1"><span className="font-medium text-gray-700">Style:</span> {style}</p>
      <p className="text-gray-600 text-sm mb-1"><span className="font-medium text-gray-700">Type:</span> {type}</p>
      <p className="text-gray-600 text-sm mb-1"><span className="font-medium text-gray-700">Color:</span> {color}</p>
      <p className="text-xl font-bold text-blue-600 mt-4">${price}</p>
    </div>
  </div>
);

export default CarCard;
