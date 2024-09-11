import React, { useState, useEffect } from 'react';
import './log-in-page.css';

import { validateLogInFields } from '../../validators/validators';
import bigLeafLogo from '../../assets/images/logo/InvestMint Big Leaf Logo - 2.png';

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

      // Remove the error as the user fixes the input
      setFormData({ ...formData, [name]: value });

      setErrors((prevErrors) => {
          const newErrors = { ...prevErrors };
          if (name === "email" && /\S+@\S+\.\S+/.test(value)) {
              delete newErrors.email; // Remove email error if it's valid
          }
          if (name === "password" && value.length >= 6) {
              delete newErrors.password; // Remove password error if it's valid
          }
          return newErrors;
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
              <input 
                  className='form-textarea form-textarea-full' 
                  placeholder='Email'
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={{
                      border: errors.email ? "2px solid red" : "1px solid #ccc"
                  }} />
              {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

              {/* password input */}
              <input 
                  type={showPassword ? "text" : "password"} // Toggling between text and password
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className='form-textarea form-textarea-full' 
                  placeholder='Password'
                  style={{
                      border: errors.password ? "2px solid red" : "1px solid #ccc"
                  }} />
              {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
              <button type="button" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? "Hide" : "Show"} Password
              </button>

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