import React from 'react';
import { useFetchAllBookingsQuery } from '../features/API';

const CarUsage: React.FC = () => {
  const { data: bookingsData, error, isLoading } = useFetchAllBookingsQuery();
  const userId = localStorage.getItem('userId'); // Get the logged-in user's ID

  // Filter bookings data by the logged-in user and calculate days used
  const carUsageData = bookingsData
    ? bookingsData
        .filter((booking) => booking.user_id == userId)
        .map((booking) => {
          const bookingDate = new Date(booking.booking_date);
          const returnDate = new Date(booking.return_date);
          const daysUsed = Math.ceil(
            (returnDate.getTime() - bookingDate.getTime()) / (1000 * 60 * 60 * 24)
          );

          return {
            model: booking.vehicle_specs.model,
            daysUsed,
          };
        })
    : [];

  // Calculate the maximum days used for scaling the progress bar
  const maxDaysUsed = carUsageData.length > 0 
    ? Math.max(...carUsageData.map((car) => car.daysUsed))
    : 1;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-6">Car's Usage</h3>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading data.</p>}

      <div className="space-y-6">
        {carUsageData.map((car, index) => (
          <div key={index}>
            <div className="flex justify-between mb-2">
              <span className="text-gray-800 font-semibold">{car.model}</span>
              <span className="text-gray-500">{car.daysUsed} days</span>
            </div>

            {/* Progress bar */}
            <div className="relative w-full">
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-500 h-3 rounded-full"
                  style={{ width: `${(car.daysUsed / maxDaysUsed) * 100}%` }}
                ></div>
              </div>

              {/* Markers under the progress bar */}
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                {[2, 4, 6, 8, 10, maxDaysUsed].map((day) => (
                  <span key={day}>{day} day{day > 1 ? 's' : ''}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarUsage;
