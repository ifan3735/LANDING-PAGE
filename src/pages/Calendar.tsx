import { useState } from "react";
import TopBar from "../components/TopBar";
import { FaChevronDown, FaFileExport, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Tooltip } from 'react-tooltip';

const Calendar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [theme, setTheme] = useState('light');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentWeek, setCurrentWeek] = useState(0);
  const [selectedFilters, setSelectedFilters] = useState({
    type: '',
    color: '',
    style: '',
  });

  const toggleTheme = () => setTheme(theme === 'light' ? 'yellow' : 'light');
  const toggleExportDropdown = () => setShowDropdown(!showDropdown);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value);
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Sample event data for dynamic rendering
  const events = [
    { id: 1, title: 'Panamera Car', time: 'Tuesday 7PM-9AM', location: 'Newcastle upon Tyne', day: 0, type: 'car' },
    { id: 2, title: 'Hyundai Turbo', time: 'Wednesday 8AM-10PM', location: 'Nottingham', day: 1, type: 'car' },
    { id: 3, title: 'Porsche Tayca', time: 'Tuesday 7PM-9AM', location: 'Newcastle upon Tyne', day: 2, type: 'urgent' },
    { id: 4, title: 'Mercedes', time: 'Tuesday 7PM-9AM', location: 'Newcastle upon Tyne', day: 3, type: 'urgent' },
    { id: 5, title: 'Hyundai Turbo', time: 'Wednesday 9AM-11PM', location: 'Southampton', day: 5, type: 'urgent' },
    { id: 6, title: 'Bentley', time: 'Available at request', location: 'Southampton', day: 6, type: 'request' },
  ];

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDates = daysOfWeek.map((day, index) => `${day} 0${currentWeek * 7 + index + 1}`);

  const nextWeek = () => setCurrentWeek((prevWeek) => prevWeek + 1);
  const prevWeek = () => setCurrentWeek((prevWeek) => (prevWeek > 0 ? prevWeek - 1 : 0));

  return (
    <div className={`flex-1 p-6 ${theme === 'yellow' ? 'bg-yellow-100 text-gray-900' : 'bg-gray-100 text-gray-900'} min-h-screen`}>
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
        <div className="flex items-center">
          <button onClick={prevWeek} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600">
            <FaChevronLeft />
          </button>
          <h2 className="text-xl font-semibold mx-4">All Dates</h2>
          <button onClick={nextWeek} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600">
            <FaChevronRight />
          </button>
        </div>
      </div>

      {/* Calendar View Section */}
      <div className="border rounded-lg overflow-hidden bg-white">
        <div className="grid grid-cols-7 gap-0 border-b">
          {currentDates.map((day, index) => (
            <div key={index} className="p-4 text-center border-r last:border-r-0 bg-gray-50">
              <h3 className="text-sm font-medium text-gray-700">{day}</h3>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-0">
          {/* Calendar Slots */}
          {Array(7).fill(null).map((_, dayIndex) => (
            <div key={dayIndex} className={`col-span-1 p-2 border-t ${dayIndex > 0 ? 'border-l' : ''}`}>
              {events.filter(event => event.day === dayIndex).map(event => (
                <div
                  key={event.id}
                  className={`p-4 rounded-lg shadow-md mb-4 transition-transform transform hover:scale-105 cursor-pointer ${
                    event.type === 'urgent' ? 'bg-red-100 border border-red-500' : 
                    event.type === 'car' ? 'bg-blue-100 border border-blue-500' : 
                    'bg-yellow-100 border border-yellow-500'
                  }`}
                  data-tip={`${event.title} - ${event.time} - ${event.location}`}
                >
                  <h3 className="text-lg font-semibold">{event.title}</h3>
                  <p className="text-sm">{event.time}</p>
                  <p className="text-sm text-gray-600">{event.location}</p>
                  {event.type === 'urgent' && (
                    <span className="text-xs font-semibold text-red-600">Pick Time is over. Collect soon.</span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <Tooltip place="top" type="dark" effect="float" />
    </div>
  );
};

export default Calendar;
