// CarCard.tsx
interface CarCardProps {
    name: string;
    style: string;
    type: string;
    color: string;
    price: string;
    imageUrl: string;
  }
  
  const CarCard = ({ name, style, type, color, price, imageUrl }: CarCardProps) => (
    <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-md transition-shadow hover:shadow-xl">
      <img src={imageUrl} alt={name} className="w-full h-32 object-cover rounded-lg mb-4" />
      <div className="text-center">
        <h3 className="font-semibold">{name}</h3>
        <p className="text-gray-500">Style: {style}</p>
        <p className="text-gray-500">Type: {type}</p>
        <p className="text-gray-500">Color: {color}</p>
        <p className="text-yellow-600 font-bold">{price}</p>
      </div>
    </div>
  );
  
  export default CarCard;
  