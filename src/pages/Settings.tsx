import { useState } from "react";
import { FaChevronDown, FaFileExport, FaBell, FaUser, FaCog, FaCreditCard, FaKey, FaLanguage } from "react-icons/fa";
import TopBar from "../components/TopBar";
import { exportData } from "../utils/ExportData";

const Settings = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [theme, setTheme] = useState('light');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('General');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false); // For showing/hiding filter dropdown
  const [selectedFilters, setSelectedFilters] = useState({
    type: '',
    color: '',
    style: '',
  });
   // Manage active tab

  const toggleTheme = () => setTheme(theme === 'light' ? 'yellow' : 'light');
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value);
  const toggleExportDropdown = () => setShowDropdown(!showDropdown);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilters({
      ...selectedFilters,
      [e.target.name]: e.target.value,
    });
  };

  // Function to handle tab switching
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Dynamically render content based on the active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'General':
        return (
          <div className="bg-white p-6 rounded-lg shadow-lg">
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
        );
      case 'Account':
        return (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Account Information</h3>
            <p className="text-gray-600">Account details will go here...</p>
          </div>
        );
      case 'Notification':
        return (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Notification Settings</h3>
            <p className="text-gray-600">Notification settings content...</p>
          </div>
        );
      case 'Bill Payment':
        return (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Bill Payment Information</h3>
            <p className="text-gray-600">Bill payment details...</p>
          </div>
        );
      case 'Payment Access':
        return (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Payment Access</h3>
            <p className="text-gray-600">Payment access information...</p>
          </div>
        );
      case 'Language':
        return (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Language Settings</h3>
            <p className="text-gray-600">Language selection options...</p>
          </div>
        );
      case 'Change Password':
        return (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Change Password</h3>
            <p className="text-gray-600">Change password form...</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`transition-all duration-500 p-6 ${theme === 'yellow' ? 'bg-yellow-100 text-gray-900' : 'bg-gray-100 text-gray-900'} min-h-screen`}>
      {/* Top Bar */}
      <TopBar
        searchQuery={searchQuery}
        handleSearch={handleSearch}
        toggleTheme={toggleTheme}
        theme={theme}
        exportData={() => exportData(filteredCars)}
      />

      <div className="flex mt-8">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-md rounded-lg p-6 space-y-6">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Settings</h2>
          <ul className="space-y-2">
            <li
              className={`flex items-center space-x-2 cursor-pointer ${activeTab === 'General' ? 'text-blue-600 font-semibold' : 'text-gray-600'}`}
              onClick={() => handleTabClick('General')}
            >
              <FaCog className="text-gray-500" />
              <span>General</span>
            </li>
            <li
              className={`flex items-center space-x-2 cursor-pointer ${activeTab === 'Account' ? 'text-blue-600 font-semibold' : 'text-gray-600'}`}
              onClick={() => handleTabClick('Account')}
            >
              <FaUser className="text-gray-500" />
              <span>Account</span>
            </li>
            <li
              className={`flex items-center space-x-2 cursor-pointer ${activeTab === 'Notification' ? 'text-blue-600 font-semibold' : 'text-gray-600'}`}
              onClick={() => handleTabClick('Notification')}
            >
              <FaBell className="text-gray-500" />
              <span>Notification</span>
            </li>
            <li
              className={`flex items-center space-x-2 cursor-pointer ${activeTab === 'Bill Payment' ? 'text-blue-600 font-semibold' : 'text-gray-600'}`}
              onClick={() => handleTabClick('Bill Payment')}
            >
              <FaCreditCard className="text-gray-500" />
              <span>Bill Payment</span>
            </li>
            <li
              className={`flex items-center space-x-2 cursor-pointer ${activeTab === 'Payment Access' ? 'text-blue-600 font-semibold' : 'text-gray-600'}`}
              onClick={() => handleTabClick('Payment Access')}
            >
              <FaKey className="text-gray-500" />
              <span>Payment Access</span>
            </li>
            <li
              className={`flex items-center space-x-2 cursor-pointer ${activeTab === 'Language' ? 'text-blue-600 font-semibold' : 'text-gray-600'}`}
              onClick={() => handleTabClick('Language')}
            >
              <FaLanguage className="text-gray-500" />
              <span>Language</span>
            </li>
            <li
              className={`flex items-center space-x-2 cursor-pointer ${activeTab === 'Change Password' ? 'text-blue-600 font-semibold' : 'text-gray-600'}`}
              onClick={() => handleTabClick('Change Password')}
            >
              <FaKey className="text-gray-500" />
              <span>Change Password</span>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 ml-8">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-700">{activeTab} Settings</h2>
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

          {/* Dynamic Content */}
          <div className="mt-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
