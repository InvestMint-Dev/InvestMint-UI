// CreateAccountPage1.js
import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { validateLogInFields } from '../../../validators/validators';
import './create-account-page-1.css';

import { CreateAccountSidebar } from '../create-account-sidebar/create-account-sidebar';
import openEye from '../../../assets/images/icons/Eye.png';
import closedEye from '../../../assets/images/icons/Closed Eye.png';

export const CreateAccountPage1 = forwardRef((props, ref) => {
  const { nextButtonClicked } = props;
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State to toggle password visibility

  // Expose the validate function to the parent
  useImperativeHandle(ref, () => ({
    validate() {
      const validationErrors = validateLogInFields(formData, 'createAccount');
      setErrors(validationErrors);
      return Object.keys(validationErrors).length === 0;
    }
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => {
      const updatedFormData = { ...prevFormData, [name]: value };
      const validationErrors = validateLogInFields(updatedFormData, 'createAccount');
      setErrors(validationErrors);
      return updatedFormData;
    });
  };

  return (
    <div>
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
          style={{ border: (errors.email && nextButtonClicked) ? "2px solid #71CCA8" : "none" }}
        />
        {(errors.email && nextButtonClicked) && <p style={{ color: '#71CCA8' }}>{errors.email}</p>}


        <div className='password-container'>
          <input
            className='form-textarea form-textarea-full'
            name='password'
            type={showPassword ? "text" : "password"} 
            placeholder='Password'
            value={formData.password}
            onChange={handleChange}
            style={{ border: (errors.password && nextButtonClicked) ? "2px solid #71CCA8" : "none" }}
          />
          <button type="button" className='show-password-button' onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <img src={openEye}/> : <img src={closedEye}/>}
          </button>
        </div>
        {(errors.password && nextButtonClicked) && <p style={{ color: '#71CCA8' }}>{errors.password}</p>}

        <div className='password-container'>
          <input
            className='form-textarea form-textarea-full'
            name='confirmPassword'
            type={showConfirmPassword ? "text" : "password"} 
            placeholder='Confirm Password'
            value={formData.confirmPassword}
            onChange={handleChange}
            style={{ border: (errors.confirmPassword && nextButtonClicked) ? "2px solid #71CCA8" : "none" }}
          />
          <button type="button" className='show-password-button' onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
            {showConfirmPassword ? <img src={openEye}/> : <img src={closedEye}/>}
          </button>
        </div>
        {(errors.confirmPassword && nextButtonClicked) && <p style={{ color: '#71CCA8' }}>{errors.confirmPassword}</p>}
        
      </div>
    </div>
    </div>
  );
});
