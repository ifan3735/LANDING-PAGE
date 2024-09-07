import { useState, useEffect } from 'react';
import { MdOutlineSettings } from 'react-icons/md';
import { FaBell } from 'react-icons/fa';
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

  // Dynamically update the date
  useEffect(() => {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' };
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
          {/* Export Button */}
          <button
            onClick={exportData}
            className="bg-yellow-500 hover:bg-yellow-600 transition-colors text-white px-4 py-2 rounded-full shadow-lg"
          >
            Export
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full transition-colors"
          >
            {theme === 'yellow' ? '🌙' : '🌞'}
          </button>

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={toggleNotifications}
              className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full transition-colors relative"
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

          {/* User Profile with Online Status */}
          <div className="relative flex items-center space-x-3">
            <img
              src="https://i.pinimg.com/236x/07/33/ba/0733ba760b29378474dea0fdbcb97107.jpg"
              alt="User Avatar"
              className="w-10 h-10 rounded-full"
            />
            {/* Green dot for online status */}
            {isOnline && (
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
            )}
            <div>
              <p className="font-semibold">Hello John</p>
              <p className="text-sm text-gray-500">{currentDate}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
