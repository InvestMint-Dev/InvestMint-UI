// context/ProgressContext.js
import React, { createContext, useContext, useState } from 'react';

const ProgressContext = createContext();

export const ProgressProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1); // Tracks the step in account creation
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Tracks if the user is authenticated

  const goToNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const logIn = () => setIsAuthenticated(true);  // Call this when the user logs in or completes account creation
  const logOut = () => setIsAuthenticated(false);

  return (
    <ProgressContext.Provider value={{ currentStep, goToNextStep, isAuthenticated, logIn, logOut }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => useContext(ProgressContext);
