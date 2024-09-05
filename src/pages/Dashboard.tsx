import React, { useState } from 'react';
import { FaSearch, FaBell } from 'react-icons/fa';
import { MdOutlineSettings } from 'react-icons/md';

// Main Dashboard Component
const Dashboard = () => {
  const [theme, setTheme] = useState('light'); // Theme management
  const [searchQuery, setSearchQuery] = useState(''); // Search query state
  const [cars, setCars] = useState([ // Car data
    { name: 'Audi R8 Green', style: 'Audi', type: 'Auto', color: 'Green', price: '$285,892', imageUrl: 'https://via.placeholder.com/200x150' },
    { name: 'Bentley Flying Spur', style: 'Bentley', type: 'Petrol', color: 'Brown', price: '$358,174', imageUrl: 'https://via.placeholder.com/200x150' },
    { name: 'Lamborghini Aventador', style: 'Lamborghini', type: 'Auto', color: 'Yellow', price: '$420,000', imageUrl: 'https://via.placeholder.com/200x150' },
    { name: 'Porsche 911 Turbo', style: 'Porsche', type: 'Auto', color: 'Red', price: '$200,000', imageUrl: 'https://via.placeholder.com/200x150' },
    { name: 'BMW M5', style: 'BMW', type: 'Manual', color: 'Blue', price: '$110,000', imageUrl: 'https://via.placeholder.com/200x150' },
    { name: 'Tesla Model S', style: 'Tesla', type: 'Electric', color: 'White', price: '$120,000', imageUrl: 'https://via.placeholder.com/200x150' },
  ]);

  // Toggle between light and yellow theme
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'yellow' : 'light');
  };

  // Search functionality
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Filtered cars based on search query
  const filteredCars = cars.filter(car =>
    car.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`transition-all duration-500 p-6 ${theme === 'yellow' ? 'bg-yellow-100 text-gray-900' : 'bg-gray-100 text-gray-900'} min-h-screen`}>
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-8">
        {/* Search Bar */}
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Type here to search..."
            className="p-3 pl-10 w-full bg-white rounded-full shadow-lg text-gray-700 focus:outline-none"
          />
          <FaSearch className="absolute left-4 top-3 text-gray-400" />
        </div>

        {/* Right Section - Export, Theme Toggle, Profile */}
        <div className="flex items-center space-x-6">
          {/* Export Button */}
          <button
            onClick={() => exportData(filteredCars)}
            className="bg-yellow-500 hover:bg-yellow-600 transition-colors text-white px-4 py-2 rounded-full shadow-lg"
          >
            Export
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full transition-colors"
          >
            {theme === 'yellow' ? '🌙' : '🌞'}
          </button>

          {/* User Profile */}
          <div className="flex items-center space-x-3">
            <img
              src="https://via.placeholder.com/40"
              alt="User Avatar"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-semibold">Hello Smith</p>
              <p className="text-sm text-gray-500">28 Jun</p>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-500">Get your latest update for the last 7 days</p>

        {/* Location and Dates */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-4">
          <InfoBlock label="Location" value="GBT, Mail Quishan" />
          <InfoBlock label="Pick-up Date" value="06-Sep-2023" />
          <InfoBlock label="Drop-off Date" value="06-Sep-2023" />
          <InfoBlock label="Pick-up Time" value="10:00 AM" />
          <InfoBlock label="Drop-off Time" value="05:00 PM" />
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Available Cars Section */}
        <div className="col-span-1 lg:col-span-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Available Cars</h2>
              <button className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                Filter by
              </button>
            </div>

            {/* Cars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCars.length ? filteredCars.map((car, index) => (
                <CarCard
                  key={index}
                  name={car.name}
                  style={car.style}
                  type={car.type}
                  color={car.color}
                  price={car.price}
                  imageUrl={car.imageUrl}
                />
              )) : (
                <p className="text-center col-span-3">No cars found</p>
              )}
            </div>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="col-span-1 lg:col-span-4">
          <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <ActivityCard
              carName="Lamborghini Autofill"
              price="$194,714"
              imageUrl="https://via.placeholder.com/80x50"
            />
            <ActivityCard
              carName="Steven Robert"
              location="Georgia, 214b, 105 Saint Laurence"
              distance="43 KM"
              fuel="12 Liters"
              passengers="4 Person"
            />
          </div>

          {/* User Recent Info */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
              <img
                src="https://via.placeholder.com/50"
                alt="Profile"
                className="w-12 h-12 rounded-full"
              />
              <div className="ml-4">
                <p className="font-semibold">Jhonny Lanver</p>
                <p className="text-gray-500">$34,174</p>
              </div>
            </div>

            <div className="flex justify-between">
              <MdOutlineSettings className="text-gray-600" />
              <FaBell className="text-gray-600" />
              <FaSearch className="text-gray-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// InfoBlock Component
const InfoBlock = ({ label, value }: { label: string; value: string }) => (
  <div>
    <span className="block font-semibold">{label}</span>
    <p className="text-gray-700">{value}</p>
  </div>
);

// CarCard Component
const CarCard = ({ name, style, type, color, price, imageUrl }: { name: string; style: string; type: string; color: string; price: string; imageUrl: string }) => (
  <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-md transition-shadow hover:shadow-xl">
    <img src={imageUrl} alt={name} className="w-full h-32 object-cover rounded-lg mb-4" />
    <div className="text-center">
      <h3 className="font-semibold">{name}</h3>
      <p className="text-gray-500">Style: {style}</p>
      <p className="text-gray-500">Type: {type}</p>
      <p className="text-gray-500">Color: {color}</p>
      <p className="text-yellow-600 font-bold">{price}</p>
    </div>
  </div>
);

// ActivityCard Component
const ActivityCard = ({ carName, price, imageUrl }: { carName: string; price: string; imageUrl: string }) => (
  <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-md mb-4">
    <img src={imageUrl} alt={carName} className="w-16 h-10 object-cover rounded-lg mr-4" />
    <div>
      <h3 className="font-semibold">{carName}</h3>
      <p className="text-yellow-600 font-bold">{price}</p>
    </div>
  </div>
);

// Export Data Function
const exportData = (cars: { name: string; style: string; type: string; color: string; price: string }[]) => {
  const csvContent = cars
    .map(car => `${car.name},${car.style},${car.type},${car.color},${car.price}`)
    .join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.setAttribute('hidden', '');
  a.setAttribute('href', url);
  a.setAttribute('download', 'cars_data.csv');
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

export default Dashboard;
