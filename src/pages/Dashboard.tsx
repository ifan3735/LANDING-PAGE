import React, { useState } from 'react';
import { FaSearch, FaMoon, FaSun, FaBell } from 'react-icons/fa';
import { MdOutlineSettings } from 'react-icons/md';

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`p-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} min-h-screen`}>
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-8">
        {/* Search Bar */}
        <div className="relative w-1/3">
          <input
            type="text"
            placeholder="Type here to search..."
            className="p-3 pl-10 w-full bg-white rounded-full shadow-lg text-gray-700 focus:outline-none"
          />
          <FaSearch className="absolute left-4 top-3 text-gray-400" />
        </div>

        {/* Right Section - Export, Theme Toggle, Profile */}
        <div className="flex items-center space-x-6">
          {/* Export Button */}
          <button className="bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg">Export</button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full"
          >
            {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-700" />}
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

        <div className="flex space-x-8 mt-4">
          <div>
            <span className="block font-semibold">Location</span>
            <p>GBT, Mail Quishan</p>
          </div>
          <div>
            <span className="block font-semibold">Pick-up Date</span>
            <p>06-Sep-2023</p>
          </div>
          <div>
            <span className="block font-semibold">Drop-off Date</span>
            <p>06-Sep-2023</p>
          </div>
          <div>
            <span className="block font-semibold">Pick-up Time</span>
            <p>10:00 AM</p>
          </div>
          <div>
            <span className="block font-semibold">Drop-off Time</span>
            <p>05:00 PM</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-12 gap-6">
        {/* Available Cars Section */}
        <div className="col-span-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Available Cars</h2>
              <button className="px-4 py-2 bg-gray-100 rounded-lg">Filter by</button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <CarCard
                name="Audi R8 Green"
                style="Audi"
                type="Auto"
                color="Green"
                price="$285,892"
                imageUrl="https://via.placeholder.com/200x150"
              />
              <CarCard
                name="Bentley Flying Spur"
                style="Bentley"
                type="Petrol"
                color="Brown"
                price="$358,174"
                imageUrl="https://via.placeholder.com/200x150"
              />
              <CarCard
                name="Audi R8 Green"
                style="Audi"
                type="Auto"
                color="Green"
                price="$285,892"
                imageUrl="https://via.placeholder.com/200x150"
              />
              <CarCard
                name="Bentley Flying Spur"
                style="Bentley"
                type="Petrol"
                color="Blue"
                price="$358,174"
                imageUrl="https://via.placeholder.com/200x150"
              />
              <CarCard
                name="Audi R8 Green"
                style="Audi"
                type="Auto"
                color="Green"
                price="$285,892"
                imageUrl="https://via.placeholder.com/200x150"
              />
              <CarCard
                name="Bentley Flying Spur"
                style="Bentley"
                type="Petrol"
                color="Blue"
                price="$358,174"
                imageUrl="https://via.placeholder.com/200x150"
              />
            </div>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="col-span-4">
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

// Component for CarCard
const CarCard = ({ name, style, type, color, price, imageUrl }) => (
  <div className="flex items-center p-4 bg-gray-100 rounded-lg shadow-md">
    <img src={imageUrl} alt={name} className="w-24 h-16 object-cover rounded-lg mr-4" />
    <div>
      <h3 className="font-semibold">{name}</h3>
      <p className="text-gray-500">Style: {style}</p>
      <p className="text-gray-500">Type: {type}</p>
      <p className="text-gray-500">Color: {color}</p>
      <p className="text-blue-600 font-bold">{price}</p>
    </div>
  </div>
);

// Component for Recent Activity Cards
const ActivityCard = ({ carName, price, imageUrl }: { carName: string, price: string, imageUrl: string }) => (
  <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-md mb-4">
    <img src={imageUrl} alt={carName} className="w-16 h-10 object-cover rounded-lg mr-4" />
    <div>
      <h3 className="font-semibold">{carName}</h3>
      <p className="text-blue-600 font-bold">{price}</p>
    </div>
  </div>
);

export default Dashboard;
