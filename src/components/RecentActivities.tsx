import React from 'react';

const RecentActivities = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
      <ul className="space-y-4">
        <li className="flex justify-between items-center">
          <span>John Doe added a new car listing</span>
          <span className="text-sm text-gray-500">2h ago</span>
        </li>
        <li className="flex justify-between items-center">
          <span>Jane Smith updated the pricing of Audi A5</span>
          <span className="text-sm text-gray-500">1d ago</span>
        </li>
        <li className="flex justify-between items-center">
          <span>Michael placed a new bid on BMW M4</span>
          <span className="text-sm text-gray-500">3d ago</span>
        </li>
      </ul>
    </div>
  );
};

export default RecentActivities;
