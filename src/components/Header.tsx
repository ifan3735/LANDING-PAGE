import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-yellow-500 p-4 flex justify-between items-center">
      <div className="text-4xl font-bold italic text-black-300">Lurex</div>
      <nav className="space-x-4">
        <Link to="/" className="hover:text-yellow-100">Home</Link>
        <Link to="/cars" className="hover:text-yellow-100">Cars</Link>
        <Link to="/about" className="hover:text-yellow-100">About Us</Link>
        <Link to="/contact" className="hover:text-yellow-100">Contact</Link>
        <Link to="/login" className="hover:text-yellow-100">Login | Register</Link>
      </nav>
    </header>
  );
};

export default Header;
