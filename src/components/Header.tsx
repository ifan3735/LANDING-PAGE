import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-yellow-100 p-4 flex justify-between items-center">
      <div className="text-2xl font-bold">Lurex</div>
      <nav className="space-x-4">
        <a href="#" className="hover:text-yellow-500">Home</a>
        <a href="#" className="hover:text-yellow-500">Cars</a>
        <a href="#" className="hover:text-yellow-500">About Us</a>
        <a href="#" className="hover:text-yellow-500">Contact</a>
        <a href="#" className="hover:text-yellow-500">Login | Register</a>
      </nav>
    </header>
  );
};

export default Header;
