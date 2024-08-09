import React, { useState } from 'react';
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Collection: React.FC = () => {
  const cars = [
    { id: 1, name: '2020 Hyundai Sonata', price: '$70/day', image: 'https://i.pinimg.com/236x/a4/b2/4f/a4b24fb318f4b26faaef42ab686fcb4e.jpg', type: 'hyundai', category: 'sedan' },
    { id: 2, name: '2019 Ford Fusion', price: '$70/day', image: 'https://i.pinimg.com/564x/3b/98/be/3b98be7c80cb9f163338a56bd3f22a4d.jpg', type: 'ford', category: 'sedan' },
    { id: 3, name: '2024 BMW X6', price: '$70/day', image: 'https://i.pinimg.com/564x/d9/bf/54/d9bf54d2a986c2ace6b4bef4779d06b8.jpg', type: 'bmw', category: 'suv' },
    { id: 4, name: '2021 Audi A8', price: '$100/day', image: 'https://i.pinimg.com/236x/c5/e2/4e/c5e24eab84569e0f0baf5eeedad31306.jpg', type: 'audi', category: 'sedan' },
    { id: 5, name: '2023 Lexus RX', price: '$90/day', image: 'https://i.pinimg.com/736x/21/98/5c/21985c4f959c42d691a39217e1700f19.jpg', type: 'lexus', category: 'suv' },
    { id: 6, name: '2022 Range Rover Evoque', price: '$120/day', image: 'https://i.pinimg.com/736x/1e/40/4d/1e404d5002178fba66032a9b9358420f.jpg', type: 'range rover', category: 'offroad' },
    { id: 7, name: '2022 Porsche 911', price: '$150/day', image: 'https://i.pinimg.com/564x/be/89/aa/be89aa5a70533280279c5c161ac8f10d.jpg', type: 'porsche', category: 'sports' },
  ];

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const filteredCars = cars.filter(car => 
    (selectedCategory === 'all' || car.category === selectedCategory) && 
    (selectedType === 'all' || car.type === selectedType)
  );

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

  const handleCategoryHover = (category: string) => {
    setSelectedCategory(category);
    setSelectedType('all'); // Reset the type when category changes
    setCurrentPage(1);
  };

  const handleTypeHover = (type: string) => {
    setSelectedType(type);
    setCurrentPage(1);
  };

  const handleDetailsClick = () => {
    toast.info("Please sign in or sign up to book this car.", {
      position: "top-center",
      className: 'custom-toast', // Use a class for custom styling
    });
  };

  // Define custom styles for the toast notification using a CSS class
  const customToastStyle = `
    .custom-toast {
      background-color: #fbbf24; /* Yellow background matching the buttons */
      color: #374151; /* Dark gray text color */
      font-weight: bold;
      border-radius: 8px;
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    }
  `;

  // Inject the custom styles into the document head
  const styleElement = document.createElement("style");
  styleElement.textContent = customToastStyle;
  document.head.appendChild(styleElement);

  // Get unique car types based on selected category
  const availableTypes = ['all', ...new Set(cars.filter(car => car.category === selectedCategory).map(car => car.type))];

  return (
    <section className="p-8 bg-gradient-to-b from-yellow-100 to-yellow-50">
      <ToastContainer />
      <h2 className="text-5xl font-extrabold italic mb-12 text-center text-gray-800">Book from our Premium Collection</h2>

      <div className="flex justify-between items-center">
        {/* Category Buttons on the Left */}
        <div className="flex flex-col items-start">
          {['all', 'sedan', 'suv', 'offroad', 'sports'].map((category) => (
            <button
              key={category}
              onMouseEnter={() => handleCategoryHover(category)}
              className={`w-48 py-3 mb-4 rounded-lg text-lg font-semibold text-white transition duration-300 ${
                selectedCategory === category ? 'bg-yellow-600 shadow-lg' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Cars in the Middle */}
        <div className="flex flex-wrap justify-center space-x-8">
          {currentCars.map((car) => (
            <div
              key={car.id}
              className="border border-gray-200 p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl w-64"
            >
              <img src={car.image} alt={car.name} className="w-full h-36 object-cover mb-4 rounded" />
              <h3 className="text-2xl font-semibold text-gray-700">{car.name}</h3>
              <p className="text-yellow-600 text-xl">{car.price}</p>
              <button
                className="bg-yellow-600 text-white px-4 py-2 mt-4 rounded-lg shadow-md hover:bg-yellow-700 transition"
                onClick={handleDetailsClick}
              >
                Details
              </button>
            </div>
          ))}
        </div>

        {/* Type Buttons on the Right */}
        <div className="flex flex-col items-end">
          {availableTypes.map((type) => (
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
