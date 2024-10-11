import { useState, useEffect } from 'react';
import { MdOutlineSettings, MdLogout } from 'react-icons/md';
import { FaBell } from 'react-icons/fa';
import { FiChevronDown } from 'react-icons/fi';
import SearchBar from './SearchBar';
import { useFetchUserDetailsQuery } from '../features/API';
import { useNavigate } from 'react-router';

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
  contact_phone: string; // Use correct casing based on API response
  address: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

const TopBar = ({ searchQuery, handleSearch, toggleTheme, theme, exportData }: TopBarProps) => {
  const navigate = useNavigate();
  const userId = parseInt(localStorage.getItem('userId') || '10'); // Retrieve user ID from localStorage
  const { data: user, error, isLoading } = useFetchUserDetailsQuery(userId); // Fetch user details
  console.log('User:', user);
  const [notifications, setNotifications] = useState([{ id: 1, message: "New car added!" }]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [newNotifications, setNewNotifications] = useState(true);
  const [currentDate, setCurrentDate] = useState('');
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
const [showToast, setShowToast] = useState(false);


  const handleLogOut = () => {
    localStorage.removeItem('userId');
    setToastMessage('Logged out'); // Set the toast message
  setShowToast(true); // Show the toast

  setTimeout(() => {
    setShowToast(false); // Hide the toast after 5 seconds
  }, 5000);
    navigate('/login');
  }

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

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications && newNotifications) {
      setNewNotifications(false);
    }
  };

  if (isLoading) return <div>Loading user details...</div>; // Loading state
  if (error) {
    console.error('Error fetching user details:', error);
    return <div>Error loading user details</div>; // Error handling
  }

  return (
    <div className="relative">
{/* Toast Notification */}
{showToast && (
        <div className="fixed bottom-5 right-5 bg-gray-800 text-white p-4 rounded-lg shadow-lg transition-opacity duration-300 opacity-100">
          {toastMessage}
        </div>
      )}      <div className="flex justify-between items-center mb-8 pb-2 border-b border-gray-300">
        <SearchBar searchQuery={searchQuery} handleSearch={handleSearch} />
        <div className="flex items-center space-x-6">
          <button onClick={toggleTheme} className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full transition-colors hover:bg-gray-300" aria-label="Toggle theme">
            {theme === 'yellow' ? '🌙' : '🌞'}
          </button>

          <div className="relative">
            <button onClick={toggleNotifications} className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full transition-colors relative hover:bg-gray-300" aria-label="Notifications">
              <FaBell className="text-gray-700" size={18} />
              {newNotifications && <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-red-600"></span>}
            </button>
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg p-4 z-10">
                <h3 className="font-semibold text-lg mb-2">Notifications</h3>
                {notifications.length > 0 ? notifications.map((notification) => (
                  <div key={notification.id} className="mb-2 text-sm text-gray-700">{notification.message}</div>
                )) : (
                  <p className="text-sm text-gray-500">No new notifications</p>
                )}
              </div>
            )}
          </div>

          <div className="relative flex items-center space-x-3" onMouseEnter={() => setShowProfileCard(true)} onMouseLeave={() => setShowProfileCard(false)}>
            <div className="relative">
              <img src="https://i.pinimg.com/236x/07/33/ba/0733ba760b29378474dea0fdbcb97107.jpg" alt="User Avatar" className="w-10 h-10 rounded-full" />
              {isOnline && <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>}
            </div>

            <div>
              <p className="font-semibold">Hello {user.name}</p>
              <p className="text-sm text-gray-500">{currentDate}</p>
              <FiChevronDown size={18} />
            </div>

            {showProfileCard && (
              <div className="absolute top-12 right-0 mt-2 w-80 bg-white bg-opacity-70 backdrop-blur-lg rounded-3xl shadow-2xl p-6 z-20 transition-all duration-500 transform translate-y-4 hover:translate-y-0 hover:shadow-glow">
                <h3 className="font-bold text-xl mb-4 text-gray-800 text-center">User Profile</h3>
                <div className="space-y-2">
                  <p className="text-sm text-gray-700 flex items-center justify-between">
                    <strong className="text-gray-900">Name:</strong> {user.name}
                  </p>
                  <p className="text-sm text-gray-700 flex items-center justify-between">
                    <strong className="text-gray-900">Email:</strong> {user.email}
                  </p>
                  <p className="text-sm text-gray-700 flex items-center justify-between">
                    <strong className="text-gray-900">Account Type:</strong> {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </p>
                  <p className="text-sm text-gray-700 flex items-center justify-between">
                    <strong className="text-gray-900">Member Since:</strong> {new Date(user.created_at).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-700 flex items-center justify-between">
                    <strong className="text-gray-900">Last Login:</strong> {currentDate}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-6 space-x-2">
                  <button className="flex items-center space-x-2 bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700 hover:bg-gradient-to-r hover:from-gray-300 hover:to-gray-400 px-4 py-2 rounded-full shadow-sm transition-all duration-300 transform hover:scale-105">
                    <MdOutlineSettings size={20} />
                    <span className="font-semibold">Settings</span>
                  </button>
                  <button className="flex items-center space-x-2 bg-gradient-to-r from-red-500 to-red-600 text-white hover:bg-gradient-to-r hover:from-red-600 hover:to-red-700 px-4 py-2 rounded-full shadow-sm transition-all duration-300 transform hover:scale-105"
                   onClick={handleLogOut}
                   >
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
