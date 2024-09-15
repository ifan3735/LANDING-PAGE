interface CarDetailsProps {
  carName: string;
  imageUrl: string;
}

const CarDetails: React.FC<CarDetailsProps> = ({ carName, imageUrl }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 flex items-center space-x-6">
      {/* Car Name */}
      <div className="flex-1">
        <h3 className="font-semibold text-2xl text-gray-800">{carName}</h3>
        <p className="text-sm text-gray-500 mt-2">
          Premium luxury car with modern features, ideal for executive rides.
        </p>
      </div>

      {/* Car Image */}
      <div className="w-58 h-35">
        <img
          src={imageUrl}
          alt={carName}
          className="object-cover w-full h-full rounded-lg shadow-md"
        />
      </div>
    </div>
  );
};

export default CarDetails;
