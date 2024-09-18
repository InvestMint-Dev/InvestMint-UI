import './error-alert-panel.css';

export const ErrorAlertPanel = ({ className }) => {
    return (
        <div className={`error-alert-panel ${className}`}>
            Some required information is missing. Please review and complete all fields.
        </div>
    );
}