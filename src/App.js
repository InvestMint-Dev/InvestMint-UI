import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import './App.css';
import { LogInPage } from './pages/log-in-page/log-in-page';
import { CreateAccountPage1 } from './pages/create-account-page/create-account-page-1/create-account-page-1';
import { CreateAccountPage3 } from './pages/create-account-page/create-account-page-3/create-account-page-3';
import { CreateAccountPage4 } from './pages/create-account-page/create-account-page-4/create-account-page-4';
import { CashCalculator } from './pages/create-account-page/create-account-page-4/cash-calculator/cash-calculator';
import { DashboardPage } from './pages/dashboard-page/dashboard-page';
import { LoadingPage } from './pages/loading-page/loading-page';

// This component ensures protected routes are only accessible when the user is authenticated
const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/log-in" />;
  }
  // If authenticated, render the protected component (e.g., dashboard)
  return children;
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Set this to `true` when the user logs in successfully
  
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoadingPage />} />
        <Route path="/log-in" element={<LogInPage onLogin={handleLogin}/>} />
        
        {/* These account creation pages are accessible without authentication */}
        <Route path="/create-account-1" element={<CreateAccountPage1 />} />
        <Route path="/create-account-3" element={<CreateAccountPage3 />} />
        <Route path="/create-account-4" element={<CreateAccountPage4 onLogin={handleLogin}/>} />

        <Route path="/cash-calculator" element={<CashCalculator />} />

        {/* Protected route for dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
