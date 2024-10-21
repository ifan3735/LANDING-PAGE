import { useState } from 'react';
import { FaSync, FaMoon, FaSun } from 'react-icons/fa'; // Import icons for dark mode toggle
import Slider from 'react-slick'; // Import a carousel library like 'react-slick'
import 'slick-carousel/slick/slick.css'; // Import the CSS for slick-carousel
import 'slick-carousel/slick/slick-theme.css';
import { useFetchAllVehiclesQuery } from '../features/API'; // Ensure the API hook is correctly imported

const CarDetailView = ({ Vehicle, onBack }: { Vehicle: any; onBack: () => void }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Loading state for images
  const { data, isSuccess, isLoading: isFetching, error } = useFetchAllVehiclesQuery(); // Fetch the data from API
  const [isDarkMode, setIsDarkMode] = useState(false); // Dark mode state

  const toggleExportDropdown = () => setShowDropdown(!showDropdown);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

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
    afterChange: () => setIsLoading(false) // Set loading to false after image changes
  };

  // Handle loading state
  if (isFetching) {
    return <div>Loading...</div>; // Show a loading indicator while fetching data
  }

  // Handle error state
  if (error) {
    return <div>Error fetching vehicle data</div>; // Show an error message if fetching fails
  }

  // Ensure that `Vehicle` is defined before trying to access its properties
  if (!Vehicle) {
    return <div>No vehicle data available</div>;
  }

  // Gather the vehicle images (ensure that they exist)
  const vehicleImages = [Vehicle.image, Vehicle.image2, Vehicle.image3, Vehicle.image4].filter(Boolean); // Filter out undefined or null images

  return (
    <div className={`${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'} max-w-7xl mx-auto p-10 rounded-xl shadow-lg transition-colors duration-500`}>
      {/* Dark Mode Toggle */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={onBack}
          className="bg-blue-100 text-blue-600 px-6 py-3 rounded-full text-base font-semibold transition-all hover:bg-blue-200"
        >
          Back
        </button>

        <button
          onClick={toggleDarkMode}
          className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full transition-all hover:bg-gray-200 flex items-center justify-center"
        >
          {isDarkMode ? <FaSun className="text-yellow-500 w-6 h-6" /> : <FaMoon className="text-gray-800 w-6 h-6" />}
        </button>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Column - Car Images */}
        <div className="relative">
          {/* 360° Button */}
          <button className="absolute top-4 left-4 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-full p-3 shadow-lg transition-all">
            <FaSync className="w-4 h-4" />
          </button>

          {/* Car Image Carousel */}
          {vehicleImages.length > 0 ? (
            <Slider {...settings}>
              {vehicleImages.map((image: string, index: number) => (
                <div key={index} className="relative">
                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-2xl">
                      <div className="w-8 h-8 border-t-4 border-blue-600 rounded-full animate-spin"></div>
                    </div>
                  )}
                  <img
                    src={image}
                    alt={`Car View ${index + 1}`}
                    onLoad={() => setIsLoading(false)} // Handle loading state
                    className="w-full h-96 object-cover rounded-2xl shadow-lg"
                  />
                </div>
              ))}
            </Slider>
          ) : (
            <div>No images available</div>
          )}
        </div>

        {/* Right Column - Car Info */}
        <div className="flex flex-col justify-between">
          {/* Display Vehicle Details */}
          {isSuccess && data?.vehicles?.map((vehicle: any) => (
            <div key={vehicle.id}>
              <h2 className="text-3xl font-black mb-2">{vehicle.vehicle_specs.model}</h2>
              <p className="text-blue-700 text-3xl font-bold mb-6">${vehicle.bidPrice}</p>

              <div className="space-y-4 text-lg">
                <div className="flex items-center">
                  <span className="font-semibold">Class:</span>
                  <span className="ml-2">{vehicle.class || "Compact executive car D"}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold">Layout:</span>
                  <span className="ml-2">{vehicle.layout || "Front-engine, rear-wheel drive (4 MATIC)"}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold">Predecessor:</span>
                  <span className="ml-2">{vehicle.predecessor || "Mercedes Benz 190 E (W201)"}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold">Engine Type:</span>
                  <span className="ml-2">{vehicle.engine || "2.0L Turbo Inline-4"}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold">Fuel Type:</span>
                  <span className="ml-2">{vehicle.fuelType || "Petrol"}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold">Mileage:</span>
                  <span className="ml-2">{vehicle.mileage || "15,000 miles"}KMs</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold">Transmission:</span>
                  <span className="ml-2">{vehicle.transmission || "7-speed Automatic"}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarDetailView;
