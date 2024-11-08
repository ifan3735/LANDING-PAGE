import React from 'react';
import CarCard from './CarCards';
import { useFetchAllBookingsQuery } from '../features/API';

const CarTrackingList: React.FC = () => {
  const { data, error, isLoading } = useFetchAllBookingsQuery();
  console.log(data);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  const filteredCars = data?.filter((booking) => booking.user_id == localStorage.getItem('userId'));
  console.log(filteredCars, 'filteredCars');

  // Helper function to calculate the duration in days
  const calculateDurationInDays = (bookingDate: string, returnDate: string) => {
    const booking = new Date(bookingDate);
    const returnD = new Date(returnDate);
    const differenceInTime = returnD.getTime() - booking.getTime();
    return Math.ceil(differenceInTime / (1000 * 3600 * 24)); // Convert ms to days
  };

  return (
    <div className="col-span-4 bg-white rounded-lg shadow-md p-4">
      <h3 className="font-semibold text-lg mb-4">Car Tracking</h3>
      <div className="space-y-4">
        {filteredCars?.map((vehicle) => (
          <CarCard
            key={vehicle.id} // Assuming each booking has a unique `id`
            imageUrl={vehicle.vehicle.image} // Replace with correct property from the API data
            carName={vehicle.vehicle.vehicle_specs.manufacturer} // Replace with correct property from the API data
            status={vehicle.total_amount > 499000 ? "For Sell" : "For Ride"} 
            time={vehicle.booking_date} // Replace with correct property from the API data
            location={vehicle.location || "Nairobi CBD"} // Replace with correct property from the API data
            duration={`${calculateDurationInDays(vehicle.booking_date, vehicle.return_date)} days`} // Calculated duration in days
          />
        ))}
      </div>
    </div>
  );
};

export default CarTrackingList;
