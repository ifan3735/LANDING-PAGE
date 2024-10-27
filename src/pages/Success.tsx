// SuccessPage.tsx
import React from 'react';
import { CheckCircleIcon } from '@heroicons/react/solid';

const SuccessPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600">
      <div className="relative max-w-lg px-10 py-12 bg-white rounded-3xl shadow-2xl animate-fade-in-up">
        {/* Background Overlay */}
        <div className="absolute top-0 left-0 w-full h-full rounded-3xl bg-gradient-to-tr from-pink-300 via-transparent to-blue-400 blur-xl opacity-30 -z-10" />

        {/* Icon */}
        <div className="flex justify-center mb-8">
          <CheckCircleIcon className="w-20 h-20 text-green-600 animate-bounce" />
        </div>

        {/* Success Text */}
        <h1 className="text-4xl font-extrabold text-center text-gray-800">
          Success!
        </h1>
        <p className="mt-4 text-lg text-center text-gray-600">
          Your action was completed successfully. Thank you for being awesome!
        </p>

        {/* Confetti Animation */}
        <div className="absolute inset-0 w-full h-full -z-20 overflow-hidden pointer-events-none">
          <div className="confetti"></div>
        </div>

        {/* Button */}
        <div className="flex justify-center mt-8">
          <button className="px-8 py-3 font-semibold text-white bg-indigo-600 rounded-full hover:bg-indigo-700 focus:outline-none transition-all duration-300">
            Go Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
