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
          <div className="relative bg-gradient-to-r from-blue-50 to-white p-10 rounded-xl shadow-xl max-w-4xl mx-auto">
  <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">General Settings</h3>
  
  <form className="space-y-10">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

      {/* First Name */}
      <div className="relative">
        <input
          type="text"
          placeholder=" "
          value="Smith"
          className="peer block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200"
        />
        <label className="absolute left-3 -top-3.5 bg-white px-1 text-gray-600 peer-placeholder-shown:top-3.5 peer-placeholder-shown:left-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:left-3 peer-focus:text-sm peer-focus:text-blue-500 transition-all duration-200">
          First Name
        </label>
      </div>

      {/* Last Name */}
      <div className="relative">
        <input
          type="text"
          placeholder=" "
          value="Hussain"
          className="peer block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200"
        />
        <label className="absolute left-3 -top-3.5 bg-white px-1 text-gray-600 peer-placeholder-shown:top-3.5 peer-placeholder-shown:left-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:left-3 peer-focus:text-sm peer-focus:text-blue-500 transition-all duration-200">
          Last Name
        </label>
      </div>

      {/* Email */}
      <div className="relative">
        <input
          type="email"
          placeholder=" "
          value="thesmithhussain23@gmail.com"
          className="peer block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200"
        />
        <label className="absolute left-3 -top-3.5 bg-white px-1 text-gray-600 peer-placeholder-shown:top-3.5 peer-placeholder-shown:left-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:left-3 peer-focus:text-sm peer-focus:text-blue-500 transition-all duration-200">
          Your Email
        </label>
      </div>

      {/* Address */}
      <div className="relative">
        <input
          type="text"
          placeholder=" "
          value="Greenman Kingston 1478"
          className="peer block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200"
        />
        <label className="absolute left-3 -top-3.5 bg-white px-1 text-gray-600 peer-placeholder-shown:top-3.5 peer-placeholder-shown:left-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:left-3 peer-focus:text-sm peer-focus:text-blue-500 transition-all duration-200">
          Address
        </label>
      </div>

      {/* Currency */}
      <div className="relative">
        <input
          type="text"
          placeholder=" "
          value="Dollar"
          className="peer block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200"
        />
        <label className="absolute left-3 -top-3.5 bg-white px-1 text-gray-600 peer-placeholder-shown:top-3.5 peer-placeholder-shown:left-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:left-3 peer-focus:text-sm peer-focus:text-blue-500 transition-all duration-200">
          Currency Used
        </label>
      </div>

      {/* State */}
      <div className="relative">
        <input
          type="text"
          placeholder=" "
          value="Canada Ottawa"
          className="peer block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200"
        />
        <label className="absolute left-3 -top-3.5 bg-white px-1 text-gray-600 peer-placeholder-shown:top-3.5 peer-placeholder-shown:left-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:left-3 peer-focus:text-sm peer-focus:text-blue-500 transition-all duration-200">
          State
        </label>
      </div>
    </div>

    {/* Submit Button */}
    <div className="text-center mt-10">
      <button
        type="submit"
        className="w-1/2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 hover:shadow-xl transform hover:-translate-y-1"
      >
        Save Changes
      </button>
    </div>
  </form>
