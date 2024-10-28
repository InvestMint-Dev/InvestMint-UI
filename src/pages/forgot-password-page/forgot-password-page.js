import './forgot-password-page.css';

export const ForgotPasswordPage = () => {
    return (
        <div className="forgot-password-container">
            <h1>
                Forgot Password?
            </h1>

            <textarea className="form-textarea" placeholder="Email"></textarea>
            <button className='form-submit-button'>Send Reset Link</button>
        </div>
    );
}