import React, { useState } from 'react';
import Topbar from '../components/TopBar';
import PageHeader from '../components/PageHeader';
import CarTrackingList from '../components/CarTrackingList';
import CarDetails from '../components/CarDetails';
import { useFetchAllBookingsQuery } from '../features/API';

const Tracking: React.FC = () => {
  const { data, error, isLoading } = useFetchAllBookingsQuery();
  const [selectedCar, setSelectedCar] = useState<any>(null);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  const filteredCars = data?.filter((booking) => booking.user_id == localStorage.getItem('userId'));

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Topbar />
      <PageHeader />

      <div className="grid grid-cols-12 gap-6 mt-6">
        {/* Car List Section */}
        <div className="col-span-4">
          <CarTrackingList cars={filteredCars} onSelectCar={setSelectedCar} />
        </div>

        {/* Car Details Section */}
        <div className="col-span-8">
          {selectedCar ? (
            <CarDetails
              carName={selectedCar.vehicle.vehicle_specs.manufacturer}
              imageUrl={selectedCar.vehicle.image}
            />
          ) : (
            <div className="text-gray-500 text-center mt-4">Select a car to view details</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tracking;
