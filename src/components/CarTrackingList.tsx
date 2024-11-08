import React, { useState } from 'react';
import CarCard from './CarCards';
import { useFetchAllBookingsQuery } from '../features/API';
import CarDetails from './CarDetails';

const CarTrackingList: React.FC = () => {
  const { data, error, isLoading } = useFetchAllBookingsQuery();
  console.log(data);
  const [selectedCar, setSelectedCar] = useState<any>(null); // State to store selected car details


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
        {filteredCars?.map((vehicle) => {
          // Conditionally set status based on amount
          const status = vehicle.total_amount > 499000 ? "For Sell" : "For Ride";
          
          // Conditionally set duration text based on status
          const duration = status === "For Sell"
            ? "Bought by User"
            : `${calculateDurationInDays(vehicle.booking_date, vehicle.return_date)} days`;

          return (
            <div onClick={() => setSelectedCar(vehicle)} key={vehicle.id}>
            <CarCard
              key={vehicle.id} // Assuming each booking has a unique `id`
              imageUrl={vehicle.vehicle.image} // Replace with correct property from the API data
              carName={vehicle.vehicle.vehicle_specs.manufacturer} // Replace with correct property from the API data
              status={status} 
              time={vehicle.booking_date} // Replace with correct property from the API data
              location={vehicle.location || "Nairobi CBD"} // Replace with correct property from the API data
              duration={duration} // Display "Bought by User" or calculated duration in days
            />
          </div>
          );
        })}
      </div>
      {/* Car Details - displays details of the selected car */}
      <div className="col-span-8">
        {selectedCar ? (
          <CarDetails
            carName={selectedCar.vehicle.vehicle_specs.manufacturer}
            imageUrl={selectedCar.vehicle.image}
          />
        ) : (
          <div>Select a car to view details</div>
        )}
      </div>
    </div>
  );
};

export default CarTrackingList;
