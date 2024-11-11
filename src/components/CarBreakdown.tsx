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

            // Check if this vehicle had issues (you may need to adapt this based on data structure)
            if (booking.vehicle.has_issues) {
              acc[manufacturer].issuesReported =
                (acc[manufacturer].issuesReported || 0) + 1;
            }

            return acc;
          }, {} as Record<string, Car>)
      )
    : [];

  // Calculate maximum rented count for dynamic styling
  const maxRentedCount = carData.length > 0
    ? Math.max(...carData.map((car) => car.rentedCount))
    : 1;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-bold mb-4">Car Rental Breakdown</h3>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading data.</p>}
      
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="border-b pb-2 text-gray-500">Manufacturer</th>
            <th className="border-b pb-2 text-gray-500">Total Rented</th>
            <th className="border-b pb-2 text-gray-500">Issues Reported</th>
          </tr>
        </thead>
        <tbody>
          {carData
            .filter((car) =>
              car.manufacturer.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((car, index) => (
              <tr key={index} className="border-b">
                <td className="py-2">{car.manufacturer}</td>
                <td className="text-blue-500 font-semibold">{car.rentedCount}</td>
                <td className="text-red-500">{car.issuesReported ?? 'None'}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default CarBreakdown;
