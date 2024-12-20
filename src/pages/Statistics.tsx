import { useState } from 'react';
import { FaChevronDown, FaFileExport } from 'react-icons/fa';
import TopBar from '../components/TopBar';
import { saveAs } from 'file-saver';
import Analytics from '../components/Analytics';
import CarBreakdown from '../components/CarBreakdown';
import CarUsage from '../components/CarUsage';
import BreakdownPeriod from '../components/BreakdownPeriod';
const StatisticsPage = () => {
  const [theme, setTheme] = useState('light');
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleTheme = () => setTheme(theme === 'light' ? 'yellow' : 'light');

  const toggleExportDropdown = () => setShowDropdown(!showDropdown);

  // Search logic
  const handleSearch = (e) => setSearchQuery(e.target.value);

  // Export Logic (PDF, CSV, SVG)
  const exportData = (format: string) => {
    if (format === 'svg') {
      const svgData = '<svg>...</svg>'; // Replace with actual SVG data
      const blob = new Blob([svgData], { type: 'image/svg+xml' });
      saveAs(blob, 'chart.svg');
    } else if (format === 'pdf') {
      const pdfBlob = new Blob(['PDF content'], { type: 'application/pdf' });
      saveAs(pdfBlob, 'chart.pdf');
    } else if (format === 'csv') {
      // Implement CSV export logic (perhaps using a library like `json2csv`)
      console.log('Export as CSV');
    }
  };

  return (
    <div className={`transition-all duration-500 p-6 ${theme === 'yellow' ? 'bg-yellow-100 text-gray-900' : 'bg-gray-100 text-gray-900'} min-h-screen`}>
      <TopBar
        searchQuery={searchQuery}
        handleSearch={handleSearch}
        toggleTheme={toggleTheme}
        theme={theme}
        exportData={() => exportData('pdf')}
      />

      {/* Statistics Section */}
      <div className="flex justify-between items-center my-6">
        {/* Left Section: Header and Paragraph */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Statistics</h2>
          <p className="text-sm text-gray-600">
            Get your latest update for the past 7 days
          </p>
        </div>

        {/* Right Section: Export Button with Dropdown */}
        <div className="relative">
          <button
            onClick={toggleExportDropdown}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center"
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
                  onClick={() => exportData('csv')}
                >
                  Export as CSV
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => exportData('pdf')}
                >
                  Export as PDF
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => exportData('svg')}
                >
                  Export as SVG
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Analytics Report */}
        <Analytics />

        {/* Breakdown Section */}
        <CarBreakdown searchQuery={searchQuery} />

        {/* Car's Used Section */}
        <div className="lg:col-span-2">
          <CarUsage />
        </div>

        {/* Breakdown Period Section */}
        <BreakdownPeriod/>
        </div>
    </div>
  );
};

export default StatisticsPage;
