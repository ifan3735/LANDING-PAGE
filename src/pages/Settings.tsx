import { useState } from "react";
import { FaChevronDown, FaFileExport, FaBell, FaUser } from "react-icons/fa";

const Settings = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [theme, setTheme] = useState('light');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');
  const handleSearch = (e) => setSearchQuery(e.target.value);
  const toggleExportDropdown = () => setShowDropdown(!showDropdown);

  return (
    <div
      className={`transition-all duration-500 p-6 min-h-screen ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Top Bar */}
      <div className="flex justify-between items-center pb-4 border-b">
        <div className="relative">
          <input
            type="text"
            placeholder="Type here to search"
            className="px-4 py-2 w-64 rounded-full border border-gray-300 focus:outline-none"
            value={searchQuery}
            onChange={handleSearch}
          />
          <span className="absolute right-4 top-2 text-gray-400">⌘ K</span>
        </div>

        <div className="flex items-center space-x-4">
          <button onClick={toggleTheme} className="bg-gray-200 px-4 py-2 rounded-full">
            {theme === 'light' ? 'Dark' : 'Light'}
          </button>
          <FaBell className="text-gray-500" />
          <div className="flex items-center">
            <FaUser className="mr-2 text-gray-500" />
            <span>Hello Smith</span>
          </div>
        </div>
      </div>

      <div className="flex mt-8">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-md rounded-lg p-6 space-y-6">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Settings</h2>
          <ul className="space-y-2">
            <li className="flex items-center space-x-2 text-blue-600 font-semibold">
              <span className="bg-blue-100 p-2 rounded-full">
                <i className="fas fa-cog"></i>
              </span>
              <span>General</span>
            </li>
            <li className="flex items-center space-x-2 text-gray-600">
              <span className="bg-gray-100 p-2 rounded-full">
                <i className="fas fa-user"></i>
              </span>
              <span>Account</span>
            </li>
            <li className="flex items-center space-x-2 text-gray-600">
              <span className="bg-gray-100 p-2 rounded-full">
                <i className="fas fa-bell"></i>
              </span>
              <span>Notification</span>
            </li>
            <li className="flex items-center space-x-2 text-gray-600">
              <span className="bg-gray-100 p-2 rounded-full">
                <i className="fas fa-credit-card"></i>
              </span>
              <span>Bill Payment</span>
            </li>
            <li className="flex items-center space-x-2 text-gray-600">
              <span className="bg-gray-100 p-2 rounded-full">
                <i className="fas fa-key"></i>
              </span>
              <span>Payment Access</span>
            </li>
            <li className="flex items-center space-x-2 text-gray-600">
              <span className="bg-gray-100 p-2 rounded-full">
                <i className="fas fa-language"></i>
              </span>
              <span>Language</span>
            </li>
            <li className="flex items-center space-x-2 text-gray-600">
              <span className="bg-gray-100 p-2 rounded-full">
                <i className="fas fa-lock"></i>
              </span>
              <span>Change Password</span>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 ml-8">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-700">Settings</h2>
              <p className="text-sm text-gray-500 mt-1">
                Get your latest updates for the last 7 days
              </p>
            </div>

            <div className="relative">
              <button
                onClick={toggleExportDropdown}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full shadow-md flex items-center transition-all duration-300"
              >
                <FaFileExport className="mr-2" /> Export
                <FaChevronDown className="ml-2" />
              </button>

              {/* Export Dropdown */}
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
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

          {/* General Settings Form */}
          <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
            <h3 className="text-xl font-semibold mb-4">General Settings</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="First Name"
                    value="Smith"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Last Name"
                    value="Hussain"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Your Email
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    value="thesmithhussain23@gmail.com"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input
                    type="text"
                    placeholder="Address"
                    value="Greenman Kingston 1478"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                {/* Currency */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Currency Used
                  </label>
                  <input
                    type="text"
                    placeholder="Currency"
                    value="Dollar"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                {/* State */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    State
                  </label>
                  <input
                    type="text"
                    placeholder="State"
                    value="Canada Ottawa"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
