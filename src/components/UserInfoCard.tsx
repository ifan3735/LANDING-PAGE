import React from 'react';
import { FaCarSide, FaGasPump, FaClock, FaUserFriends, FaTachometerAlt } from 'react-icons/fa';

interface CompanyInfoProps {
  companyName: string;
  locationFrom: string;
  locationTo: string;
  estimatedDistance: string;
  estimatedTime: string;
  estimatedFuel: string;
  vehicleCapacity: string;
  sustainabilityRating: string;
  companyLogoUrl: string;
}

const userInfoCard: React.FC<CompanyInfoProps> = ({
  companyName,
  locationFrom,
  locationTo,
  estimatedDistance,
  estimatedTime,
  estimatedFuel,
  vehicleCapacity,
  sustainabilityRating,
  companyLogoUrl,
}) => {
  return (
    <div className="relative bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-xl p-8 mb-8 transition-transform transform hover:scale-105 hover:shadow-2xl">
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>

      {/* Header Section */}
      <div className="flex items-center mb-6">
        <img
          src={companyLogoUrl}
          alt={companyName}
          className="w-20 h-20 rounded-full object-cover border-4 border-blue-200 shadow-lg mr-6"
        />
        <div>
          <h4 className="text-2xl font-bold text-gray-800">{companyName}</h4>
          <p className="text-sm text-gray-500">{locationFrom} &rarr; {locationTo}</p>
        </div>
      </div>

      {/* Details Section */}
      <div className="grid grid-cols-2 gap-y-6 gap-x-8">
        {/* Estimated Distance */}
        <div className="flex items-center space-x-3">
          <FaCarSide className="text-blue-500 text-lg" />
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500">Distance</p>
            <p className="text-lg font-semibold text-gray-900">{estimatedDistance}</p>
          </div>
        </div>

        {/* Estimated Time */}
        <div className="flex items-center space-x-3">
          <FaClock className="text-purple-500 text-lg" />
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500">Time</p>
            <p className="text-lg font-semibold text-gray-900">{estimatedTime}</p>
          </div>
        </div>

        {/* Estimated Fuel */}
        <div className="flex items-center space-x-3">
          <FaGasPump className="text-red-500 text-lg" />
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500">Fuel</p>
            <p className="text-lg font-semibold text-gray-900">{estimatedFuel}</p>
          </div>
        </div>

        {/* Vehicle Capacity */}
        <div className="flex items-center space-x-3">
          <FaUserFriends className="text-green-500 text-lg" />
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500">Capacity</p>
            <p className="text-lg font-semibold text-gray-900">{vehicleCapacity}</p>
          </div>
        </div>

        {/* Sustainability Rating */}
        <div className="flex items-center space-x-3">
          <FaTachometerAlt className="text-yellow-500 text-lg" />
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500">Eco Rating</p>
            <p className="text-lg font-semibold text-gray-900">{sustainabilityRating}</p>
          </div>
        </div>
      </div>

      {/* Bottom Glow Effect */}
      <div className="absolute -bottom-5 -right-5 w-32 h-32 bg-purple-300 rounded-full opacity-30 blur-2xl pointer-events-none transform scale-125"></div>
    </div>
  );
};

export default userInfoCard;
