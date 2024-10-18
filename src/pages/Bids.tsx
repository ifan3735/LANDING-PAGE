import { useState } from 'react';
import TopBar from '../components/TopBar';
import { exportData } from '../utils/ExportData';
import { FaBars, FaChevronDown, FaFileExport } from 'react-icons/fa';
import  Bid from '../components/Bids';
import CarDetailView from '../components/CarDetailView';

const Bids = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [theme, setTheme] = useState('light');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState({
    type: '',
    color: '',
    style: '',
  });

  const [selectedCar, setSelectedCar] = useState<any>(null); // State for selected car

  const handleCarClick = (car: any) => {
    setSelectedCar(car);
  };

  const handleBack = () => {
    setSelectedCar(null);
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
      price: '285',
      bidPrice: '300000',
      rto: 'KA-01-2021',
      image: 'https://i.pinimg.com/564x/2c/0d/02/2c0d024d449d8f88e6844caba4748b87.jpg',
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
      style: 'Luxury',
      price: '285',
      bidPrice: '300000',
      rto: 'KA-01-2021',
      image: 'https://i.pinimg.com/564x/2c/0d/02/2c0d024d449d8f88e6844caba4748b87.jpg',
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
      style: 'Luxury',
      price: '295',
      bidPrice: '300000',
      rto: 'KA-01-2021',
      image: 'https://i.pinimg.com/564x/7f/e6/18/7fe6180f6786437e40174509b3eadd8b.jpg',
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
      price: '285',
      bidPrice: '300000',
      style: 'Luxury',
      rto: 'KA-01-2021',
      image: 'https://i.pinimg.com/564x/7f/e6/18/7fe6180f6786437e40174509b3eadd8b.jpg',
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
      price: '295',
      bidPrice: '300000',
      rto: 'KA-01-2021',
      style: 'Luxury',
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
      style: 'Luxury',
      price: '285',
      bidPrice: '300000',
      rto: 'KA-01-2021',
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
      price: '295',
      style: 'Luxury',
      bidPrice: '300000',
      rto: 'KA-01-2021',
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
      price: '285',
      bidPrice: '300000',
      style: 'Luxury',
      rto: 'KA-01-2021',
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
      price: '295',
      bidPrice: '300000',
      rto: 'KA-01-2021',
      image: 'https://i.pinimg.com/736x/3a/a4/6a/3aa46aaba45e09ff09403b42a6127390.jpg',
      owner: 'Robert Rome',
      ownerAvatar: 'https://i.pinimg.com/236x/d2/d2/f8/d2d2f8210f500b3e859d8f282e3d0e9b.jpg',
      carType: 'Coupe',
      dateListed: '26 Jun',
      style: 'Luxury',
    },
    {
      name: 'BMW i4',
      mileage: '3690',
      fuelType: 'Petrol',
      location: 'Dubai',
      speed: '15.5 km/h',
      price: '285',
      bidPrice: '300000',
      rto: 'KA-01-2021',
      image: 'https://i.pinimg.com/564x/5a/e8/d6/5ae8d6218c3c6a9296936347fc2c2eef.jpg',
      owner: 'Hussain Jahan',
      ownerAvatar: 'https://i.pinimg.com/236x/82/cc/d6/82ccd6e43a3334813015ec3247aeca7d.jpg',
      carType: 'Luxury',
      dateListed: '25 Jun',
      style: 'Luxury',
    }
    // Add more cars as needed
  ];

  const toggleTheme = () => setTheme(theme === 'light' ? 'yellow' : 'light');

  const toggleFilters = () => setShowFilters(!showFilters);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSelectedFilter((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };
  const filteredCars = cars.filter(car => {
    const matchesSearch = car.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedFilter.type ? car.type === selectedFilter.type : true;
    const matchesColor = selectedFilter.color ? car.color === selectedFilter.color : true;
    const matchesStyle = selectedFilter.style ? car.style === selectedFilter.style : true;
    return matchesSearch && matchesType && matchesColor && matchesStyle;
  });
  const toggleFilterDropdown = () => setShowFilterDropdown(!showFilterDropdown);

  const toggleExportDropdown = () => setShowDropdown(!showDropdown);

  const exportAsCSV = () => {
    const headers = "Name,Style,Type,Color,Price\n";
    const rows = filteredCars
      .map((Vehicle) => `${Vehicle.vehicle_specs.model},${Vehicle.vehicle_specs.manufacturer},${Vehicle.fuel_type},${Vehicle.color},${Vehicle.rental_rate}`)
      .join("\n");
      const csvContent = headers + rows;
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = "cars_export.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportAsPDF = () => {
    const doc = new jsPDF();
    let content = "Name, Style, Type, Color, Price\n";
    filteredCars.forEach((Vehicle, index) => {
      content += `${index + 1}. ${Vehicle.vehicle_specs.model}, ${Vehicle.vehicle_specs.manufacturer}, ${Vehicle.fuel_type}, ${Vehicle.color}, ${Vehicle.rental_rate}\n`;
    });
    doc.text(content, 10, 10);
    doc.save("cars_export.pdf");
  };

  return (
    <div className={`transition-all duration-500 p-6 ${theme === 'yellow' ? 'bg-yellow-100 text-gray-900' : 'bg-gray-100 text-gray-900'} min-h-screen`}>
      <TopBar
        searchQuery={searchQuery}
        handleSearch={handleSearch}
        toggleTheme={toggleTheme}
        theme={theme}
        exportData={() => exportData(filteredCars)}
      />

        {selectedCar ? (
          <CarDetailView car = {selectedCar} onBack = {handleBack} />
        ) : (
          <>
      <div className="flex justify-between items-center my-6">
        {/* Left Section: Header and Paragraph */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Active Bids</h2>
          <p className="text-sm text-gray-600">
            Get your latest update for the past 7 days
          </p>
        </div>

        {/* Right Section: Export Button with Dropdown */}
        <div className="relative">
          <button
            onClick={toggleExportDropdown}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center"
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
                  onClick={exportAsCSV}
                >
                  Export as CSV
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={exportAsPDF}
                >
                  Export as PDF
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Auction</h2>

            <div className="relative">
              <button
                onClick={toggleFilters}
                className="border border-blue-500 text-blue-500 px-4 py-2 rounded-full shadow-lg flex items-center"
              >
                <FaBars className="mr-2" /> Filter by
              </button>

              {showFilters && (
                <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg">
                  <div className="p-4">
                    <label className="block text-gray-700">Type</label>
                    <select
                      name="type"
                      value={selectedFilter.type}
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
                      value={selectedFilter.color}
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
                      value={selectedFilter.style}
                      onChange={handleFilterChange}
                      className="border rounded-lg w-full p-2 mt-1"
                    >
                      <option value="">All Styles</option>
                      <option value="SUV">SUV</option>
                      <option value="Convertible">Convertible</option>
                      <option value="Hatchback">Hatchback</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {filteredCars.map((car, index) => (
          <Bid
            key={index}
            name={car.name}
            imageUrl={car.image}
            location={car.location}
            style={car.style}
            rto={car.rto}
            spend={car.speed}
            price={car.price}
            bidPrice={car.bidPrice}
            onClick={() => handleCarClick(car)}
          />
        ))}
      </div>
      </>
        )}
      </div>
  );
};

export default Bids;
