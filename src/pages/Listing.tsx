import TopBar from "../components/TopBar";

// CarCard Component
const CarCard = ({ car }: { car: any }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col space-y-4 w-full max-w-lg">
      {/* Owner Section */}
      <div className="flex items-center space-x-3">
        <img
          src={car.ownerAvatar} // Avatar image for the car owner
          alt={car.owner}
          className="w-12 h-12 rounded-full border-2 border-green-500" // Green border for profile if needed
        />
        <div>
          <p className="font-semibold text-gray-700">{car.owner}</p>
          <p className="text-sm text-gray-500">{car.dateListed}</p> {/* Dynamic Date */}
        </div>
      </div>

      {/* Car Information Section */}
      <div className="flex items-start space-x-4">
        {/* Car Image */}
        <img src={car.image} alt={car.name} className="w-40 h-24 rounded-lg object-cover" />

        {/* Car Details */}
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-gray-700">{car.name}</h3>
          <div className="text-sm text-gray-500">
            <p>{car.mileage} KM • {car.fuelType}</p>
            <p>{car.location}</p>
            <p>Speed: {car.speed}</p>
          </div>
        </div>
      </div>

      {/* Price Section */}
      <div className="flex justify-between items-center">
        {/* Car Type */}
        <p className="text-sm text-gray-500">{car.carType}</p>

        {/* Price */}
        <p className="font-bold text-lg text-blue-500">${car.price}</p>
      </div>
    </div>
  );
};

// ListingPage Component
const ListingPage = () => {
  const cars = [
    {
      name: 'Hyundai S Turbo uMT',
      mileage: '1028',
      fuelType: 'Petrol',
      location: 'Dubai',
      speed: '15.5 km/h',
      price: '285,892',
      image: 'https://i.pinimg.com/564x/d4/a5/7d/d4a57d031492979a866b06809d33fc79.jpg',
      owner: 'Jonson Hussain',
      ownerAvatar: 'https://i.pinimg.com/236x/07/33/ba/0733ba760b29378474dea0fdbcb97107.jpg', // Example avatar image
      carType: 'Sedan',
      dateListed: '28 Jun',
    },
    {
      name: 'Bentley Flying Spur',
      mileage: '3690',
      fuelType: 'Petrol',
      location: 'China',
      speed: '15.5 km/h',
      price: '285,892',
      image: 'https://i.pinimg.com/474x/4b/b9/89/4bb989295b494cb8185dcb474ae6cbd7.jpg',
      owner: 'Hussain Jahan',
      ownerAvatar: 'https://i.pinimg.com/236x/0a/0a/5b/0a0a5b1b6ed28ea29e8b00c7515e9c02.jpg', // Example avatar
      carType: 'Luxury',
      dateListed: '25 Jun',
    },
    {
      name: 'Porsche Tayca',
      mileage: '369',
      fuelType: 'Petrol',
      location: 'Dubai',
      speed: '15.5 km/h',
      price: '295,892',
      image: 'https://i.pinimg.com/236x/7b/e0/e4/7be0e479e4134e4a28be487bb6c1655f.jpg',
      owner: 'Robert Rome',
      ownerAvatar: 'https://i.pinimg.com/236x/6e/73/2b/6e732b9f25a83bb67629b5f44eaf556f.jpg',
      carType: 'Coupe',
      dateListed: '26 Jun',
    },
    // Add more cars as necessary
  ];

  return (
    <div className="flex-1 p-6 bg-gray-50 overflow-y-scroll">
      {/* Top Bar */}
      <TopBar searchQuery={""} handleSearch={function (e: React.ChangeEvent<HTMLInputElement>): void {
        throw new Error("Function not implemented.");
      } } toggleTheme={function (): void {
        throw new Error("Function not implemented.");
      } } theme={""} exportData={function (): void {
        throw new Error("Function not implemented.");
      } } />

      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Available Cars</h2>
        {/* Export Button */}
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-full shadow-lg">
          Export
        </button>
      </div>

      {/* Listings */}
      <div className="grid grid-cols-2 gap-6">
        {cars.map((car, index) => (
          <CarCard key={index} car={car} />
        ))}
      </div>
    </div>
  );
};

export default ListingPage;
