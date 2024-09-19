import { useState } from "react";
import TopBar from "../components/TopBar";
import { FaMapMarkerAlt, FaGasPump, FaTachometerAlt, FaChevronDown, FaFileExport } from "react-icons/fa";

// CarCard Component for List and Detail Views
const CarCard = ({ car, onClick }: { car: any; onClick: () => void }) => (
  <div
    onClick={onClick}
    className="bg-white p-6 rounded-lg shadow-md flex flex-row space-x-4 w-full max-w-lg cursor-pointer"
  >
    <div className="flex items-center">
      <img
        src={car.image}
        alt={car.name}
        className="w-46 h-34 rounded-lg object-cover"
      />
    </div>
    <div className="flex-1 flex flex-col justify-center">
      <div className="flex items-center space-x-3 mb-3">
        <img
          src={car.ownerAvatar}
          alt={car.owner}
          className="w-12 h-12 rounded-full border-2 border-green-500"
        />
        <div>
          <p className="font-semibold text-gray-700">{car.owner}</p>
          <p className="text-sm text-gray-500">{car.dateListed}</p>
        </div>
      </div>
      <h3 className="font-semibold text-lg text-gray-700 mb-1">{car.name}</h3>
      <div className="text-sm text-gray-500 mb-2">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <FaTachometerAlt className="text-blue-500" />
            <p>{car.mileage} KM</p>
          </div>
          <div className="flex items-center space-x-1">
            <FaGasPump className="text-blue-500" />
            <p>{car.fuelType}</p>
          </div>
          <div className="flex items-center space-x-1">
            <FaMapMarkerAlt className="text-blue-500" />
            <p>{car.location}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4 mt-2">
          <p>Style: {car.carType}</p>
          <p>RTO: Pending</p>
          <p>Speed: {car.speed}</p>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <p className="font-bold text-lg text-blue-500">${car.price}</p>
      </div>
    </div>
  </div>
);

// CarDetailView Component for Detailed Car View
const CarDetailView = ({ car, onBack }: { car: any; onBack: () => void }) => (
  <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-4xl mx-auto">
    <button
      onClick={onBack}
      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-full mb-4"
    >
      Back
    </button>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Car Image Section */}
      <div>
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-72 object-cover rounded-lg"
        />
      </div>
      {/* Car Info Section */}
      <div className="flex flex-col justify-between">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{car.name}</h2>
        <p className="text-lg text-gray-600 mb-2">
          Owner: {car.owner} <br />
          Location: {car.location} <br />
          Listed on: {car.dateListed}
        </p>
        <div className="text-gray-600">
          <p>Mileage: {car.mileage} KM</p>
          <p>Fuel Type: {car.fuelType}</p>
          <p>Style: {car.carType}</p>
          <p>Speed: {car.speed}</p>
        </div>
        <p className="text-2xl font-semibold text-blue-600 mt-4">
          Price: ${car.price}
        </p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full mt-6">
          Buy Now
        </button>
      </div>
    </div>
  </div>
);

// ListingPage Component
const ListingPage = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [theme, setTheme] = useState('light');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    type: '',
    color: '',
    style: '',
  });
  const [selectedCar, setSelectedCar] = useState<any>(null); // State for selected car

  const toggleTheme = () => setTheme(theme === 'light' ? 'yellow' : 'light');
  const toggleExportDropdown = () => setShowDropdown(!showDropdown);
  const toggleFilters = () => setShowFilters(!showFilters);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value);
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const cars = [
    {
      name: 'Hyundai S Turbo uMT',
      mileage: '1028',
      fuelType: 'Petrol',
      location: 'Dubai',
      speed: '15.5 km/h',
      type: 'Sedan',
      color: 'Red',
      style: 'Luxury',
      price: '285,892',
      image: 'https://i.pinimg.com/564x/2c/0d/02/2c0d024d449d8f88e6844caba4748b87.jpg',
      owner: 'Jonson Hussain',
      ownerAvatar: 'https://i.pinimg.com/236x/af/9f/1f/af9f1fed99621ae20f9edd2ab6cbb8bd.jpg',
      carType: 'Sedan',
      dateListed: '28 Jun',
    },
    // ... other car objects
  ];

  const filteredCars = cars.filter(car => {
    const matchesSearch = car.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedFilters.type ? car.type === selectedFilters.type : true;
    const matchesColor = selectedFilters.color ? car.color === selectedFilters.color : true;
    const matchesStyle = selectedFilters.style ? car.style === selectedFilters.style : true;
    return matchesSearch && matchesType && matchesColor && matchesStyle;
  });

  const handleCarClick = (car: any) => {
    setSelectedCar(car);
  };

  const handleBack = () => {
    setSelectedCar(null);
  };

  return (
    <div className={`flex-1 p-6 ${theme === 'yellow' ? 'bg-yellow-100' : 'bg-gray-100'} min-h-screen`}>
      <TopBar
        searchQuery={searchQuery}
        handleSearch={handleSearch}
        toggleTheme={toggleTheme}
        theme={theme}
        exportData={() => {
          console.log("Data exported");
        }}
      />

      {selectedCar ? (
        <CarDetailView car={selectedCar} onBack={handleBack} /> 
      ) : (
        <>
          <div className="flex justify-between items-center my-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Listings</h2>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCars.map((car) => (
              <CarCard key={car.name} car={car} onClick={() => handleCarClick(car)} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ListingPage;
