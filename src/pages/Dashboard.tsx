import React, { useState } from 'react';
import TopBar from '../components/TopBar';
import InfoBlock from '../components/InfoBlock';
import CarCard from '../components/CarCard';
import ActivityCard from '../components/ActivityCard';
import UserInfoCard from '../components/UserInfoCard'; // Import UserInfoCard
import { exportData } from '../utils/ExportData'; // assuming exportData is moved into utils folder

const Dashboard = () => {
  const [theme, setTheme] = useState('light');
  const [searchQuery, setSearchQuery] = useState('');

  const cars = [
    { name: 'Audi R8 Green', style: 'Audi', type: 'Auto', color: 'Green', price: '$285,892', imageUrl: 'https://via.placeholder.com/200x150' },
    { name: 'Bentley Flying Spur', style: 'Bentley', type: 'Petrol', color: 'Brown', price: '$358,174', imageUrl: 'https://via.placeholder.com/200x150' },
    { name: 'Lamborghini Aventador', style: 'Lamborghini', type: 'Auto', color: 'Yellow', price: '$420,000', imageUrl: 'https://via.placeholder.com/200x150' },
    { name: 'Porsche 911 Turbo', style: 'Porsche', type: 'Auto', color: 'Red', price: '$200,000', imageUrl: 'https://via.placeholder.com/200x150' },
    { name: 'BMW M5', style: 'BMW', type: 'Manual', color: 'Blue', price: '$110,000', imageUrl: 'https://via.placeholder.com/200x150' },
    { name: 'Tesla Model S', style: 'Tesla', type: 'Electric', color: 'White', price: '$120,000', imageUrl: 'https://via.placeholder.com/200x150' },
  ];

  const toggleTheme = () => setTheme(theme === 'light' ? 'yellow' : 'light');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value);

  const filteredCars = cars.filter(car =>
    car.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const userInfo = {
    name: 'Steven Robert',
    locationFrom: 'Georgia, 25 Mile',
    locationTo: '106 Saint Laurence, UK',
    distance: '48 KM',
    duration: '2h 15m',
    fuel: '12 Liters',
    passengers: '4 Person',
    average: 'Average',
    imageUrl: 'https://via.placeholder.com/100x100',
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

      <div className="mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-500">Get your latest update for the last 7 days</p>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-4">
          <InfoBlock label="Location" value="GBT, Mail Quishan" />
          <InfoBlock label="Pick-up Date" value="06-Sep-2023" />
          <InfoBlock label="Drop-off Date" value="06-Sep-2023" />
          <InfoBlock label="Pick-up Time" value="10:00 AM" />
          <InfoBlock label="Drop-off Time" value="05:00 PM" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="col-span-1 lg:col-span-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Available Cars</h2>
              <button className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                Filter by
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCars.length ? filteredCars.map((car, index) => (
                <CarCard
                  key={index}
                  name={car.name}
                  style={car.style}
                  type={car.type}
                  color={car.color}
                  price={car.price}
                  imageUrl={car.imageUrl}
                />
              )) : (
                <p className="text-center col-span-3">No cars found</p>
              )}
            </div>
          </div>
        </div>

        <div className="col-span-1 lg:col-span-4">
          <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <ActivityCard
              carName="Lamborghini Autofill"
              price="$194,714"
              imageUrl="https://via.placeholder.com/80x50"
            />
          </div>

          {/* Add UserInfoCard below Recent Activities */}
          <UserInfoCard
            name={userInfo.name}
            locationFrom={userInfo.locationFrom}
            locationTo={userInfo.locationTo}
            distance={userInfo.distance}
            duration={userInfo.duration}
            fuel={userInfo.fuel}
            passengers={userInfo.passengers}
            average={userInfo.average}
            imageUrl={userInfo.imageUrl}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