</div>


        );
      case 'Account':
        return (
     <div className="bg-white p-10 rounded-3xl shadow-xl max-w-4xl mx-auto transition-all duration-300">
  {/* Profile Section */}
  <h3 className="text-3xl font-extrabold text-gray-900 mb-10">Profile</h3>

  {/* Profile Image Section */}
  <div className="flex items-center space-x-8 mb-10">
    <img
      src="https://i.pinimg.com/236x/5d/81/ed/5d81ed175d9b3d943b7f259bb0eb8b79.jpg"
      alt="Profile"
      className="w-28 h-28 rounded-full object-cover border-4 border-blue-500 shadow-lg hover:shadow-xl transition-shadow duration-300"
    />
    <div>
      <h4 className="text-lg font-medium text-gray-700 mb-3">Choose Image</h4>
      <button className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-2 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-300 mr-3">
        Browse
      </button>
      <button className="border border-gray-400 px-6 py-2 rounded-full text-gray-700 hover:bg-gray-200 shadow-md transition-colors duration-300">
        Remove
      </button>
    </div>
  </div>

  {/* Information Section */}
  <div className="space-y-8">
    <h4 className="text-2xl font-semibold text-gray-800 mb-6">Information</h4>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* User Name */}
      <div>
        <label className="block text-lg text-gray-700 font-semibold mb-3">User Name</label>
        <input
          type="text"
          placeholder="admin"
          className="w-full border border-gray-300 p-4 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 shadow-sm text-gray-800 transition-all duration-300"
        />
      </div>

      {/* Display Name */}
      <div>
        <label className="block text-lg text-gray-700 font-semibold mb-3">Display Name</label>
        <input
          type="text"
          placeholder="Smith Hussain"
          className="w-full border border-gray-300 p-4 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 shadow-sm text-gray-800 transition-all duration-300"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-lg text-gray-700 font-semibold mb-3">Your Email</label>
        <input
          type="email"
          placeholder="thesmithhussain23@gmail.com"
          className="w-full border border-gray-300 p-4 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 shadow-sm text-gray-800 transition-all duration-300"
        />
      </div>

      {/* Language */}
      <div>
        <label className="block text-lg text-gray-700 font-semibold mb-3">Language</label>
        <select className="w-full border border-gray-300 p-4 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 shadow-sm text-gray-800 transition-all duration-300">
          <option>English</option>
          <option>Spanish</option>
        </select>
      </div>
    </div>
  </div>
  {/* Submit Button */}
  <div className="text-center mt-10">
      <button
        type="submit"
        className="w-1/2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 hover:shadow-xl transform hover:-translate-y-1"
      >
        Save Changes
      </button>
    </div>
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
    className={`flex flex-col items-start space-y-1 p-3 cursor-pointer transition-all duration-300 rounded-lg hover:bg-blue-50 ${
      activeTab === 'General' ? 'text-blue-600 font-bold bg-blue-100 shadow-sm' : 'text-gray-600'
    }`}
    onClick={() => handleTabClick('General')}
  >
    <div className="flex items-center space-x-3">
      <FaCog className="text-gray-500" />
      <span className="text-lg">General</span>
    </div>
    <p className="text-sm text-gray-500">Access the general settings</p>
  </li>

  <li
    className={`flex flex-col items-start space-y-1 p-3 cursor-pointer transition-all duration-300 rounded-lg hover:bg-blue-50 ${
      activeTab === 'Account' ? 'text-blue-600 font-bold bg-blue-100 shadow-sm' : 'text-gray-600'
    }`}
    onClick={() => handleTabClick('Account')}
  >
    <div className="flex items-center space-x-3">
      <FaUser className="text-gray-500" />
      <span className="text-lg">Account</span>
    </div>
    <p className="text-sm text-gray-500">Edit your personal information</p>
  </li>

  <li
    className={`flex flex-col items-start space-y-1 p-3 cursor-pointer transition-all duration-300 rounded-lg hover:bg-blue-50 ${
      activeTab === 'Notification' ? 'text-blue-600 font-bold bg-blue-100 shadow-sm' : 'text-gray-600'
    }`}
    onClick={() => handleTabClick('Notification')}
  >
    <div className="flex items-center space-x-3">
      <FaBell className="text-gray-500" />
      <span className="text-lg">Notification</span>
    </div>
    <p className="text-sm text-gray-500">Set up your notification preferences</p>
  </li>

  <li
    className={`flex flex-col items-start space-y-1 p-3 cursor-pointer transition-all duration-300 rounded-lg hover:bg-blue-50 ${
      activeTab === 'Bill Payment' ? 'text-blue-600 font-bold bg-blue-100 shadow-sm' : 'text-gray-600'
    }`}
    onClick={() => handleTabClick('Bill Payment')}
  >
    <div className="flex items-center space-x-3">
      <FaCreditCard className="text-gray-500" />
      <span className="text-lg">Bill Payment</span>
    </div>
    <p className="text-sm text-gray-500">View and manage bill payments</p>
  </li>

  <li
    className={`flex flex-col items-start space-y-1 p-3 cursor-pointer transition-all duration-300 rounded-lg hover:bg-blue-50 ${
      activeTab === 'Payment Access' ? 'text-blue-600 font-bold bg-blue-100 shadow-sm' : 'text-gray-600'
    }`}
    onClick={() => handleTabClick('Payment Access')}
  >
    <div className="flex items-center space-x-3">
      <FaKey className="text-gray-500" />
      <span className="text-lg">Payment Access</span>
    </div>
    <p className="text-sm text-gray-500">Manage payment access and permissions</p>
  </li>

  <li
    className={`flex flex-col items-start space-y-1 p-3 cursor-pointer transition-all duration-300 rounded-lg hover:bg-blue-50 ${
      activeTab === 'Language' ? 'text-blue-600 font-bold bg-blue-100 shadow-sm' : 'text-gray-600'
    }`}
    onClick={() => handleTabClick('Language')}
  >
    <div className="flex items-center space-x-3">
      <FaLanguage className="text-gray-500" />
      <span className="text-lg">Language</span>
    </div>
    <p className="text-sm text-gray-500">Change the language settings</p>
  </li>

  <li
    className={`flex flex-col items-start space-y-1 p-3 cursor-pointer transition-all duration-300 rounded-lg hover:bg-blue-50 ${
      activeTab === 'Change Password' ? 'text-blue-600 font-bold bg-blue-100 shadow-sm' : 'text-gray-600'
    }`}
    onClick={() => handleTabClick('Change Password')}
  >
    <div className="flex items-center space-x-3">
      <FaKey className="text-gray-500" />
      <span className="text-lg">Change Password</span>
    </div>
    <p className="text-sm text-gray-500">Update your password</p>
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
