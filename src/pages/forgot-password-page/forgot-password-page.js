import { React, useState } from 'react';
import './forgot-password-page.css';

export const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [sendResetLinkClicked, setSendResetLinkClicked] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const handleSendResetLink = async () => {
        setSendResetLinkClicked(true);
        setError(null);
        setSuccessMessage('');

        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/auth/forgot-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            if (response.ok) {
                setSuccessMessage('Password reset link sent successfully. Check your email.');
            } else {
                setError(data.message || 'Failed to send reset link.');
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="forgot-password-container">
            <h1>Forgot Password?</h1>
            <textarea
                className="form-textarea"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            ></textarea>
            {error && <p style={{ color: '#61b090'}}>{error}</p>}
            {successMessage && <p className='form-error'>{successMessage}</p>}

            <button onClick={handleSendResetLink} className='form-submit-button'>
                Send Reset Link
            </button>
        </div>
    );
};
