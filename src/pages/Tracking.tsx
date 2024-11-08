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

  const handleSelectCar = (car: any) => {
    setSelectedCar(car === selectedCar ? null : car); // Toggle selection
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Topbar />
      <PageHeader />

      <div className="grid grid-cols-12 gap-6 mt-6">
        {/* Car List Section */}
        <div className="col-span-4">
          <CarTrackingList cars={filteredCars} selectedCar={selectedCar} onSelectCar={handleSelectCar} />
        </div>

        {/* Car Details Section */}
        <div className="col-span-8">
  {selectedCar ? (
    <>
      <CarDetails
        carName={selectedCar.vehicle.vehicle_specs.manufacturer}
        imageUrl={selectedCar.vehicle.image}
        features={selectedCar.vehicle.vehicle_specs.features || []}
      />
      
      {/* Additional Information */}
      <div className="mt-6">
        <div className="grid grid-cols-2 gap-6">
          {/* Booking Details */}
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Booking Details</h3>
            <p><strong>Booking Status:</strong> {selectedCar.booking_status}</p>
            <p><strong>Rental Period:</strong> {selectedCar.start_date} - {selectedCar.end_date}</p>
            <p><strong>Payment Status:</strong> {selectedCar.payment_status}</p>
          </div>

          {/* Related Cars */}
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Other Cars You Might Like</h3>
            <div className="grid grid-cols-2 gap-4">
              {filteredCars.map((car) => (
                <div key={car.id} className="bg-gray-200 p-4 rounded-lg shadow-md">
                  <img src={car.vehicle.image} alt={car.vehicle.vehicle_specs.manufacturer} className="w-full h-32 object-cover rounded-md" />
                  <h4 className="text-lg font-semibold mt-2">{car.vehicle.vehicle_specs.manufacturer}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <div className="text-gray-500 text-center mt-4">Select a car to view details</div>
  )}
</div>

      </div>
    </div>
  );
};

export default Tracking;

