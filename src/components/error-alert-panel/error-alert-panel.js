import './error-alert-panel.css';
import { useState } from 'react';

export const ErrorAlertPanel = ({ errors }) => {
    const onErrorClick = (key) => {
        const element = document.getElementsByName(key);
        if (element) {
            element[0].scrollIntoView({ behavior: 'smooth' });
        } else {
            console.warn(`Element with ID ${key} not found.`);
        }
    }
    return (
        <div id='error-alert-panel' className={`error-alert-panel`}>
            <h4>Error:</h4> 
            <ul>
            {Object.entries(errors).map(([key, error]) => (
                <li key={key}><a onClick={() => onErrorClick(key)}>{error}</a></li>
            ))}
            </ul>
        </div>
    );
}