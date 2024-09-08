import TopBar from "../components/TopBar"; // Importing the TopBar component
import { FaMapMarkerAlt, FaGasPump, FaTachometerAlt, FaChevronDown, FaBars, FaFileExport } from "react-icons/fa"; // Importing icons
import { useState } from "react"; // To handle dropdown toggle

// CarCard Component
const CarCard = ({ car }: { car: any }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-row space-x-4 w-full max-w-lg">
      {/* Car Image Section (centralized) */}
      <div className="flex items-center">
        <img
          src={car.image}
          alt={car.name}
          className="w-40 h-24 rounded-lg object-cover"
        />
      </div>

      {/* Car Information Section */}
      <div className="flex-1 flex flex-col justify-center">
        {/* Owner Section */}
        <div className="flex items-center space-x-3 mb-3">
          <img
            src={car.ownerAvatar}
            alt={car.owner}
            className="w-12 h-12 rounded-full border-2 border-green-500"
          />
          <div>
            <p className="font-semibold text-gray-700">{car.owner}</p>
            <p className="text-sm text-gray-500">{car.dateListed}</p>
          </div>
        </div>

        {/* Car Name */}
        <h3 className="font-semibold text-lg text-gray-700 mb-1">{car.name}</h3>

        {/* Car Details */}
        <div className="text-sm text-gray-500 mb-2">
          {/* Mileage, Fuel Type, Location (on the same line) */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <FaTachometerAlt className="text-blue-500" /> {/* Blue icon */}
              <p>{car.mileage} KM</p>
            </div>
            <div className="flex items-center space-x-1">
              <FaGasPump className="text-blue-500" /> {/* Blue icon */}
              <p>{car.fuelType}</p>
            </div>
            <div className="flex items-center space-x-1">
              <FaMapMarkerAlt className="text-blue-500" /> {/* Blue icon */}
              <p>{car.location}</p>
            </div>
          </div>

          {/* Car Style, RTO, Speed (on the same line) */}
          <div className="flex items-center space-x-4 mt-2">
            <p>Style: {car.carType}</p>
            <p>RTO: Pending</p> {/* Assuming RTO is "Pending" */}
            <p>Speed: {car.speed}</p>
          </div>
        </div>

        {/* Price Section */}
        <div className="flex justify-between items-center">
          <p className="font-bold text-lg text-blue-500">${car.price}</p>
        </div>
      </div>
    </div>
  );
};

