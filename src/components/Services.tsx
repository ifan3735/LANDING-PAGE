import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faCalendarAlt, faCogs, faHeadset } from '@fortawesome/free-solid-svg-icons';
import Footer from './Footer';
import Header from './Header';

import { Link } from 'react-router-dom';

const Services: React.FC = () => {
  return (
    <div>
      <Header />
      <div className="bg-gradient-to-b from-gray-100 to-white py-20 px-6">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-800">Drive Your Dream Car Today with Lurex</h1>
          <p className="mt-4 text-lg text-gray-600">Offering a wide range of vehicles to meet all your needs—luxury, economy, and everything in between.</p>
          <div className="mt-8 flex justify-center space-x-4">
            <button className="px-8 py-3 bg-yellow-500 text-white font-semibold rounded-md shadow-md">Explore Our Fleet</button>
            <button className="px-8 py-3 bg-gray-800 text-white font-semibold rounded-md shadow-md">Get a Quote</button>
          </div>
        </div>

        {/* Services Overview */}
        <div className="mt-20 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Service 1 */}
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <FontAwesomeIcon icon={faCalendarAlt} size="3x" className="text-yellow-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">Easy & Fast Car Booking</h3>
            <p className="mt-2 text-gray-600">Reserve your vehicle in minutes with our user-friendly booking system.</p>
          </div>
          {/* Service 2 */}
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <FontAwesomeIcon icon={faCogs} size="3x" className="text-yellow-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">Comprehensive Fleet Management</h3>
            <p className="mt-2 text-gray-600">Manage your rentals with real-time tracking and reporting.</p>
          </div>
          {/* Service 3 */}
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <FontAwesomeIcon icon={faCar} size="3x" className="text-yellow-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">Luxury & Exotic Car Rentals</h3>
            <p className="mt-2 text-gray-600">Choose from our selection of high-end vehicles for a truly special experience.</p>
          </div>
          {/* Service 4 */}
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <FontAwesomeIcon icon={faHeadset} size="3x" className="text-yellow-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">24/7 Customer Support</h3>
            <p className="mt-2 text-gray-600">We're here to assist you any time of the day or night.</p>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="mt-20 max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800">Why Choose Lurex?</h2>
          <p className="mt-4 text-lg text-gray-600">Experience the best car rental services with unmatched quality and convenience.</p>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Competitive Pricing</h3>
              <p className="mt-2 text-gray-600">Get the best rates for high-quality vehicles.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Wide Range of Vehicles</h3>
              <p className="mt-2 text-gray-600">From economy to luxury, we have something for everyone.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Reliable Service</h3>
              <p className="mt-2 text-gray-600">Trust us to provide a seamless rental experience.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Flexible Rentals</h3>
              <p className="mt-2 text-gray-600">Short-term or long-term rentals, customized to your needs.</p>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mt-20 bg-gray-100 py-20">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-800">What Our Customers Say</h2>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {/* Testimonial 1 */}
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <p className="text-gray-600">"Lurex made our vacation so much better! The luxury car we rented was spotless and the service was exceptional."</p>
                <h4 className="mt-4 text-lg font-semibold text-gray-800">John Doe</h4>
              </div>
              {/* Testimonial 2 */}
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <p className="text-gray-600">"I needed a car last minute and Lurex delivered! The process was smooth and hassle-free."</p>
                <h4 className="mt-4 text-lg font-semibold text-gray-800">Jane Smith</h4>
              </div>
              {/* Testimonial 3 */}
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <p className="text-gray-600">"Amazing service! The booking process was quick, and the car was exactly what I needed."</p>
                <h4 className="mt-4 text-lg font-semibold text-gray-800">Mark Wilson</h4>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="mt-8 flex justify-center space-x-4">
  <Link 
    to="/register" 
    className="px-8 py-3 bg-yellow-500 text-white font-semibold rounded-md shadow-md hover:bg-yellow-600 transition duration-300 ease-in-out"
  >
    Start Your Journey with Lurex
  </Link>
  <Link 
    to="/contact" 
    className="px-8 py-3 bg-gray-800 text-white font-semibold rounded-md shadow-md hover:bg-gray-900 transition duration-300 ease-in-out"
  >
    Contact Us Today
  </Link>
</div>

      </div>
      <Footer />
    </div>
  );
};

export default Services;
