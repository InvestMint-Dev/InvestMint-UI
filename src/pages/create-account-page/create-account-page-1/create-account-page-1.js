import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react'; // Import Eye and EyeOff icons from Lucide React

import { validateLogInFields } from '../../../validators/validators';

import '../create-account-page.css';
import './create-account-page-1.css';

import { ErrorAlertPanel } from '../../../components/error-alert-panel/error-alert-panel';

export const CreateAccountPage1 = ( ) => {
  const [fadeIn, setFadeIn] = useState(false);
  const [displayStepper, setDisplayStepper] = useState(true);

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
  const alertClass = ""; // State for alert class

  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State to toggle password visibility

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
    setNextButtonClicked(true); // Disable button to prevent multiple submissions
    const validationErrors = validateLogInFields(formData, 'createAccount');
    setErrors(validationErrors);
    const isValid = Object.keys(validationErrors).length === 0;

    if (isValid) {
        try {
            // Make API call to check if the email already exists
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/auth/check-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: formData.email }),
            });

            if (!response.ok) {
                // Handle errors based on response status
                const errorResponse = await response.json();
                if (errorResponse.message === 'User already exists') {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        email: 'This email is already registered.',
                    }));
                    setShowErrorAlert(true);
                    return; // Stop the flow if the email is already registered
                }
                throw new Error('An unexpected error occurred');
            }

            //render next page
            setDisplayStepper(false);
        } catch (error) {
            console.error('Error checking email:', error);
            setShowErrorAlert(true);
        }
    } else {
        setShowErrorAlert(true);
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
      
      <div className='create-account-form-container'>     
        <h1 className='form-heading'>Create Your Account</h1>
        <div className='create-account-form'>
        {(errors.signup && nextButtonClicked) && <p className='form-error'>{errors.signup}</p>}
          <input
            className='form-textarea form-textarea-full'
            name='email'
            placeholder='Email'
            value={formData.email}
            onChange={handleChange}
            style={{ border: (errors.email && nextButtonClicked) ? "3px solid #71CCA8" : "none" }}
          />
          {(errors.email && nextButtonClicked) && <p className='form-error'>{errors.email}</p>}

          <div className='password-container'>
            <input
              className='form-textarea form-textarea-full'
              name='password'
              type={showPassword ? "text" : "password"} 
              placeholder='Password'
              value={formData.password}
              onChange={handleChange}
              style={{ border: (errors.password && nextButtonClicked) ? "3px solid #71CCA8" : "none" }}
            />
            <button 
              type="button" 
              className='show-password-button' 
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </button>
          </div>
          {(errors.password && nextButtonClicked) && <p className='form-error'>{errors.password}</p>}

          <div className='password-container'>
            <input
              className='form-textarea form-textarea-full'
              name='confirmPassword'
              type={showConfirmPassword ? "text" : "password"} 
              placeholder='Confirm Password'
              value={formData.confirmPassword}
              onChange={handleChange}
              style={{ border: (errors.confirmPassword && nextButtonClicked) ? "3px solid #71CCA8" : "none" }}
            />
            <button 
              type="button" 
              className='show-password-button' 
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <Eye /> : <EyeOff />}
            </button>
          </div>
          {(errors.confirmPassword && nextButtonClicked) && <p className='form-error'>{errors.confirmPassword}</p>}
          
        </div>

        {
          displayStepper && (
            <div className='stepper-container'>
              <button className='form-stepper-button' style={{width: '100%'}} onClick={handleNext}>
                Next
              </button>
              <div className='form-option-2-container'>
                <span className="form-label">Already Have an Account? </span>
                <a className="form-link" onClick={handleBack}>Login Here</a>
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
};
