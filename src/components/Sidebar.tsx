import { FaCar, FaCog, FaSignOutAlt, FaList, FaMapMarkerAlt, FaCalendarAlt, FaDollarSign, FaUserCircle } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-76 h-screen bg-yellow-600 text-white flex flex-col">
      {/* Sidebar Header */}
      <div className="p-6 flex items-center justify-between">
        <span className="text-2xl font-bold">Lurex</span>
        <FaUserCircle className="text-3xl" />
      </div>
      
      {/* User Profile */}
      <div className="px-6 py-4 flex items-center space-x-4 bg-yellow-700 rounded-md mx-4 mb-6">
        <FaUserCircle className="text-4xl" />
        <div>
          <p className="font-semibold">John Doe</p>
          <p className="text-sm text-yellow-200">User</p>
        </div>
      </div>
      
      {/* Navigation */}
      <ul className="flex-1 space-y-2 px-4">
        <li>
          <NavLink to="/dashboard" className="flex items-center p-4 hover:bg-yellow-500 rounded-md">
            <FaCar className="mr-3" /> Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/listings" className="flex items-center p-4 hover:bg-yellow-500 rounded-md">
            <FaList className="mr-3" /> Listings
          </NavLink>
        </li>
        <li>
          <NavLink to="/tracking" className="flex items-center p-4 hover:bg-yellow-500 rounded-md">
            <FaMapMarkerAlt className="mr-3" /> Tracking
          </NavLink>
        </li>
        <li>
          <NavLink to="/bids" className="flex items-center p-4 hover:bg-yellow-500 rounded-md">
            <FaDollarSign className="mr-3" /> Bids
          </NavLink>
        </li>
        <li>
          <NavLink to="/calendar" className="flex items-center p-4 hover:bg-yellow-500 rounded-md">
            <FaCalendarAlt className="mr-3" /> Calendar
          </NavLink>
        </li>
        <li>
          <NavLink to="/transactions" className="flex items-center p-4 hover:bg-yellow-500 rounded-md">
            <FaDollarSign className="mr-3" /> Transactions
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings" className="flex items-center p-4 hover:bg-yellow-500 rounded-md">
            <FaCog className="mr-3" /> Settings
          </NavLink>
        </li>
      </ul>

      {/* Logout Section */}
      <div className="p-4 hover:bg-yellow-500 rounded-md mx-4 mb-6">
        <NavLink to="/logout" className="flex items-center">
          <FaSignOutAlt className="mr-3" /> Logout
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
