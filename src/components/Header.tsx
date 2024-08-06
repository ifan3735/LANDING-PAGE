import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-yellow-500 p-4 flex justify-between items-center">
      <div className="text-4xl font-bold italic text-black-300">Lurex</div>
      <nav className="space-x-4">
        <a href="#" className="hover:text-yellow-100">Home</a>
        <a href="#" className="hover:text-yellow-100">Cars</a>
        <a href="#" className="hover:text-yellow-100">About Us</a>
        <a href="#" className="hover:text-yellow-100">Contact</a>
        <a href="#" className="hover:text-yellow-100">Login | Register</a>
      </nav>
    </header>
  );
};

export default Header;
