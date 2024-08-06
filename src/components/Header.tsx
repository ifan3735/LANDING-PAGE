import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="text-2xl font-bold">Lurex</div>
        <nav className="space-x-4">
          <a href="#" className="hover:text-yellow-500">Home</a>
          <a href="#" className="hover:text-yellow-500">Cars</a>
          <a href="#" className="hover:text-yellow-500">About Us</a>
          <a href="#" className="hover:text-yellow-500">Contact</a>
          <a href="#" className="font-semibold hover:text-yellow-500">Login</a>
          <a href="#" className="font-semibold hover:text-yellow-500">Register</a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
