import { FaChevronDown } from "react-icons/fa";

interface CarCardProps {
    carName: string;
    status: string;
    time: string;
    location: string;
    duration: string;
    imageUrl: string;
  }
  
  const CarCard: React.FC<CarCardProps> = ({
    carName,
    status,
    time,
    location,
    duration,
    imageUrl
  }) => {
    return (
      <div className="flex items-center justify-between bg-white border rounded-lg p-4 shadow-sm hover:shadow-lg transition-shadow duration-300">
        {/* Car Image */}
        <div className="flex items-center space-x-4">
          <img
            src={imageUrl}
            alt={carName}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h4 className="font-medium text-gray-800">{carName}</h4>
            <p className="text-xs text-gray-500">{time}</p>
            <p className="text-sm mt-2 text-gray-600">
              {location}
              <br />
              <span className="text-xs text-gray-400">{duration}</span>
            </p>
          </div>
        </div>
        {/* Status */}
        <div className="flex flex-col items-end">
          <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-medium">
            {status}
          </span>
          <FaChevronDown className="text-gray-400 mt-2" />
        </div>
      </div>
    );
  };
  
  export default CarCard;
  