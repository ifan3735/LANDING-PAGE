import React from 'react';

const About: React.FC = () => {
  return (
    <section className="p-8 flex flex-col items-center text-center">
      <h2 className="text-4xl font-bold mb-4">About Us</h2>
      <p className="max-w-2xl">Lurex is a cutting-edge car rental management system designed to streamline your rental operations, providing unparalleled efficiency and convenience.</p>
      <button className="bg-yellow-500 text-white px-6 py-3 mt-4 rounded-lg">See More</button>
    </section>
  );
};

export default About;
