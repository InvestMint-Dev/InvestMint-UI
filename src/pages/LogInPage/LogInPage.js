import './LogInPage.css';

export const LogInPage = () => {
    return (
        <div className='loginform-container'>
            <h1>Log-in</h1>
            <div className='loginform'>
                <textarea placeholder='Email'></textarea>
                <textarea placeholder='Password'></textarea>

                <div className="options-container">
                    <input className="rememberUser-checkbox" type="checkbox" id="rememberUser" name="rememberUser" value="rememberUser" />
                    <span className="rememberUser-span">Remember Me</span>
                    <a href="" className="link">Forgot password</a>
                </div>

                <button className='submit-button'>
                    Submit
                </button>

                <div className='newmember-container'> 
                    <span className="rememberUser-span">New Member? </span>
                    <a href="" className="link">Sign Up here</a>
                </div>
            </div>
        </div>
    );
}