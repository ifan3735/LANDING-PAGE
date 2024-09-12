import  { useState } from 'react';
import { FaChevronDown, FaFileExport } from 'react-icons/fa';
import TopBar from '../components/TopBar';
import { saveAs } from 'file-saver';

const StatisticsPage = () => {
  const [theme, setTheme] = useState('light');
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleTheme = () => setTheme(theme === 'light' ? 'yellow' : 'light');

  const toggleExportDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const data = [
    { name: 'Mercedes', breakdown: '20/10', value: 10 },
    { name: 'Bentley', breakdown: '14/09', value: 14 },
    { name: 'Lamborghini', breakdown: '11/20', value: 13 },
    { name: 'Porsche', breakdown: '01/24', value: 24 },
    { name: 'Maruti Suzuki', breakdown: '12/18', value: 31 },
  ];

  const carUsageData = [
    { name: 'Mercedes', hours: 9, color: 'bg-blue-500' },
    { name: 'Bentley', hours: 7, color: 'bg-teal-500' },
    { name: 'Porsche Tayca', hours: 6, color: 'bg-yellow-500' },
    { name: 'Lamborghini', hours: 4, color: 'bg-green-500' },
  ];

  // Search logic
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Export Logic
  const exportData = (format: string) => {
    if (format === 'svg') {
      const svgData = '<svg>...</svg>';
      const blob = new Blob([svgData], { type: 'image/svg+xml' });
      saveAs(blob, 'chart.svg');
    } else if (format === 'pdf') {
      const pdfBlob = new Blob(['PDF content'], { type: 'application/pdf' });
      saveAs(pdfBlob, 'chart.pdf');
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
      {/* New Layer Below Top Bar */}
      <div className="flex justify-between items-center my-6">
        {/* Left Section: Header and Paragraph */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
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

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Analytics Report */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Analytics Report</h3>
            <div className="text-sm space-x-4">
              <span className="text-blue-500">.Spent</span>
              <span className="text-teal-500">.Got Back</span>
              <select className="ml-4 border rounded p-1">
                <option value="monthly">Monthly</option>
                <option value="weekly">Weekly</option>
              </select>
            </div>
          </div>
          <div className="h-60">
            <div className="flex items-end space-x-3 justify-around h-full">
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
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Number of Breakdown</h3>
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="border-b pb-2">Car Name</th>
                <th className="border-b pb-2">Breakdown</th>
                <th className="border-b pb-2">Broken Cars</th>
              </tr>
            </thead>
            <tbody>
              {data
                .filter((car) => car.name.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((car, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2">{car.name}</td>
                    <td>{car.breakdown}</td>
                    <td>{car.value} Cars</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Car's Used Section */}
      <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6 mt-6">
        <h3 className="text-lg font-semibold mb-4">Car's Used</h3>
        <div className="space-y-4">
          {carUsageData.map((car, index) => (
            <div key={index}>
              <div className="flex justify-between mb-2">
                <span>{car.name}</span>
                <span className="text-gray-600">{car.hours} hours</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className={`${car.color} h-2.5 rounded-full`}
                  style={{ width: `${(car.hours / 9) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Breakdown Period Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mt-6">
        <h3 className="text-lg font-semibold mb-4">Breakdown Period</h3>
        <div className="flex flex-col items-center">
          <div className="relative w-40 h-40 mb-4">
            <svg className="w-full h-full">
              <circle
                className="text-gray-200"
                strokeWidth="10"
                stroke="currentColor"
                fill="transparent"
                r="60"
                cx="80"
                cy="80"
              />
              <circle
                className="text-blue-500"
                strokeWidth="10"
                strokeDasharray="180, 360"
                strokeLinecap="round"
                fill="transparent"
                r="60"
                cx="80"
                cy="80"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold">15 Days</span>
              <span className="text-gray-500">Total Period</span>
            </div>
          </div>
          <div className="flex justify-around w-full text-sm">
            <div className="flex items-center space-x-2">
              <span className="block w-4 h-4 bg-blue-500 rounded-full"></span>
              <span>20/30 Days</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="block w-4 h-4 bg-teal-400 rounded-full"></span>
              <span>114 Weeks</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
