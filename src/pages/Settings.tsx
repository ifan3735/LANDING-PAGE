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
          placeholder="Smith"
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
          placeholder="Hussain"
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
          placeholder="thesmithhussain23@gmail.com"
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
          placeholder="Greenman Kingston 1478"
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
          placeholder="Dollar"
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
          placeholder="Canada Ottawa"
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
          <option>French</option>
          <option>German</option>
          <option>Italian</option>
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
          <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-3xl mx-auto transition-all duration-300">
          {/* Section Header */}
          <h3 className="text-3xl font-extrabold text-gray-900 mb-6">Notification Settings</h3>
          
          {/* Introductory Text */}
          <p className="text-gray-500 mb-10 leading-relaxed">
            Control how you receive notifications for account activity and updates. You can customize notifications for email, SMS, push notifications, and more.
          </p>
        
          {/* Notification Options */}
          <div className="space-y-8">
            
            {/* Email Notifications */}
            <div className="flex justify-between items-center p-6 bg-gradient-to-r from-blue-50 to-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <div>
                <h4 className="text-xl font-semibold text-gray-800">Email Notifications</h4>
                <p className="text-gray-500 mt-1">Receive important updates, offers, and alerts via email.</p>
              </div>
              <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" className="form-checkbox h-7 w-7 text-blue-600 rounded-xl focus:ring-2 focus:ring-blue-400 transition-all duration-200" checked />
              </label>
            </div>
        
            {/* SMS Notifications */}
            <div className="flex justify-between items-center p-6 bg-gradient-to-r from-green-50 to-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <div>
                <h4 className="text-xl font-semibold text-gray-800">SMS Notifications</h4>
                <p className="text-gray-500 mt-1">Get notified instantly for security alerts and critical updates via SMS.</p>
              </div>
              <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" className="form-checkbox h-7 w-7 text-green-600 rounded-xl focus:ring-2 focus:ring-green-400 transition-all duration-200" />
              </label>
            </div>
        
            {/* Push Notifications */}
            <div className="flex justify-between items-center p-6 bg-gradient-to-r from-purple-50 to-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <div>
                <h4 className="text-xl font-semibold text-gray-800">Push Notifications</h4>
                <p className="text-gray-500 mt-1">Enable real-time alerts directly on your mobile device.</p>
              </div>
              <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" className="form-checkbox h-7 w-7 text-purple-600 rounded-xl focus:ring-2 focus:ring-purple-400 transition-all duration-200" />
              </label>
            </div>
        
            {/* In-App Notifications */}
            <div className="flex justify-between items-center p-6 bg-gradient-to-r from-yellow-50 to-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <div>
                <h4 className="text-xl font-semibold text-gray-800">In-App Notifications</h4>
                <p className="text-gray-500 mt-1">Receive activity alerts and updates while you're using the app.</p>
              </div>
              <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" className="form-checkbox h-7 w-7 text-yellow-600 rounded-xl focus:ring-2 focus:ring-yellow-400 transition-all duration-200" checked />
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
        </div>    
        );

      case 'Bill Payment':
        return (
          <div className="bg-gradient-to-r from-white to-blue-50 p-10 rounded-3xl shadow-2xl max-w-4xl mx-auto transition-all duration-300 hover:shadow-3xl hover:scale-[1.02]">
  
          {/* Section Header */}
          <h3 className="text-4xl font-bold text-gray-900 mb-8 text-center tracking-wide">Bill Payment Information</h3>
        
          {/* Introductory Text */}
          <p className="text-gray-600 text-center mb-12 text-lg leading-relaxed">
            Stay up-to-date with your billing. Quickly access and manage your payments, review history, and choose from multiple payment methods with ease.
          </p>
        
          {/* Payment Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
        
            {/* Total Due */}
            <div className="p-6 bg-gradient-to-r from-red-100 to-white rounded-2xl shadow-lg transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
              <h4 className="text-2xl font-semibold text-red-600 mb-3">Total Amount Due</h4>
              <p className="text-gray-800 text-4xl font-extrabold">$1,200.00</p>
              <p className="text-gray-500 mt-2 text-md">Due on: <span className="font-medium">October 20, 2024</span></p>
            </div>
        
            {/* Last Payment */}
            <div className="p-6 bg-gradient-to-r from-green-100 to-white rounded-2xl shadow-lg transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
              <h4 className="text-2xl font-semibold text-green-600 mb-3">Last Payment</h4>
              <p className="text-gray-800 text-4xl font-extrabold">$600.00</p>
              <p className="text-gray-500 mt-2 text-md">Paid on: <span className="font-medium">September 15, 2024</span></p>
            </div>
        
            {/* Payment Method */}
            <div className="p-6 bg-gradient-to-r from-blue-100 to-white rounded-2xl shadow-lg transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
              <h4 className="text-2xl font-semibold text-blue-600 mb-3">Payment Method</h4>
              <p className="text-gray-800 text-lg font-semibold">Credit Card (**** 1234)</p>
              <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-all duration-300">Change</button>
            </div>
          </div>
        
          {/* Payment Form */}
          <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300">
            <h4 className="text-2xl font-semibold text-gray-900 mb-6">Make a Payment</h4>
            
            <div className="space-y-6">
              {/* Amount Input */}
              <div className="flex flex-col">
                <label className="text-lg text-gray-700 mb-2 font-medium">Payment Amount</label>
                <input
                  type="text"
                  placeholder="Enter amount"
                  className="w-full border border-gray-300 p-4 rounded-lg text-lg text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>
        
              {/* Payment Methods */}
              <div className="flex flex-col">
                <label className="text-lg text-gray-700 mb-2 font-medium">Payment Method</label>
                <select className="w-full border border-gray-300 p-4 rounded-lg text-lg text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all">
                  <option>Credit Card (**** 1234)</option>
                  <option>Bank Transfer</option>
                  <option>PayPal</option>
                  <option>Apple Pay</option>
                </select>
              </div>
        
              {/* Pay Now Button */}
              <div>
                <button className="bg-green-600 text-white px-6 py-4 rounded-xl w-full text-2xl font-bold shadow-lg hover:bg-green-700 hover:shadow-xl transition-all duration-300">
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        
          {/* Payment History Section */}
          <div className="mt-16">
            <h4 className="text-3xl font-bold text-gray-900 mb-8 text-center">Payment History</h4>
            <table className="min-w-full bg-white rounded-2xl shadow-lg overflow-hidden">
              <thead className="bg-blue-50">
                <tr>
                  <th className="text-left px-6 py-4 text-gray-600 font-semibold text-lg">Date</th>
                  <th className="text-left px-6 py-4 text-gray-600 font-semibold text-lg">Amount</th>
                  <th className="text-left px-6 py-4 text-gray-600 font-semibold text-lg">Method</th>
                  <th className="text-left px-6 py-4 text-gray-600 font-semibold text-lg">Status</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-lg">
                <tr>
                  <td className="px-6 py-4">September 15, 2024</td>
                  <td className="px-6 py-4">$600.00</td>
                  <td className="px-6 py-4">Credit Card</td>
                  <td className="px-6 py-4 text-green-600">Paid</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4">August 10, 2024</td>
                  <td className="px-6 py-4">$300.00</td>
                  <td className="px-6 py-4">Bank Transfer</td>
                  <td className="px-6 py-4 text-green-600">Paid</td>
                </tr>
                <tr>
                  <td className="px-6 py-4">July 5, 2024</td>
                  <td className="px-6 py-4">$500.00</td>
                  <td className="px-6 py-4">PayPal</td>
                  <td className="px-6 py-4 text-green-600">Paid</td>
                </tr>
              </tbody>
            </table>
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
      case 'Payment Access':
        return (
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-12 rounded-3xl shadow-2xl max-w-5xl mx-auto transition-transform duration-500 hover:scale-105 hover:shadow-3xl">
  
          {/* Section Header */}
          <h3 className="text-4xl font-extrabold text-blue-900 mb-10 text-center tracking-wide leading-tight">Payment Access Management</h3>
        
          {/* Introductory Text */}
          <p className="text-gray-700 text-center mb-12 text-lg leading-relaxed max-w-2xl mx-auto">
            Manage your payment access seamlessly. Control who can view, authorize, or manage payments. Keep track of all access permissions and transaction activities in a secure environment.
          </p>
        
          {/* Payment Access Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        
            {/* Access Payment Dashboard */}
            <div className="p-8 bg-white border-t-4 border-blue-500 rounded-xl shadow-lg transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center space-x-3 mb-4">
                <i className="fas fa-tachometer-alt text-blue-600 text-3xl"></i>
                <h4 className="text-2xl font-semibold text-blue-600">Payment Dashboard</h4>
              </div>
              <p className="text-gray-600 mb-6">Access all your payment options, methods, and transaction history in one place.</p>
              <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition-all duration-300 font-semibold">Access Dashboard</button>
            </div>
        
            {/* Set Up New Payment Method */}
            <div className="p-8 bg-white border-t-4 border-green-500 rounded-xl shadow-lg transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center space-x-3 mb-4">
                <i className="fas fa-credit-card text-green-600 text-3xl"></i>
                <h4 className="text-2xl font-semibold text-green-600">Add Payment Method</h4>
              </div>
              <p className="text-gray-600 mb-6">Easily add and manage new payment methods to your account.</p>
              <button className="w-full bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 transition-all duration-300 font-semibold">Add Method</button>
            </div>
        
            {/* Transaction Authorizations */}
            <div className="p-8 bg-white border-t-4 border-red-500 rounded-xl shadow-lg transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center space-x-3 mb-4">
                <i className="fas fa-lock text-red-600 text-3xl"></i>
                <h4 className="text-2xl font-semibold text-red-600">Authorize Transactions</h4>
              </div>
              <p className="text-gray-600 mb-6">Control and authorize pending transactions with just a click.</p>
              <button className="w-full bg-red-600 text-white px-6 py-3 rounded-lg shadow hover:bg-red-700 transition-all duration-300 font-semibold">Authorize Now</button>
            </div>
          </div>
        
          {/* Payment Permissions Section */}
          <div className="bg-white p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300">
            <h4 className="text-2xl font-semibold text-gray-900 mb-6">Manage Payment Permissions</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Access Level Dropdown */}
              <div>
                <label className="block text-lg text-gray-700 mb-2 font-medium">Payment Access Level</label>
                <select className="w-full border border-gray-300 p-4 rounded-lg text-lg text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all">
                  <option>Full Access</option>
                  <option>View Only</option>
                  <option>Authorize Payments Only</option>
                </select>
              </div>
        
              {/* Add Authorized Users */}
              <div>
                <label className="block text-lg text-gray-700 mb-2 font-medium">Add Authorized Users</label>
                <input
                  type="email"
                  placeholder="Enter user email"
                  className="w-full border border-gray-300 p-4 rounded-lg text-lg text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>
        
              {/* Access Level Description */}
              <div className="col-span-1 md:col-span-2">
                <p className="text-gray-600 text-sm">
                  * Users with "Full Access" can manage all payments and methods, "View Only" allows access to view payments without any changes, and "Authorize Payments Only" grants permission to approve transactions.
                </p>
              </div>
            </div>
        
            <div className="mt-8">
              <button className="w-full bg-blue-600 text-white px-6 py-4 rounded-xl text-xl font-bold shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-300">
                Save Changes
              </button>
            </div>
          </div>
        
          {/* Access History Section */}
          <div className="mt-16">
            <h4 className="text-3xl font-bold text-gray-900 mb-8 text-center">Access History</h4>
            
            <table className="min-w-full bg-white rounded-2xl shadow-lg overflow-hidden">
              <thead className="bg-blue-50 text-left">
                <tr>
                  <th className="px-6 py-4 text-gray-600 font-semibold text-lg">Date</th>
                  <th className="px-6 py-4 text-gray-600 font-semibold text-lg">User</th>
                  <th className="px-6 py-4 text-gray-600 font-semibold text-lg">Access Level</th>
                  <th className="px-6 py-4 text-gray-600 font-semibold text-lg">Status</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-lg">
                <tr>
                  <td className="px-6 py-4">October 5, 2024</td>
                  <td className="px-6 py-4">John Doe (johndoe@gmail.com)</td>
                  <td className="px-6 py-4">Full Access</td>
                  <td className="px-6 py-4 text-green-600">Granted</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4">September 28, 2024</td>
                  <td className="px-6 py-4">Jane Smith (janesmith@gmail.com)</td>
                  <td className="px-6 py-4">View Only</td>
                  <td className="px-6 py-4 text-green-600">Granted</td>
                </tr>
                <tr>
                  <td className="px-6 py-4">September 20, 2024</td>
                  <td className="px-6 py-4">Michael Lee (michael.lee@gmail.com)</td>
                  <td className="px-6 py-4">Authorize Payments</td>
                  <td className="px-6 py-4 text-green-600">Granted</td>
                </tr>
              </tbody>
            </table>
          </div>
        
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
