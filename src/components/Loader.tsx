// src/components/Loader.tsx
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-16 h-16 border-4 border-blue-400 border-solid border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
