// LoadingPage.js
import React from 'react';
import './loading-page.css'; // Import the CSS file for styling
import logo from '../../assets/images/logo.png'; // Replace with your logo path

export const LoadingPage = () => {
    return (
        <div className="loading-page">
            <img src={logo} alt="Logo" className="loading-logo" />
            <div className="loading-bar">
                <div className="loading-progress"></div>
            </div>
        </div>
    );
};
