import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-yellow-500 py-10">
      <div className="container mx-auto text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Get Started With Lurex Today!</h2>
        <p className="mb-6">Getting started with Lurex is easy and convenient. Simply sign up on our platform, and experience the difference.</p>
        <div className="flex justify-center space-x-4 mb-6">
          <a href="#" className="bg-white text-yellow-500 py-2 px-6 rounded-full font-semibold">Download on the App Store</a>
          <a href="#" className="bg-white text-yellow-500 py-2 px-6 rounded-full font-semibold">Get it on Google Play</a>
        </div>
        <div className="flex justify-center space-x-6 mb-6">
          <a href="#" className="hover:text-gray-300">About</a>
          <a href="#" className="hover:text-gray-300">Services</a>
          <a href="#" className="hover:text-gray-300">Cars</a>
          <a href="#" className="hover:text-gray-300">FAQ</a>
        </div>
        <div className="flex justify-center space-x-6">
          <a href="#" className="hover:text-gray-300"><img src="linkedin-icon.png" alt="LinkedIn" /></a>
          <a href="#" className="hover:text-gray-300"><img src="facebook-icon.png" alt="Facebook" /></a>
          <a href="#" className="hover:text-gray-300"><img src="twitter-icon.png" alt="Twitter" /></a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
