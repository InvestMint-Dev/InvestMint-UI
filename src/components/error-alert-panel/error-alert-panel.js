import './error-alert-panel.css';
import { useState } from 'react';

export const ErrorAlertPanel = ({ errors, className }) => {
    const onErrorClick = (key) => {
        const element = document.getElementsByName(key);
        console.log(element);
        if (element) {
            element[0].scrollIntoView({ behavior: 'smooth' });
        } else {
            console.warn(`Element with ID ${key} not found.`);
        }
    }
    return (
        <div className={`error-alert-panel ${className}`}>
            <h4>Error:</h4> 
            <ul>
            {Object.entries(errors).map(([key, error]) => (
                <li key={key}><a onClick={() => onErrorClick(key)}>{error}</a></li>
            ))}
            </ul>
        </div>
    );
}