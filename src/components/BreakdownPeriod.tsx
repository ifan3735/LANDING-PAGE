import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface ManufacturerData {
  name: string;
  days: number; // Total days of usage for that manufacturer
  color: string; // Unique color for each manufacturer
}

const BreakdownPeriod: React.FC = () => {
  // Sample data for manufacturers
  const manufacturersData: ManufacturerData[] = [
    { name: 'Mercedes', days: 20, color: '#1D4ED8' },
    { name: 'Bentley', days: 15, color: '#14B8A6' },
    { name: 'Lamborghini', days: 10, color: '#F59E0B' },
    { name: 'Porsche', days: 8, color: '#EF4444' },
    { name: 'Maruti Suzuki', days: 5, color: '#10B981' },
  ];

  // Find the maximum days for scaling the progress bars
  const maxDays = Math.max(...manufacturersData.map((m) => m.days));

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Manufacturer Rental Periods</h3>
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

      {/* Circular Progress Bars for each manufacturer */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        {manufacturersData.map((manufacturer, index) => (
          <div key={index} className="relative flex flex-col items-center">
            <div className="w-24 h-24 mb-4">
              <CircularProgressbar
                value={(manufacturer.days / maxDays) * 100} // Calculate the percentage
                strokeWidth={10}
                styles={buildStyles({
                  pathColor: manufacturer.color,
                  trailColor: '#e5e7eb',
                })}
              />
            </div>
            <div className="text-center">
              <h4 className="text-sm font-semibold">{manufacturer.name}</h4>
              <p className="text-gray-500">{manufacturer.days} Days</p>
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-6">
        <h4 className="text-sm font-semibold mb-3">Legend</h4>
        <div className="flex flex-wrap justify-center space-x-4">
          {manufacturersData.map((manufacturer, index) => (
            <div key={index} className="flex items-center space-x-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: manufacturer.color }}
              ></span>
              <span className="text-sm text-gray-600">{manufacturer.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BreakdownPeriod;
