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
    <div className="bg-gray-50 rounded-xl shadow-md p-6 mb-4 transition-shadow hover:shadow-lg">
      {/* Header Section */}
      <div className="flex items-center mb-5">
        <img
          src={imageUrl}
          alt={name}
          className="w-14 h-14 rounded-full object-cover mr-4 border-2 border-gray-200"
        />
        <div>
          <h4 className="text-lg font-semibold text-gray-800">{name}</h4>
          <p className="text-sm text-gray-500">{locationFrom} &rarr; {locationTo}</p>
        </div>
      </div>
      
      {/* Details Section */}
      <div className="grid grid-cols-2 gap-y-5 gap-x-4">
        {/* Distance */}
        <div className="flex items-center">
          <FaCarSide className="text-gray-600 mr-2" />
          <div>
            <p className="text-xs text-gray-500">Distance</p>
            <p className="text-sm font-semibold text-gray-800">{distance}</p>
          </div>
        </div>
        
        {/* Duration */}
        <div className="flex items-center">
          <FaCarSide className="text-gray-600 mr-2" />
          <div>
            <p className="text-xs text-gray-500">Duration</p>
            <p className="text-sm font-semibold text-gray-800">{duration}</p>
          </div>
        </div>
        
        {/* Fuel Used */}
        <div className="flex items-center">
          <FaGasPump className="text-gray-600 mr-2" />
          <div>
            <p className="text-xs text-gray-500">Fuel Used</p>
            <p className="text-sm font-semibold text-gray-800">{fuel}</p>
          </div>
        </div>
        
        {/* Passengers */}
        <div className="flex items-center">
          <FaCarSide className="text-gray-600 mr-2" />
          <div>
            <p className="text-xs text-gray-500">Passengers</p>
            <p className="text-sm font-semibold text-gray-800">{passengers}</p>
          </div>
        </div>
        
        {/* Average */}
        <div className="flex items-center">
          <FaCarSide className="text-gray-600 mr-2" />
          <div>
            <p className="text-xs text-gray-500">Average</p>
            <p className="text-sm font-semibold text-gray-800">{average}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfoCard;
