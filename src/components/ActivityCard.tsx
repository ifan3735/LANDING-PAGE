interface ActivityCardProps {
  carName: string;
  price: string;
  imageUrl: string;
}

const ActivityCard = ({ carName, price, imageUrl }: ActivityCardProps) => (
  <div className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-50 via-white to-blue-100 rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl mb-6">
    <div className="flex items-center">
      <img
        src={imageUrl}
        alt={carName}
        className="w-20 h-14 object-cover rounded-lg mr-4 shadow-md border border-gray-200"
      />
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{carName}</h3>
        <p className="text-xl text-blue-600 font-bold mt-1">{price}</p>
      </div>
    </div>
  </div>
);

export default ActivityCard;
