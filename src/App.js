import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import { LogInPage } from './pages/log-in-page/log-in-page';
import { CreateAccountPage } from './pages/create-account-page/create-account-page';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LogInPage />} />
        <Route path="/log-in" element={<LogInPage />} />
        <Route path="/create-account" element={<CreateAccountPage />} />
      </Routes>
    </Router>
  );
}

export default App;
