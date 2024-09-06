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
    <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
      <div className="flex items-center mb-4">
        <img
          src={imageUrl}
          alt={name}
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <h4 className="text-lg font-semibold">{name}</h4>
          <p className="text-sm text-gray-500">{locationFrom} to {locationTo}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center">
          <FaCarSide className="text-blue-500 mr-2" />
          <div>
            <p className="text-sm text-gray-500">Distance</p>
            <p className="font-semibold">{distance}</p>
          </div>
        </div>
        <div className="flex items-center">
          <FaCarSide className="text-blue-500 mr-2" />
          <div>
            <p className="text-sm text-gray-500">Duration</p>
            <p className="font-semibold">{duration}</p>
          </div>
        </div>
        <div className="flex items-center">
          <FaGasPump className="text-blue-500 mr-2" />
          <div>
            <p className="text-sm text-gray-500">Fuel Used</p>
            <p className="font-semibold">{fuel}</p>
          </div>
        </div>
        <div className="flex items-center">
          <FaCarSide className="text-blue-500 mr-2" />
          <div>
            <p className="text-sm text-gray-500">Passengers</p>
            <p className="font-semibold">{passengers}</p>
          </div>
        </div>
        <div className="flex items-center">
          <FaCarSide className="text-blue-500 mr-2" />
          <div>
            <p className="text-sm text-gray-500">Average</p>
            <p className="font-semibold">{average}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfoCard;
