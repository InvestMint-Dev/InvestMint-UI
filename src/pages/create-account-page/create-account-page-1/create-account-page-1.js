import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

import { validateLogInFields } from '../../../validators/validators';
import '../create-account-page.css';
import './create-account-page-1.css';
import { ErrorAlertPanel } from '../../../components/error-alert-panel/error-alert-panel';

export const CreateAccountPage1 = ({ isCurrentPage, formData, updateFormData, onNext }) => {
  const [fadeIn, setFadeIn] = useState(false);
  const [displayStepper, setDisplayStepper] = useState(isCurrentPage);
  const [nextButtonClicked, setNextButtonClicked] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setFadeIn(true);
    setDisplayStepper(isCurrentPage);
    document.title = 'Create Account | InvestMint';
  }, [isCurrentPage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newData = { ...formData, [name]: value };
    updateFormData(newData);

    // Revalidate on change to update errors dynamically
    const validationErrors = validateLogInFields(newData, 'createAccount');
    setErrors(validationErrors);
    setNextButtonClicked(false); // Reset styling on every field change
  };

  const handleNext = async () => {
    const validationErrors = validateLogInFields(formData, 'createAccount');
    setErrors(validationErrors);
    const isValid = Object.keys(validationErrors).length === 0;

    setNextButtonClicked(true); // Ensure error styling if validation fails

    if (!isValid) return; // Stop if there are validation errors

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/auth/check-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email }),
      });

      if (response.ok) {
        onNext(); // Move to the next step if email is available
        setDisplayStepper(false);
      } else {
        const errorResponse = await response.json();
        if (errorResponse.message === 'User already exists.') {
          setErrors((prevErrors) => ({
            ...prevErrors,
            email: 'This email is already registered.',
          }));
          setNextButtonClicked(true); // Keep error styling for registered email
        }
      }
    } catch (error) {
      console.error('Error checking email:', error);
    }
  };

  const handleLogIn = () => {
    navigate('/log-in');
  };

  return (
    <div id='create-account-1' className={`fade-in ${fadeIn ? 'visible' : ''}`}>
      <div className='create-account-form-container'>
        {Object.keys(errors).length > 0 && nextButtonClicked && (
          <ErrorAlertPanel errors={errors} />
        )}     
        <h1 className='form-heading'>Create Your Account</h1>
        <div className='create-account-form'>
          <input
            className='form-textarea form-textarea-full'
            id='email'
            name='email'
            placeholder='Email'
            value={formData.email}
            onChange={handleChange}
            style={{ border: errors.email ? "3px solid #71CCA8" : "none" }}
          />
          {errors.email && <p className='form-error'>{errors.email}</p>}
          <div className='password-container'>
            <input
              id='password'
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
              id='confirmPassword'
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
                <a className="form-link" onClick={handleLogIn}>Login Here</a>
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
};
