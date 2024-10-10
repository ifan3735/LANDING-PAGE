import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Importing pages from your existing setup
import Landing from './pages/LandingPage';
import Login from './pages/Login';
import SignUp from './pages/Register';
import Company from './components/Company';
import Contact from './pages/Contact';
import Services from './components/Services';
import Faq from './pages/Faq';
import { UserProvider } from './contexts/userContext';

// Importing additional pages and layout
import MainLayout from './assets/layouts/MainLayout';  // Corrected path
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

const App: React.FC = () => {
  return (
    <UserProvider>
      <Router>  {/* Ensure Router wraps the entire app */}
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

            {/* Protected Routes (for logged-in users) */}
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
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
};

export default App;
