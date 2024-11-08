import React from 'react';
import CarCard from './CarCards';

interface CarTrackingListProps {
  cars: any[];
  onSelectCar: (car: any) => void;
}

const CarTrackingList: React.FC<CarTrackingListProps> = ({ cars, onSelectCar }) => {
  const calculateDurationInDays = (bookingDate: string, returnDate: string) => {
    const booking = new Date(bookingDate);
    const returnD = new Date(returnDate);
    const differenceInTime = returnD.getTime() - booking.getTime();
    return Math.ceil(differenceInTime / (1000 * 3600 * 24)); // Convert ms to days
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="font-semibold text-lg mb-4">Car Tracking</h3>
      <div className="space-y-4">
        {cars?.map((vehicle) => {
          const status = vehicle.total_amount > 499000 ? "For Sell" : "For Ride";
          const duration = status === "For Sell"
            ? "Bought by User"
            : `${calculateDurationInDays(vehicle.booking_date, vehicle.return_date)} days`;

          return (
            <div onClick={() => onSelectCar(vehicle)} key={vehicle.id}>
              <CarCard
                imageUrl={vehicle.vehicle.image}
                carName={vehicle.vehicle.vehicle_specs.manufacturer}
                status={status}
                time={vehicle.booking_date}
                location={vehicle.location || "Nairobi CBD"}
                duration={duration}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CarTrackingList;
