import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadset, faMapMarkerAlt, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const About: React.FC = () => {
  const AboutImage = 'https://i.pinimg.com/564x/42/01/37/420137597ef3a4ea2a4d8ecf3cbeb27f.jpg'; // Replace with your image URL

  return (
    <section className="p-8 flex flex-col md:flex-row items-center md:justify-between bg-gray-100">
      <div className="md:w-1/2 flex justify-center">
        <img src={AboutImage} alt="Car" className="max-w-full h-auto" />
      </div>
      <div className="md:w-1/2 mt-8 md:mt-0 md:ml-16 flex flex-col items-start text-left">
        <h2 className="text-3xl font-bold mb-4">Best Services and Luxurious Cars</h2>
        <p className="text-gray-600 mb-8">
          Lurex is a cutting-edge car rental management system designed to streamline your rental operations, providing unparalleled efficiency and convenience. With its intuitive interface and powerful features, Lurex enhances both customer and administrative experiences. From real-time booking management to comprehensive reporting tools, it ensures smooth and effective rental operations.
        </p>
        <div className="space-y-6">
          <div className="flex items-start">
            <FontAwesomeIcon icon={faHeadset} size="2x" className="text-teal-600 mr-4" />
            <div>
              <h3 className="text-xl font-semibold">Customer Support</h3>
              <p className="text-gray-600">Exceptional support to assist you at every step.</p>
            </div>
          </div>
          <div className="flex items-start">
            <FontAwesomeIcon icon={faMapMarkerAlt} size="2x" className="text-teal-600 mr-4" />
            <div>
              <h3 className="text-xl font-semibold">Many Locations</h3>
              <p className="text-gray-600">Convenient locations available nationwide.</p>
            </div>
          </div>
          <div className="flex items-start">
            <FontAwesomeIcon icon={faTimesCircle} size="2x" className="text-teal-600 mr-4" />
            <div>
              <h3 className="text-xl font-semibold">Free Cancellation</h3>
              <p className="text-gray-600">Hassle-free cancellations for your convenience.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
