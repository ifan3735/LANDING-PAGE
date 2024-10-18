import { useState } from 'react';
import TopBar from '../components/TopBar';
import { exportData } from '../utils/ExportData';
import { FaBars, FaChevronDown, FaFileExport } from 'react-icons/fa';
import  Bid from '../components/Bids';
import CarDetailView from '../components/CarDetailView';
import { useFetchAllVehiclesQuery } from '../features/API';
import jsPDF from 'jspdf';

const Bids = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [theme, setTheme] = useState('light');
  const [searchQuery, setSearchQuery] = useState('');
  const { data, isSuccess } = useFetchAllVehiclesQuery();
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState({
    type: '',
    color: '',
    style: '',
  });

  const [selectedCar, setSelectedCar] = useState<any>(null); // State for selected car

  const handleCarClick = (Vehicle: any) => {
    setSelectedCar(Vehicle);
  };

  const handleBack = () => {
    setSelectedCar(null);
  };

  const toggleTheme = () => setTheme(theme === 'light' ? 'yellow' : 'light');

  const toggleFilters = () => setShowFilters(!showFilters);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSelectedFilter((prevFilters) => ({
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
     const matchesType = selectedFilter.type
       ? Vehicle.vehicle_specs.fuel_type.toLowerCase() === selectedFilter.type.toLowerCase()
       : true;
     const matchesColor = selectedFilter.color
       ? Vehicle.vehicle_specs.color.toLowerCase() === selectedFilter.color.toLowerCase()
       : true;
     const matchesStyle = selectedFilter.style
       ? Vehicle.vehicle_specs.manufacturer.toLowerCase() === selectedFilter.style.toLowerCase()
       : true;
     return matchesSearch && matchesType && matchesColor && matchesStyle;
   })
 : [];
  const toggleFilterDropdown = () => setShowFilterDropdown(!showFilterDropdown);

  const toggleExportDropdown = () => setShowDropdown(!showDropdown);

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
    <div className={`transition-all duration-500 p-6 ${theme === 'yellow' ? 'bg-yellow-100 text-gray-900' : 'bg-gray-100 text-gray-900'} min-h-screen`}>
      <TopBar
        searchQuery={searchQuery}
        handleSearch={handleSearch}
        toggleTheme={toggleTheme}
        theme={theme}
        exportData={() => exportData(filteredCars)}
      />

        {selectedCar ? (
          <CarDetailView car = {selectedCar} onBack = {handleBack} />
        ) : (
          <>
      <div className="flex justify-between items-center my-6">
        {/* Left Section: Header and Paragraph */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Active Bids</h2>
          <p className="text-sm text-gray-600">
            Get your latest update for the past 7 days
          </p>
        </div>

        {/* Right Section: Export Button with Dropdown */}
        <div className="relative">
          <button
            onClick={toggleExportDropdown}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center"
          >
            <FaFileExport className="mr-2" /> Export
            <FaChevronDown className="ml-2" />
          </button>

          {/* Export Dropdown */}
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
            <h2 className="text-xl font-semibold">Auction</h2>

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
                      value={selectedFilter.type}
                      onChange={handleFilterChange}
                      className="border rounded-lg w-full p-2 mt-1"
                    >
                      <option value="">All Types</option>
                      <option value="Petrol">Petrol</option>
                      <option value="Diesel">Diesel</option>
                      <option value="Electric">Electric</option>
                    </select>
                  </div>
                  <div className="p-4 border-t">
                    <label className="block text-gray-700">Color</label>
                    <select
                      name="color"
                      value={selectedFilter.color}
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
                      value={selectedFilter.style}
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {filteredCars.map((Vehicle, index) => (
          <Bid
            key={index}
            name={Vehicle.name}
            imageUrl={Vehicle.image}
            location={Vehicle.location}
            style={Vehicle.style}
            rto={Vehicle.rto}
            spend={Vehicle.speed}
            price={Vehicle.price}
            bidPrice={Vehicle.bidPrice}
            onClick={() => handleCarClick(Vehicle)}
          />
        ))}
      </div>
      </>
        )}
      </div>
  );
};

export default Bids;
