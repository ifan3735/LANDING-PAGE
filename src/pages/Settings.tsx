import { useState } from "react";
import TopBar from "../components/TopBar";
import { FaChevronDown, FaFileExport, FaCheckCircle } from "react-icons/fa";
import { exportData } from "../utils/ExportData";

const Settings = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [theme, setTheme] = useState("light");
  const [searchQuery, setSearchQuery] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [validAddress, setValidAddress] = useState(false);

  const toggleTheme = () => setTheme(theme === "light" ? "yellow" : "light");

  const handleSearch = (e) => setSearchQuery(e.target.value);

  const toggleExportDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setValidEmail(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)); // Basic email validation
  };

  const handleAddressChange = (e) => {
    const address = e.target.value;
    setValidAddress(address.length > 5); // Basic validation for address
  };

  return (
    <div
      className={`transition-all duration-500 p-6 ${
        theme === "yellow" ? "bg-yellow-100 text-gray-900" : "bg-gray-100 text-gray-900"
      } min-h-screen flex`}
    >
      {/* Sidebar */}
      <aside className="w-64 p-4 bg-white rounded-lg shadow-md">
        <nav>
          <ul className="space-y-4">
            <li className="text-lg font-bold text-blue-500">General</li>
            <li className="text-lg text-gray-700">Account</li>
            <li className="text-lg text-gray-700">Notification</li>
            <li className="text-lg text-gray-700">Bill Payment</li>
            <li className="text-lg text-gray-700">Payment Access</li>
            <li className="text-lg text-gray-700">Language</li>
            <li className="text-lg text-gray-700">Change Password</li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-8">
        {/* TopBar Component */}
        <TopBar
          searchQuery={searchQuery}
          handleSearch={handleSearch}
          toggleTheme={toggleTheme}
          theme={theme}
          exportData={() => exportData([])} // No cars passed as it's just a demo
        />

        {/* Main Header and Export Button */}
        <div className="flex justify-between items-center mt-8 mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Settings</h2>
            <p className="text-sm text-gray-600 mt-1">
              Get your latest updates for the past 7 days
            </p>
          </div>

          {/* Export Button with Dropdown */}
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
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700">
                  Your Email
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  value="thesmithhussain23@gmail.com"
                  onChange={handleEmailChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {validEmail && (
                  <FaCheckCircle className="absolute top-9 right-4 text-green-500" />
                )}
              </div>

              {/* Address */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  placeholder="Address"
                  value="Greenman Kingston 1478"
                  onChange={handleAddressChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {validAddress && (
                  <FaCheckCircle className="absolute top-9 right-4 text-green-500" />
                )}
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
  );
};

export default Settings;
