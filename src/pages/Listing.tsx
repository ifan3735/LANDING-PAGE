import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TopBar from "../components/TopBar";
import { FaMapMarkerAlt, FaGasPump, FaTachometerAlt, FaChevronDown, FaBars, FaFileExport, FaRoad, FaCar } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useFetchAllVehiclesQuery } from "../features/API";

// CarCard Component for List and Detail Views
const CarCard = ({ Vehicle, onClick }: { Vehicle: any; onClick: () => void }) => (
  <div
    onClick={onClick}
    className="bg-white p-6 rounded-lg shadow-md flex flex-row space-x-4 w-full max-w-lg cursor-pointer"
  >
    <div className="flex items-center">
      <img
        src={Vehicle.image}
        alt={Vehicle.vehicle_specs.model}
        className="w-46 h-34 rounded-lg object-cover"
      />
    </div>
    <div className="flex-1 flex flex-col justify-center">
      <div className="flex items-center space-x-3 mb-3">
        <img
          src={Vehicle.vehicle_specs.owner_image}
          alt={Vehicle.owner}
          className="w-12 h-12 rounded-full border-2 border-green-500"
        />
        <div>
          <p className="font-semibold text-gray-700">{Vehicle.vehicle_specs.owner_name}</p>
          <p className="text-sm text-gray-500">{Vehicle.vehicle_specs.date}</p>
        </div>
      </div>
      <h3 className="font-semibold text-lg text-gray-700 mb-1">{Vehicle.vehicle_specs.model}</h3>
      <div className="text-sm text-gray-500 mb-2">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <FaTachometerAlt className="text-blue-500" />
            <p>{Vehicle.vehicle_specs.milage} KM</p>
          </div>
          <div className="flex items-center space-x-1">
            <FaGasPump className="text-blue-500" />
            <p>{Vehicle.vehicle_specs.fuel_type}</p>
          </div>
          <div className="flex items-center space-x-1">
            <FaMapMarkerAlt className="text-blue-500" />
            <p>{Vehicle.vehicle_specs.location}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4 mt-2">
          <p>Style: {Vehicle.vehicle_specs.manufacturer}</p>
          <p>RTO: Pending</p>
          <p>Speed: {Vehicle.vehicle_specs.speed} KM</p>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <p className="font-bold text-lg text-gray-500">
          Rate: <span className="font-bold text-lg text-blue-500">
             ${Vehicle.rental_rate} </span></p>
      </div>
    </div>
  </div>
);

const CarDetailView = ({ Vehicle, onBack }: { Vehicle: any; onBack: () => void }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const toggleExportDropdown = () => setShowDropdown(!showDropdown);

  const rentalRate = Vehicle.rentalRate || 100; // Set a rental rate, or use car.rentalRate if it's available
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
          <h2 className="text-4xl font-black text-gray-900 mb-6">{Vehicle.name}</h2>
          <p className="text-lg text-gray-800 mb-6">
            <span className="font-semibold">Owner:</span> {Vehicle.owner} <br />
            <span className="font-semibold">Location:</span> {Vehicle.location} <br />
            <span className="font-semibold">Listed on:</span> {Vehicle.dateListed}
          </p>
          <div className="grid grid-cols-2 gap-6 text-gray-700 mb-8">
            <p className="flex items-center">
              <FaRoad className="mr-2 text-blue-600" />
              <span className="font-semibold">Mileage:</span> {Vehicle.mileage} KM
            </p>
            <p className="flex items-center">
              <FaGasPump className="mr-2 text-blue-600" />
              <span className="font-semibold">Fuel Type:</span> {Vehicle.fuelType}
            </p>
            <p className="flex items-center">
              <FaCar className="mr-2 text-blue-600" />
              <span className="font-semibold">Style:</span> {Vehicle.carType}
            </p>
            <p className="flex items-center">
              <FaTachometerAlt className="mr-2 text-blue-600" />
              <span className="font-semibold">Speed:</span> {Vehicle.speed} KM/H
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
              src="https://i.pinimg.com/564x/a4/29/40/a42940b02387da4b5898b5bc08062d49.jpg"
              alt="Car 1"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h4 className="text-lg font-semibold">View 1</h4>
            <p className="text-blue-600 font-bold">90deg</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <img
              src="https://i.pinimg.com/564x/2a/0c/55/2a0c552c373f9c978e626b4fc6e5c935.jpg"
              alt="Car 2"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h4 className="text-lg font-semibold">View 2</h4>
            <p className="text-blue-600 font-bold">60deg</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <img
              src="https://i.pinimg.com/564x/aa/93/95/aa9395c2f3f30c7f355c1102d5a53076.jpg"
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
const ListingPage = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [theme, setTheme] = useState('light');
  const [searchQuery, setSearchQuery] = useState('');
  const { data, isSuccess } = useFetchAllVehiclesQuery();
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

  // Filtering logic: filter cars based on search and selected filters
  const filteredCars = isSuccess && data
    ? data.filter((Vehicle) => {
        const matchesSearch = Vehicle.vehicle_specs.model
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
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
        searchQuery={searchQuery}
        handleSearch={handleSearch}
        toggleTheme={toggleTheme}
        theme={theme}
        exportData={() => {
          console.log("Data exported");
        }}
      />

{selectedCar ? (
        <CarDetailView Vehicle={selectedCar} onBack={handleBack} /> 
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
                      <option value="Petrol">Petrol</option>
                      <option value="Diesel">Diesel</option>
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
            {filteredCars.map((Vehicle) => (
              <CarCard
                key={Vehicle.id}
                Vehicle={Vehicle}
                onClick={() => handleCarClick(Vehicle)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ListingPage;
