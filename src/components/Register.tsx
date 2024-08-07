import React from 'react';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import Footer from './Footer';
import Header from './Header';

const SignUpPage: React.FC = () => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1 items-center justify-center bg-gray-100">
        <div className="flex w-full max-w-6xl h-full">
          <div className="w-1/2 bg-yellow-500 flex items-center justify-center">
            <img
              src="https://i.pinimg.com/564x/f1/8e/b1/f18eb16b6a19aca884ea0f67e6d62080.jpg" // Replace this with the actual URL of your image
              alt="Dashboard Illustration"
              className="h-auto max-w-full"
            />
          </div>
          <div className="w-1/2 bg-white p-8 flex flex-col justify-center">
            <div className="text-center mb-4">
              <h2 className="text-2xl font-semibold">Sign Up for an Account</h2>
              <p className="text-gray-600">Create your account by filling in the details below.</p>
            </div>
            <form className="flex flex-col justify-center" onSubmit={handleSubmit}>
              <div className="mb-4 relative">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                  Username
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <FaUser className="text-gray-400" />
                  </span>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 pl-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    placeholder="Username"
                  />
                </div>
              </div>
              <div className="mb-4 relative">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <FaEnvelope className="text-gray-400" />
                  </span>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 pl-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="Email"
                  />
                </div>
              </div>
              <div className="mb-4 relative">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <FaLock className="text-gray-400" />
                  </span>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 pl-10 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="Password"
                  />
                </div>
                <p className="text-gray-600 text-xs">Your password must have at least 8 characters</p>
              </div>
              <div className="mb-4 flex items-center">
                <input
                  className="mr-2 leading-tight"
                  type="checkbox"
                  id="terms"
                />
                <label className="text-sm" htmlFor="terms">
                  By creating an account means you agree to the <a href="#" className="text-yellow-500 hover:text-yellow-700">Terms & Conditions</a> and our <a href="#" className="text-yellow-500 hover:text-yellow-700">Privacy Policy</a>.
                </label>
              </div>
              <div className="mb-4">
                <button
                  className="w-full bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Sign Up
                </button>
              </div>
              <div className="flex items-center justify-center mb-4">
                <hr className="w-full border-gray-300" />
                <span className="absolute bg-white px-4 text-gray-600">Or sign up with</span>
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-white border border-gray-300 text-gray-600 font-bold py-2 px-4 rounded inline-flex items-center hover:bg-gray-100 w-full mr-2"
                  type="button"
                >
                  <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google" className="mr-2" />
                  Google
                </button>
                <button
                  className="bg-white border border-gray-300 text-gray-600 font-bold py-2 px-4 rounded inline-flex items-center hover:bg-gray-100 w-full ml-2"
                  type="button"
                >
                  <img src="https://img.icons8.com/color/16/000000/facebook-new.png" alt="Facebook" className="mr-2" />
                  Facebook
                </button>
              </div>
            </form>
            <div className="text-center mt-4">
              <p className="text-gray-600">
                Already have an account? <a href="/login" className="text-yellow-500 hover:text-yellow-700">Log In</a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignUpPage;
