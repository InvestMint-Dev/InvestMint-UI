import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { validateLogInFields } from '../../../validators/validators';
import '../create-account-page.css';
import './create-account-page-1.css';

import { ErrorAlertPanel } from '../../../components/error-alert-panel/error-alert-panel';
import { CreateAccountSidebar } from '../create-account-sidebar/create-account-sidebar';
import openEye from '../../../assets/images/icons/Eye.png';
import closedEye from '../../../assets/images/icons/Closed Eye.png';

export const CreateAccountPage1 = () => {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true); // Trigger fade-in effect on mount
    document.title = 'Create Account | InvestMint';
}, []);

  const [nextButtonClicked, setNextButtonClicked] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [showErrorAlert, setShowErrorAlert] = useState(false); // State for alert visibility
  const [alertClass, setAlertClass] = useState(""); // State for alert class

  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State to toggle password visibility

  const { loginWithRedirect, isAuthenticated } = useAuth0(); // Use Auth0 hooks
  const navigate = useNavigate(); // Navigate hook

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => {
      const updatedFormData = { ...prevFormData, [name]: value };
      const validationErrors = validateLogInFields(updatedFormData, 'createAccount');
      setErrors(validationErrors);
      return updatedFormData;
    });
  };

  const handleNext = async () => {
    setNextButtonClicked(true);
    const validationErrors = validateLogInFields(formData, 'createAccount');
    setErrors(validationErrors);
    const isValid = Object.keys(validationErrors).length === 0;

    if (isValid) {
      if (!isAuthenticated) {
        await loginWithRedirect(); // Trigger Auth0 authentication
      } else {
        navigate('/create-account-3'); // Navigate to the next page
        setNextButtonClicked(false);
        setShowErrorAlert(false);
      }
    } else {
      setAlertClass("show"); // Show error alert
      setShowErrorAlert(true); // Show error alert on validation failure
      window.scrollTo({ top: 0, behavior: 'auto' });

      // Hide error alert after 2 seconds
      setTimeout(() => {
        setAlertClass("hide"); // Start fade-out
        setTimeout(() => {
          setShowErrorAlert(false); // Remove from DOM after fade-out
        }, 1000); // Duration of the fade-out transition
      }, 2000);
    }
  };

  const handleBack = () => {
    navigate('/log-in');
  };

  return (
    <div className={`fade-in ${fadeIn ? 'visible' : ''}`}>
      {showErrorAlert && (
        <ErrorAlertPanel className={alertClass} />
      )}
      
      <CreateAccountSidebar currentPage={1}/>
      <div className='page-1-container'>     
        <h1 className='form-heading'>Create Your Account</h1>
        <div className='create-account-form'>
          <input
            className='form-textarea form-textarea-full'
            name='email'
            placeholder='Email'
            value={formData.email}
            onChange={handleChange}
            style={{ border: (errors.email && nextButtonClicked) ? "2px solid #61b090" : "none" }}
          />
          {(errors.email && nextButtonClicked) && <p style={{ color: '#61b090' }}>{errors.email}</p>}

          <div className='password-container'>
            <input
              className='form-textarea form-textarea-full'
              name='password'
              type={showPassword ? "text" : "password"} 
              placeholder='Password'
              value={formData.password}
              onChange={handleChange}
              style={{ border: (errors.password && nextButtonClicked) ? "2px solid #61b090" : "none" }}
            />
            <button type="button" className='show-password-button' onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <img src={openEye} alt="Show" /> : <img src={closedEye} alt="Hide" />}
            </button>
          </div>
          {(errors.password && nextButtonClicked) && <p style={{ color: '#61b090' }}>{errors.password}</p>}

          <div className='password-container'>
            <input
              className='form-textarea form-textarea-full'
              name='confirmPassword'
              type={showConfirmPassword ? "text" : "password"} 
              placeholder='Confirm Password'
              value={formData.confirmPassword}
              onChange={handleChange}
              style={{ border: (errors.confirmPassword && nextButtonClicked) ? "2px solid #61b090" : "none" }}
            />
            <button type="button" className='show-password-button' onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <img src={openEye} alt="Show" /> : <img src={closedEye} alt="Hide" />}
            </button>
          </div>
          {(errors.confirmPassword && nextButtonClicked) && <p style={{ color: '#61b090' }}>{errors.confirmPassword}</p>}
          
        </div>

        <div className='stepper-container'>
          <div className="stepper-button-container">
              <button className='form-stepper-button' onClick={handleBack}>
                Back
              </button>
              <button className='form-stepper-button' onClick={handleNext}>
                Next
              </button>
            </div>
        </div>
      </div>
    </div>
  );
};
