interface CarDetailsProps {
    carName: string;
    imageUrl: string;
  }
  
  const CarDetails: React.FC<CarDetailsProps> = ({ carName, imageUrl }) => {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 flex items-center">
        <div className="flex-1">
          <h3 className="font-semibold text-xl">{carName}</h3>
        </div>
        <div className="w-64 h-36">
          <img
            src={imageUrl}
            alt={carName}
            className="object-cover w-full h-full rounded-lg"
          />
        </div>
      </div>
    );
  };
  
  export default CarDetails;
  