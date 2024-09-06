// TopBar.tsx
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

const TopBar = ({ searchQuery, handleSearch, toggleTheme, theme, exportData }: TopBarProps) => (
  <div className="flex justify-between items-center mb-8">
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

      {/* User Profile */}
      <div className="flex items-center space-x-3">
        <img
          src="https://i.pinimg.com/236x/07/33/ba/0733ba760b29378474dea0fdbcb97107.jpg"
          alt="User Avatar"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className="font-semibold">Hello John</p>
          <p className="text-sm text-gray-500">28 Jun</p>
        </div>
      </div>
    </div>
  </div>
);

export default TopBar;
