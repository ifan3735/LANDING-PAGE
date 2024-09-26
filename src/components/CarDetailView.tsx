import { useState } from 'react';
import { FaCar, FaChevronDown, FaFileExport, FaGasPump, FaRoad, FaTachometerAlt, FaSync } from 'react-icons/fa';
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
    arrows: false, // Hide arrows for a clean look
    appendDots: dots => (
      <div>
        <ul style={{ margin: '0px' }}> {dots} </ul>
      </div>
    ),
    customPaging: i => (
      <div
        style={{
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          background: "#ccc",
          margin: "0 3px",
        }}
      />
    ),
  };

  return (
    <div className="max-w-7xl mx-auto p-10 bg-white rounded-xl shadow-lg">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="bg-blue-100 text-blue-600 px-6 py-3 rounded-full text-base font-semibold mb-6 transition-all hover:bg-blue-200"
      >
        Back
      </button>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Column - Car Images */}
        <div className="relative">
          {/* 360° Button */}
          <button className="absolute top-4 left-4 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-full p-3 shadow-lg transition-all">
            <FaSync className="w-4 h-4" />
          </button>

          {/* Car Image Carousel */}
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

        {/* Right Column - Car Info */}
        <div className="flex flex-col justify-between">
          {/* Car Name and Price */}
          <h2 className="text-3xl font-black text-gray-900 mb-2">{car.name}</h2>
          <p className="text-blue-700 text-3xl font-bold mb-6">${car.bidPrice}</p>

          {/* Car Details */}
          <div className="space-y-4 text-lg">
            <div className="flex items-center">
              <span className="font-semibold text-gray-700">Class:</span>
              <span className="ml-2 text-gray-600">Compact executive car D</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-gray-700">Layout:</span>
              <span className="ml-2 text-gray-600">Front-engine, rear-wheel drive (4 MATIC)</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-gray-700">Predecessor:</span>
              <span className="ml-2 text-gray-600">Mercedes Benz 190 E (W201)</span>
            </div>
          </div>

          {/* Documents Needed Section */}
          <div className="mt-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Document's Needed</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <label className="text-gray-600">Bill of sale</label>
              </li>
              <li className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <label className="text-gray-600">Buyer’s Guide</label>
              </li>
              <li className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <label className="text-gray-600">Country of title issuance</label>
              </li>
              <li className="flex items-center">
                <input type="checkbox" className="mr-2" disabled />
                <label className="text-gray-400">Application of Texas</label>
              </li>
            </ul>

            {/* Upload Button */}
            <button className="bg-blue-100 text-blue-600 px-4 py-2 mt-4 rounded-full font-semibold transition-all hover:bg-blue-200">
              Upload
            </button>
          </div>

          {/* Buy Now Button */}
          <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white w-full py-4 mt-8 rounded-full text-lg font-bold shadow-lg transition-transform transform hover:scale-105">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarDetailView;
