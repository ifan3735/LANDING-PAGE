import React from 'react';

const OffRoadCars: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-yellow-50 p-8">
      <h1 className="text-2xl font-bold mb-4">We Rent Powerful Machines too</h1>
      <div className="relative mb-8">
        <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-400">
          OFF ROAD CARS
        </h2>
      </div>
      <div className="flex space-x-4">
        <div className="w-1/5">
          <img src="https://i.pinimg.com/564x/b6/14/65/b61465ba84c3f6a93b8378cd7189840d.jpg" alt="Car 1" className="w-full" />
        </div>
        <div className="w-1/5">
          <img src="https://i.pinimg.com/564x/5c/c7/c8/5cc7c893a976731afd7b9a077348a2cd.jpg" alt="Car 2" className="w-full" />
        </div>
        <div className="w-1/5">
          <img src="https://i.pinimg.com/564x/a9/66/50/a96650b2d3c531af918cf8c5c034d073.jpg" alt="Car 3" className="w-full" />
        </div>
        <div className="w-1/5">
          <img src="https://i.pinimg.com/564x/ca/34/43/ca3443939ffd88e7ef30cd1857c713d3.jpg" alt="Car 4" className="w-full" />
        </div>
        <div className="w-1/5">
          <img src="https://i.pinimg.com/564x/d7/12/86/d71286adb9e7b632bde67a24a2fd6041.jpg" alt="Car 5" className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default OffRoadCars;
