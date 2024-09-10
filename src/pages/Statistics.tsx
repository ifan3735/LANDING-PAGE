import React from 'react';
import { FaCloudDownloadAlt } from 'react-icons/fa';
import TopBar from '../components/TopBar';

interface StatisticsPageProps {
  searchQuery: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  toggleTheme: () => void;
  theme: string;
  exportData: () => void;
}

const StatisticsPage = ({ searchQuery, handleSearch, toggleTheme, theme, exportData }: StatisticsPageProps) => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* TopBar */}
        <TopBar
          searchQuery={searchQuery}
          handleSearch={handleSearch}
          toggleTheme={toggleTheme}
          theme={theme}
          exportData={exportData}
        />

        {/* Statistics Section */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-800">Statistics</h2>
          <button
            onClick={exportData}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-full shadow-md flex items-center space-x-2"
          >
            <FaCloudDownloadAlt />
            <span>Export</span>
          </button>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Analytics Report (Bar Chart) */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Analytics Report</h3>
            {/* Bar Chart */}
            <div className="h-60">
              {/* Replace this with actual chart logic like Chart.js or Recharts */}
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

          {/* Number of Breakdown */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Number of Breakdown</h3>
            <div className="space-y-2">
              {['Mercedes', 'Bentley', 'Lamborghini', 'Porsche', 'Maruti Suzuki'].map((car, index) => (
                <div key={index} className="flex justify-between">
                  <span>{car}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600">20/10</span>
                    <span className="font-semibold">{index * 2 + 10} Car</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Car's Used Section */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Car's Used</h3>
            <div className="space-y-4">
              {['Mercedes', 'Bentley', 'Porsche Tayca', 'Lamborghini'].map((car, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span>{car}</span>
                    <span className="text-gray-600">9 hours</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className={`bg-${index % 2 === 0 ? 'blue' : 'teal'}-400 h-2.5 rounded-full`}
                      style={{ width: `${(index + 1) * 25}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Breakdown Period */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Breakdown Period</h3>
            <div className="flex flex-col items-center">
              {/* Circle Diagram (can be a chart library or simple HTML) */}
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
      </div>
    </div>
  );
};

export default StatisticsPage;
