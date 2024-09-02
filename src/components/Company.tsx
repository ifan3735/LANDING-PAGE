import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Company: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col justify-between">
      <Header />

      <div className="bg-gradient-to-b from-gray-50 to-gray-100 py-20 px-6 sm:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto text-center">
          {/* Brand Story */}
          <h1 className="text-5xl font-extrabold text-gray-800 mb-10">About <span className="text-yellow-600">Lurex</span></h1>
          <p className="text-lg text-gray-600 leading-relaxed mb-16">
            Welcome to <span className="text-gray-800 font-semibold">Lurex</span>, where we redefine luxury car rentals by combining cutting-edge technology with exceptional customer service. Since our inception, our mission has been to provide a seamless, luxurious, and reliable car rental experience.
          </p>

          {/* Value Proposition & Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="p-6 bg-yellow-50 rounded-lg shadow-lg hover:shadow-xl transition">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Luxury Fleet</h2>
              <p className="text-gray-600">Over 500 premium vehicles available for rental.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Global Reach</h2>
              <p className="text-gray-600">Serving customers in 20+ countries worldwide.</p>
            </div>
            <div className="p-6 bg-yellow-50 rounded-lg shadow-lg hover:shadow-xl transition">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Customer Satisfaction</h2>
              <p className="text-gray-600">95% customer satisfaction rate across all services.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Years of Experience</h2>
              <p className="text-gray-600">A decade of excellence in the car rental industry.</p>
            </div>
          </div>

          {/* Customer Testimonials */}
          <div className="mb-16">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">What Our Customers Say</h2>
            <div className="flex flex-col md:flex-row justify-center space-y-6 md:space-y-0 md:space-x-6">
              <blockquote className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
                <p className="text-gray-600 mb-4">"Lurex made our vacation unforgettable. The car was spotless, and the service was impeccable!"</p>
                <footer className="text-gray-800 font-semibold">- John D.</footer>
              </blockquote>
              <blockquote className="bg-yellow-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition">
                <p className="text-gray-600 mb-4">"Seamless booking and top-notch vehicles. Highly recommend Lurex for luxury car rentals."</p>
                <footer className="text-gray-800 font-semibold">- Sarah W.</footer>
              </blockquote>
              <blockquote className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
                <p className="text-gray-600 mb-4">"Outstanding service and a fantastic selection of cars. Lurex is my go-to rental service!"</p>
                <footer className="text-gray-800 font-semibold">- Michael B.</footer>
              </blockquote>
            </div>
          </div>

          {/* Meet the Team */}
          <div className="mb-16">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Meet the Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="p-6 bg-yellow-50 rounded-lg shadow-lg hover:shadow-xl transition text-center">
                <img src="https://i.pinimg.com/474x/a4/1b/48/a41b48051dc7bc32b8686260cc0fb4da.jpg" alt="CEO" className="w-24 h-24 rounded-full mx-auto mb-4"/>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Ifan Maina</h3>
                <p className="text-gray-600">Chief Executive Officer</p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition text-center">
                <img src="https://i.pinimg.com/236x/e7/27/b3/e727b38bc4a2340d4b772edd0864e5c1.jpg" alt="CTO" className="w-24 h-24 rounded-full mx-auto mb-4"/>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">John Smith</h3>
                <p className="text-gray-600">Chief Technology Officer</p>
              </div>
              <div className="p-6 bg-yellow-50 rounded-lg shadow-lg hover:shadow-xl transition text-center">
                <img src="https://i.pinimg.com/236x/24/91/0f/24910f726e8e849d73ba395a584181f0.jpg" alt="COO" className="w-24 h-24 rounded-full mx-auto mb-4"/>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Sarah Brown</h3>
                <p className="text-gray-600">Chief Operating Officer</p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition text-center">
                <img src="https://i.pinimg.com/236x/07/33/ba/0733ba760b29378474dea0fdbcb97107.jpg" alt="CFO" className="w-24 h-24 rounded-full mx-auto mb-4"/>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Mark Johnson</h3>
                <p className="text-gray-600">Chief Financial Officer</p>
              </div>
            </div>
          </div>

          {/* Our Vision & Mission */}
          <div className="bg-white shadow-lg rounded-lg p-10 mb-16">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              We envision a world where renting a car is no longer a hassle, but a seamless part of your journey. By leveraging cutting-edge technology and a customer-first approach, Lurex aims to become the global leader in car rentals, known for our exceptional service and commitment to excellence.
            </p>
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Join Us on the Road</h2>
            <p className="text-gray-600 leading-relaxed">
              Whether you're a frequent traveler or planning your first rental, Lurex is here to make your journey smooth, stylish, and unforgettable. Thank you for choosing us as your trusted car rental partner.
            </p>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <a href="/fleet" className="bg-yellow-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-yellow-700 transition">
              Explore Our Fleet
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Company;
