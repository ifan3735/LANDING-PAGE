import React from 'react';
import CarCard from './CarCards';
import { useFetchAllBookingsQuery } from '../features/API';

const CarTrackingList: React.FC = () => {
  const { data, error, isLoading } = useFetchAllBookingsQuery();
  console.log(data);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  // Filter data if needed, such as filtering based on a specific user ID
  const filteredCars = data?.filter((booking) => booking.user_id == localStorage.getItem('userId'));
  console.log(filteredCars, 'filteredCars');

  return (
    <div className="col-span-4 bg-white rounded-lg shadow-md p-4">
      <h3 className="font-semibold text-lg mb-4">Car Tracking</h3>
      <div className="space-y-4">
        {filteredCars?.map((vehicle) => (
          <CarCard
            key={vehicle.id} // Assuming each booking has a unique `id`
            imageUrl={vehicle.vehicle.image} // Replace with correct property from the API data
            carName={vehicle.vehicle.vehicle_specs.manufacturer} // Replace with correct property from the API data
            status={vehicle.status} // Replace with correct property from the API data
            time={vehicle.time} // Replace with correct property from the API data
            location={vehicle.location} // Replace with correct property from the API data
            duration={vehicle.duration} // Replace with correct property from the API data
          />
        ))}
      </div>
    </div>
  );
};

export default CarTrackingList;
