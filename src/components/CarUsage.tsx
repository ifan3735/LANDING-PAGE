import React from 'react';
import { useFetchAllBookingsQuery } from '../features/API';

const colors = ['bg-blue-500', 'bg-teal-500', 'bg-yellow-500', 'bg-green-500', 'bg-purple-500'];

interface Booking {
  user_id: string;
  booking_date: string;
  return_date: string;
  vehicle: {
    vehicle_specs: {
      model: string;
    };
  };
}

const CarUsage: React.FC = () => {
  const { data: bookingsData, error, isLoading } = useFetchAllBookingsQuery();
  const userId = localStorage.getItem('userId');

  console.log('Bookings Data:', bookingsData); // Log the bookings data
  console.log('Error:', error);  // Log the error
  console.log('Loading:', isLoading); // Log the loading state
  console.log('Logged-in User ID:', userId); // Log the logged-in user ID

  const carUsageData = bookingsData
    ? bookingsData
        .filter((booking: Booking) => {
          console.log('Filtering Booking:', booking);
          return booking.user_id == userId; // Filter bookings by the logged-in user
        })
        .map((booking: Booking) => {
          const bookingDate = new Date(booking.booking_date);
          const returnDate = new Date(booking.return_date);
          const daysUsed = Math.ceil(
            (returnDate.getTime() - bookingDate.getTime()) / (1000 * 60 * 60 * 24)
          );

          return {
            model: booking.vehicle.vehicle_specs.model,
            daysUsed,
          };
        })
    : [];

  const maxDaysUsed =
    carUsageData.length > 0 ? Math.max(...carUsageData.map((car) => car.daysUsed)) : 1;

  const markers = Array.from({ length: 6 }, (_, i) => Math.ceil((maxDaysUsed / 5) * i));

  if (isLoading) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500">Error loading data.</p>;
  if (!carUsageData.length) return <p className="text-gray-500">No car usage data available.</p>;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-6 text-gray-700">Car's Usage</h3>

      <div className="space-y-6">
        {carUsageData.map((car, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between mb-1">
              <span className="text-gray-800 font-semibold">{car.model}</span>
              <span className="text-gray-500">{car.daysUsed} days</span>
            </div>

            <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${colors[index % colors.length]}`}
                style={{ width: `${(car.daysUsed / maxDaysUsed) * 100}%` }}
              ></div>
            </div>

            <div className="flex justify-between text-xs text-gray-400 mt-1">
              {markers.map((day) => (
                <span key={day}>{day} {day === 1 ? 'day' : 'days'}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarUsage;
