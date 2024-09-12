import React, { useState } from 'react';

// Data for Monthly and Weekly stats
const monthlyData = [
  { label: 'Jan', spent: 50, gotBack: 0 },
  { label: 'Mar', spent: 0, gotBack: 30 },
  { label: 'Apr', spent: 0, gotBack: 20 },
  { label: 'May', spent: 0, gotBack: 15 },
  { label: 'Sep', spent: 25, gotBack: 0 },
  { label: 'Oct', spent: 35, gotBack: 0 },
  { label: 'Nov', spent: 0, gotBack: 50 },
];

const weeklyData = [
  { label: 'Mon', spent: 10, gotBack: 5 },
  { label: 'Tue', spent: 15, gotBack: 7 },
  { label: 'Wed', spent: 20, gotBack: 10 },
  { label: 'Thu', spent: 12, gotBack: 8 },
  { label: 'Fri', spent: 18, gotBack: 9 },
  { label: 'Sat', spent: 22, gotBack: 15 },
  { label: 'Sun', spent: 30, gotBack: 20 },
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
          <span className="text-yellow-600">● Spent</span>
          <span className="text-yellow-300">● Got Back</span>
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
                  className="w-12 bg-yellow-600 rounded-md"
                  style={{ height: `${item.spent * 1.2}px` }} // Dynamic height based on "spent" value
                  title={`Spent: ${item.spent}`}
                  aria-label={`${item.label}: Spent ${item.spent}`}
                ></div>
              )}
              
              {/* Got Back Bar */}
              {item.gotBack > 0 && (
                <div
                  className="w-12 bg-yellow-300 rounded-md mt-1"
                  style={{ height: `${item.gotBack * 1.2}px` }} // Dynamic height based on "gotBack" value
                  title={`Got Back: ${item.gotBack}`}
                  aria-label={`${item.label}: Got Back ${item.gotBack}`}
                ></div>
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
