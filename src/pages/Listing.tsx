import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TopBar from "../components/TopBar";
import { FaMapMarkerAlt, FaGasPump, FaTachometerAlt, FaChevronDown, FaBars, FaFileExport, FaRoad, FaCar } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useFetchAllVehiclesQuery, useCheckoutMutation, useBookVehicleMutation } from "../features/API";
import jsPDF from "jspdf";

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
            <button
                onClick={handleRentNow}
                className="bg-blue-100 text-blue-600 px-6 py-4 rounded-full text-lg font-bold shadow-lg w-full"
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
                      <option value="Toyota">Toyota</option>
                      <option value="Porshe">Porshe</option>
                      <option value="Audi">Audi</option>
                      <option value="BMW">BMW</option>
                      <option value="Range Rover">Range Rover</option>
                      <option value="Lexus">Lexus</option>
                      <option value="Bentley">Bentley</option>
                      <option value="Mercedes">Mercedes</option>
                      <option value="Rolls Royce">Rolls Royce</option>
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
