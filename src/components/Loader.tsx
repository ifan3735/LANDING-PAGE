// src/components/Loader.tsx
import React from 'react';

const Loader: React.FC = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
          <div className="relative w-20 h-20 animate-spin-slow">
            {/* Outer Ring */}
            <div className="absolute inset-0 rounded-full border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-blue-500 animate-spin-fast"></div>
            
            {/* Middle Ring */}
            <div className="absolute inset-1 w-16 h-16 rounded-full border-4 border-t-yellow-500 border-r-transparent border-b-transparent border-l-yellow-500 animate-spin-reverse"></div>
            
            {/* Inner Ring */}
            <div className="absolute inset-2 w-12 h-12 rounded-full border-4 border-t-green-500 border-r-transparent border-b-transparent border-l-green-500 animate-spin"></div>
          </div>
        </div>
      );
    };

export default Loader;
