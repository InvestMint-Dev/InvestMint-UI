import { React, useEffect, useState } from 'react';
import './forgot-password-page.css';

export const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [sendResetLinkClicked, setSendResetLinkClicked] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [isSending, setIsSending] = useState(false);

    useEffect(() => {
        document.title = 'Forgot Password | InvestMint';
    }, []); // Empty dependency array means this effect runs once after the initial render

    const handleSendResetLink = async () => {
        setSendResetLinkClicked(true);
        setError(null);
        setSuccessMessage('');

        if (!email) {
            setError('Please provide the email address you used to sign up.');
        }
        else {
            try {
                setIsSending(true);
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/auth/forgot-password`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email }),
                });

                const data = await response.json();
                if (response.ok) {
                    setSuccessMessage('Password reset link sent successfully. Check your email.');
                    setSendResetLinkClicked(false);
                } else {
                    setError(data.message || 'Failed to send reset link.');
                }
            } catch (error) {
                setError('An error occurred. Please try again.');
            } finally {
                setIsSending(false);
            }
        }
    };

    return (
        <div className="forgot-password-container">
            <h1 className="form-heading">Forgot Password?</h1>

            <textarea
                style={{ border: (error && sendResetLinkClicked) ? "3px solid #71CCA8" : "none" }}
                className="form-textarea"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            ></textarea>
            {(error && sendResetLinkClicked) && <p className='form-error'>{error}</p>}
            {successMessage && <p className='form-error'>{successMessage}</p>}

            <button 
            onClick={handleSendResetLink} 
            className='form-submit-button'
            disabled={isSending}>
                {isSending ? 'Sending...' : 'Send Reset Link'}
            </button>
        </div>
    );
};
