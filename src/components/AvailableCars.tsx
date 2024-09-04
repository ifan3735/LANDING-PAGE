import React from 'react';

const AvailableCars: React.FC = () => {
  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h3 className="text-gray-800 text-lg mb-4">Available Cars</h3>
      {/* Car list items */}
      <ul>
        <li>Car 1</li>
        <li>Car 2</li>
        <li>Car 3</li>
        {/* Add more cars as needed */}
      </ul>
    </div>
  );
};

export default AvailableCars;
