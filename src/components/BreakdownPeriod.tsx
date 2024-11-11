import React, { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useFetchAllBookingsQuery } from '../features/API';

export interface ManufacturerData {
  manufacturer: string;
  rentedCount: number;
  issuesReported: number | null;
}

export interface BreakdownPeriodProps {
  // No need for carData as it will be fetched here
}

const BreakdownPeriod: React.FC<BreakdownPeriodProps> = () => {
  const { data: bookingsData, error, isLoading } = useFetchAllBookingsQuery();
  const [carData, setCarData] = useState<ManufacturerData[]>([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (bookingsData && userId) {
      // Filter bookings based on userId and aggregate by manufacturer
      const aggregatedData: Record<string, ManufacturerData> = {};

      bookingsData
        .filter((booking) => booking.user_id == userId)
        .forEach((booking) => {
          const manufacturer = booking.vehicle.vehicle_specs.manufacturer;

          if (!aggregatedData[manufacturer]) {
            aggregatedData[manufacturer] = {
              manufacturer,
              rentedCount: 0,
              issuesReported: 0,
            };
          }

          // Increase rented count
          aggregatedData[manufacturer].rentedCount += 1;

          // Count issues
          if (booking.vehicle.has_issues) {
            aggregatedData[manufacturer].issuesReported += 1;
          }
        });

      // Convert the aggregated data into an array
      setCarData(Object.values(aggregatedData));
    }
  }, [bookingsData, userId]);

  if (isLoading) {
    return <div className="flex justify-center items-center p-8"><span className="text-lg text-gray-700">Loading...</span></div>;
  }

  if (error) {
    return <div className="flex justify-center items-center p-8"><span className="text-lg text-red-500">Error loading data.</span></div>;
  }

  if (!carData.length) {
    return <div className="flex justify-center items-center p-8"><span className="text-lg text-gray-700">No data available.</span></div>;
  }

  // Assign colors to manufacturers
  const manufacturerColors: Record<string, string> = {
    Mercedes: '#1D4ED8',
    Bentley: '#14B8A6',
    Lamborghini: '#F59E0B',
    porsche: '#EF4444',
    'Maruti Suzuki': '#10B981',
    Ford: '#6B7280',
    "Range Rover": '#8B5CF6',
    mazda: '#F87171',
    Honda: '#3B82F6',
    Audi: '#F472B6',
  };

  const maxCount = Math.max(...carData.map((m) => m.rentedCount), 1);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full mt-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Rental Period by Manufacturer</h3>
      </div>

      {/* Circular Progress Bars */}
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {carData.map((data, index) => (
          <div key={index} className="relative flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
            <div className="w-28 h-28 mb-4">
              <CircularProgressbar
                value={(data.rentedCount / maxCount) * 100}
                strokeWidth={12}
                styles={buildStyles({
                  pathColor: manufacturerColors[data.manufacturer] || '#888888',
                  trailColor: '#f3f4f6',
                  strokeLinecap: 'round',
                })}
              />
            </div>
            <div className="text-center">
              <h4 className="text-sm font-semibold text-gray-900">{data.manufacturer}</h4>
              <p className="text-gray-600 text-xs">{data.rentedCount} Rentals</p>
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-8">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Legend</h4>
        <div className="flex flex-wrap justify-center space-x-6">
          {carData.map((data, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <span
                className="w-4 h-4 rounded-full"
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
