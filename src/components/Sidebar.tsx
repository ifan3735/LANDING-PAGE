import React from 'react';
import { FaCar, FaCog, FaSignOutAlt, FaList, FaMapMarkerAlt, FaCalendarAlt, FaDollarSign, FaUserCircle } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-76 h-full bg-white-600 text-gray flex flex-col">
      <div className="p-6 flex items-center justify-between">
        <span className="text-2xl font-bold">Lurex</span>
        <FaUserCircle className="text-3xl" />
      </div>
      
      <div className="px-6 py-4 flex items-center space-x-4 bg-yellow-500 rounded-md mx-4 mb-6">
        <FaUserCircle className="text-4xl" />
        <div>
          <p className="font-semibold">John Stevens</p>
          <p className="text-sm text-yellow-200">User</p>
        </div>
      </div>
      
      <ul className="flex-1 space-y-2 px-4">
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center p-4 rounded-md ${
                isActive ? 'bg-yellow-500' : 'hover:bg-yellow-500'
              }`
            }
          >
            <FaCar className="mr-3" /> Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/listings"
            className={({ isActive }) =>
              `flex items-center p-4 rounded-md ${
                isActive ? 'bg-yellow-500' : 'hover:bg-yellow-500'
              }`
            }
          >
            <FaList className="mr-3" /> Listings
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/tracking"
            className={({ isActive }) =>
              `flex items-center p-4 rounded-md ${
                isActive ? 'bg-yellow-500' : 'hover:bg-yellow-500'
              }`
            }
          >
            <FaMapMarkerAlt className="mr-3" /> Tracking
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/bids"
            className={({ isActive }) =>
              `flex items-center p-4 rounded-md ${
                isActive ? 'bg-yellow-500' : 'hover:bg-yellow-500'
              }`
            }
          >
            <FaDollarSign className="mr-3" /> Bids
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/calendar"
            className={({ isActive }) =>
              `flex items-center p-4 rounded-md ${
                isActive ? 'bg-yellow-500' : 'hover:bg-yellow-500'
              }`
            }
          >
            <FaCalendarAlt className="mr-3" /> Calendar
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/transactions"
            className={({ isActive }) =>
              `flex items-center p-4 rounded-md ${
                isActive ? 'bg-yellow-500' : 'hover:bg-yellow-500'
              }`
            }
          >
            <FaDollarSign className="mr-3" /> Transactions
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center p-4 rounded-md ${
                isActive ? 'bg-yellow-500' : 'hover:bg-yellow-500'
              }`
            }
          >
            <FaCog className="mr-3" /> Settings
          </NavLink>
        </li>
      </ul>

      <div className="p-4 hover:bg-yellow-500 rounded-md mx-4 mb-6">
        <NavLink to="/logout" className="flex items-center">
          <FaSignOutAlt className="mr-3" /> Logout
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
