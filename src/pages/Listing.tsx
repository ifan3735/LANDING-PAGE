import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TopBar from "../components/TopBar";
import { FaMapMarkerAlt, FaGasPump, FaTachometerAlt, FaChevronDown, FaBars, FaFileExport, FaRoad, FaCar } from "react-icons/fa";

const bookedDates = [
  { start: new Date("2024-09-22"), end: new Date("2024-09-25") },
  { start: new Date("2024-09-30"), end: new Date("2024-10-03") },
];

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

const CarDetailView = ({ car, onBack }: { car: any; onBack: () => void }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const dailyRate = car.price; // Use the car's price as the daily rental rate
  const unavailableDates = [
    new Date(2024, 8, 22), // Example of unavailable date
    new Date(2024, 8, 23),
  ];

  const isDateUnavailable = (date: Date) => {
    return unavailableDates.some(
      (unavailableDate) =>
        date.getDate() === unavailableDate.getDate() &&
        date.getMonth() === unavailableDate.getMonth() &&
        date.getFullYear() === unavailableDate.getFullYear()
    );
  };

  const calculateTotal = () => {
    if (startDate && endDate) {
      const timeDifference = endDate.getTime() - startDate.getTime();
      const days = Math.ceil(timeDifference / (1000 * 3600 * 24)); // Convert ms to days
      return days > 0 ? days * dailyRate : 0;
    }
    return 0;
  };

  const totalCost = calculateTotal();

  return (
    <div className="bg-gray-50 shadow-xl rounded-2xl p-10 w-full max-w-7xl mx-auto">
      <button
        onClick={onBack}
        className="bg-blue-100 text-blue-600 px-6 py-3 rounded-full text-base font-semibold hover:bg-blue-600 transition-all duration-300 ease-in-out"
      >
        Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-8">
        {/* Car Image Section */}
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

        {/* Car Info Section */}
        <div className="flex flex-col justify-between">
          <h2 className="text-4xl font-black text-gray-900 mb-6">{car.name}</h2>
          <p className="text-lg text-gray-800 mb-6">
            <span className="font-semibold">Owner:</span> {car.owner} <br />
            <span className="font-semibold">Location:</span> {car.location} <br />
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
          <div className="flex items-center justify-between">
            <p className="text-4xl font-bold text-blue-700">
              ${car.price.toLocaleString()}
            </p>
            <button className="bg-blue-100 text-blue-600 px-6 py-4 rounded-full text-lg font-bold shadow-lg hover:bg-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Rental Date Picker Section */}
      <div className="mt-10 bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-2xl font-semibold mb-4">Rental Date Picker</h3>
        <div className="flex items-center gap-6">
          <div className="w-1/2">
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Start Date:
            </label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              className="w-full p-2 bg-gray-200 rounded-lg text-gray-700"
              minDate={new Date()} // Only allow future dates
              filterDate={(date) => !isDateUnavailable(date)} // Disable unavailable dates
              placeholderText="Pick a start date"
              dateFormat="dd/MM/yyyy"
            />
          </div>
          <div className="w-1/2">
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              End Date:
            </label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              className="w-full p-2 bg-gray-200 rounded-lg text-gray-700"
              minDate={startDate || new Date()} // Ensure end date is after start date
              filterDate={(date) => !isDateUnavailable(date)} // Disable unavailable dates
              placeholderText="Pick an end date"
              dateFormat="dd/MM/yyyy"
            />
          </div>
        </div>

        {startDate && endDate && (
          <div className="mt-4">
            <p className="font-semibold">
              Total Rental Cost: <span className="text-blue-600">${totalCost.toLocaleString()}</span>
            </p>
          </div>
        )}
        {!startDate && <p className="text-red-500 font-semibold mt-4">Please select a start date.</p>}
        {!endDate && startDate && <p className="text-red-500 font-semibold mt-4">Please select an end date.</p>}
      </div>

      {/* Similar Cars Section */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold mb-4">Similar Cars</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Example placeholder car cards */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <img
              src="https://i.pinimg.com/564x/2c/0d/02/2c0d024d449d8f88e6844caba4748b87.jpg"
              alt="Car 1"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h4 className="text-lg font-semibold">Car 1</h4>
            <p className="text-blue-600 font-bold">$20,000</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <img
              src="https://i.pinimg.com/564x/2c/0d/02/2c0d024d449d8f88e6844caba4748b87.jpg"
              alt="Car 2"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h4 className="text-lg font-semibold">Car 2</h4>
            <p className="text-blue-600 font-bold">$18,500</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <img
              src="https://i.pinimg.com/564x/2c/0d/02/2c0d024d449d8f88e6844caba4748b87.jpg"
              alt="Car 3"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h4 className="text-lg font-semibold">Car 3</h4>
            <p className="text-blue-600 font-bold">$22,000</p>
          </div>
        </div>
      </div>
    </div>
  );
};


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
