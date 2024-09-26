// LoadingPage.js
import {React, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import './loading-page.css'; // Import the CSS file for styling
import logo from '../../assets/images/logo/InvestMint Big Leaf Logo - 2.png'; // Replace with your logo path

export const LoadingPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/log-in'); // Redirect to login page after loading
        }, 3000); // Adjust the timeout to match your loading duration

        return () => clearTimeout(timer); // Cleanup timer on unmount
    }, [navigate]);

    return (
        <div className="loading-page">
            <img src={logo} alt="Logo" className="loading-logo" />
            <div className="loading-bar">
                <div className="loading-progress"></div>
            </div>
        </div>
    );
};
