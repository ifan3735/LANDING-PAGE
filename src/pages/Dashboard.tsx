import React, { useState } from 'react';
import TopBar from '../components/TopBar';
import CarCard from '../components/CarCard';
import ActivityCard from '../components/ActivityCard';
import UserInfoCard from '../components/UserInfoCard';
import { FaBars, FaChevronDown, FaFileExport } from 'react-icons/fa';
import { jsPDF } from "jspdf";
import { useFetchAllVehiclesQuery } from '../features/API';

const Dashboard = () => {
  const [showDropdown, setShowDropdown] = useState(false); // To toggle export dropdown
  const [theme, setTheme] = useState('light');
  const [searchQuery, setSearchQuery] = useState('');
  const { data, isSuccess, isLoading, error } = useFetchAllVehiclesQuery();
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    type: '',
    color: '',
    style: '',
  });
  const [visibleActivities, setVisibleActivities] = useState(1);


  const toggleTheme = () => setTheme(theme === 'light' ? 'yellow' : 'light');

  const handleSearch = (e) => setSearchQuery(e.target.value);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Function to export filtered data as CSV
  const exportAsCSV = () => {
    const headers = "Name,Style,Type,Color,Price\n"; // CSV headers
    const rows = filteredCars
      .map(Vehicle => `${Vehicle.name},${Vehicle.style},${Vehicle.type},${Vehicle.color},${Vehicle.price}`)
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

  // Function to export filtered data as PDF
  const exportAsPDF = () => {
    const doc = new jsPDF();
    let content = "Name, Style, Type, Color, Price\n";
    filteredCars.forEach((Vehicle, index) => {
      content += `${index + 1}. ${Vehicle.name}, ${Vehicle.style}, ${Vehicle.type}, ${Vehicle.color}, ${Vehicle.price}\n`;
    });
    doc.text(content, 10, 10);
    doc.save("cars_export.pdf");
  };

  const filteredCars = data?.filter(Vehicle => {
    const matchesSearch = Vehicle.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedFilters.type ? Vehicle.type === selectedFilters.type : true;
    const matchesColor = selectedFilters.color ? Vehicle.color === selectedFilters.color : true;
    const matchesStyle = selectedFilters.style ? Vehicle.style === selectedFilters.style : true;
    return matchesSearch && matchesType && matchesColor && matchesStyle;
  });

  const toggleFilterDropdown = () => setShowFilterDropdown(!showFilterDropdown);

  const toggleExportDropdown = () => setShowDropdown(!showDropdown);

  const userInfo = {
    name: 'John Stevens',
    locationFrom: 'Georgia, 25 Mile',
    locationTo: '106 Saint Laurence, UK',
    distance: '48 KM',
    duration: '2h 15m',
    fuel: '12 Liters',
    passengers: '4 Person',
    average: 'Average',
    imageUrl: 'https://i.pinimg.com/236x/07/33/ba/0733ba760b29378474dea0fdbcb97107.jpg',
  };

  const recentActivities = [
    { carName: 'Lamborghini Autofill', price: '$194,714', imageUrl: 'https://i.pinimg.com/736x/a7/d7/f2/a7d7f2e76dafcb9045e0065d0a772909.jpg' },
    { carName: 'Tesla Model S', price: '$120,000', imageUrl: 'https://i.pinimg.com/1200x/ba/fa/a9/bafaa9ee834ac42aaf6f08313e930cbe.jpg' },
    { carName: 'Porsche 911', price: '$200,000', imageUrl: 'https://i.pinimg.com/1200x/e1/06/07/e1060739e7e16b2f935ec364c77cddcd.jpg' }
  ];

  const loadMoreActivities = () => setVisibleActivities((prev) => prev + 1);
  const seeLessActivities = () => setVisibleActivities(1);

  return (
    <div className={`transition-all duration-500 p-6 ${theme === 'yellow' ? 'bg-yellow-100 text-gray-900' : 'bg-gray-100 text-gray-900'} min-h-screen`}>
      <TopBar
        searchQuery={searchQuery}
        handleSearch={handleSearch}
        toggleTheme={toggleTheme}
        theme={theme}
        exportData={() => exportAsCSV(filteredCars)}
      />

      <div className="flex justify-between items-center my-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="col-span-1 lg:col-span-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Available Cars</h2>
              <div className="relative">
                <button 
                  className="border border-blue-500 text-blue-500 px-4 py-2 rounded-full shadow-lg flex items-center"
                  onClick={toggleFilterDropdown}
                >
                   <FaBars className="mr-2" /> Filter by
                </button>
                {showFilterDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg p-4 z-10">
                    <div className="mb-2">
                      <label className="block text-sm text-gray-700">Type:</label>
                      <select name="type" value={selectedFilters.type} onChange={handleFilterChange} className="w-full p-2 border rounded">
                        <option value="">All</option>
                        <option value="Auto">Auto</option>
                        <option value="Manual">Manual</option>
                        <option value="Electric">Electric</option>
                        <option value="Petrol">Petrol</option>
                      </select>
                    </div>
                    <div className="mb-2">
                      <label className="block text-sm text-gray-700">Color:</label>
                      <select name="color" value={selectedFilters.color} onChange={handleFilterChange} className="w-full p-2 border rounded">
                        <option value="">All</option>
                        <option value="Green">Green</option>
                        <option value="Brown">Brown</option>
                        <option value="Yellow">Yellow</option>
                        <option value="Red">Red</option>
                        <option value="Blue">Blue</option>
                        <option value="White">White</option>
                      </select>
                    </div>
                    <div className="mb-2">
                      <label className="block text-sm text-gray-700">Style:</label>
                      <select name="style" value={selectedFilters.style} onChange={handleFilterChange} className="w-full p-2 border rounded">
                        <option value="">All</option>
                        <option value="Audi">Audi</option>
                        <option value="Bentley">Bentley</option>
                        <option value="Lamborghini">Lamborghini</option>
                        <option value="Porsche">Porsche</option>
                        <option value="BMW">BMW</option>
                        <option value="Tesla">Tesla</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCars.length ? filteredCars.map((Vehicle, index) => (
                <CarCard
                  key={index}
                  name={Vehicle.vehicle_specs.model}
                  style={Vehicle.vehicle_specs.manufacturer}
                  type={Vehicle.fuel_type}
                  color={Vehicle.color}
                  price={Vehicle.rental_rate}
                  imageUrl={Vehicle.image}
                />
              )) : (
                <p className="text-center col-span-3">No cars found</p>
              )}
            </div>
          </div>
        </div>

        <div className="col-span-1 lg:col-span-4">
          <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>

            {recentActivities.slice(0, visibleActivities).map((activity, index) => (
              <ActivityCard
                key={index}
                carName={activity.carName}
                price={activity.price}
                imageUrl={activity.imageUrl}
              />
            ))}

            <div className="flex justify-center mt-4 space-x-4">
              {visibleActivities < recentActivities.length && (
                <button
                  className="text-blue-500 hover:underline"
                  onClick={loadMoreActivities}
                >
                  See More
                </button>
              )}

              {visibleActivities > 1 && (
                <button
                  className="text-blue-500 hover:underline"
                  onClick={seeLessActivities}
                >
                  See Less
                </button>
              )}
            </div>
          </div>

          <UserInfoCard
            name={userInfo.name}
            locationFrom={userInfo.locationFrom}
            locationTo={userInfo.locationTo}
            distance={userInfo.distance}
            duration={userInfo.duration}
            fuel={userInfo.fuel}
            passengers={userInfo.passengers}
            average={userInfo.average}
            imageUrl={userInfo.imageUrl}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
