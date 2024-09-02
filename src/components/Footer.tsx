import React from 'react';
import { FaLinkedin, FaFacebook, FaTwitter } from 'react-icons/fa'; // Assuming these icons are being used
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white py-6 flex justify-between items-center px-8 md:px-16">
      <div className="text-4xl font-bold italic text-black-300">Lurex</div>
      <nav className="flex space-x-8">
        <Link to="/about" className="text-gray-700 hover:text-gray-900">About</Link>
        <Link to="/services" className="text-gray-700 hover:text-gray-900">Services</Link>
        <Link to="/cars" className="text-gray-700 hover:text-gray-900">Cars</Link>
        <Link to="/faq" className="text-gray-700 hover:text-gray-900">FAQ</Link>
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
