interface CarDetailsProps {
  carName: string;
  imageUrl: string;
  features: string[]; // Ensure features is an array of strings
}

const CarDetails: React.FC<CarDetailsProps> = ({ carName, imageUrl, features }) => {
  // Normalize the features to always be an array
  const normalizedFeatures = Array.isArray(features) ? features : (typeof features === 'string' ? [features] : []);

  return (
    <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl shadow-xl p-8 flex items-start space-x-8 animate-fade-in">
      {/* Car Image */}
      <div className="relative w-1/3 h-48 overflow-hidden rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
        <img
          src={imageUrl}
          alt={carName}
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-lg"></div>
      </div>

      {/* Car Details */}
      <div className="flex-1 text-white space-y-4">
        <h3 className="text-3xl font-bold text-white tracking-wide">{carName}</h3>
        <p className="text-base text-indigo-200">
          Experience unparalleled luxury and comfort with advanced features that elevate your journey.
        </p>

        {/* Feature List */}
        {normalizedFeatures.length > 0 ? (
          <div className="bg-white/20 rounded-lg p-4 shadow-md backdrop-blur-lg">
            <h4 className="text-xl font-semibold text-white mb-2">Key Features</h4>
            <ul className="space-y-1 list-inside list-disc text-indigo-100">
              {normalizedFeatures.map((feature, index) => (
                <li key={index} className="transition transform hover:translate-x-1">
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-indigo-200 italic">No features available</p>
        )}
      </div>
    </div>
  );
};



export default CarDetails;
