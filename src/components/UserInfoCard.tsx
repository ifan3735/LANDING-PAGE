import React from 'react';
import { FaCarSide, FaGasPump } from 'react-icons/fa';

interface UserInfoProps {
  name: string;
  locationFrom: string;
  locationTo: string;
  distance: string;
  duration: string;
  fuel: string;
  passengers: string;
  average: string;
  imageUrl: string;
}

const UserInfoCard: React.FC<UserInfoProps> = ({
  name,
  locationFrom,
  locationTo,
  distance,
  duration,
  fuel,
  passengers,
  average,
  imageUrl,
}) => {
  return (
    <div className="relative bg-white rounded-2xl shadow-lg p-6 mb-6 transition-transform transform hover:scale-105 hover:shadow-xl">
      {/* Header Section */}
      <div className="flex items-center mb-6">
        <img
          src={imageUrl}
          alt={name}
          className="w-16 h-16 rounded-full object-cover border-2 border-gray-300 shadow-sm mr-4"
        />
        <div>
          <h4 className="text-xl font-semibold text-gray-800">{name}</h4>
          <p className="text-sm text-gray-500">{locationFrom} &rarr; {locationTo}</p>
        </div>
      </div>
      
      {/* Details Section */}
      <div className="grid grid-cols-2 gap-y-5 gap-x-6">
        {/* Distance */}
        <div className="flex items-center space-x-2">
          <FaCarSide className="text-gray-700" />
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500">Distance</p>
            <p className="text-base font-medium text-gray-900">{distance}</p>
          </div>
        </div>
        
        {/* Duration */}
        <div className="flex items-center space-x-2">
          <FaCarSide className="text-gray-700" />
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500">Duration</p>
            <p className="text-base font-medium text-gray-900">{duration}</p>
          </div>
        </div>
        
        {/* Fuel Used */}
        <div className="flex items-center space-x-2">
          <FaGasPump className="text-gray-700" />
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500">Fuel Used</p>
            <p className="text-base font-medium text-gray-900">{fuel}</p>
          </div>
        </div>
        
        {/* Passengers */}
        <div className="flex items-center space-x-2">
          <FaCarSide className="text-gray-700" />
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500">Passengers</p>
            <p className="text-base font-medium text-gray-900">{passengers}</p>
          </div>
        </div>
        
        {/* Average */}
        <div className="flex items-center space-x-2">
          <FaCarSide className="text-gray-700" />
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500">Average</p>
            <p className="text-base font-medium text-gray-900">{average}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfoCard;
