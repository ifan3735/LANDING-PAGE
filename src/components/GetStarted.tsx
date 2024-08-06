import React from 'react';

const GetStarted: React.FC = () => {
  return (
    <section className="bg-yellow-500 p-8 text-center rounded-lg mx-4 md:mx-0">
      <h2 className="text-4xl font-bold mb-4">Get Started With Lurex Today!</h2>
      <p className="mb-8">Getting started with Lurex is easy and convenient. Simply sign up on our platform.</p>
      <div className="flex justify-center space-x-4 mb-8">
        <a href="#" className="bg-white text-black px-4 py-2 rounded-lg flex items-center space-x-2 shadow-lg">
          <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple Logo" className="w-6 h-6" />
          <div className="text-left">
            <div className="text-xs">Download on the</div>
            <div className="text-lg font-semibold">App Store</div>
          </div>
        </a>
        <a href="#" className="bg-white text-black px-4 py-2 rounded-lg flex items-center space-x-2 shadow-lg">
          <img src="https://i.pinimg.com/564x/fe/64/bb/fe64bb0c5f7aaaaf392412754cf2343c.jpg" alt="Google Play Logo" className="w-6 h-6" />
          <div className="text-left">
            <div className="text-xs">GET IT ON</div>
            <div className="text-lg font-semibold">Google Play</div>
          </div>
        </a>
      </div>
    </section>
  );
};

export default GetStarted;
