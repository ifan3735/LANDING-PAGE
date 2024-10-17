import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TopBar from "../components/TopBar";
import { FaGasPump, FaTachometerAlt, FaChevronDown, FaFileExport, FaRoad, FaCar, FaSearch } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useFetchAllVehiclesQuery } from "../features/API";

const FilterBar = ({
  selectedBrand,
  selectedFilters,
  handleFilterChange,
  handleBrandChange,
  SearchTerm,
  setSearchTerm,
}: {
  selectedBrand: string;
  selectedFilters: any;
  handleFilterChange: any;
  handleBrandChange: (value: string) => void;
  SearchTerm: string;
  setSearchTerm: any;
}) => (
  <div className="flex justify-between items-center mb-6 bg-gray-100 p-4 space-x-6 rounded-lg">
    {/* Dropdown Filters Section */}
    <div className="flex space-x-4">
      {/* Type Filter */}
      <div className="flex items-center space-x-2">
        <label className="text-gray-600 text-sm font-medium">Type</label>
        <select
          name="type"
          value={selectedFilters.type}
          onChange={handleFilterChange}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
        >
          <option value="">All Cars</option>
          <option value="Sedan">Sedan</option>
          <option value="Luxury">Luxury</option>
          <option value="Coupe">Coupe</option>
          <option value="SUV">SUV</option>
        </select>
      </div>

      {/* Brand Filter */}
      <div className="flex items-center space-x-2">
        <label className="text-gray-600 text-sm font-medium">Brand</label>
        <select
          name="brand"
          value={selectedBrand}
          onChange={(e) => handleBrandChange(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
        >
          <option value="">All Brands</option>
          <option value="Lamborghini">Lamborghini</option>
          <option value="Audi">Audi</option>
          <option value="BMW">BMW</option>
          <option value="Mercedes">Mercedes</option>
        </select>
      </div>
    </div>

    {/* Search Input Section */}
    <div className="flex items-center w-1/2">
      <div className="relative w-full">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search"
          value={SearchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-blue-400"
        />
      </div>
    </div>
  </div>
);

// CarCard Component for List and Detail Views
const CarCard = ({ Vehicle, onClick }: { Vehicle: any; onClick: () => void }) => (
    <div
      onClick={onClick}
      className="bg-white p-4 rounded-md shadow-md flex flex-col space-y-3 w-full max-w-md cursor-pointer hover:shadow-lg transition-shadow"
    >
      {/* Car Image Section */}
      <div className="flex justify-center items-center">
        <img
          src={Vehicle.image}
          alt={Vehicle.name}
          className="w-full max-w-sm h-40 rounded-md object-cover"
        />
      </div>
  
      {/* Car Details Section */}
      <div className="flex flex-col">
        {/* Car Name and Price */}
        <h3 className="font-medium text-lg text-gray-700 mb-1">
          {Vehicle.vehicle_specs.model}
        </h3>
        {/* Style, Type, and Color */}
        <div className="text-xs text-gray-500 mb-1 flex flex-wrap gap-3">
          <p className="font-medium">
            Style: <span className="text-gray-700">{Vehicle.vehicle_specs.manufacturer}</span>
          </p>
          <p className="font-medium">
            Type: <span className="text-gray-700">{Vehicle.vehicle_specs.fuel_type}</span>
          </p>
          <p className="font-medium">
            Color: <span className="text-gray-700">{Vehicle.vehicle_specs.color}</span>
          </p>
        </div>
        <div className="text-lg text-blue-500 font-semibold mb-1">
          ${Vehicle.rental_rate}
        </div>
      </div>
    </div>
  );
const CarDetailView = ({ Vehicle, onBack }: { Vehicle: any; onBack: () => void }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const toggleExportDropdown = () => setShowDropdown(!showDropdown);

  const rentalRate = Vehicle.rental_rate; // Set a rental rate, or use car.rentalRate if it's available
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
      return days > 0 ? days * rentalRate : 0; // Ensure days is positive
    }
    return 0; // Return 0 if dates are not valid
  };

  const totalCost = calculateTotal();

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
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center"
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-8">
        {/* Car Image Section */}
        <div className="relative">
          <img
            src={Vehicle.image}
            alt={Vehicle.name}
            className="w-full h-100 object-cover rounded-2xl shadow-lg transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-full text-xs font-semibold shadow-md">
            Featured
          </div>
        </div>

        {/* Car Info Section */}
        <div className="flex flex-col justify-between">
          <h2 className="text-4xl font-black text-gray-900 mb-6">{Vehicle.vehicle_specs.model}</h2>
          <p className="text-lg text-gray-800 mb-6">
            <span className="font-semibold">Owner:</span> {Vehicle.vehicle_specs.owner_name} <br />
            <span className="font-semibold">Location:</span> {Vehicle.vehicle_specs.location} <br />
            <span className="font-semibold">Listed on:</span> {Vehicle.vehicle_specs.date}
          </p>
          <div className="grid grid-cols-2 gap-6 text-gray-700 mb-8">
            <p className="flex items-center">
              <FaRoad className="mr-2 text-blue-600" />
              <span className="font-semibold">Mileage:</span> {Vehicle.vehicle_specs.milage} KM
            </p>
            <p className="flex items-center">
              <FaGasPump className="mr-2 text-blue-600" />
              <span className="font-semibold">Fuel Type:</span> {Vehicle.vehicle_specs.fuel_type}
            </p>
            <p className="flex items-center">
              <FaCar className="mr-2 text-blue-600" />
              <span className="font-semibold">Style:</span> {Vehicle.vehicle_specs.manufacturer}
            </p>
            <p className="flex items-center">
              <FaTachometerAlt className="mr-2 text-blue-600" />
              <span className="font-semibold">Speed:</span> {Vehicle.vehicle_specs.speed} KM/H
            </p>
          </div>
          <p className="text-4xl font-bold text-blue-700">
            ${rentalRate.toLocaleString()} / day
          </p>
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
              Total Rental Cost:{" "}
              <span className="text-blue-600">
                ${totalCost.toLocaleString()}
              </span>
            </p>
          </div>
        )}
        {!startDate && (
          <p className="text-red-500 font-semibold mt-4">
            Please select a start date.
          </p>
        )}
        {!endDate && startDate && (
          <p className="text-red-500 font-semibold mt-4">
            Please select an end date.
          </p>
        )}

        {/* Conditionally Render "Rent Now" Button */}
        {startDate && endDate && (
          <div className="mt-6">
            <button className="bg-blue-100 text-blue-600 px-6 py-4 rounded-full text-lg font-bold shadow-lg w-full">
              Rent Now
            </button>
          </div>
        )}
      </div>

      {/* Similar Cars Section */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold mb-4">Interior View</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Example placeholder car cards */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <img
              src= {Vehicle.image2}
              alt="Car 1"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h4 className="text-lg font-semibold">View 1</h4>
            <p className="text-blue-600 font-bold">90deg</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <img
              src={Vehicle.image3}
              alt="Car 2"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h4 className="text-lg font-semibold">View 2</h4>
            <p className="text-blue-600 font-bold">60deg</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <img
              src={Vehicle.image4}
              alt="Car 3"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h4 className="text-lg font-semibold">View 3</h4>
            <p className="text-blue-600 font-bold">120deg</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

// ListingPage Component
const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string>(''); // Brand Filter State
  const [showDropdown, setShowDropdown] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const { data, isSuccess } = useFetchAllVehiclesQuery();
  const [theme, setTheme] = useState('light');
  const [selectedFilters, setSelectedFilters] = useState({
    type: '',
    color: '',
    style: '',
  });
  const [selectedCar, setSelectedCar] = useState<any>(null); // State for selected car
  const toggleTheme = () => setTheme(theme === 'light' ? 'yellow' : 'light');
  const toggleExportDropdown = () => setShowDropdown(!showDropdown);
  const toggleFilters = () => setShowFilters(!showFilters);

  // Handle filter changes for both type, brand, etc.
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleBrandChange = (value: string) => {
    setSelectedBrand(value);
  };


  // Filtering logic: filter cars based on search and selected filters
  const filteredCars = isSuccess && data
    ? data.filter((Vehicle) => {
        const matchesSearch = Vehicle.vehicle_specs.model
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesType = selectedFilters.type
          ? Vehicle.vehicle_specs.fuel_type.toLowerCase() === selectedFilters.type.toLowerCase()
          : true;
        const matchesColor = selectedFilters.color
          ? Vehicle.vehicle_specs.color.toLowerCase() === selectedFilters.color.toLowerCase()
          : true;
        const matchesStyle = selectedFilters.style
          ? Vehicle.vehicle_specs.manufacturer.toLowerCase() === selectedFilters.style.toLowerCase()
          : true;
        return matchesSearch && matchesType && matchesColor && matchesStyle;
      })
    : [];

  const handleCarClick = (Vehicle: any) => {
    setSelectedCar(Vehicle);
  };

  const handleBack = () => {
    setSelectedCar(null);
  };

  return (
    <div className={`flex-1 p-6 bg-gray-50 ${theme === 'yellow' ? 'bg-yellow-100 text-gray-900' : 'bg-gray-100 text-gray-900'} min-h-screen`}>
      <TopBar
        searchQuery={searchTerm}
        handleSearch={(e) => setSearchTerm(e.target.value)}
        toggleTheme={toggleTheme}
        theme={theme}
        exportData={() => {
          console.log('Data exported');
        }}
      />

      {selectedCar ? (
        <CarDetailView Vehicle={selectedCar} onBack={handleBack} />
      ) : (
        <>
          <div className="flex justify-between items-center my-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Search</h2>
              <p className="text-sm text-gray-600">
                Get your latest update for the past 7 days
              </p>
            </div>

            <div className="relative">
              <button
                onClick={toggleExportDropdown}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center"
              >
                <FaFileExport className="mr-2" /> Export
                <FaChevronDown className="ml-2" />
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
                  <ul>
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

          {/* FilterBar component */}
          <FilterBar
            selectedBrand={selectedBrand}
            selectedFilters={selectedFilters}
            handleFilterChange={handleFilterChange}
            handleBrandChange={handleBrandChange}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />

          <div className="grid grid-cols-3 gap-6">
            {filteredCars.map((Vehicle) => (
              <CarCard key={Vehicle.name} Vehicle={Vehicle} onClick={() => handleCarClick(Vehicle)} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Search;
