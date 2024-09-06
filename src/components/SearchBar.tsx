// SearchBar.tsx
import { FaSearch } from 'react-icons/fa';

interface SearchBarProps {
  searchQuery: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar = ({ searchQuery, handleSearch }: SearchBarProps) => (
  <div className="relative w-full md:w-1/3">
    <input
      type="text"
      value={searchQuery}
      onChange={handleSearch}
      placeholder="Type here to search..."
      className="p-3 pl-10 w-full bg-white rounded-full shadow-lg text-gray-700 focus:outline-none"
    />
    <FaSearch className="absolute left-4 top-3 text-gray-400" />
  </div>
);

export default SearchBar;
