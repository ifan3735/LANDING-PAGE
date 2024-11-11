import React, { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useFetchAllBookingsQuery } from '../yourApiHooks'; // Adjust with actual path

interface ManufacturerData {
  name: string;
  days: number;
  color: string;
}

const BreakdownPeriod: React.FC<{ userId: string }> = ({ userId }) => {
  const { data: bookings, isLoading, error } = useFetchAllBookingsQuery();
  const [manufacturerData, setManufacturerData] = useState<ManufacturerData[]>([]);

  const manufacturerColors: Record<string, string> = {
    Mercedes: '#1D4ED8',
    Bentley: '#14B8A6',
    Lamborghini: '#F59E0B',
    Porsche: '#EF4444',
    'Maruti Suzuki': '#10B981',
    // Add default colors for other manufacturers dynamically
  };

  useEffect(() => {
    if (bookings) {
      const userBookings = bookings.filter((booking) => booking.userId === userId);

      const manufacturerDays = userBookings.reduce<Record<string, number>>((acc, booking) => {
        const { manufacturer } = booking.vehicle;
        acc[manufacturer] = (acc[manufacturer] || 0) + booking.rentalDays;
        return acc;
      }, {});

      const data = Object.entries(manufacturerDays).map(([name, days]) => ({
        name,
        days,
        color: manufacturerColors[name] || '#888888', // Fallback color for unspecified manufacturers
      }));

      setManufacturerData(data);
    }
  }, [bookings, userId]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  const maxDays = Math.max(...manufacturerData.map((m) => m.days), 1);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-700">Rental Period by Manufacturer</h3>
      </div>

      {/* Circular Progress Bars */}
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {manufacturerData.map((manufacturer, index) => (
          <div key={index} className="relative flex flex-col items-center">
            <div className="w-24 h-24 mb-4">
              <CircularProgressbar
                value={(manufacturer.days / maxDays) * 100}
                strokeWidth={10}
                styles={buildStyles({
                  pathColor: manufacturer.color,
                  trailColor: '#e5e7eb',
                })}
              />
            </div>
            <div className="text-center">
              <h4 className="text-sm font-semibold text-gray-800">{manufacturer.name}</h4>
              <p className="text-gray-500">{manufacturer.days} Days</p>
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-8">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Legend</h4>
        <div className="flex flex-wrap justify-center space-x-4">
          {manufacturerData.map((manufacturer, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
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
