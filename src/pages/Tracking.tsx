import React, { useState } from 'react';
import Topbar from '../components/TopBar'; // Assuming Topbar is already built
import PageHeader from '../components/PageHeader';
import CarTrackingList from '../components/CarTrackingList';
import CarDetails from '../components/CarDetails';
import RouteDetails from '../components/RouteDetails';
import { useFetchAllBookingsQuery } from '../features/API';

const Tracking: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false); // To toggle export dropdown
  const [theme, setTheme] = useState('light');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleTheme = () => setTheme(theme === 'light' ? 'yellow' : 'light');
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value);
  const toggleExportDropdown = () => setShowDropdown(!showDropdown);

  return (
    <div className={`transition-all duration-500 p-6 ${theme === 'yellow' ? 'bg-yellow-100 text-gray-900' : 'bg-gray-100 text-gray-900'} min-h-screen`}>
      {/* Topbar */}
      <Topbar 
        searchQuery={searchQuery}
        handleSearch={handleSearch}
        toggleTheme={toggleTheme}
        theme={theme}
      />

      {/* Page Header */}
      <PageHeader toggleExportDropdown={toggleExportDropdown} showDropdown={showDropdown} />

      {/* Main Content */}
      <div className="grid grid-cols-12 gap-6">
        {/* Car Tracking List */}
        <CarTrackingList />

        {/* Car Details & Route */}
        <div className="col-span-8 space-y-6">
          <CarDetails
            carName="Panamera Platinum"
            imageUrl="https://i.pinimg.com/564x/b9/6c/cc/b96ccc62ba9c2306b35dc6882c535892.jpg"
          />
          <RouteDetails />
        </div>
      </div>
    </div>
  );
};

export default Tracking;
