import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react'; // Import Eye and EyeOff icons from Lucide React

import './log-in-page.css';
import '../styling/form-styling.css';

import { validateLogInFields } from '../../validators/validators';
import { useProgress } from '../../context/ProgressContext'; // Use the progress context

import bigLeafLogo from '../../assets/images/logo/InvestMint Big Leaf Logo - 2.png';

export const LogInPage = ({ onLogin }) => {
    const [fadeIn, setFadeIn] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
        });
        
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const [submitButtonClicked, setSubMitButtonClicked] = useState(false);

    const {logIn} = useProgress();

    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Log In | InvestMint';
        setFadeIn(true); // Trigger fade-in effect on mount
    }, []); // Empty dependency array means this effect runs once after the initial render


    const validateForm = () => {
        const validationErrors = validateLogInFields(formData, 'login');
        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };
    
    const handleSubmit = async (e) => {
        setSubMitButtonClicked(true);
        e.preventDefault();

        if (validateForm()) {
            try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                navigate('/dashboard');
                setSubMitButtonClicked(false);
                logIn(); // Call onLogin here
            } else {
                // Display error message from the backend
                setErrors({ login: data.message });
            }
        } catch (error) {
            console.error('Error during login:', error);
            setErrors({ login: 'Something went wrong. Please try again.' });
        }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevFormData) => {
        const updatedFormData = { ...prevFormData, [name]: value };
        const validationErrors = validateLogInFields(updatedFormData, 'login');
        setErrors(validationErrors);
        return updatedFormData;
    })};

    const handleSignupClick = () => {
        navigate('/create-account');
    }

    const handleForgotPasswordClick = () => {
        navigate('/forgot-password');
    }

    return (
        <div className={`fade-in ${fadeIn ? 'visible' : ''}`}>
            <img className='logo-display' src={bigLeafLogo} alt="InvestMint Logo" />

            <div className='log-in-form-container'>
                <h1 className='form-heading'>Login</h1>
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
                            border: (errors.email && submitButtonClicked) ? "3px solid #71CCA8" : "none"
                        }} />
                    {(errors.email && submitButtonClicked) && <p className='form-error'>{errors.email}</p>}

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
                        <button 
                            type="button" 
                            className='show-password-button' 
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <Eye /> : <EyeOff />}
                        </button>
                    </div>
                    {(errors.password && submitButtonClicked) && <p className='form-error'>{errors.password}</p>}


                    <div className="form-option-1-container">
                        <input className="form-checkbox" type="checkbox" id="rememberUser" name="rememberUser" value="rememberUser" />
                        <span className="form-label">Remember Me</span>
                        <a onClick={handleForgotPasswordClick} className="form-link">Forgot password?</a>
                    </div>

                    <button type="submit" onClick={handleSubmit} className='form-submit-button'>
                        Submit
                    </button>

                    <div className='form-option-2-container'> 
                        <span className="form-label">New Member? </span>
                        <a onClick={handleSignupClick} className="form-link">Sign Up here</a>
                    </div>
                </form>
            </div>
        </div>);
    }