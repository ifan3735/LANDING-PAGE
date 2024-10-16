import React, { useState, useContext } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Footer';
import Header from './Header';
import { useLoginUserMutation } from '../features/API';
import { UserContext } from '../contexts/userContext';

const SignInPage: React.FC = () => {
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  
  if (!userContext) {
    throw new Error('UserContext is not found');
  }

  const { setUser } = userContext;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    // Check if email or password fields are empty
    if (!email || !password) {
      toast.error('Please fill out all fields before submitting.', toastOptions);
      return;
    }

    try {
      // Make the login request using the mutation
      const response = await loginUser({ email, password }).unwrap();

      // Log the response for debugging purposes
      console.log('Response:', response);

      // Check if the response contains the expected properties
      if (response && response.email && response.token && response.role && response.id) {
        // Store the user ID in local storage
        localStorage.setItem('userId', response.id.toString()); // Store user ID

        // Update the user context and save the user details
        setUser({
          name: response.email,
          role: response.role,
        });

        // Show success toast first
        toast.success('Signed in successfully!', toastOptions);

        // Delay navigation to allow the toast to appear
        setTimeout(() => {
          // Redirect based on the user role
          navigate(response.role === 'admin' ? '/admin' : '/dashboard');
        }, 5000); // Adjust the timeout duration as needed (5 seconds in this case)

      } else {
        console.error('Unexpected response structure:', response);
      }
    } catch (error) {
      // Check if the error message indicates wrong credentials
      if (error.status === 401) {
        toast.error('Wrong email or password.', toastOptions);
      } else {
        // For any other errors
        toast.error('Failed to login. Please try again.', toastOptions);
      }

      // Log the error to the console for debugging
      console.error('Failed to login:', error);
    }
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
      backgroundColor: '#fbbf24', // Matches the yellow color from your sign-in page
      color: '#ffffff'
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1 items-center justify-center bg-gray-100">
        <div className="flex w-full max-w-6xl h-full">
          <div className="w-1/2 bg-yellow-500 flex items-center justify-center">
            <img
              src="https://i.pinimg.com/564x/86/9b/bb/869bbba355843724dfd3c43429ae3d2c.jpg" // Replace this with the actual URL of your image
              alt="Dashboard Illustration"
              className="h-auto max-w-full"
            />
          </div>
          <div className="w-1/2 bg-white p-8 flex flex-col justify-center">
            <div className="text-center mb-4">
              <h2 className="text-2xl font-semibold">Sign In to your Account</h2>
              <p className="text-gray-600">Welcome back! Please enter your details.</p>
            </div>
            <form className="flex flex-col justify-center" onSubmit={handleSubmit}>
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
                    required
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
              </div>
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    className="mr-2 leading-tight"
                    type="checkbox"
                    id="rememberMe"
                  />
                  <label className="text-sm" htmlFor="rememberMe">
                    Remember me
                  </label>
                </div>
                <a className="inline-block align-baseline font-bold text-sm text-yellow-500 hover:text-yellow-700" href="#">
                  Forgot Password?
                </a>
              </div>
              <div className="mb-4">
                <button
                  className="w-full bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </button>
              </div>
              <div className="flex items-center justify-center mb-4">
                <hr className="w-full border-gray-300" />
                <span className="absolute bg-white px-4 text-gray-600">Or sign in with</span>
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
                Don't have an account? <Link to="/register" className="text-yellow-500 hover:text-yellow-700">Sign Up</Link>
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

export default SignInPage;
