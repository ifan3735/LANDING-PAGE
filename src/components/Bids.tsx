import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';

interface CarCardProps {
  name: string;
  imageUrl: string;
  location: string;
  style: string;
  rto: string;
  spend: string;
  price: string;
  bidPrice: string;
}

const Bid: React.FC<CarCardProps> = ({ name, imageUrl, location, style, rto, spend, price, bidPrice, onClick } : { name: string , imageUrl: string, location: string, style: string, rto: string, spend: string, price:string, bidPrice: string,  onClick: () => void}) => {
  return (
    <div 
      onClick={onClick}
    className="bg-white p-6 rounded-lg shadow-lg flex flex-row space-x-6 w-full max-w-xl cursor-pointer hover:shadow-xl transition-shadow duration-300">
      {/* Car Image */}
      <div className="w-48 h-32 overflow-hidden rounded-lg">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Car Information */}
      <div className="flex-1 flex flex-col justify-between">
        {/* Car Name */}
        <h3 className="font-semibold text-xl text-gray-800 mb-1">{name}</h3>

        {/* Location and Details */}
        <div className="text-sm text-gray-600 mb-3 space-y-1">
          {/* Location */}
          <div className="flex items-center space-x-2">
            <FaMapMarkerAlt className="text-blue-500" />
            <p>{location}</p>
          </div>

          {/* Style, RTO, Speed */}
          <div className="flex items-center justify-between">
            <p>Style: <span className="font-medium">{style}</span></p>
            <p>RTO: <span className="font-medium">{rto}</span></p>
            <p>Speed: <span className="font-medium">{spend} KMs</span></p>
          </div>
        </div>

        {/* Price and Bid Button */}
        <div className="flex justify-between items-center">
          <p className="font-bold text-lg text-blue-500">
            ${price} / <span className="text-gray-900">${bidPrice}</span>
          </p>
          <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300">
            Bid Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bid;
