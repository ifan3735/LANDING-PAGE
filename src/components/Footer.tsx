import React from 'react';
import { FaLinkedin, FaFacebook, FaTwitter } from 'react-icons/fa'; // Assuming these icons are being used

const Footer: React.FC = () => {
  return (
    <footer className="bg-white py-6 flex justify-between items-center px-8 md:px-16">
      <div className="text-4xl font-bold italic text-black-300">Lurex</div>
      <nav className="flex space-x-8">
        <a href="#about" className="text-gray-700 hover:text-gray-900">About</a>
        <a href="#services" className="text-gray-700 hover:text-gray-900">Services</a>
        <a href="#cars" className="text-gray-700 hover:text-gray-900">Cars</a>
        <a href="#faq" className="text-gray-700 hover:text-gray-900">FAQ</a>
      </nav>
      <div className="flex space-x-4">
        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900">
          <FaLinkedin className="w-6 h-6" />
        </a>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900">
          <FaFacebook className="w-6 h-6" />
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900">
          <FaTwitter className="w-6 h-6" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
