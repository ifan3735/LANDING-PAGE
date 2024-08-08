import React, { useState } from 'react';

const Collection: React.FC = () => {
  const cars = [
    { id: 1, name: '2020 Hyundai Sonata', price: '$70/day', image: 'https://i.pinimg.com/236x/a4/b2/4f/a4b24fb318f4b26faaef42ab686fcb4e.jpg', type: 'hyundai' },
    { id: 2, name: '2019 Ford Fusion', price: '$70/day', image: 'https://i.pinimg.com/564x/3b/98/be/3b98be7c80cb9f163338a56bd3f22a4d.jpg', type: 'ford' },
    { id: 3, name: '2024 BMW X6', price: '$70/day', image: 'https://i.pinimg.com/564x/d9/bf/54/d9bf54d2a986c2ace6b4bef4779d06b8.jpg', type: 'bmw' },
    { id: 4, name: '2021 Audi A8', price: '$100/day', image: 'https://i.pinimg.com/236x/c5/e2/4e/c5e24eab84569e0f0baf5eeedad31306.jpg', type: 'audi' },
    { id: 5, name: '2023 Lexus RX', price: '$90/day', image: 'https://i.pinimg.com/736x/21/98/5c/21985c4f959c42d691a39217e1700f19.jpg', type: 'lexus' },
    { id: 6, name: '2022 Range Rover Evoque', price: '$120/day', image: 'https://i.pinimg.com/736x/1e/40/4d/1e404d5002178fba66032a9b9358420f.jpg', type: 'range rover' },
    { id: 7, name: '2022 Porsche 911', price: '$150/day', image: 'https://i.pinimg.com/564x/be/89/aa/be89aa5a70533280279c5c161ac8f10d.jpg', type: 'porsche' },
  ];

  const [selectedType, setSelectedType] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const filteredCars = selectedType === 'all' ? cars : cars.filter(car => car.type === selectedType);
  const carsPerPage = 3;
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);
  const totalPages = Math.ceil(filteredCars.length / carsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleTypeHover = (type: string) => {
    setSelectedType(type);
    setCurrentPage(1);
  };

  return (
    <section className="p-8 bg-gradient-to-b from-yellow-100 to-yellow-50">
      <h2 className="text-5xl font-extrabold italic mb-12 text-center text-gray-800">Book from our Premium Collection</h2>

      <div className="flex flex-wrap">
        <div className="w-full lg:w-3/4 flex flex-wrap justify-center space-x-8">
          {currentCars.map((car) => (
            <div
              key={car.id}
              className="border border-gray-200 p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <img src={car.image} alt={car.name} className="w-56 h-36 object-cover mx-auto mb-4 rounded" />
              <h3 className="text-2xl font-semibold text-gray-700">{car.name}</h3>
              <p className="text-yellow-600 text-xl">{car.price}</p>
              <button className="bg-yellow-600 text-white px-4 py-2 mt-4 rounded-lg shadow-md hover:bg-yellow-700 transition">
                Details
              </button>
            </div>
          ))}
        </div>

        <div className="w-full lg:w-1/4 mt-8 lg:mt-0 flex flex-col items-center lg:items-end">
          {['all', 'audi', 'bmw', 'ford', 'hyundai', 'lexus', 'porsche', 'range rover'].map((type) => (
            <button
              key={type}
              onMouseEnter={() => handleTypeHover(type)}
              className={`w-48 py-3 mb-4 rounded-lg text-lg font-semibold text-white transition duration-300 ${
                selectedType === type ? 'bg-yellow-600 shadow-lg' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-center space-x-4 mt-8">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`px-6 py-3 rounded-lg font-semibold transition ${
            currentPage === 1 ? 'bg-gray-200 text-gray-500' : 'bg-yellow-600 text-white hover:bg-yellow-700'
          }`}
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-6 py-3 rounded-lg font-semibold transition ${
            currentPage === totalPages ? 'bg-gray-200 text-gray-500' : 'bg-yellow-600 text-white hover:bg-yellow-700'
          }`}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default Collection;
