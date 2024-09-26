import { useState } from 'react';
import {
  FaCar,
  FaChevronDown,
  FaFileExport,
  FaGasPump,
  FaRoad,
  FaTachometerAlt,
  FaArrowLeft,
} from 'react-icons/fa';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const CarDetailView = ({ car, onBack }: { car: any; onBack: () => void }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleExportDropdown = () => setShowDropdown(!showDropdown);

  const rentalRate = car.rentalRate || 100;

  const carImages = car.images || [
    car.image,
    '/images/car-front.jpg',
    '/images/car-side.jpg',
    '/images/car-rear.jpg',
    '/images/car-interior.jpg',
    '/images/car-engine.jpg',
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true, // Adds a fade transition between slides
  };

  return (
    <div className="relative bg-gradient-to-b from-gray-50 via-white to-gray-200 min-h-screen py-10 px-6 md:px-16">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="absolute top-8 left-8 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-full flex items-center shadow-lg transition-all duration-300"
      >
        <FaArrowLeft className="mr-2" /> Back
      </button>

      {/* Title Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            {car.name}
          </h2>
          <p className="text-lg text-gray-600 mt-2">Explore every detail of this car.</p>
        </div>

        {/* Export Dropdown */}
        <div className="relative">
          <button
            onClick={toggleExportDropdown}
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white px-6 py-3 rounded-full shadow-lg flex items-center"
          >
            <FaFileExport className="mr-2" /> Export
            <FaChevronDown className="ml-2" />
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-xl z-10">
              <ul className="text-gray-800">
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => console.log('Export as CSV')}
                >
                  Export as CSV
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => console.log('Export as PDF')}
                >
                  Export as PDF
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Car Image Carousel */}
      <div className="mt-8 bg-white bg-opacity-80 backdrop-blur-md p-8 rounded-3xl shadow-2xl transition-all duration-300">
        <h3 className="text-3xl font-bold text-gray-900 mb-4 text-center">
          Explore the Car
        </h3>

        <div className="rounded-xl overflow-hidden">
          <Slider {...settings}>
            {carImages.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image}
                  alt={`Car View ${index + 1}`}
                  className="w-full h-96 object-cover rounded-xl shadow-lg hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* Car Details Section */}
      <div className="mt-10 bg-white bg-opacity-90 backdrop-blur-md p-10 rounded-3xl shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-12 transition-all duration-300">
        <div className="flex flex-col justify-between">
          <h2 className="text-5xl font-black text-gray-900 mb-6">{car.name}</h2>

          <p className="text-xl text-gray-800 mb-6">
            <span className="font-semibold">RTO:</span> {car.rto} <br />
            <span className="font-semibold">Color:</span> {car.color} <br />
            <span className="font-semibold">Listed on:</span> {car.dateListed}
          </p>

          <div className="grid grid-cols-2 gap-6 text-lg text-gray-700 mb-8">
            <p className="flex items-center">
              <FaRoad className="mr-2 text-blue-600" />
              <span className="font-semibold">Mileage:</span> {car.mileage} KM
            </p>
            <p className="flex items-center">
              <FaGasPump className="mr-2 text-blue-600" />
              <span className="font-semibold">Fuel Type:</span> {car.fuelType}
            </p>
            <p className="flex items-center">
              <FaCar className="mr-2 text-blue-600" />
              <span className="font-semibold">Style:</span> {car.carType}
            </p>
            <p className="flex items-center">
              <FaTachometerAlt className="mr-2 text-blue-600" />
              <span className="font-semibold">Top Speed:</span> {car.speed} KM/H
            </p>
          </div>

          <p className="text-4xl font-bold text-blue-600">
            ${car.bidPrice}
          </p>
        </div>

        <div className="relative">
          <img
            src={car.image}
            alt={car.name}
            className="w-full h-96 object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-full text-xs font-semibold shadow-md">
            Featured
          </div>
        </div>
      </div>

      {/* Bid Now Button */}
      <div className="mt-10">
        <button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-8 py-4 rounded-full text-xl font-bold shadow-2xl hover:shadow-lg transition-all duration-300 w-full">
          Bid Now
        </button>
      </div>
    </div>
  );
};

export default CarDetailView;
