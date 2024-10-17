import './error-alert-panel.css';

export const ErrorAlertPanel = ({ className }) => {
    return (
        <div className={`error-alert-panel ${className}`}>
            <p>Error:</p> 
            <p>Please review and complete all fields.</p>
        </div>
    );
}