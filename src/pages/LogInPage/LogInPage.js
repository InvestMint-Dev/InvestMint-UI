import './LogInPage.css';
import React, { useEffect } from 'react';

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
            <h1>Log-in</h1>
            <div className='loginform'>
                <textarea placeholder='Email'></textarea>
                <textarea placeholder='Password'></textarea>

                <div className="options-container">
                    <input className="rememberUser-checkbox" type="checkbox" id="rememberUser" name="rememberUser" value="rememberUser" />
                    <span className="rememberUser-span">Remember Me</span>
                    <a href="" className="link">Forgot password</a>
                </div>

                <button className='submit-button'>
                    Submit
                </button>

                <div className='newmember-container'> 
                    <span className="rememberUser-span">New Member? </span>
                    <a href="" className="link">Sign Up here</a>
                </div>
            </div>
        </div>
    );
}