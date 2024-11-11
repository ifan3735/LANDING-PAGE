import React from 'react';
import { useFetchAllBookingsQuery } from '../features/API';

interface Car {
  manufacturer: string;
  rentedCount: number;
  issuesReported: number | null;
}

interface CarBreakdownProps {
  searchQuery: string;
}

const CarBreakdown: React.FC<CarBreakdownProps> = ({ searchQuery }) => {
  const { data: bookingsData, error, isLoading } = useFetchAllBookingsQuery();
  const userId = localStorage.getItem('userId');

  // Process and aggregate data by manufacturer
  const carData: Car[] = bookingsData
    ? Object.values(
        bookingsData
          .filter((booking) => booking.user_id == userId)
          .reduce((acc, booking) => {
            const manufacturer = booking.vehicle.vehicle_specs.manufacturer;
            if (!acc[manufacturer]) {
              acc[manufacturer] = {
                manufacturer,
                rentedCount: 0,
                issuesReported: null, // Default to null if no issues
              };
            }
            acc[manufacturer].rentedCount += 1;

            // Check if this vehicle had issues
            if (booking.vehicle.has_issues) {
              acc[manufacturer].issuesReported =
                (acc[manufacturer].issuesReported || 0) + 1;
            }

            return acc;
          }, {} as Record<string, Car>)
      )
    : [];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-700">Car Rental Breakdown</h3>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading data.</p>}

      <div className="overflow-x-auto">
        <table className="w-full table-fixed border-collapse bg-white rounded-lg shadow-sm">
          <thead>
            <tr>
              <th className="p-4 text-left text-gray-600 font-semibold border-b border-gray-200">Manufacturer</th>
              <th className="p-4 text-left text-gray-600 font-semibold border-b border-gray-200">Total Rented</th>
              <th className="p-4 text-left text-gray-600 font-semibold border-b border-gray-200">Issues Reported</th>
            </tr>
          </thead>
          <tbody>
            {carData
              .filter((car) =>
                car.manufacturer.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((car, index) => (
                <tr key={index} className="border-b last:border-0 hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-medium text-gray-800">{car.manufacturer}</td>
                  <td className="p-4 font-semibold text-blue-600">{car.rentedCount}</td>
                  <td className={`p-4 ${car.issuesReported ? 'text-red-500' : 'text-gray-400'}`}>
                    {car.issuesReported ?? 'None'}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CarBreakdown;
