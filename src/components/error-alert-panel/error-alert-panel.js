import './error-alert-panel.css';

export const ErrorAlertPanel = ({ className }) => {
    return (
        <div className={`error-alert-panel ${className}`}>
            <p>Some required information is missing.</p> 
            <p>Please review and complete all fields.</p>
        </div>
    );
}