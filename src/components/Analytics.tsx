import React, { useState } from 'react';
import { useFetchAllBookingsQuery } from '../features/API';

// Data for Monthly and Weekly stats
const monthlyData = [
  { label: 'Jan', spent: 100, gotBack: 0 },
    { label: 'Feb', spent: 80, gotBack: 0 },
  { label: 'Mar', spent: 0, gotBack: 60 },
  { label: 'Apr', spent: 0, gotBack: 40 },
  { label: 'May', spent: 0, gotBack: 20 },
    { label: 'Jun', spent: 0, gotBack: 10 },
    { label: 'Jul', spent: 0, gotBack: 5 },
    { label: 'Aug', spent: 0, gotBack: 0 },
  { label: 'Sep', spent: 50, gotBack: 0 },
  { label: 'Oct', spent: 80, gotBack: 0 },
  { label: 'Nov', spent: 0, gotBack: 100 },
    { label: 'Dec', spent: 80, gotBack: 0 },
];

const weeklyData = [
  { label: 'Mon', spent: 100, gotBack: 50 },
  { label: 'Tue', spent: 90, gotBack: 40 },
  { label: 'Wed', spent: 40, gotBack: 90 },
  { label: 'Thu', spent: 35, gotBack: 80 },
  { label: 'Fri', spent: 60, gotBack: 40 },
  { label: 'Sat', spent: 90, gotBack: 25 },
  { label: 'Sun', spent: 100, gotBack: 30 },
];

// Main AnalyticsReport component
const AnalyticsReport: React.FC = () => {
  const [viewMode, setViewMode] = useState<'monthly' | 'weekly'>('monthly');

  // Function to handle mode change
  const handleModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setViewMode(e.target.value as 'monthly' | 'weekly');
  };

  // Get data based on current mode
  const data = viewMode === 'monthly' ? monthlyData : weeklyData;

  return (
    <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
      {/* Header Section: Title and Select Dropdown */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Analytics Report</h3>
        
        {/* Legend and Dropdown */}
        <div className="text-sm space-x-4 flex items-center">
          <span className="text-[#4F76C1]">● Spent</span>
          <span className="text-[#4CAF50]">● Got Back</span>
          <select className="ml-4 border rounded p-1" onChange={handleModeChange}>
            <option value="monthly">Monthly</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>
      </div>

      {/* Graph Container */}
      <div className="relative">
        {/* Y-axis Labels (Values) */}
        <div className="absolute left-0 bottom-0 flex flex-col justify-between h-full py-4 text-xs text-gray-500">
          <span>50</span>
          <span>40</span>
          <span>30</span>
          <span>20</span>
          <span>10</span>
          <span>0</span>
        </div>

        {/* Bars and X-axis Labels (Months or Days of the Week) */}
        <div className="ml-6 flex justify-between items-end h-60">
          {/* Iterate through data and create bars */}
          {data.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              {/* Spent Bar */}
              {item.spent > 0 && (
                <div
                  className="w-12 rounded-md"
                  style={{
                    height: `${item.spent * 1.2}px`,
                    background: 'linear-gradient(180deg, #4F76C1 0%, #003366 100%)', // Gradient
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Shadow for depth
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  }}
                  title={`Spent: ${item.spent}`}
                  aria-label={`${item.label}: Spent ${item.spent}`}
                >
                  <div className="h-full w-full flex items-end justify-center text-white text-xs font-semibold">{item.spent}</div>
                </div>
              )}
              
              {/* Got Back Bar */}
              {item.gotBack > 0 && (
                <div
                  className="w-12 rounded-md mt-1"
                  style={{
                    height: `${item.gotBack * 1.2}px`,
                    background: 'linear-gradient(180deg, #4CAF50 0%, #1B5E20 100%)', // Gradient
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Shadow for depth
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  }}
                  title={`Got Back: ${item.gotBack}`}
                  aria-label={`${item.label}: Got Back ${item.gotBack}`}
                >
                  <div className="h-full w-full flex items-end justify-center text-white text-xs font-semibold">{item.gotBack}</div>
                </div>
              )}

              {/* Label for Month or Day */}
              <span className="text-sm mt-2">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsReport;
