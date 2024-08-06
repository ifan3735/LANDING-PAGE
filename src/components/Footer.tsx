import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-yellow-100 p-8 text-center">
      <h2 className="text-4xl font-bold mb-4">Get Started With Lurex Today!</h2>
      <p className="mb-8">Getting started with Lurex is easy and convenient. Simply sign up on our platform.</p>
      <div className="flex justify-center space-x-4">
        <a href="#" className="bg-black text-white px-6 py-3 rounded-lg">Download on the App Store</a>
        <a href="#" className="bg-black text-white px-6 py-3 rounded-lg">Get it on Google Play</a>
      </div>
      <div className="mt-8 flex justify-center space-x-4">
        <a href="#" className="hover:text-yellow-500">About</a>
        <a href="#" className="hover:text-yellow-500">Services</a>
        <a href="#" className="hover:text-yellow-500">Cars</a>
        <a href="#" className="hover:text-yellow-500">FAQ</a>
        <a href="#" className="hover:text-yellow-500">Contact</a>
      </div>
    </footer>
  );
};

export default Footer;
