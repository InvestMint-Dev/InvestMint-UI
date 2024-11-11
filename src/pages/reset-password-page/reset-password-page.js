import React, { useEffect, useState } from 'react';
import './reset-password-page.css';
import openEye from '../../assets/images/icons/Eye.png';
import closedEye from '../../assets/images/icons/Closed Eye.png';

export const ResetPasswordPage = () => {
    const [formData, setFormData] = useState({ password: '', confirmPassword: '' });
    const [errors, setErrors] = useState({});
    const [submitButtonClicked, setSubmitButtonClicked] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        document.title = 'Reset Password | InvestMint';
    }, []); // Empty dependency array means this effect runs once after the initial render


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.password) {
            newErrors.password = "Password is required.";
        } else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters.";
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSendResetLink = () => {
        setSubmitButtonClicked(true);
        if (validateForm()) {
            // Code to send reset password request to backend
            console.log("Password reset successfully.");
        }
    };

    return (
        <div className='reset-password-container'>
            <h1 className="form-heading">Reset Password</h1>

            {/* Password input */}
            <div className='password-container'>
                <input 
                    type={showPassword ? "text" : "password"} 
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className='form-textarea form-textarea-full password-textarea' 
                    placeholder='Password'
                    style={{
                        border: (errors.password && submitButtonClicked) ? "3px solid #71CCA8" : "none"
                    }}
                />
                <button type="button" className='show-password-button' onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <img alt='Open Eye' src={openEye}/> : <img alt='Closed Eye' src={closedEye}/>}
                </button>
            </div>
            {(errors.password && submitButtonClicked) && <p className='form-error'>{errors.password}</p>}

            {/* Confirm Password input */}
            <div className='password-container'>
                <input 
                    type={showPassword ? "text" : "password"} 
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className='form-textarea form-textarea-full password-textarea' 
                    placeholder='Confirm Password'
                    style={{
                        border: (errors.confirmPassword && submitButtonClicked) ? "3px solid #71CCA8" : "none"
                    }}
                />
                <button type="button" className='show-password-button' onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <img alt='Open Eye' src={openEye}/> : <img alt='Closed Eye' src={closedEye}/>}
                </button>
            </div>
            {(errors.confirmPassword && submitButtonClicked) && <p className='form-error'>{errors.confirmPassword}</p>}

            <button onClick={handleSendResetLink} className='form-submit-button'>
                Reset
            </button>
        </div>
    );
};
