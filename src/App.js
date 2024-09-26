import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

import './App.css';
import { LogInPage } from './pages/log-in-page/log-in-page';
import { CreateAccountPage1 } from './pages/create-account-page/create-account-page-1/create-account-page-1';
import { CreateAccountPage3 } from './pages/create-account-page/create-account-page-3/create-account-page-3';
import { CreateAccountPage4 } from './pages/create-account-page/create-account-page-4/create-account-page-4';
import { CashCalculator } from './pages/create-account-page/create-account-page-4/cash-calculator/cash-calculator';
import { DashboardPage } from './pages/dashboard-page/dashboard-page';
import { LoadingPage } from './pages/loading-page/loading-page';

const App = () => {
  const [isLoading, setIsLoading] = useState(true); // Start with loading state

  // const navigate = useNavigate();

  // useEffect(() => {
  //   const loadData = async () => {
  //     // Simulate loading process, replace this with your actual loading logic
  //     await new Promise(resolve => setTimeout(resolve, 3000)); // Simulating 3 seconds loading
  //     setIsLoading(false); // Set loading to false after loading completes
  //     // navigate('/log-in'); // Navigate to the login page
  //   };

  //   loadData();
  // }, [navigate]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoadingPage />} />
        <Route path="/log-in" element={<LogInPage />} />
        
        <Route path="/create-account-1" element={<CreateAccountPage1 />} />
        <Route path="/create-account-3" element={<CreateAccountPage3 />} />
        <Route path="/create-account-4" element={<CreateAccountPage4 />} />

        <Route path="/cash-calculator" element={<CashCalculator />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;
