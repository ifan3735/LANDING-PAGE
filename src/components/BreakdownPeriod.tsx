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
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading data.</p>;
  }

  if (!carData.length) {
    return <p>No data available.</p>;
  }

  // Assign colors to manufacturers
  const manufacturerColors: Record<string, string> = {
    Mercedes: '#1D4ED8',
    Bentley: '#14B8A6',
    Lamborghini: '#F59E0B',
    Porsche: '#EF4444',
    'Maruti Suzuki': '#10B981',
    Ford: '#6B7280',
    Range_Rover: '#8B5CF6',
    mazda: '#F87171',
  };

  const maxCount = Math.max(...carData.map((m) => m.rentedCount), 1);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full mt-6">
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
