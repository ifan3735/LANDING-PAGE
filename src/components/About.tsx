import React from 'react';

const About: React.FC = () => {
  const AboutImage = 'https://i.pinimg.com/564x/42/01/37/420137597ef3a4ea2a4d8ecf3cbeb27f.jpg'; // Replace with your image URL

  return (
    <section className="p-8 flex flex-col md:flex-row items-center md:justify-between">
      <div className="md:w-1/2 flex justify-center">
        <img src={AboutImage} alt="Car" className="max-w-full h-auto" />
      </div>
      <div className="md:w-1/2 mt-8 md:mt-0 md:ml-16 flex flex-col items-start text-left">
        <h2 className="text-4xl font-bold mb-4">About Us</h2>
        <p className="text-lg mb-8">
          Lurex is a cutting-edge car rental management system designed to streamline your rental operations, providing unparalleled efficiency and convenience.
        </p>
        <button className="bg-yellow-500 text-black px-6 py-3 rounded-lg flex items-center space-x-2">
          <span>See More</span>
        </button>
      </div>
    </section>
  );
};

export default About;
