import React, { useEffect } from 'react';
import './log-in-page.css';

import bigLeafLogo from '../../assets/images/logo/InvestMint Big Leaf Logo - 2.png';

export const LogInPage = () => {
    useEffect(() => {
        // Runs after the component mounts
        const element = document.querySelector('.log-in-form');
        if (element) {
            element.classList.add('fade-in');
        }
    }, []); // Empty dependency array means this effect runs once after the initial render


    return (
        <div>
            <img className='top-left-logo-display' src={bigLeafLogo}></img>

            <div className='log-in-form-container'>
                <h1 className='form-heading'>Log-in</h1>
                <div className='log-in-form'>
                    <textarea className='form-textarea form-textarea-full' placeholder='Email'></textarea>
                    <textarea className='form-textarea form-textarea-full' placeholder='Password'></textarea>

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
                        <a href="/create-account" className="form-link">Sign Up here</a>
                    </div>
                </div>
            </div>
        </div>
    );
}