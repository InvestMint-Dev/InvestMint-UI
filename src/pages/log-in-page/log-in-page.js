import React, { useEffect } from 'react';
import './log-in-page.css';

export const LogInPage = () => {
    useEffect(() => {
        // Runs after the component mounts
        const element = document.querySelector('.loginform');
        if (element) {
            element.classList.add('fade-in');
        }
    }, []); // Empty dependency array means this effect runs once after the initial render


    return (
        <div className='loginform-container'>
            <h1 className='form-heading'>Log-in</h1>
            <div className='loginform'>
                <textarea className='form-textarea' placeholder='Email'></textarea>
                <textarea className='form-textarea' placeholder='Password'></textarea>

                <div className="form-option-1-container">
                    <input className="form-checkbox" type="checkbox" id="rememberUser" name="rememberUser" value="rememberUser" />
                    <span className="form-label">Remember Me</span>
                    <a href="" className="form-link">Forgot password</a>
                </div>

                <button className='form-submit-button'>
                    Submit
                </button>

                <div className='form-option-2-container'> 
                    <span className="form-label">New Member? </span>
                    <a href="" className="form-link">Sign Up here</a>
                </div>
            </div>
        </div>
    );
}