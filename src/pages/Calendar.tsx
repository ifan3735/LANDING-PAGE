import { useState } from "react";
import TopBar from "../components/TopBar";
import { FaChevronDown, FaFileExport } from "react-icons/fa";

const Calendar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [theme, setTheme] = useState('light');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    type: '',
    color: '',
    style: '',
  });

  const toggleTheme = () => setTheme(theme === 'light' ? 'yellow' : 'light');
  const toggleExportDropdown = () => setShowDropdown(!showDropdown);
  const toggleFilters = () => setShowFilters(!showFilters);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value);
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <div className={`flex-1 p-6 bg-gray-50 ${theme === 'yellow' ? 'bg-yellow-100 text-gray-900' : 'bg-gray-100 text-gray-900'} min-h-screen`}>
      <TopBar
        searchQuery={searchQuery}
        handleSearch={handleSearch}
        toggleTheme={toggleTheme}
        theme={theme}
        exportData={() => {
          console.log("Data exported");
        }}
      />
      
      <div className="flex justify-between items-center my-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Calendar</h2>
          <p className="text-sm text-gray-600">
            Get your latest update for the past 7 days
          </p>
        </div>

        <div className="relative">
          <button
            onClick={toggleExportDropdown}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center"
          >
            <FaFileExport className="mr-2" /> Export
            <FaChevronDown className="ml-2" />
          </button>

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

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">All Dates</h2>
      </div>

      {/* Calendar View Section */}
      <div className="border rounded-lg overflow-hidden bg-white">
        <div className="grid grid-cols-7 gap-0 border-b">
          {['Sunday 01', 'Monday 02', 'Tuesday 03', 'Wednesday 04', 'Thursday 05', 'Friday 06', 'Saturday 07'].map((day) => (
            <div key={day} className="p-4 text-center border-r last:border-r-0 bg-gray-50">
              <h3 className="text-sm font-medium text-gray-700">{day}</h3>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-0">
          {/* Calendar Slots (simulating rows with flexboxes for each column) */}
          {[
            { title: 'Panamera Car', time: 'Tuesday 7PM-9AM', location: 'Newcastle upon Tyne', day: 0 },
            { title: 'Hyundai Turbo', time: 'Wednesday 8AM-10PM', location: 'Nottingham', day: 1 },
            { title: 'Porsche Tayca', time: 'Tuesday 7PM-9AM', location: 'Newcastle upon Tyne', day: 2 },
            { title: 'Mercedes', time: 'Tuesday 7PM-9AM', location: 'Newcastle upon Tyne', day: 3, warning: true },
            { title: 'Hyundai Turbo', time: 'Wednesday 9AM-11PM', location: 'Southampton', day: 5, warning: true },
            { title: 'Bentley', time: 'Available at request', location: 'Southampton', day: 5 },
          ].map((event, index) => (
            <div key={index} className={`col-span-1 p-2 border-t ${event.day > 0 ? 'border-l' : ''}`}>
              <div
                className={`p-4 rounded-lg shadow-md ${
                  event.warning ? 'bg-red-100 border border-red-500' : 'bg-blue-100 border border-blue-500'
                }`}
              >
                <h3 className="text-lg font-semibold">{event.title}</h3>
                <p className="text-sm">{event.time}</p>
                <p className="text-sm text-gray-600">{event.location}</p>
                {event.warning && (
                  <p className="text-sm text-red-600 font-semibold mt-2">Pick Time is over. Collect soon.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
