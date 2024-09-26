import { useState } from 'react';
import { FaCar, FaChevronDown, FaFileExport, FaGasPump, FaRoad, FaTachometerAlt, FaRegCircle } from 'react-icons/fa';
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
    <div className="max-w-7xl mx-auto p-10 bg-white rounded-xl shadow-lg">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="bg-blue-100 text-blue-600 px-6 py-3 rounded-full text-base font-semibold mb-6"
      >
        Back
      </button>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Column - Car Images */}
        <div className="relative">
          {/* 360 Button */}
          <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs rounded-full px-4 py-2 shadow-lg">
            360°
          </div>

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
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{car.name}</h2>
          <p className="text-blue-600 text-xl font-semibold mb-6">${car.bidPrice}</p>

          {/* Car Details */}
          <div className="space-y-4">
            <div>
              <span className="font-bold">Class:</span> Compact executive car D
            </div>
            <div>
              <span className="font-bold">Layout:</span> Front-engine, rear-wheel drive (4 MATIC)
            </div>
            <div>
              <span className="font-bold">Predecessor:</span> Mercedes Benz 190 E (W201)
            </div>
          </div>

          {/* Documents Needed Section */}
          <div className="mt-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Document's Needed</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <FaRegCircle className="mr-2 text-blue-500" />
                Bill of sale
              </li>
              <li className="flex items-center">
                <FaRegCircle className="mr-2 text-blue-500" />
                Buyer’s Guide
              </li>
              <li className="flex items-center">
                <FaRegCircle className="mr-2 text-blue-500" />
                Country of title issuance
              </li>
              <li className="flex items-center">
                <FaRegCircle className="mr-2 text-gray-400" />
                Application of Texas
              </li>
            </ul>

            {/* Upload Button */}
            <button className="bg-blue-100 text-blue-600 px-4 py-2 mt-4 rounded-full font-semibold">
              Upload
            </button>
          </div>

          {/* Buy Now Button */}
          <button className="bg-blue-600 text-white w-full py-4 mt-8 rounded-full text-lg font-bold shadow-lg">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarDetailView;
