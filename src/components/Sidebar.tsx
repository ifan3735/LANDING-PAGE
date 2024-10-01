import { FaCar, FaCog, FaList, FaMapMarkerAlt, FaCalendarAlt, FaDollarSign, FaUserCircle, FaChartBar, FaSearch, FaHeadset } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-76 h-full bg-white text-gray-700 flex flex-col overflow-y-auto">
      <div className="p-6 flex items-center">
        <span className="text-2xl font-bold text-blue-700">CarEmpire</span>
      </div>

      <ul className="flex-1 space-y-2 px-4">
        <h2 className="text-gray-500 text-xs font-semibold mb-2">Menu</h2>
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center p-3 rounded-md ${
                isActive ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
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
              `flex items-center p-3 rounded-md ${
                isActive ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
              }`
            }
          >
            <FaList className="mr-3" /> Listing
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/calendar"
            className={({ isActive }) =>
              `flex items-center p-3 rounded-md ${
                isActive ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
              }`
            }
          >
            <FaCalendarAlt className="mr-3" /> Calendar
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/deals"
            className={({ isActive }) =>
              `flex items-center p-3 rounded-md ${
                isActive ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
              }`
            }
          >
            <FaDollarSign className="mr-3" /> Deals
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/tracking"
            className={({ isActive }) =>
              `flex items-center p-3 rounded-md ${
                isActive ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
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
              `flex items-center p-3 rounded-md ${
                isActive ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
              }`
            }
          >
            <FaDollarSign className="mr-3" /> Active Bids
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/statistics"
            className={({ isActive }) =>
              `flex items-center p-3 rounded-md ${
                isActive ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
              }`
            }
          >
            <FaChartBar className="mr-3" /> Statistics
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/transactions"
            className={({ isActive }) =>
              `flex items-center p-3 rounded-md ${
                isActive ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
              }`
            }
          >
            <FaDollarSign className="mr-3" /> Transaction
          </NavLink>
        </li>
      </ul>

      <div className="border-t border-gray-300 my-4 mx-4"></div>

      <ul className="flex-1 space-y-2 px-4">
        <h2 className="text-gray-500 text-xs font-semibold mb-2">Other Menu</h2>
        <li>
          <NavLink
            to="/search"
            className={({ isActive }) =>
              `flex items-center p-3 rounded-md ${
                isActive ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
              }`
            }
          >
            <FaSearch className="mr-3" /> Search
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center p-3 rounded-md ${
                isActive ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
              }`
            }
          >
            <FaCog className="mr-3" /> Settings
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/help-center"
            className={({ isActive }) =>
              `flex items-center p-3 rounded-md ${
                isActive ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
              }`
            }
          >
            <FaHeadset className="mr-3" /> Help Center
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
