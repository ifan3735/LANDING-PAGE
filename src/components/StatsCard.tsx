import React from 'react';

const StatsCard = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Statistics</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <p className="text-3xl font-bold">150</p>
          <p className="text-gray-500">Available Cars</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold">75</p>
          <p className="text-gray-500">Sold Cars</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold">20</p>
          <p className="text-gray-500">Active Bids</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold">50</p>
          <p className="text-gray-500">Test Drives</p>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
