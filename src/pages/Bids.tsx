import { useState } from 'react';
import TopBar from '../components/TopBar';
import { exportData } from '../utils/ExportData';
import { FaChevronDown, FaFileExport } from 'react-icons/fa';

const Bids = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [theme, setTheme] = useState('light');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState({
    type: '',
    color: '',
    style: '',
  });

  const cars = [
    { name: 'Audi R8 Green', style: 'Audi', type: 'Auto', color: 'Green', price: '$285,892', imageUrl: 'https://media.istockphoto.com/id/174691804/photo/green-supercar-isolated.jpg?s=612x612&w=0&k=20&c=nh6aondlx41IkaHJRG9Ffp6CYjGBOTIUCPrVC0Mn4l0=' },
    { name: 'Bentley Flying Spur', style: 'Bentley', type: 'Petrol', color: 'Brown', price: '$358,174', imageUrl: 'https://i.pinimg.com/1200x/a5/cb/83/a5cb831ea2e399e2e4ede6eab618a4f0.jpg' },
    { name: 'Lamborghini Aventador', style: 'Lamborghini', type: 'Auto', color: 'Yellow', price: '$420,000', imageUrl: 'https://i.pinimg.com/1200x/66/ee/a9/66eea93dbd62e9d9f65303efe3da1352.jpg' },
    { name: 'Porsche 911 Turbo', style: 'Porsche', type: 'Auto', color: 'Red', price: '$200,000', imageUrl: 'https://i.pinimg.com/1200x/e1/06/07/e1060739e7e16b2f935ec364c77cddcd.jpg' },
    { name: 'BMW M5', style: 'BMW', type: 'Manual', color: 'Blue', price: '$110,000', imageUrl: 'https://i.pinimg.com/1200x/e8/f3/29/e8f329616ed58ee086b10112c8a6d157.jpg' },
    { name: 'Tesla Model S', style: 'Tesla', type: 'Electric', color: 'White', price: '$120,000', imageUrl: 'https://i.pinimg.com/1200x/ba/fa/a9/bafaa9ee834ac42aaf6f08313e930cbe.jpg' },
  ];

  const toggleTheme = () => setTheme(theme === 'light' ? 'yellow' : 'light');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSelectedFilter((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };
  const filteredCars = cars.filter(car => {
    const matchesSearch = car.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedFilter.type ? car.type === selectedFilter.type : true;
    const matchesColor = selectedFilter.color ? car.color === selectedFilter.color : true;
    const matchesStyle = selectedFilter.style ? car.style === selectedFilter.style : true;
    return matchesSearch && matchesType && matchesColor && matchesStyle;
  });
  const toggleFilterDropdown = () => setShowFilterDropdown(!showFilterDropdown);

  const toggleExportDropdown = () => setShowDropdown(!showDropdown);

  

  return (
    <div className={`transition-all duration-500 p-6 ${theme === 'yellow' ? 'bg-yellow-100 text-gray-900' : 'bg-gray-100 text-gray-900'} min-h-screen`}>
      <TopBar
        searchQuery={searchQuery}
        handleSearch={handleSearch}
        toggleTheme={toggleTheme}
        theme={theme}
        exportData={() => exportData(filteredCars)}
      />
      <div className="flex justify-between items-center my-6">
        {/* Left Section: Header and Paragraph */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Active Bids</h2>
          <p className="text-sm text-gray-600">
            Get your latest update for the past 7 days
          </p>
        </div>

        {/* Right Section: Export Button with Dropdown */}
        <div className="relative">
          <button
            onClick={toggleExportDropdown}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center"
          >
            <FaFileExport className="mr-2" /> Export
            <FaChevronDown className="ml-2" />
          </button>

          {/* Export Dropdown */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
              <ul>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => console.log("Export as CSV")}
                >
                  Export as CSV
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => console.log("Export as PDF")}
                >
                  Export as PDF
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      </div>
  );
};

export default Bids;
