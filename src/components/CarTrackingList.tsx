import CarCard from './CarCards';

const CarTrackingList: React.FC = () => {
  return (
    <div className="col-span-4 bg-white rounded-lg shadow-md p-4">
      <h3 className="font-semibold text-lg mb-4">Car Tracking</h3>

      {/* Car List */}
      <div className="space-y-4">
        <CarCard
            imageUrl='https://i.pinimg.com/736x/3a/a4/6a/3aa46aaba45e09ff09403b42a6127390.jpg'
          carName="Panamera Platinum"
          status="For Ride"
          time="18, Sep 2h 15 min"
          location="Jamshera Nagar, Block D"
          duration="10:00 AM - 12:55 PM"
        />
        <CarCard
            imageUrl='https://i.pinimg.com/236x/52/9b/d9/529bd97eb57cd455f44f21d37a0e00e2.jpg'
          carName="Bentley Spur"
          status="For Ride"
          time="17, Sep 2h 15 min"
          location="Location B"
          duration="10:00 AM - 12:55 PM"
        />
        <CarCard
          imageUrl='https://i.pinimg.com/236x/9b/c6/56/9bc6562f34636ce4fdb3fb91bdecbec0.jpg'
          carName="Hyundai Turbo"
          status="For Ride"
          time="17, Sep 2h 15 min"
          location="Location C"
          duration="10:00 AM - 12:55 PM"
        />
        {/* Add more cars similarly */}
        <CarCard
            imageUrl='https://i.pinimg.com/564x/5e/6a/cc/5e6accca7c31b356a19fa427c3c3038e.jpg'
            carName="Audi Q7"
            status="For Ride"
            time="17, Sep 2h 15 min"
            location="Location D"
            duration="10:00 AM - 12:55 PM"
            />
            <CarCard
            imageUrl='https://i.pinimg.com/236x/2b/38/5a/2b385a8c1232933969a2628676c76135.jpg'
            carName="Lamborghini Aventador"
            status="For Ride"
            time="17, Sep 2h 15 min"
            location="Location C"
            duration="10:00 AM - 12:55 PM"
            />
      </div>
    </div>
  );
};

export default CarTrackingList;
