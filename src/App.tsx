import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './pages/LandingPage';
import Login from './pages/Login';
import SignUp from './pages/Register';
const App: React.FC = () => {
  return (
    <Router>
      <div className="text-gray-900">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
