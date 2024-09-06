// ActivityCard.tsx
interface ActivityCardProps {
    carName: string;
    price: string;
    imageUrl: string;
  }
  
  const ActivityCard = ({ carName, price, imageUrl }: ActivityCardProps) => (
    <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-md mb-4">
      <img src={imageUrl} alt={carName} className="w-16 h-10 object-cover rounded-lg mr-4" />
      <div>
        <h3 className="font-semibold">{carName}</h3>
        <p className="text-yellow-600 font-bold">{price}</p>
      </div>
    </div>
  );
  
  export default ActivityCard;
  