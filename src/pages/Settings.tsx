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
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl mx-auto">
  <h3 className="text-2xl font-bold text-gray-800 mb-6">General Settings</h3>
  <form className="space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* First Name */}
      <div>
        <label className="block text-sm font-medium text-gray-600">
          First Name
        </label>
        <div className="relative mt-2">
          <input
            type="text"
            placeholder="First Name"
            value="Smith"
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          />
        </div>
      </div>

      {/* Last Name */}
      <div>
        <label className="block text-sm font-medium text-gray-600">
          Last Name
        </label>
        <div className="relative mt-2">
          <input
            type="text"
            placeholder="Last Name"
            value="Hussain"
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-600">
          Your Email
        </label>
        <div className="relative mt-2">
          <input
            type="email"
            placeholder="Email"
            value="thesmithhussain23@gmail.com"
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          />
        </div>
      </div>

      {/* Address */}
      <div>
        <label className="block text-sm font-medium text-gray-600">
          Address
        </label>
        <div className="relative mt-2">
          <input
            type="text"
            placeholder="Address"
            value="Greenman Kingston 1478"
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          />
        </div>
      </div>

      {/* Currency */}
      <div>
        <label className="block text-sm font-medium text-gray-600">
          Currency Used
        </label>
        <div className="relative mt-2">
          <input
            type="text"
            placeholder="Currency"
            value="Dollar"
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          />
        </div>
      </div>

      {/* State */}
      <div>
        <label className="block text-sm font-medium text-gray-600">
          State
        </label>
        <div className="relative mt-2">
          <input
            type="text"
            placeholder="State"
            value="Canada Ottawa"
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          />
        </div>
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

        {/* New Layer Below Top Bar */}
      <div className="flex justify-between items-center my-6">
        {/* Left Section: Header and Paragraph */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
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

      <div className="flex mt-8">
        {/* Sidebar */}
        <div className="w-72 bg-white shadow-lg rounded-lg p-8 space-y-8">
  <h2 className="text-2xl font-extrabold text-gray-800 mb-6">Settings</h2>
  <ul className="space-y-4">
    <li
      className={`flex items-center space-x-3 p-3 cursor-pointer transition-all duration-300 rounded-lg hover:bg-blue-50 ${
        activeTab === 'General' ? 'text-blue-600 font-bold bg-blue-100 shadow-sm' : 'text-gray-600'
      }`}
      onClick={() => handleTabClick('General')}
    >
      <FaCog className="text-gray-500" />
      <span className="text-lg">General</span>
    </li>
    <li
      className={`flex items-center space-x-3 p-3 cursor-pointer transition-all duration-300 rounded-lg hover:bg-blue-50 ${
        activeTab === 'Account' ? 'text-blue-600 font-bold bg-blue-100 shadow-sm' : 'text-gray-600'
      }`}
      onClick={() => handleTabClick('Account')}
    >
      <FaUser className="text-gray-500" />
      <span className="text-lg">Account</span>
    </li>
    <li
      className={`flex items-center space-x-3 p-3 cursor-pointer transition-all duration-300 rounded-lg hover:bg-blue-50 ${
        activeTab === 'Notification' ? 'text-blue-600 font-bold bg-blue-100 shadow-sm' : 'text-gray-600'
      }`}
      onClick={() => handleTabClick('Notification')}
    >
      <FaBell className="text-gray-500" />
      <span className="text-lg">Notification</span>
    </li>
    <li
      className={`flex items-center space-x-3 p-3 cursor-pointer transition-all duration-300 rounded-lg hover:bg-blue-50 ${
        activeTab === 'Bill Payment' ? 'text-blue-600 font-bold bg-blue-100 shadow-sm' : 'text-gray-600'
      }`}
      onClick={() => handleTabClick('Bill Payment')}
    >
      <FaCreditCard className="text-gray-500" />
      <span className="text-lg">Bill Payment</span>
    </li>
    <li
      className={`flex items-center space-x-3 p-3 cursor-pointer transition-all duration-300 rounded-lg hover:bg-blue-50 ${
        activeTab === 'Payment Access' ? 'text-blue-600 font-bold bg-blue-100 shadow-sm' : 'text-gray-600'
      }`}
      onClick={() => handleTabClick('Payment Access')}
    >
      <FaKey className="text-gray-500" />
      <span className="text-lg">Payment Access</span>
    </li>
    <li
      className={`flex items-center space-x-3 p-3 cursor-pointer transition-all duration-300 rounded-lg hover:bg-blue-50 ${
        activeTab === 'Language' ? 'text-blue-600 font-bold bg-blue-100 shadow-sm' : 'text-gray-600'
      }`}
      onClick={() => handleTabClick('Language')}
    >
      <FaLanguage className="text-gray-500" />
      <span className="text-lg">Language</span>
    </li>
    <li
      className={`flex items-center space-x-3 p-3 cursor-pointer transition-all duration-300 rounded-lg hover:bg-blue-50 ${
        activeTab === 'Change Password' ? 'text-blue-600 font-bold bg-blue-100 shadow-sm' : 'text-gray-600'
      }`}
      onClick={() => handleTabClick('Change Password')}
    >
      <FaKey className="text-gray-500" />
      <span className="text-lg">Change Password</span>
    </li>
  </ul>
</div>


        {/* Main Content */}
        <div className="flex-1 ml-8">
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
