import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faCalendarAlt, faCar } from '@fortawesome/free-solid-svg-icons';

const HowItWorks = () => {
  return (
    <section className="bg-yellow-50 py-12">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">How it Works</h2>
        <div className="flex justify-center space-x-8">
          <div className="flex flex-col items-center">
            <div className="bg-gray-200 p-4 rounded-full mb-4">
              <FontAwesomeIcon icon={faMapMarkerAlt} size="2x" className="text-teal-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Choose Location</h3>
            <p className="text-gray-600">Select your pick-up and drop-off points.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-orange-200 p-4 rounded-full mb-4">
              <FontAwesomeIcon icon={faCalendarAlt} size="2x" className="text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Pick-Up Date</h3>
            <p className="text-gray-600">Choose the date and time for your pick-up.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-gray-200 p-4 rounded-full mb-4">
              <FontAwesomeIcon icon={faCar} size="2x" className="text-teal-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Book Your Car</h3>
            <p className="text-gray-600">Reserve your car and enjoy your ride.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
