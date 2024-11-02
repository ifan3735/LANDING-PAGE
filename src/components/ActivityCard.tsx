interface ActivityCardProps {
  carName: string;
  price: string;
  imageUrl: string;
}

const ActivityCard = ({ carName, price, imageUrl }: ActivityCardProps) => (
  <div className="relative overflow-hidden flex items-center justify-between p-6 rounded-2xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl bg-white mb-6 group">
    
    {/* Subtle Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-r from-blue-100 via-white to-purple-100 opacity-90 rounded-2xl pointer-events-none"></div>

    <div className="relative flex items-center">
      {/* Car Image with Glow Effect */}
      <div className="w-24 h-16 rounded-lg overflow-hidden shadow-lg border-2 border-white transition-transform transform group-hover:scale-110">
        <img
          src={imageUrl}
          alt={carName}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="ml-6">
        {/* Car Name */}
        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-purple-700 transition duration-300">
          {carName}
        </h3>
        
        {/* Price with Icon and Gradient Text */}
        <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mt-1 flex items-center">
          <svg className="w-5 h-5 mr-2 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-.384 0-.768.01-1.152.03A8.063 8.063 0 0112 5a8 8 0 110 16c-.317 0-.635-.016-.95-.047M8.207 17.293l-1.414 1.414 6.293-6.293 1.414 1.414-6.293 6.293z" />
          </svg>
          {price}
        </p>
      </div>
    </div>
    
    {/* Decorative Element - Bottom Glow */}
    <div className="absolute -bottom-3 -right-3 w-20 h-20 bg-purple-500 rounded-full opacity-40 blur-lg pointer-events-none transform transition-transform group-hover:scale-125"></div>
  </div>
);

export default ActivityCard;
