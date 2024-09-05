import React from 'react';

const carData = [
  { name: 'BMW M4', image: 'https://via.placeholder.com/150', price: '$50,000' },
  { name: 'Audi A5', image: 'https://via.placeholder.com/150', price: '$55,000' },
  { name: 'Mercedes Benz', image: 'https://via.placeholder.com/150', price: '$60,000' },
  { name: 'Porsche 911', image: 'https://via.placeholder.com/150', price: '$70,000' },
];

const AvailableCars = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Available Cars</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {carData.map((car, index) => (
          <div key={index} className="p-4 border rounded-lg flex items-center space-x-4">
            <img src={car.image} alt={car.name} className="w-24 h-16 object-cover rounded-lg" />
            <div>
              <h3 className="text-lg font-semibold">{car.name}</h3>
              <p className="text-gray-500">{car.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableCars;
