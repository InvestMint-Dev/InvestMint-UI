export const ResetPasswordPage = () => {
    return (
        <div className='reset-password-container'>
            <h1 className="form-heading">Reset Password</h1>

            {/* password input */}
            <div className='password-container'>
                <input 
                    type={showPassword ? "text" : "password"} // Toggling between text and password
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className='form-textarea form-textarea-full password-textarea' 
                    placeholder='Password'
                    style={{
                        border: (errors.password && submitButtonClicked) ? "3px solid #71CCA8" : "none"
                    }} >
                    </input>
                <button type="button" className='show-password-button' onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <img alt='Open Eye' src={openEye}/> : <img alt='Closed Eye' src={closedEye}/>}
                </button>
            </div>
            {(errors.password && submitButtonClicked) && <p className='form-error'>{errors.password}</p>}

            <div className='password-container'>
                <input 
                    type={showPassword ? "text" : "password"} // Toggling between text and password
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className='form-textarea form-textarea-full password-textarea' 
                    placeholder='Password'
                    style={{
                        border: (errors.password && submitButtonClicked) ? "3px solid #71CCA8" : "none"
                    }} >
                    </input>
                <button type="button" className='show-password-button' onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <img alt='Open Eye' src={openEye}/> : <img alt='Closed Eye' src={closedEye}/>}
                </button>
            </div>
            {(errors.password && submitButtonClicked) && <p className='form-error'>{errors.password}</p>}

            <button onClick={handleSendResetLink} className='form-submit-button'>
                Reset
            </button>
        </div>
    );
}