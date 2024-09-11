// CreateAccountPage1.js
import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { validateLogInFields } from '../../../validators/validators';
import './../create-account-page.css';

export const CreateAccountPage1 = forwardRef((props, ref) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

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
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className='page-1-container'>
      <h1 className='form-heading'>Create Your Account</h1>
      <div className='create-account-form'>
        {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
        <textarea
          className='form-textarea form-textarea-full'
          name='email'
          placeholder='Email'
          value={formData.email}
          onChange={handleChange}
          style={{ border: errors.email ? "2px solid red" : "none" }}
        ></textarea>

        {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
        <textarea
          className='form-textarea form-textarea-full'
          name='password'
          placeholder='Password'
          value={formData.assword}
          onChange={handleChange}
          style={{ border: errors.password ? "2px solid red" : "none" }}
        ></textarea>

        {errors.confirmPassword && <p style={{ color: 'red' }}>{errors.confirmPassword}</p>}
        <textarea
          className='form-textarea form-textarea-full'
          name='confirmPassword'
          placeholder='Confirm Password'
          value={formData.confirmPassword}
          onChange={handleChange}
          style={{ border: errors.confirmPassword ? "2px solid red" : "none" }}
        ></textarea>
      </div>
    </div>
  );
});
