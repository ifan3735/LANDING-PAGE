import { FaCar, FaCog, FaSignOutAlt, FaList, FaMapMarkerAlt, FaCalendarAlt, FaDollarSign } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-74 h-screen bg-primary text-white flex flex-col">
      <div className="p-6 font-bold text-2xl">Lurex</div>
      <ul>
        <li className="p-4 hover:bg-accent">
          <NavLink to="/dashboard" className="flex items-center"><FaCar className="inline-block mr-2" /> Dashboard</NavLink>
        </li>
        <li className="p-4 hover:bg-accent">
          <NavLink to="/listings" className="flex items-center"><FaList className="inline-block mr-2" /> Listings</NavLink>
        </li>
        <li className="p-4 hover:bg-accent">
          <NavLink to="/tracking" className="flex items-center"><FaMapMarkerAlt className="inline-block mr-2" /> Tracking</NavLink>
        </li>
        <li className="p-4 hover:bg-accent">
          <NavLink to="/bids" className="flex items-center"><FaDollarSign className="inline-block mr-2" /> Bids</NavLink>
        </li>
        <li className="p-4 hover:bg-accent">
          <NavLink to="/calendar" className="flex items-center"><FaCalendarAlt className="inline-block mr-2" /> Calendar</NavLink>
        </li>
        <li className="p-4 hover:bg-accent">
          <NavLink to="/transactions" className="flex items-center"><FaDollarSign className="inline-block mr-2" /> Transactions</NavLink>
        </li>
        <li className="p-4 hover:bg-accent">
          <NavLink to="/settings" className="flex items-center"><FaCog className="inline-block mr-2" /> Settings</NavLink>
        </li>
      </ul>
      <div className="p-4 mt-auto hover:bg-accent">
        <FaSignOutAlt className="inline-block mr-2" /> Logout
      </div>
    </div>
  );
};

export default Sidebar;
