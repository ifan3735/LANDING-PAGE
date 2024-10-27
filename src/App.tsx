import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';  // Import Provider
import store from './store';  // Import the store you created

// Import other components as you have done
import Landing from './pages/LandingPage';
import Login from './pages/Login';
import SignUp from './pages/Register';
import Company from './components/Company';
import Contact from './pages/Contact';
import Services from './components/Services';
import Faq from './pages/Faq';
import { UserProvider } from './contexts/userContext';
import MainLayout from './assets/layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Listings from './pages/Listing';
import Tracking from './pages/Tracking';
import Bids from './pages/Bids';
import Calendar from './pages/Calendar';
import Transactions from './pages/Transactions';
import Settings from './pages/Settings';
import StatisticsPage from './pages/Statistics';
import Deals from './pages/Deals';
import Search from './pages/Search';
import Help from './pages/Help';
import SuccessPage from './pages/Success';
import CancelPage from './pages/Cancel';

const App: React.FC = () => {
  return (
    <Provider store={store}>  {/* Wrap with Redux Provider */}
      <UserProvider>
        <Router>
          <div className="text-gray-900">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<SignUp />} />
              <Route path="/about" element={<Company />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/services" element={<Services />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/success" element={<SuccessPage />} />

              {/* Protected Routes */}
              <Route path="/dashboard" element={<MainLayout><Dashboard /></MainLayout>} />
              <Route path="/listings" element={<MainLayout><Listings /></MainLayout>} />
              <Route path="/tracking" element={<MainLayout><Tracking /></MainLayout>} />
              <Route path="/bids" element={<MainLayout><Bids /></MainLayout>} />
              <Route path="/calendar" element={<MainLayout><Calendar /></MainLayout>} />
              <Route path="/transactions" element={<MainLayout><Transactions /></MainLayout>} />
              <Route path="/settings" element={<MainLayout><Settings /></MainLayout>} />
              <Route path="/statistics" element={<MainLayout><StatisticsPage /></MainLayout>} />
              <Route path="/deals" element={<MainLayout><Deals /></MainLayout>} />
              <Route path="/search" element={<MainLayout><Search /></MainLayout>} />
              <Route path="/help" element={<MainLayout><Help /></MainLayout>} />
              <Route path="/cancel" element={<MainLayout><CancelPage /></MainLayout>} />
            </Routes>
          </div>
        </Router>
      </UserProvider>
    </Provider>
  );
};

export default App;
