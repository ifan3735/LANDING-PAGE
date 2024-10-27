// CancelPage.tsx
import React from 'react';
import { XCircleIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';

const CancelPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-600 via-gray-800 to-gray-900 text-gray-100">
      <div className="relative max-w-lg px-10 py-12 bg-gray-800 rounded-3xl shadow-2xl border border-gray-700 animate-fade-in-up">
        
        {/* Background Overlay */}
        <div className="absolute top-0 left-0 w-full h-full rounded-3xl bg-gradient-to-br from-red-300 via-transparent to-gray-900 blur-xl opacity-20 -z-10" />

        {/* Icon */}
        <div className="flex justify-center mb-8">
          <XCircleIcon className="w-20 h-20 text-red-600 animate-pulse" />
        </div>

        {/* Cancellation Text */}
        <h1 className="text-4xl font-extrabold text-center text-red-500">
          Action Canceled
        </h1>
        <p className="mt-4 text-lg text-center text-gray-300">
          The process was canceled. If this was a mistake, please try again or reach out for support.
        </p>

        {/* Support Link */}
        <div className="flex justify-center mt-8">
          <Link
            to="/support"
            className="px-6 py-3 font-semibold text-gray-100 bg-red-600 rounded-full hover:bg-red-700 focus:outline-none transition-all duration-300 shadow-lg hover:shadow-red-700/40"
          >
            Contact Support
          </Link>
        </div>

        {/* Home Button */}
        <div className="flex justify-center mt-4">
          <Link
            to="/dashboard"
            className="text-gray-400 hover:underline hover:text-gray-300 transition-all"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CancelPage;
