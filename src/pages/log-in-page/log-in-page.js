import React, { useState, useEffect } from 'react';
import './log-in-page.css';

import { validateLogInFields } from '../../validators/validators';
import bigLeafLogo from '../../assets/images/logo/InvestMint Big Leaf Logo - 2.png';
import openEye from '../../assets/images/icons/Eye.png';
import closedEye from '../../assets/images/icons/Closed Eye.png';

export const LogInPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
      });
    
      const [errors, setErrors] = useState({});
      const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

      const validateForm = () => {
        const validationErrors = validateLogInFields(formData, 'login');
        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };
    
    const handleSubmit = (e) => {
      e.preventDefault();

      if (validateForm()) {
          // Submit the form if no errors
          console.log("Form submitted successfully!");
      }
  };

  const handleChange = (e) => {
      const { name, value } = e.target;

      setFormData((prevFormData) => {
        const updatedFormData = { ...prevFormData, [name]: value };
        const validationErrors = validateLogInFields(updatedFormData, 'login');
        setErrors(validationErrors);
        return updatedFormData;
    });
  };

    useEffect(() => {
        // Runs after the component mounts
        const element = document.querySelector('.log-in-form');
        if (element) {
            element.classList.add('fade-in');
        }
    }, []); // Empty dependency array means this effect runs once after the initial render


    return (
      <div>
      <img className='top-left-logo-display' src={bigLeafLogo} alt="InvestMint Logo" />

      <div className='log-in-form-container'>
          <h1 className='form-heading'>Log-in</h1>
          <form className='log-in-form' onSubmit={handleSubmit}>
              {/* email input */}
              {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
              <input 
                  className='form-textarea form-textarea-full' 
                  placeholder='Email'
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={{
                      border: errors.email ? "2px solid red" : "none"
                  }} />

              {/* password input */}
              {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
              <div className='password-container'>
                <input 
                    type={showPassword ? "text" : "password"} // Toggling between text and password
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className='form-textarea form-textarea-full password-textarea' 
                    placeholder='Password'
                    style={{
                        border: errors.password ? "2px solid red" : "none"
                    }} >
                    </input>
                <button type="button" className='show-password-button' onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <img src={openEye}/> : <img src={closedEye}/>}
                </button>
              </div>

              <div className="form-option-1-container">
                  <input className="form-checkbox" type="checkbox" id="rememberUser" name="rememberUser" value="rememberUser" />
                  <span className="form-label">Remember Me</span>
                  <a href="" className="form-link">Forgot password</a>
              </div>

              <button type="submit" className='form-submit-button'>
                  Submit
              </button>

              <div className='form-option-2-container'> 
                  <span className="form-label">New Member? </span>
                  <a href="/create-account" className="form-link">Sign Up here</a>
              </div>
          </form>
      </div>
  </div>
    );
}