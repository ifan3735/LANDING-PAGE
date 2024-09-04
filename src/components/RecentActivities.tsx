import React from 'react';

const RecentActivities: React.FC = () => {
  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h3 className="text-gray-800 text-lg mb-4">Recent Activities</h3>
      {/* List recent activities */}
      <ul>
        <li>User X booked a car</li>
        <li>Car Y returned</li>
        <li>New listing added</li>
        {/* Add more activities as needed */}
      </ul>
    </div>
  );
};

export default RecentActivities;
