import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const BreakdownPeriod: React.FC = () => {
  const totalPeriodDays = 15;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Breakdown Period</h3>
        <button className="text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 8a2 2 0 11-4 0 2 2 0 014 0zm-4 2a2 2 0 110 4 2 2 0 010-4zM4 8a2 2 0 11-4 0 2 2 0 014 0zm0 2a2 2 0 100 4 2 2 0 000-4z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* Circular Progress Bars */}
      <div className="relative flex justify-center items-center mb-6">
        <div className="w-36 h-36 absolute">
          <CircularProgressbar
            value={66} // Percentage for the first arc
            strokeWidth={10}
            styles={buildStyles({
              pathColor: '#1D4ED8', // Blue arc
              trailColor: 'transparent',
            })}
          />
        </div>
        <div className="w-36 h-36">
          <CircularProgressbar
            value={33} // Percentage for the second arc
            strokeWidth={10}
            styles={buildStyles({
              pathColor: '#14B8A6', // Teal arc
              trailColor: 'transparent',
              rotation: 0.25, // For starting the arc position
            })}
          />
        </div>

        {/* Inner Circle with Total Period */}
        <div className="absolute flex flex-col justify-center items-center">
          <span className="text-lg font-bold">Total Period</span>
          <span className="text-gray-500">{totalPeriodDays} Days</span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center space-x-6">
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 bg-blue-600 rounded-full"></span>
          <span className="text-sm text-gray-600">20/30 Days</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 bg-teal-400 rounded-full"></span>
          <span className="text-sm text-gray-600">114 Weeks</span>
        </div>
      </div>
    </div>
  );
};

export default BreakdownPeriod;
