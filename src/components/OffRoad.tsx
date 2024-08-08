import React from 'react';

const OffRoadCars: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-yellow-50 p-8">
      <h1 className="text-2xl font-bold mb-4">We Rent Powerful Machines too</h1>
      <div className="relative mb-8">
        <h2 className="text-6xl font-extrabold italic text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-400">
          OFF ROAD CARS
        </h2>
      </div>
      <div className="flex space-x-4">
        <img src="https://i.pinimg.com/564x/44/92/60/449260db46ac2c1e2e574092cf13312f.jpg" alt="" className='w-full'/>
      </div>
    </div>
  );
};

export default OffRoadCars;
