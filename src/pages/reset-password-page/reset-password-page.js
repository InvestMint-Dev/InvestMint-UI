import React, { useEffect, useState } from 'react';
import { Loader2, Eye, EyeOff } from "lucide-react";

export const ResetPasswordPage = () => {
    const [formData, setFormData] = useState({ password: '', confirmPassword: '' });
    const [errors, setErrors] = useState({});
    const [submitButtonClicked, setSubmitButtonClicked] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [resetError, setResetError] = useState('');
    const [resetSuccess, setResetSuccess] = useState('');
    const [token, setToken] = useState('');
    
    useEffect(() => {
        document.title = 'Reset Password | InvestMint';
        
        // Try multiple methods to get the token
        const hash = window.location.hash;
        
        // Method 1: Parse from hash
        const hashParams = new URLSearchParams(hash.replace('#/reset-password', ''));
        const tokenFromHash = hashParams.get('token');
        
        // Method 2: Parse from search
        const searchParams = new URLSearchParams(window.location.search);
        const tokenFromSearch = searchParams.get('token');
        
        // Method 3: Parse full URL
        const fullUrlParams = new URLSearchParams(window.location.href.split('?')[1]);
        const tokenFromFullUrl = fullUrlParams.get('token');

        // Try to get the token from any available method
        const finalToken = tokenFromHash || tokenFromSearch || tokenFromFullUrl;
        
        if (finalToken) {
            setToken(finalToken);
        } else {
            setResetError('No reset token found in URL. Please use the link from your email.');
        }
    }, []);

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

    const handleResetPassword = async () => {
        setSubmitButtonClicked(true);

        // Check if token exists
        if (!token) {
            setResetError('Reset token is missing. Please use the link from your email.');
            return;
        }

        if (validateForm()) {
            setIsLoading(true);
            setResetError('');
            setResetSuccess('');

            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/auth/reset-password`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        token: token,  // Use the token from state
                        password: formData.password
                    }),
                });

                const data = await response.json();

                if (response.ok) {
                    setResetSuccess('Password reset successful!');
                    // Store the JWT token if returned
                    if (data.token) {
                        localStorage.setItem('token', data.token);
                    }
                    // Redirect to login page after 2 seconds
                    setTimeout(() => {
                        window.location.href = '/login';
                    }, 2000);
                } else {
                    setResetError(data.message || 'Failed to reset password.');
                }
            } catch (error) {
                setResetError('An error occurred. Please try again.');
            } finally {
                setIsLoading(false);
            }
        }
    };

    // Rest of the component remains the same...
    return (
        <div className="reset-password-container">
            <h1 className="form-heading">Reset Password</h1>

            {/* Password input */}
            <div className="password-container relative">
                <input 
                    type={showPassword ? "text" : "password"} 
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="form-textarea form-textarea-full password-textarea" 
                    placeholder="Password"
                    style={{
                        border: (errors.password && submitButtonClicked) ? "3px solid #71CCA8" : "none"
                    }}
                />
                <button 
                    type="button" 
                    className="show-password-button absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? 
                        <Eye className="h-5 w-5 text-gray-500" /> : 
                        <EyeOff className="h-5 w-5 text-gray-500" />
                    }
                </button>
            </div>
            {(errors.password && submitButtonClicked) && <p className="form-error">{errors.password}</p>}

            {/* Confirm Password input */}
            <div className="password-container relative">
                <input 
                    type={showPassword ? "text" : "password"} 
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="form-textarea form-textarea-full password-textarea" 
                    placeholder="Confirm Password"
                    style={{
                        border: (errors.confirmPassword && submitButtonClicked) ? "3px solid #71CCA8" : "none"
                    }}
                />
                <button 
                    type="button" 
                    className="show-password-button absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? 
                        <Eye className="h-5 w-5 text-gray-500" /> : 
                        <EyeOff className="h-5 w-5 text-gray-500" />
                    }
                </button>
            </div>
            {(errors.confirmPassword && submitButtonClicked) && <p className="form-error">{errors.confirmPassword}</p>}

            {resetError && <p className="form-error">{resetError}</p>}
            {resetSuccess && <p className="text-green-500">{resetSuccess}</p>}

            <button 
                onClick={handleResetPassword} 
                className="form-submit-button flex items-center justify-center gap-2"
                disabled={isLoading}
            >
                {isLoading ? (
                    <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Resetting...</span>
                    </>
                ) : (
                    'Reset Password'
                )}
            </button>
        </div>
    );
};