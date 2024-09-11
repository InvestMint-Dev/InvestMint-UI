// validators.js

export const validateLogIn = (formData, type = 'login') => {
    const errors = {};
  
    // Email validation (common for both login and create account)
    if (!formData.email) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid.";
    }
  
    // Password validation (common for both login and create account)
    if (!formData.password) {
      errors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters long.";
    }
  
    // Confirm password validation (only for create account)
    if (type === 'createAccount') {
      if (!formData.confirmPassword) {
        errors.confirmPassword = "Confirm Password is required.";
      } else if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = "Passwords do not match.";
      }
    }
  
    return errors;
  };
  