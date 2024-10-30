import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TopBar from "../components/TopBar";
import { FaGasPump, FaTachometerAlt, FaChevronDown, FaFileExport, FaRoad, FaCar, FaSearch } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useFetchAllVehiclesQuery } from "../features/API";
import jsPDF from "jspdf";

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
          <option value="Petrol">Petrol</option>
          <option value="Diesel">Diesel</option>
          <option value="Electric">Electric</option>
        </select>
      </div>

      {/* Brand Filter */}
      <div className="flex items-center space-x-2">
        <label className="text-gray-600 text-sm font-medium">Brand</label>
        <select
          name="style"
          value={selectedFilters.style}
          onChange={handleFilterChange}
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
  const CarDetailView = ({ Vehicle, onBack }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [error, setError] = useState('');
    const [createCheckoutSession] = useCheckoutMutation();
    const [bookVehicle] = useBookVehicleMutation();  // use checkout mutation
    const rentalRate = Vehicle.rental_rate;
    const unavailableDates = [
      new Date(2024, 8, 22),
      new Date(2024, 8, 23),
    ];
  
    const toggleExportDropdown = () => setShowDropdown(!showDropdown);
  
    const isDateUnavailable = (date) => {
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
        const days = Math.ceil(timeDifference / (1000 * 3600 * 24));
        return days > 0 ? days * rentalRate : 0;
      }
      return 0;
    };
  
    const totalCost = calculateTotal();
  
    const handleRentNow = async () => {
      const userId = localStorage.getItem('userId'); // Ensure you use the correct key
      
      if (!userId || !startDate || !endDate) {
        setError("Please ensure all fields are selected and you are logged in.");
        return;
      }
      
      const totalAmount = totalCost;
      const bookingPayload = {
        user_id: userId,
        vehicle_id: Vehicle.id,
        location_id: 5, // Replace with the actual location ID
        booking_date: startDate,
        return_date: endDate,
        total_amount: totalAmount.toFixed(2)
      };
    
      try {
        console.log("Sending booking payload:", bookingPayload);
    
        const bookingResponse = await bookVehicle(bookingPayload).unwrap();
        const bookingId = bookingResponse.id;
    
        if (!bookingId) throw new Error("Booking ID not returned from server");
    
        // Payment payload
        const paymentPayload = {
          amount: totalAmount * 100,
          currency: "kes",
          booking_id: bookingId,
        };
    
        const checkoutResponse = await createCheckoutSession(paymentPayload).unwrap();
        window.location.href = `${checkoutResponse.checkoutUrl}`;
      } catch (error) {
        console.error("Error creating booking:", error);
        setError("Failed to create booking. Please try again later.");
      }
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
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-8 px-4 md:px-0">
    {/* Car Image Section */}
    <div className="relative group overflow-hidden rounded-2xl shadow-2xl">
      <img
        src={Vehicle.image}
        alt={Vehicle.vehicle_specs.model}
        className="w-full h-96 object-cover transition-transform duration-500 transform group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-300"></div>
      <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-4 py-2 rounded-full text-xs font-semibold shadow-lg transform transition-transform duration-300 hover:scale-110">
        Featured
      </div>
    </div>
  
    {/* Car Info Section */}
    <div className="flex flex-col justify-between p-6 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg space-y-6">
      <h2 className="text-4xl font-black text-gray-800 tracking-tight leading-tight mb-2 md:mb-4 transition-transform duration-300 hover:scale-105">
        {Vehicle.vehicle_specs.model}
      </h2>
      <p className="text-lg text-gray-700 leading-relaxed mb-6">
        <span className="font-semibold text-gray-900">Owner:</span> {Vehicle.vehicle_specs.owner_name}
        <br />
        <span className="font-semibold text-gray-900">Location:</span> {Vehicle.vehicle_specs.location}
        <br />
        <span className="font-semibold text-gray-900">Listed on:</span> {Vehicle.vehicle_specs.date}
      </p>
  
      <div className="grid grid-cols-2 gap-6 text-gray-600 mb-6 border-t border-b border-gray-300 py-4">
        <div className="flex items-center space-x-2 transition-transform duration-200 hover:scale-105">
          <FaRoad className="text-yellow-500" />
          <span className="font-semibold text-gray-800">Mileage:</span>
          <span className="text-gray-700">{Vehicle.vehicle_specs.mileage} KM</span>
        </div>
        <div className="flex items-center space-x-2 transition-transform duration-200 hover:scale-105">
          <FaGasPump className="text-yellow-500" />
          <span className="font-semibold text-gray-800">Fuel Type:</span>
          <span className="text-gray-700">{Vehicle.vehicle_specs.fuel_type}</span>
        </div>
        <div className="flex items-center space-x-2 transition-transform duration-200 hover:scale-105">
          <FaCar className="text-yellow-500" />
          <span className="font-semibold text-gray-800">Style:</span>
          <span className="text-gray-700">{Vehicle.vehicle_specs.manufacturer}</span>
        </div>
        <div className="flex items-center space-x-2 transition-transform duration-200 hover:scale-105">
          <FaTachometerAlt className="text-yellow-500" />
          <span className="font-semibold text-gray-800">Top Speed:</span>
          <span className="text-gray-700">{Vehicle.vehicle_specs.speed} KM/H</span>
        </div>
      </div>
  
      <p className="text-5xl font-extrabold text-yellow-600 tracking-tight leading-snug shadow-sm transition-transform duration-300 transform hover:scale-105">
        ${rentalRate.toLocaleString()} <span className="text-lg text-gray-600 font-medium">/ day</span>
      </p>
    </div>
  </div>
        {/* Enhanced Rental Date Picker Section */}
  <div className="mt-10 bg-gradient-to-br from-white/90 to-gray-50 p-8 rounded-2xl shadow-2xl backdrop-blur-lg border border-gray-200">
    <h3 className="text-3xl font-bold text-gray-800 mb-6">Rental Date Picker</h3>
    
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
          className="w-full p-3 bg-gray-100 rounded-lg text-gray-800 shadow-inner transition-all duration-200 hover:bg-gray-200 focus:ring-2 focus:ring-blue-300"
          minDate={new Date()}
          filterDate={(date) => !isDateUnavailable(date)}
          placeholderText="Select start date"
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
          className="w-full p-3 bg-gray-100 rounded-lg text-gray-800 shadow-inner transition-all duration-200 hover:bg-gray-200 focus:ring-2 focus:ring-blue-300"
          minDate={startDate || new Date()}
          filterDate={(date) => !isDateUnavailable(date)}
          placeholderText="Select end date"
          dateFormat="dd/MM/yyyy"
        />
      </div>
    </div>
  
    {/* Animated Total Rental Cost */}
    {startDate && endDate && (
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-600 shadow-inner animate-fade-in">
        <p className="text-lg font-semibold text-gray-700">
          Total Rental Cost:{" "}
          <span className="text-blue-600">${totalCost.toLocaleString()}</span>
        </p>
      </div>
    )}
    
    {/* Dynamic Error Messages */}
    {!startDate && (
      <p className="text-red-500 font-semibold mt-4 animate-fade-in">
        Please select a start date.
      </p>
    )}
    {!endDate && startDate && (
      <p className="text-red-500 font-semibold mt-4 animate-fade-in">
        Please select an end date.
      </p>
    )}
  
    {/* Animated "Rent Now" Button */}
    {startDate && endDate && (
      <div className="mt-8">
        <button
          onClick={handleRentNow}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-4 rounded-full text-lg font-bold shadow-xl w-full transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl animate-bounce-slow"
        >
          Rent Now
        </button>
      </div>
    )}
  </div>
  
  
        {/* Enhanced "Interior View" Section */}
  <div className="mt-10 px-6 py-10 bg-gradient-to-br from-gray-50 to-gray-200 rounded-2xl shadow-lg">
    <h3 className="text-3xl font-extrabold text-gray-800 mb-6 tracking-tight">Interior View</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Card 1 */}
      <div className="relative bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-500 hover:scale-105 hover:rotate-1 group">
        <img
          src={Vehicle.image2}
          alt="Interior View 1"
          className="w-full h-48 object-cover rounded-lg mb-4 transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute bottom-4 left-4 text-white">
          <h4 className="text-lg font-bold">View 1</h4>
          <p className="text-yellow-400 font-semibold">90° Angle</p>
        </div>
      </div>
  
      {/* Card 2 */}
      <div className="relative bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-500 hover:scale-105 hover:rotate-1 group">
        <img
          src={Vehicle.image3}
          alt="Interior View 2"
          className="w-full h-48 object-cover rounded-lg mb-4 transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute bottom-4 left-4 text-white">
          <h4 className="text-lg font-bold">View 2</h4>
          <p className="text-yellow-400 font-semibold">60° Angle</p>
        </div>
      </div>
  
      {/* Card 3 */}
      <div className="relative bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-500 hover:scale-105 hover:rotate-1 group">
        <img
          src={Vehicle.image4}
          alt="Interior View 3"
          className="w-full h-48 object-cover rounded-lg mb-4 transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute bottom-4 left-4 text-white">
          <h4 className="text-lg font-bold">View 3</h4>
          <p className="text-yellow-400 font-semibold">120° Angle</p>
        </div>
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

  const exportAsCSV = () => {
    const headers = "Name,Style,Type,Color,Price\n";
    const rows = filteredCars
      .map((Vehicle) => `${Vehicle.vehicle_specs.model},${Vehicle.vehicle_specs.manufacturer},${Vehicle.fuel_type},${Vehicle.color},${Vehicle.rental_rate}`)
      .join("\n");
      const csvContent = headers + rows;
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = "cars_export.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportAsPDF = () => {
    const doc = new jsPDF();
    let content = "Name, Style, Type, Color, Price\n";
    filteredCars.forEach((Vehicle, index) => {
      content += `${index + 1}. ${Vehicle.vehicle_specs.model}, ${Vehicle.vehicle_specs.manufacturer}, ${Vehicle.fuel_type}, ${Vehicle.color}, ${Vehicle.rental_rate}\n`;
    });
    doc.text(content, 10, 10);
    doc.save("cars_export.pdf");
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
                <div className="absolute right-26 bottom-10 mt-2 w-48 bg-white border rounded-lg shadow-lg">
                  <ul>
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={exportAsCSV}
                    >
                      Export as CSV
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={exportAsPDF}
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
