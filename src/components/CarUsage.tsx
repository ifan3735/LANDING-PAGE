import React from 'react';
import { useFetchAllVehiclesQuery } from '../features/API';

const CarUsage: React.FC = () => {
  const { data: vehiclesData, error, isLoading } = useFetchAllVehiclesQuery();
  const userId = localStorage.getItem('userId'); // Get the logged-in user's ID

  // Filter vehicles data by the logged-in user
  const filteredVehicles = vehiclesData
    ? vehiclesData.filter((vehicle) => vehicle.user_id === userId)
    : [];

  // Maximum days used for calculating progress bar width
  const maxDaysUsed = filteredVehicles.length > 0 
    ? Math.max(...filteredVehicles.map((vehicle) => vehicle.days_used))
    : 1;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-6">Car's Usage</h3>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading data.</p>}

      <div className="space-y-6">
        {filteredVehicles.map((vehicle, index) => (
          <div key={index}>
            <div className="flex justify-between mb-2">
              <span className="text-gray-800 font-semibold">{vehicle.name}</span>
              <span className="text-gray-500">{vehicle.days_used} days</span>
            </div>

            {/* Progress bar */}
            <div className="relative w-full">
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-500 h-3 rounded-full"
                  style={{ width: `${(vehicle.days_used / maxDaysUsed) * 100}%` }}
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
