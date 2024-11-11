import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface ManufacturerData {
  manufacturer: string;
  rentedCount: number;
  issuesReported: number | null;
}

interface BreakdownPeriodProps {
  carData: ManufacturerData[] | undefined; // Allow carData to be undefined initially
}

const BreakdownPeriod: React.FC<BreakdownPeriodProps> = ({ carData }) => {
  if (!carData || carData.length === 0) {
    return <p>No data available.</p>; // Render a fallback message if carData is undefined or empty
  }

  // Assign colors to manufacturers
  const manufacturerColors: Record<string, string> = {
    Mercedes: '#1D4ED8',
    Bentley: '#14B8A6',
    Lamborghini: '#F59E0B',
    Porsche: '#EF4444',
    'Maruti Suzuki': '#10B981',
    // Add colors dynamically as needed
    Ford: '#6B7280',
    porsche: '#EF4444',
    Range_Rover: '#8B5CF6',
    mazda: '#F87171',
  };

  const maxCount = Math.max(...carData.map((m) => m.rentedCount), 1);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-700">Rental Period by Manufacturer</h3>
      </div>

      {/* Circular Progress Bars */}
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {carData.map((data, index) => (
          <div key={index} className="relative flex flex-col items-center">
            <div className="w-24 h-24 mb-4">
              <CircularProgressbar
                value={(data.rentedCount / maxCount) * 100}
                strokeWidth={10}
                styles={buildStyles({
                  pathColor: manufacturerColors[data.manufacturer] || '#888888',
                  trailColor: '#e5e7eb',
                })}
              />
            </div>
            <div className="text-center">
              <h4 className="text-sm font-semibold text-gray-800">{data.manufacturer}</h4>
              <p className="text-gray-500">{data.rentedCount} Rentals</p>
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-8">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Legend</h4>
        <div className="flex flex-wrap justify-center space-x-4">
          {carData.map((data, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor:
                    manufacturerColors[data.manufacturer] || '#888888',
                }}
              ></span>
              <span className="text-sm text-gray-600">{data.manufacturer}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BreakdownPeriod;
