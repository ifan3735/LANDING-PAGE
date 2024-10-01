import React, { useState } from 'react';
import { FaChevronDown, FaFileExport } from 'react-icons/fa';

interface PageHeaderProps {
  toggleExportDropdown: () => void;
  showDropdown: boolean;
}

const PageHeader: React.FC<PageHeaderProps> = ({ toggleExportDropdown, showDropdown }) => {
  return (
    <div className="flex justify-between items-center my-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Tracking</h2>
        <p className="text-sm text-gray-600">Get your latest update for the past 7 days</p>
      </div>

      {/* Export Button with Dropdown */}
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
  );
};

export default PageHeader;
