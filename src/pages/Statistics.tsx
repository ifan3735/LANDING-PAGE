import React, { useState } from 'react';
import { FaCloudDownloadAlt } from 'react-icons/fa';
import TopBar from '../components/TopBar'; // Assuming this is your custom component
import { saveAs } from 'file-saver'; // You can use file-saver or other export methods

const StatisticsPage = () => {
  const [theme, setTheme] = useState('light');
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false); // For export dropdown

  // Dummy chart and data logic (replace with real implementation)
  const data = [
    { name: 'Mercedes', value: 10 },
    { name: 'Bentley', value: 8 },
    { name: 'Porsche Tayca', value: 12 },
    { name: 'Lamborghini', value: 6 },
  ];

  // Toggle Theme Logic
  const toggleTheme = () => {
    const newTheme =  theme === 'light' ? 'yellow' : 'light';
    setTheme(newTheme);
    document.body.classList.toggle('dark', newTheme === 'light'); // Assuming you have dark mode styles globally
  };

  // Search logic
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    // Implement the search logic here, e.g., filter data based on searchQuery
    console.log('Searching for:', searchQuery);
  };

  // Export Logic
  const exportData = (format) => {
    if (format === 'svg') {
      // Example: Export chart as SVG logic (dummy example, replace with real logic)
      console.log('Exporting as SVG');
      // Here you can convert the chart to SVG and use file-saver to download it
      const svgData = '<svg>...</svg>';
      const blob = new Blob([svgData], { type: 'image/svg+xml' });
      saveAs(blob, 'chart.svg');
    } else if (format === 'pdf') {
      console.log('Exporting as PDF');
      // Example: Export chart as PDF logic (use html2canvas, jsPDF, or similar libraries)
      const pdfBlob = new Blob(['PDF content'], { type: 'application/pdf' });
      saveAs(pdfBlob, 'chart.pdf');
    }
  };

  return (
    <div className={`transition-all duration-500 p-6 ${theme === 'yellow' ? 'bg-yellow-100 text-gray-900' : 'bg-gray-100 text-gray-900'} min-h-screen`}>
      {/* Main Content */}
      <div>
        {/* TopBar */}
        <TopBar
          searchQuery={searchQuery}
          handleSearch={handleSearch}
          toggleTheme={toggleTheme}
          theme={theme}
        />

        {/* Statistics Section */}
        <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Statistics</h2>
          <p className="text-sm text-gray-600">
            Get your latest update for the past 7 days
          </p>
        </div>
          {/* Export Button with Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-full shadow-md flex items-center space-x-2"
            >
              <FaCloudDownloadAlt />
              <span>Export</span>
            </button>
            
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 shadow-md rounded-md">
                <button
                  onClick={() => exportData('svg')}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Export as SVG
                </button>
                <button
                  onClick={() => exportData('pdf')}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Export as PDF
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Analytics Report */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Analytics Report</h3>
            <div className="h-60">
              <div className="flex items-end space-x-3 justify-around h-full">
                {/* Dummy chart bars */}
                <div className="w-12 h-40 bg-blue-500 rounded-md"></div>
                <div className="w-12 h-28 bg-teal-400 rounded-md"></div>
                <div className="w-12 h-20 bg-teal-400 rounded-md"></div>
                <div className="w-12 h-16 bg-teal-400 rounded-md"></div>
                <div className="w-12 h-24 bg-blue-500 rounded-md"></div>
                <div className="w-12 h-32 bg-blue-500 rounded-md"></div>
              </div>
            </div>
          </div>

          {/* Breakdown Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Breakdown</h3>
            <div className="space-y-2">
              {data
                .filter((car) => car.name.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((car, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-gray-800 dark:text-white">{car.name}</span>
                    <span className="font-semibold">{car.value} Car</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