// ListingPage Component
const ListingPage = () => {
  const [showDropdown, setShowDropdown] = useState(false); // To toggle export dropdown
  const [showFilters, setShowFilters] = useState(false);   // To toggle filter options
  const [theme, setTheme] = useState('light');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    type: '',
    color: '',
    style: '',
  });

  const toggleTheme = () => setTheme(theme === 'light' ? 'yellow' : 'light');
  const toggleExportDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value);
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const cars = [
    {
      name: 'Hyundai S Turbo uMT',
      mileage: '1028',
      fuelType: 'Petrol',
      location: 'Dubai',
      speed: '15.5 km/h',
      type: 'Sedan',
      color: 'Red',
      style: 'Luxury',
      price: '285,892',
      image: 'https://i.pinimg.com/236x/82/13/d4/8213d4153999a8f134425b6fd59e9bcd.jpg',
      owner: 'Jonson Hussain',
      ownerAvatar: 'https://i.pinimg.com/236x/af/9f/1f/af9f1fed99621ae20f9edd2ab6cbb8bd.jpg',
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
      ownerAvatar: 'https://i.pinimg.com/236x/2a/7d/4c/2a7d4c4bc1381a476b8b8a85885ac392.jpg',
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
      image: 'https://i.pinimg.com/1200x/e1/06/07/e1060739e7e16b2f935ec364c77cddcd.jpg',
      owner: 'Robert Rome',
      ownerAvatar: 'https://i.pinimg.com/236x/ad/15/5b/ad155b4cfd5b6d220c3e5b51b349a37a.jpg',
      carType: 'Coupe',
      dateListed: '26 Jun',
    },
    {
      name: 'Mercedes Benz EQS',
      mileage: '3690',
      fuelType: 'Petrol',
      location: 'Dubai',
      speed: '15.5 km/h',
      price: '285,892',
      image: 'https://i.pinimg.com/736x/49/b0/f8/49b0f8024e0eddb463b3a83e48ae0da6.jpg',
      owner: 'Hussain Jahan',
      ownerAvatar: 'https://i.pinimg.com/236x/2e/3e/fd/2e3efdc0486a8858f9e0471eee3f68e5.jpg',
      carType: 'Luxury',
      dateListed: '25 Jun',
    },
    {
      name: 'Audi Q4 e-tron',
      mileage: '369',
      fuelType: 'Petrol',
      location: 'Dubai',
      speed: '15.5 km/h',
      price: '295,892',
      image: 'https://i.pinimg.com/236x/47/8b/f6/478bf61e4712ba383a76118a6558bfd4.jpg',
      owner: 'Robert Rome',
      ownerAvatar: 'https://i.pinimg.com/236x/f9/58/e4/f958e4ad039823fdc0e5aaa45aae278d.jpg',
      carType: 'Coupe',
      dateListed: '26 Jun',
    },
    {
      name: 'Toyota Corolla Cross',
      mileage: '3690',
      fuelType: 'Petrol',
      location: 'Dubai',
      speed: '15.5 km/h',
      price: '285,892',
      image: 'https://i.pinimg.com/564x/7f/e6/18/7fe6180f6786437e40174509b3eadd8b.jpg',
      owner: 'Hussain Jahan',
      ownerAvatar: 'https://i.pinimg.com/236x/78/f1/fa/78f1faef59b24ecc67f1dbef3ddc32ac.jpg',
      carType: 'Luxury',
      dateListed: '25 Jun',
    },
    {
      name: 'BMW i4',
      mileage: '369',
      fuelType: 'Petrol',
      location: 'Dubai',
      speed: '15.5 km/h',
      price: '295,892',
      image: 'https://i.pinimg.com/564x/5b/cc/d0/5bccd0713bc5c9039393f0bc7ba73d45.jpg',
      owner: 'Robert Rome',
      ownerAvatar: 'https://i.pinimg.com/236x/8b/85/75/8b8575ca1ecb184466a32b228dbeb3f7.jpg',
      carType: 'Coupe',
      dateListed: '26 Jun',
    },
    {
      name: 'Audi Q4 e-tron',
      mileage: '3690',
      fuelType: 'Petrol',
      location: 'Dubai',
      speed: '15.5 km/h',
      price: '285,892',
      image: 'https://i.pinimg.com/564x/2c/0d/02/2c0d024d449d8f88e6844caba4748b87.jpg',
      owner: 'Hussain Jahan',
      ownerAvatar: 'https://i.pinimg.com/236x/03/eb/d6/03ebd625cc0b9d636256ecc44c0ea324.jpg',
      carType: 'Luxury',
      dateListed: '25 Jun',
    },
    {
      name: 'Toyota Corolla Cross',
      mileage: '369',
      fuelType: 'Petrol',
      location: 'Dubai',
      speed: '15.5 km/h',
      price: '295,892',
      image: 'https://i.pinimg.com/736x/3a/a4/6a/3aa46aaba45e09ff09403b42a6127390.jpg',
      owner: 'Robert Rome',
      ownerAvatar: 'https://i.pinimg.com/236x/d2/d2/f8/d2d2f8210f500b3e859d8f282e3d0e9b.jpg',
      carType: 'Coupe',
      dateListed: '26 Jun',
    },
    {
      name: 'BMW i4',
      mileage: '3690',
      fuelType: 'Petrol',
      location: 'Dubai',
      speed: '15.5 km/h',
      price: '285,892',
      image: 'https://i.pinimg.com/564x/5a/e8/d6/5ae8d6218c3c6a9296936347fc2c2eef.jpg',
      owner: 'Hussain Jahan',
      ownerAvatar: 'https://i.pinimg.com/236x/82/cc/d6/82ccd6e43a3334813015ec3247aeca7d.jpg',
      carType: 'Luxury',
      dateListed: '25 Jun',
    }
    // Add more cars as needed
  ];

  const filteredCars = cars.filter(car => {
    const matchesSearch = car.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedFilters.type ? car.type === selectedFilters.type : true;
    const matchesColor = selectedFilters.color ? car.color === selectedFilters.color : true;
    const matchesStyle = selectedFilters.style ? car.style === selectedFilters.style : true;
    return matchesSearch && matchesType && matchesColor && matchesStyle;
  });

  return (
    <div className={`flex-1 p-6 bg-gray-50 ${theme === 'yellow' ? 'bg-yellow-100 text-gray-900' : 'bg-gray-100 text-gray-900'} min-h-screen`}>
      {/* Top Bar */}
      <TopBar
        searchQuery={searchQuery}
        handleSearch={handleSearch}
        toggleTheme={toggleTheme}
        theme={theme}
        exportData={() => {
          // Implement export functionality here
          console.log("Data exported");
        }}
      />

      {/* New Layer Below Top Bar */}
      <div className="flex justify-between items-center my-6">
        {/* Left Section: Header and Paragraph */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Listings</h2>
          <p className="text-sm text-gray-600">
            Get your latest update for the past 7 days
          </p>
        </div>

        {/* Right Section: Export Button with Dropdown */}
        <div className="relative">
          <button
            onClick={toggleExportDropdown}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center"
          >
            <FaFileExport className="mr-2" /> Export
            <FaChevronDown className="ml-2" />
          </button>

          {/* Export Dropdown */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
              <ul>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => console.log("Export as CSV")}
                >
                  Export as CSV
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => console.log("Export as PDF")}
                >
                  Export as PDF
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Another Layer: Available Cars and Filter Button */}
      <div className="flex justify-between items-center mb-6">
        {/* Available on the Left */}
        <h2 className="text-xl font-semibold">Available Cars</h2>

        {/* Filter by Button on the Right */}
        <div className="relative">
          <button
            onClick={toggleFilters}
            className="border border-blue-500 text-blue-500 px-4 py-2 rounded-full shadow-lg flex items-center"
          >
            <FaBars className="mr-2" /> Filter by
          </button>

          {/* Filter Dropdown */}
          {showFilters && (
            <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg">
              <div className="p-4">
                <label className="block text-gray-700">Type</label>
                <select
                  name="type"
                  value={selectedFilters.type}
                  onChange={handleFilterChange}
                  className="border rounded-lg w-full p-2 mt-1"
                >
                  <option value="">All Types</option>
                  <option value="Sedan">Sedan</option>
                  <option value="Luxury">Luxury</option>
                  <option value="Coupe">Coupe</option>
                </select>
              </div>
              <div className="p-4 border-t">
                <label className="block text-gray-700">Color</label>
                <select
                  name="color"
                  value={selectedFilters.color}
                  onChange={handleFilterChange}
                  className="border rounded-lg w-full p-2 mt-1"
                >
                  <option value="">All Colors</option>
                  <option value="Red">Red</option>
                  <option value="Blue">Blue</option>
                  <option value="Black">Black</option>
                </select>
              </div>
              <div className="p-4 border-t">
                <label className="block text-gray-700">Style</label>
                <select
                  name="style"
                  value={selectedFilters.style}
                  onChange={handleFilterChange}
                  className="border rounded-lg w-full p-2 mt-1"
                >
                  <option value="">All Styles</option>
                  <option value="Luxury">Luxury</option>
                  <option value="Sport">Sport</option>
                  <option value="Classic">Classic</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Listings */}
      <div className="grid grid-cols-2 gap-6">
        {filteredCars.map((car, index) => (
          <CarCard key={index} car={car} />
        ))}
      </div>
    </div>
  );
};

export default ListingPage;
