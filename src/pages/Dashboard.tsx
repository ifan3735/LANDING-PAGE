import React, { useState } from 'react';
import { FaSearch, FaMoon, FaSun, FaBell } from 'react-icons/fa';
import AvailableCars from '../components/AvailableCars'; // Component for displaying available cars
import RecentActivities from '../components/RecentActivities'; // Component for recent activities or notifications
import StatsCard from '../components/StatsCard'; // Component for the statistics cards

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
        <div className="relative w-1/2 max-w-md">
          <input
            type="text"
            placeholder="Search..."
            className="p-3 pl-10 w-full bg-white rounded-full shadow-lg text-gray-700 focus:outline-none"
          />
          <FaSearch className="absolute left-4 top-3 text-gray-400" />
        </div>

        {/* Right Section - Profile, Notifications, and Theme Toggle */}
        <div className="flex items-center space-x-6">
          {/* Notification Icon */}
          <div className="relative">
            <FaBell className="text-gray-600 cursor-pointer" />
            <span className="absolute -top-2 -right-2 w-3 h-3 bg-red-500 rounded-full"></span>
          </div>

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
              <p className="font-semibold">John Doe</p>
              <p className="text-sm text-gray-500">{new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Section - Available Cars */}
        <div className="md:col-span-2 space-y-6">
          <AvailableCars />
        </div>

        {/* Right Section - Statistics & Recent Activities */}
        <div className="space-y-6">
          <StatsCard />
          <RecentActivities />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
