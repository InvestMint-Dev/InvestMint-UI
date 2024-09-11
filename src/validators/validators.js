// validators.js

export const validateLogInFields = (formData, formType) => {
    const errors = {};
  
    switch (formType) {
      case 'login':
        if (!formData.email) {
          errors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          errors.email = 'Email is invalid.';
        }
  
        if (!formData.password) {
          errors.password = 'Password is required.';
        } else if (formData.password.length < 6) {
          errors.password = 'Password must be at least 6 characters long.';
        }
        break;
  
      case 'createAccount':
        if (!formData.email) {
          errors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          errors.email = 'Email is invalid.';
        }
  
        if (!formData.password) {
          errors.password = 'Password is required.';
        } else if (formData.password.length < 6) {
          errors.password = 'Password must be at least 6 characters long.';
        }

        if (!formData.confirmPassword) {
            errors.confirmPassword = 'Confirm your password.';
        }
        else if (formData.password !== formData.confirmPassword) {
          errors.confirmPassword = 'Passwords do not match.';
        }
        break;
  
      default:
        break;
    }
  
    return errors;
  };
  