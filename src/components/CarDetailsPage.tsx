import { useLocation } from 'react-router-dom';

const CarDetailsPage = () => {
  const location = useLocation();
  const { car } = location.state;  // Extract the car data passed via state

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Car Details</h2>

      {/* Car Image */}
      <img src={car.image} alt={car.name} className="w-full h-64 object-cover rounded-lg" />

      {/* Car Info */}
      <div className="mt-6">
        <h3 className="text-xl font-bold">{car.name}</h3>
        <p className="text-gray-600">Owner: {car.owner}</p>
        <p className="text-gray-600">Location: {car.location}</p>
        <p className="text-gray-600">Mileage: {car.mileage}</p>
        <p className="text-gray-600">Fuel Type: {car.fuelType}</p>
        <p className="text-gray-600">Speed: {car.speed}</p>
        <p className="text-gray-600">Price: ${car.price}</p>
      </div>

      {/* Add additional design elements here */}
    </div>
  );
};

export default CarDetailsPage;
