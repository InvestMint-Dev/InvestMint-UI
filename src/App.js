import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import './App.css';
import { LogInPage } from './pages/log-in-page/log-in-page';
import { CreateAccountPage1 } from './pages/create-account-page/create-account-page-1/create-account-page-1';
import { CreateAccountPage2 } from './pages/create-account-page/create-account-page-2/create-account-page-2';
import { CreateAccountPage3 } from './pages/create-account-page/create-account-page-3/create-account-page-3';
import { CreateAccountPage4 } from './pages/create-account-page/create-account-page-4/create-account-page-4';
import { CashCalculator } from './pages/create-account-page/create-account-page-4/cash-calculator/cash-calculator';
import { DashboardPage } from './pages/dashboard-page/dashboard-page';
import { LoadingPage } from './pages/loading-page/loading-page';

import { ProgressProvider } from './context/ProgressContext'; // Import the context provider
import { useProgress } from './context/ProgressContext';
import { ForgotPasswordPage } from './pages/forgot-password-page/forgot-password-page';
import { ResetPasswordPage } from './pages/reset-password-page/reset-password-page';
import { ContactUsPage } from './pages/contact-us-page/contact-us-page';
import { CreateAccountPage } from './pages/create-account-page/create-account-page';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useProgress();

  return isAuthenticated ? children : <Navigate to="/log-in" />;
};


const App = () => {
  return (
    <ProgressProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoadingPage />} />
          <Route path="/log-in" element={<LogInPage/>} />

          <Route path="/create-account" element={<CreateAccountPage />} />

          <Route path="/cash-calculator" element={<CashCalculator />} />

          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />

          <Route path="/contact-us" element={<ContactUsPage />} />


          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </ProgressProvider>
  );
};

export default App;
