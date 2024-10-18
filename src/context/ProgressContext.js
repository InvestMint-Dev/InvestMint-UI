// src/context/ProgressContext.js
import React, { createContext, useState, useContext } from 'react';

// Create the context
const ProgressContext = createContext();

// Create a provider component
export const ProgressProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);

  // Method to go to the next step
  const goToNextStep = () => setCurrentStep((prevStep) => prevStep + 1);

  return (
    <ProgressContext.Provider value={{ currentStep, goToNextStep }}>
      {children}
    </ProgressContext.Provider>
  );
};

// Custom hook to access the context
export const useProgress = () => useContext(ProgressContext);
