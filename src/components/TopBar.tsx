import { useState, useEffect } from 'react';
import { MdOutlineSettings, MdLogout } from 'react-icons/md';
import { FaBell } from 'react-icons/fa';
import { FiChevronDown } from 'react-icons/fi';
import SearchBar from './SearchBar';

interface TopBarProps {
  searchQuery: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  toggleTheme: () => void;
  theme: string;
  exportData: () => void;
}

const TopBar = ({ searchQuery, handleSearch, toggleTheme, theme, exportData }: TopBarProps) => {
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
              <div className="absolute top-12 right-0 mt-2 w-80 bg-white rounded-lg shadow-lg p-4 z-20 transition-transform duration-300 transform translate-y-2">
                <h3 className="font-semibold text-lg mb-2">User Profile</h3>
                <p className="text-sm text-gray-700 mb-1"><strong>Name:</strong> John Doe</p>
                <p className="text-sm text-gray-700 mb-1"><strong>Email:</strong> john@example.com</p>
                <p className="text-sm text-gray-700 mb-1"><strong>Account Type:</strong> Premium</p>
                <p className="text-sm text-gray-700 mb-1"><strong>Member Since:</strong> Jan 2021</p>
                <p className="text-sm text-gray-700 mb-1"><strong>Last Login:</strong> 2 hours ago</p>
                
                <div className="flex items-center justify-between mt-4">
                  <button className="flex items-center space-x-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-full">
                    <MdOutlineSettings size={20} />
                    <span>Settings</span>
                  </button>
                  <button className="flex items-center space-x-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-full">
                    <MdLogout size={20} />
                    <span>Log Out</span>
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
