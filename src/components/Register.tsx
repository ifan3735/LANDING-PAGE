import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaUser, FaPhone, FaAddressCard } from 'react-icons/fa';
import { ToastContainer, toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Footer';
import Header from './Header';
import { useRegisterUserMutation } from '../features/API';

const SignUpPage: React.FC = () => {
  const [registerUser] = useRegisterUserMutation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setFullName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
    address: ''
  });

  const handleNext = () => {
    if (step === 1 && (!name || !email || !password)) {
      toast.error('Please fill out all fields before proceeding.', toastOptions);
      return;
    }
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const result = await registerUser({ name, email, password, contactPhone, address });
      console.log('User registered:', result);
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);
    }
    if (!contactPhone || !address) {
      toast.error('Please fill out all fields before submitting.', toastOptions);
      return;
    }
    // Handle final form submission logic here
    toast.success('Form submitted successfully!', toastOptions);
  };

  const toastOptions: ToastOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    style: {
      backgroundColor: '#fbbf24', // Matches the yellow color from your signup page
      color: '#ffffff'
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1 items-center justify-center bg-gray-100 p-4">
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
              {step === 1 && (
                <>
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
                        value={name}
                        onChange={(e) => setFullName(e.target.value)}
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <p className="text-gray-600 text-xs">Your password must have at least 8 characters</p>
                  </div>
                </>
              )}
              {step === 2 && (
                <>
                  <div className="mb-4 relative">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                      Phone
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <FaPhone className="text-gray-400" />
                      </span>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 pl-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="phone"
                        type="text"
                        placeholder="Phone"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="mb-4 relative">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                      Address
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <FaAddressCard className="text-gray-400" />
                      </span>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 pl-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="address"
                        type="text"
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                  </div>
                </>
              )}
              <div className="flex items-center justify-between">
                {step > 1 && (
                  <button
                    className="bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={handleBack}
                  >
                    Back
                  </button>
                )}
                {step < 2 ? (
                  <button
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={handleNext}
                  >
                    Next
                  </button>
                ) : (
                  <button
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Sign Up
                  </button>
                )}
              </div>
            </form>
            <div className="text-center mt-4">
              <p className="text-gray-600">
                Already have an account? <Link to="/login" className="text-yellow-500 hover:text-yellow-700">Log In</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default SignUpPage;
