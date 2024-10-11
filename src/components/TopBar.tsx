import { useState, useEffect } from 'react';
import { MdOutlineSettings, MdLogout } from 'react-icons/md';
import { FaBell } from 'react-icons/fa';
import { FiChevronDown } from 'react-icons/fi';
import SearchBar from './SearchBar';
import { useFetchUserDetailsQuery } from '../features/API';
interface TopBarProps {
  searchQuery: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  toggleTheme: () => void;
  theme: string;
  exportData: () => void;
}
export type UserRole = 'admin' | 'user';

export interface User {
  id: number;
  name: string;
  email: string;
  contact_phone: string;
  address: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

const TopBar = ({ searchQuery, handleSearch, toggleTheme, theme, exportData }: TopBarProps) => {
  const{ data: users = [], refetch } = useFetchUserDetailsQuery();
  console.log(users);
  const [notifications, setNotifications] = useState([{ id: 1, message: "New car added!" }]); // Example notifications
  const [showNotifications, setShowNotifications] = useState(false);
  const [newNotifications, setNewNotifications] = useState(true); // State to track if there are new notifications
  const [currentDate, setCurrentDate] = useState('');
  const [isOnline, setIsOnline] = useState(navigator.onLine); // Track user's online status
  const [showProfileCard, setShowProfileCard] = useState(false); // Profile hover state



  // Dynamically update the date
  useEffect(() => {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
    setCurrentDate(date.toLocaleDateString(undefined, options));
  }, []);

  // Event listeners to update online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Toggle notifications dropdown and mark as viewed
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    
    // Mark notifications as "viewed" when dropdown is opened
    if (!showNotifications && newNotifications) {
      setNewNotifications(false);
    }
  };

  return (
    <div className="relative">
      {/* Top Bar Container */}
      <div className="flex justify-between items-center mb-8 pb-2 border-b border-gray-300">
        {/* Search Bar */}
        <SearchBar searchQuery={searchQuery} handleSearch={handleSearch} />

        {/* Right Section */}
        <div className="flex items-center space-x-6">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full transition-colors hover:bg-gray-300"
            aria-label="Toggle theme"
          >
            {theme === 'yellow' ? '🌙' : '🌞'}
          </button>

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={toggleNotifications}
              className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full transition-colors relative hover:bg-gray-300"
              aria-label="Notifications"
            >
              <FaBell className="text-gray-700" size={18} />
              {/* Red Dot for New Notifications */}
              {newNotifications && (
                <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-red-600"></span>
              )}
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg p-4 z-10">
                <h3 className="font-semibold text-lg mb-2">Notifications</h3>
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <div key={notification.id} className="mb-2 text-sm text-gray-700">
                      {notification.message}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No new notifications</p>
                )}
              </div>
            )}
          </div>

          {/* User Profile with Hoverable Details */}
          <div
            className="relative flex items-center space-x-3"
            onMouseEnter={() => setShowProfileCard(true)}
            onMouseLeave={() => setShowProfileCard(false)}
            onFocus={() => setShowProfileCard(true)}
            onBlur={() => setShowProfileCard(false)}
          >
            <div className="relative">
              {/* Profile Picture */}
              <img
                src="https://i.pinimg.com/236x/07/33/ba/0733ba760b29378474dea0fdbcb97107.jpg"
                alt="User Avatar"
                className="w-10 h-10 rounded-full"
                tabIndex={0}
                aria-label="User Profile"
              />
              {/* Online Status Dot */}
              {isOnline && (
                <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
              )}
            </div>

            <div>
              <p className="font-semibold">Hello John</p>
              <p className="text-sm text-gray-500">{currentDate}</p>
              <FiChevronDown size={18} />
            </div>

            {/* Profile Card on Hover */}
            {showProfileCard && (
              <div className="absolute top-12 right-0 mt-2 w-80 bg-white bg-opacity-70 backdrop-blur-lg rounded-3xl shadow-2xl p-6 z-20 transition-all duration-500 transform translate-y-4 hover:translate-y-0 hover:shadow-glow">
              {/* Title */}
              <h3 className="font-bold text-xl mb-4 text-gray-800 text-center">User Profile</h3>
            
              {/* User Details */}
              <div className="space-y-2">
                <p className="text-sm text-gray-700 flex items-center justify-between">
                  <strong className="text-gray-900">Name:</strong> ifan
                </p>
                <p className="text-sm text-gray-700 flex items-center justify-between">
                  <strong className="text-gray-900">Email:</strong> ifan@gmail.com
                </p>
                <p className="text-sm text-gray-700 flex items-center justify-between">
                  <strong className="text-gray-900">Account Type:</strong> Premium
                </p>
                <p className="text-sm text-gray-700 flex items-center justify-between">
                  <strong className="text-gray-900">Member Since:</strong> Jan 2021
                </p>
                <p className="text-sm text-gray-700 flex items-center justify-between">
                  <strong className="text-gray-900">Last Login:</strong> 2 hours ago
                </p>
              </div>
            
              {/* Action Buttons */}
              <div className="flex items-center justify-between mt-6 space-x-2">
                {/* Settings Button */}
                <button className="flex items-center space-x-2 bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700 hover:bg-gradient-to-r hover:from-gray-300 hover:to-gray-400 px-4 py-2 rounded-full shadow-sm transition-all duration-300 transform hover:scale-105">
                  <MdOutlineSettings size={20} />
                  <span className="font-semibold">Settings</span>
                </button>
            
                {/* Log Out Button */}
                <button className="flex items-center space-x-2 bg-gradient-to-r from-red-500 to-red-600 text-white hover:bg-gradient-to-r hover:from-red-600 hover:to-red-700 px-4 py-2 rounded-full shadow-sm transition-all duration-300 transform hover:scale-105">
                  <MdLogout size={20} />
                  <span className="font-semibold">Log Out</span>
                </button>
              </div>
            </div>            
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
