import React from 'react';

interface CarUsage {
  name: string;
  hours: number;
  color: string;
}

const carUsageData: CarUsage[] = [
  { name: 'Mercedes', hours: 9, color: 'bg-blue-500' },
  { name: 'Bentley', hours: 7, color: 'bg-teal-500' },
  { name: 'Porsche Tayca', hours: 6, color: 'bg-yellow-500' },
  { name: 'Lamborghini', hours: 4, color: 'bg-green-500' },
];

const CarUsage: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-6">Car's Used</h3>

      <div className="space-y-6">
        {carUsageData.map((car, index) => (
          <div key={index}>
            <div className="flex justify-between mb-2">
              <span className="text-gray-800 font-semibold">{car.name}</span>
              <span className="text-gray-500">{car.hours} hours</span>
            </div>

            {/* Progress bar */}
            <div className="relative w-full">
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`${car.color} h-3 rounded-full`}
                  style={{ width: `${(car.hours / 9) * 100}%` }}
                ></div>
              </div>

              {/* Markers under the progress bar */}
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                {[2, 4, 6, 7, 8, 9].map((hour) => (
                  <span key={hour}>{hour} hour</span>
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
