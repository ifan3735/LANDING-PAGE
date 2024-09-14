import React, { useState } from 'react';
import Topbar from '../components/TopBar'; // Assuming Topbar is already built
import { FaChevronDown, FaFileExport } from 'react-icons/fa';

const Tracking: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false); // To toggle export dropdown

  const [theme, setTheme] = useState('light');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleTheme = () => setTheme(theme === 'light' ? 'yellow' : 'light');
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value);

  const toggleExportDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (

    <div className={`transition-all duration-500 p-6 ${theme === 'yellow' ? 'bg-yellow-100 text-gray-900' : 'bg-gray-100 text-gray-900'} min-h-screen`}>
        {/* Topbar Component */}
        <Topbar 
        searchQuery={searchQuery}
        handleSearch={handleSearch}
        toggleTheme={toggleTheme}
        theme={theme}
        />

        {/* Main Content */}
          {/* Page Header */}
          {/* New Layer Below Top Bar */}
      <div className="flex justify-between items-center my-6">
        {/* Left Section: Header and Paragraph */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Tracking</h2>
          <p className="text-sm text-gray-600">
            Get your latest update for the past 7 days
          </p>
        </div>

        {/* Right Section: Export Button with Dropdown */}
        <div className="relative">
          <button
            onClick={toggleExportDropdown}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center"
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

          {/* Tracking Section */}
          <div className="grid grid-cols-12 gap-6">
            {/* Car Tracking List */}
            <div className="col-span-4 bg-white rounded-lg shadow-md p-4">
              <h3 className="font-semibold text-lg mb-4">Car Tracking</h3>

              {/* Tracking Cards */}
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4 shadow-sm border border-blue-600">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Panamera Platinum</h4>
                    <span className="text-blue-600">For Ride</span>
                  </div>
                  <p className="text-gray-500">18, Sep 2h 15 min</p>
                  <p className="text-sm mt-2">
                    Jamshera Nagar, Block D <br />
                    <span className="text-xs text-gray-400">
                      10:00 AM - 12:55 PM
                    </span>
                  </p>
                  <p className="text-sm text-gray-400">Aftabnagar 12:58-01:12 PM</p>
                </div>

                {/* Additional Cars (reuse this block for each car) */}
                <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Bentley Spur</h4>
                    <span className="text-blue-600">For Ride</span>
                  </div>
                  <p className="text-gray-500">17, Sep 2h 15 min</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Hyundai Turbo</h4>
                    <span className="text-blue-600">For Ride</span>
                  </div>
                  <p className="text-gray-500">17, Sep 2h 15 min</p>
                </div>

                {/* Add more car blocks similarly */}
              </div>
            </div>

            {/* Car Detail & Route */}
            <div className="col-span-8 space-y-6">
              {/* Car Info and Image */}
              <div className="bg-white rounded-lg shadow-md p-4 flex items-center">
                <div className="flex-1">
                  <h3 className="font-semibold text-xl">Panamera Platinum</h3>
                </div>
                <div className="w-64 h-36">
                  <img
                    src="https://i.pinimg.com/236x/5e/33/89/5e3389a1ab41782cdf60d1edef683bf6.jpg" // Add real image link
                    alt="Panamera Platinum"
                    className="object-cover w-full h-full rounded-lg"
                  />
                </div>
              </div>

              {/* Route Information */}
              <div className="bg-white rounded-lg shadow-md p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-lg">Route</h4>
                  <span className="text-gray-400">01:12:15 - 48 min. left</span>
                  <button className="bg-yellow-500 text-white px-4 py-1 rounded-lg">
                    Change Route
                  </button>
                </div>

                {/* Map placeholder */}
                <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                  <img src="https://i.pinimg.com/236x/63/5f/3c/635f3c81ecfa87080a8327c47da7764b.jpg" alt="" />
                </div>

                {/* Route Pictures */}
                <div className="flex space-x-4">
                  <img
                    src="https://i.pinimg.com/236x/6d/dc/68/6ddc68933246f8ab5549c4d88e51e4eb.jpg" // Add real image link
                    alt="Route 1"
                    className="w-20 h-16 object-cover rounded-lg"
                  />
                  <img
                    src="https://i.pinimg.com/236x/e9/7b/b4/e97bb4d26c4644a894e3bd9c138d4520.jpg"
                    alt="Route 2"
                    className="w-20 h-16 object-cover rounded-lg"
                  />
                  <img
                    src="https://i.pinimg.com/236x/dd/29/89/dd298962be76c5b25de3d9d61aed05d3.jpg"
                    alt="Route 3"
                    className="w-20 h-16 object-cover rounded-lg"
                  />
                  <img
                    src="https://i.pinimg.com/236x/06/99/e5/0699e5bf037437f64c690d02830b9d83.jpg"
                    alt="Route 4"
                    className="w-20 h-16 object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
  );
};

export default Tracking;
