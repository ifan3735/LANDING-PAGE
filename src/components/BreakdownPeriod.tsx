import React from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface ManufacturerData {
  manufacturer: string;
  rentedCount: number;
  issuesReported: number | null;
}

interface BreakdownPeriodProps {
  carData: ManufacturerData[] | undefined;
}

const BreakdownPeriod: React.FC<BreakdownPeriodProps> = ({ carData }) => {
  if (!carData || carData.length === 0) {
    return <p>No data available.</p>;
  }

  // Colors associated with each manufacturer
  const manufacturerColors: Record<string, string> = {
    Mercedes: '#1D4ED8',
    Bentley: '#14B8A6',
    Lamborghini: '#F59E0B',
    Porsche: '#EF4444',
    'Maruti Suzuki': '#10B981',
  };

  const totalRentals = carData.reduce((sum, data) => sum + data.rentedCount, 0); // Total rented cars

  const calculatePercentage = (count: number) => (count / totalRentals) * 100;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-700">Rental Distribution by Manufacturer</h3>
      </div>

      {/* Single circular progress ring */}
      <div className="relative flex justify-center items-center mb-6">
        <div className="w-40 h-40">
          <CircularProgressbarWithChildren
            value={100} // Always 100 for full circle
            strokeWidth={20}
            styles={buildStyles({
              pathColor: '#e5e7eb', // Background path color (grey)
              trailColor: '#e5e7eb',
            })}
          >
            {carData.map((data, index) => {
              const percentage = calculatePercentage(data.rentedCount);
              const angle = (percentage / 100) * 360; // Convert percentage to angle for the slice
              return (
                <div
                  key={index}
                  className="absolute"
                  style={{
                    clipPath: `polygon(50% 50%, 50% 0%, 50% ${angle}%, 50% 50%)`,
                    backgroundColor: manufacturerColors[data.manufacturer] || '#888888',
                    borderRadius: '50%',
                    width: '100%',
                    height: '100%',
                    transform: `rotate(${index * (360 / carData.length)}deg)`,
                  }}
                >
                  {/* Each slice will be styled using the data */}
                </div>
              );
            })}
          </CircularProgressbarWithChildren>
        </div>
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
                  backgroundColor: manufacturerColors[data.manufacturer] || '#888888',
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
