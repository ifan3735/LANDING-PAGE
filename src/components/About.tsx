import React from 'react';

const About: React.FC = () => {
    const carImage = 'https://i.pinimg.com/236x/d9/5c/d0/d95cd04d85043401df2b957eeba934cd.jpg'
  return (
    <section className="py-20">
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        <div className="md:w-1/2">
          <img src={carImage} alt="About Car" className="w-full rounded-md" />
        </div>
        <div className="md:w-1/2 md:pl-10 mt-10 md:mt-0">
          <h2 className="text-4xl font-bold mb-4">About Us</h2>
          <p className="text-lg mb-4">Lurex is a cutting-edge car rental management system designed to streamline your rental operations, providing unparalleled efficiency and convenience.</p>
          <button className="bg-yellow-500 text-white py-2 px-6 rounded-full font-semibold">See More</button>
        </div>
      </div>
    </section>
  );
}

export default About;
