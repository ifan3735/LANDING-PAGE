import React from 'react';

const TopSellers: React.FC = () => {
  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h3 className="text-gray-800 text-lg mb-4">Top Sellers</h3>
      {/* List of top sellers */}
      <ul>
        <li>Seller 1</li>
        <li>Seller 2</li>
        <li>Seller 3</li>
        {/* Add more sellers as needed */}
      </ul>
    </div>
  );
};

export default TopSellers;
