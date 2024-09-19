import { useState } from "react";
import TopBar from "../components/TopBar";
import { FaMapMarkerAlt, FaGasPump, FaTachometerAlt, FaChevronDown, FaBars, FaFileExport } from "react-icons/fa";

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

const CarDetailView = ({ car, onBack }: { car: any; onBack: () => void }) => (
  <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-7xl mx-auto">
    <button
      onClick={onBack}
      className="bg-blue-100 text-blue-600 px-5 py-3 rounded-full text-sm font-medium"
    >
      Back
    </button>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
      {/* Car Image Section */}
      <div className="relative">
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-80 object-cover rounded-xl shadow-md"
        />
        <div className="absolute top-2 right-2 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
          Featured
        </div>
      </div>
      {/* Car Info Section */}
      <div className="flex flex-col justify-between">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4">{car.name}</h2>
        <p className="text-lg text-gray-700 mb-4">
          <span className="font-semibold">Owner:</span> {car.owner} <br />
          <span className="font-semibold">Location:</span> {car.location} <br />
          <span className="font-semibold">Listed on:</span> {car.dateListed}
        </p>
        <div className="text-gray-700 mb-6">
          <p><span className="font-semibold">Mileage:</span> {car.mileage} KM</p>
          <p><span className="font-semibold">Fuel Type:</span> {car.fuelType}</p>
          <p><span className="font-semibold">Style:</span> {car.carType}</p>
          <p><span className="font-semibold">Speed:</span> {car.speed}</p>
        </div>
        <div className="flex items-center justify-between mt-6">
          <p className="text-3xl font-bold text-blue-700">
            ${car.price}
          </p>
          <button className="bg-blue-100 text-blue-600 px-5 py-3 rounded-full text-ms font-medium">
            Buy Now
          </button>
        </div>
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
    {
      name: 'Bentley Flying Spur',
      mileage: '3690',
      fuelType: 'Petrol',
      location: 'China',
      speed: '15.5 km/h',
      price: '285,892',
      image: 'https://i.pinimg.com/564x/2c/0d/02/2c0d024d449d8f88e6844caba4748b87.jpg',
      owner: 'Hussain Jahan',
      ownerAvatar: 'https://i.pinimg.com/236x/2a/7d/4c/2a7d4c4bc1381a476b8b8a85885ac392.jpg',
      carType: 'Luxury',
      dateListed: '25 Jun',
    },
    {
      name: 'Porsche Tayca',
      mileage: '369',
      fuelType: 'Petrol',
      location: 'Dubai',
      speed: '15.5 km/h',
      price: '295,892',
      image: 'https://i.pinimg.com/564x/7f/e6/18/7fe6180f6786437e40174509b3eadd8b.jpg',
      owner: 'Robert Rome',
      ownerAvatar: 'https://i.pinimg.com/236x/ad/15/5b/ad155b4cfd5b6d220c3e5b51b349a37a.jpg',
      carType: 'Coupe',
      dateListed: '26 Jun',
    },
    {
      name: 'Mercedes Benz EQS',
      mileage: '3690',
      fuelType: 'Petrol',
      location: 'Dubai',
      speed: '15.5 km/h',
      price: '285,892',
      image: 'https://i.pinimg.com/564x/7f/e6/18/7fe6180f6786437e40174509b3eadd8b.jpg',
      owner: 'Hussain Jahan',
      ownerAvatar: 'https://i.pinimg.com/236x/2e/3e/fd/2e3efdc0486a8858f9e0471eee3f68e5.jpg',
      carType: 'Luxury',
      dateListed: '25 Jun',
    },
    {
      name: 'Audi Q4 e-tron',
      mileage: '369',
      fuelType: 'Petrol',
      location: 'Dubai',
      speed: '15.5 km/h',
      price: '295,892',
      image: 'https://i.pinimg.com/236x/47/8b/f6/478bf61e4712ba383a76118a6558bfd4.jpg',
      owner: 'Robert Rome',
      ownerAvatar: 'https://i.pinimg.com/236x/f9/58/e4/f958e4ad039823fdc0e5aaa45aae278d.jpg',
      carType: 'Coupe',
      dateListed: '26 Jun',
    },
    {
      name: 'Toyota Corolla Cross',
      mileage: '3690',
      fuelType: 'Petrol',
      location: 'Dubai',
      speed: '15.5 km/h',
      price: '285,892',
      image: 'https://i.pinimg.com/564x/7f/e6/18/7fe6180f6786437e40174509b3eadd8b.jpg',
      owner: 'Hussain Jahan',
      ownerAvatar: 'https://i.pinimg.com/236x/78/f1/fa/78f1faef59b24ecc67f1dbef3ddc32ac.jpg',
      carType: 'Luxury',
      dateListed: '25 Jun',
    },
    {
      name: 'BMW i4',
      mileage: '369',
      fuelType: 'Petrol',
      location: 'Dubai',
      speed: '15.5 km/h',
      price: '295,892',
      image: 'https://i.pinimg.com/564x/5b/cc/d0/5bccd0713bc5c9039393f0bc7ba73d45.jpg',
      owner: 'Robert Rome',
      ownerAvatar: 'https://i.pinimg.com/236x/8b/85/75/8b8575ca1ecb184466a32b228dbeb3f7.jpg',
      carType: 'Coupe',
      dateListed: '26 Jun',
    },
    {
      name: 'Audi Q4 e-tron',
      mileage: '3690',
      fuelType: 'Petrol',
      location: 'Dubai',
      speed: '15.5 km/h',
      price: '285,892',
      image: 'https://i.pinimg.com/564x/2c/0d/02/2c0d024d449d8f88e6844caba4748b87.jpg',
      owner: 'Hussain Jahan',
      ownerAvatar: 'https://i.pinimg.com/236x/03/eb/d6/03ebd625cc0b9d636256ecc44c0ea324.jpg',
      carType: 'Luxury',
      dateListed: '25 Jun',
    },
    {
      name: 'Toyota Corolla Cross',
      mileage: '369',
      fuelType: 'Petrol',
      location: 'Dubai',
      speed: '15.5 km/h',
      price: '295,892',
      image: 'https://i.pinimg.com/736x/3a/a4/6a/3aa46aaba45e09ff09403b42a6127390.jpg',
      owner: 'Robert Rome',
      ownerAvatar: 'https://i.pinimg.com/236x/d2/d2/f8/d2d2f8210f500b3e859d8f282e3d0e9b.jpg',
      carType: 'Coupe',
      dateListed: '26 Jun',
    },
    {
      name: 'BMW i4',
      mileage: '3690',
      fuelType: 'Petrol',
      location: 'Dubai',
      speed: '15.5 km/h',
      price: '285,892',
      image: 'https://i.pinimg.com/564x/5a/e8/d6/5ae8d6218c3c6a9296936347fc2c2eef.jpg',
      owner: 'Hussain Jahan',
      ownerAvatar: 'https://i.pinimg.com/236x/82/cc/d6/82ccd6e43a3334813015ec3247aeca7d.jpg',
      carType: 'Luxury',
      dateListed: '25 Jun',
    }
    // Add more cars as needed
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
    <div className={`flex-1 p-6 bg-gray-50 ${theme === 'yellow' ? 'bg-yellow-100 text-gray-900' : 'bg-gray-100 text-gray-900'} min-h-screen`}>
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

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Available Cars</h2>

            <div className="relative">
              <button
                onClick={toggleFilters}
                className="border border-blue-500 text-blue-500 px-4 py-2 rounded-full shadow-lg flex items-center"
              >
                <FaBars className="mr-2" /> Filter by
              </button>

              {showFilters && (
                <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg">
                  <div className="p-4">
                    <label className="block text-gray-700">Type</label>
                    <select
                      name="type"
                      value={selectedFilters.type}
                      onChange={handleFilterChange}
                      className="border rounded-lg w-full p-2 mt-1"
                    >
                      <option value="">All Types</option>
                      <option value="Sedan">Sedan</option>
                      <option value="Luxury">Luxury</option>
                      <option value="Coupe">Coupe</option>
                    </select>
                  </div>
                  <div className="p-4 border-t">
                    <label className="block text-gray-700">Color</label>
                    <select
                      name="color"
                      value={selectedFilters.color}
                      onChange={handleFilterChange}
                      className="border rounded-lg w-full p-2 mt-1"
                    >
                      <option value="">All Colors</option>
                      <option value="Red">Red</option>
                      <option value="Blue">Blue</option>
                      <option value="Black">Black</option>
                    </select>
                  </div>
                  <div className="p-4 border-t">
                    <label className="block text-gray-700">Style</label>
                    <select
                      name="style"
                      value={selectedFilters.style}
                      onChange={handleFilterChange}
                      className="border rounded-lg w-full p-2 mt-1"
                    >
                      <option value="">All Styles</option>
                      <option value="SUV">SUV</option>
                      <option value="Convertible">Convertible</option>
                      <option value="Hatchback">Hatchback</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {filteredCars.map((car) => (
              <CarCard
                key={car.id}
                car={car}
                onClick={() => handleCarClick(car)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ListingPage;
