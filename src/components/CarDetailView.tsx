import { useState } from 'react';
import { FaCar, FaChevronDown, FaFileExport, FaGasPump, FaRoad, FaTachometerAlt } from 'react-icons/fa';
import Slider from 'react-slick'; // Import a carousel library like 'react-slick'
import 'slick-carousel/slick/slick.css'; // Import the CSS for slick-carousel
import 'slick-carousel/slick/slick-theme.css';

const CarDetailView = ({ car, onBack }: { car: any; onBack: () => void }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleExportDropdown = () => setShowDropdown(!showDropdown);

  // Sample image list (replace with actual car image data)
  const carImages = car.images || [
    car.image, // Use the main image as a fallback
    '/images/car-front.jpg',
    '/images/car-side.jpg',
    '/images/car-rear.jpg',
    '/images/car-interior.jpg',
    '/images/car-engine.jpg'
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      <div className="flex justify-between items-center my-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Car Information</h2>
          <p className="text-sm text-gray-600">
            Get your latest update for the past 7 days
          </p>
        </div>

        <div className="relative">
          <button
            onClick={toggleExportDropdown}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center"
          >
            <FaFileExport className="mr-2" /> Export
            <FaChevronDown className="ml-2" />
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
              <ul>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => console.log("Export as CSV")}
                >
                  Export as CSV
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => console.log("Export as PDF")}
                >
                  Export as PDF
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="bg-gray-50 shadow-xl rounded-2xl p-10 w-full max-w-7xl mx-auto">
        <button
          onClick={onBack}
          className="bg-blue-100 text-blue-600 px-6 py-3 rounded-full text-base font-semibold"
        >
          Back
        </button>

        {/* Car Image Carousel */}
        <div className="mt-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Explore the Car</h3>
          <Slider {...settings}>
            {carImages.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image}
                  alt={`Car View ${index + 1}`}
                  className="w-full h-96 object-cover rounded-2xl shadow-lg"
                />
              </div>
            ))}
          </Slider>
        </div>

        {/* Car Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-8">
          <div className="relative">
            <img
              src={car.image}
              alt={car.name}
              className="w-full h-100 object-cover rounded-2xl shadow-lg transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-full text-xs font-semibold shadow-md">
              Featured
            </div>
          </div>

          <div className="flex flex-col justify-between">
            <h2 className="text-4xl font-black text-gray-900 mb-6">{car.name}</h2>
            <p className="text-lg text-gray-800 mb-6">
              <span className="font-semibold">RTO:</span> {car.rto} <br />
              <span className="font-semibold">Color:</span> {car.color} <br />
              <span className="font-semibold">Listed on:</span> {car.dateListed}
            </p>
            <div className="grid grid-cols-2 gap-6 text-gray-700 mb-8">
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
                <span className="font-semibold">Speed:</span> {car.speed} KM/H
              </p>
            </div>
            <p className="text-4xl font-bold text-blue-700">
              ${car.bidPrice} 
            </p>
          </div>
        </div>
        <div className="mt-6">
          <button className="bg-blue-100 text-blue-600 px-6 py-4 rounded-full text-lg font-bold shadow-lg w-full">
            Bid Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarDetailView;
