import { CreateAccountSidebar } from '../create-account-sidebar/create-account-sidebar';
import './../create-account-page.css';

export const CreateAccountPage1 = () => {
    return (
        <div className='page-container'>
            <CreateAccountSidebar/>
            <div className='page-1-container'>
            <h1 className='form-heading'>Create Your Account</h1>
            <div className='create-account-form'>
                <textarea className='form-textarea' placeholder='Email'></textarea>
                <textarea className='form-textarea' placeholder='Password'></textarea>
                <textarea className='form-textarea' placeholder='Confirm Password'></textarea>

                <button className='form-submit-button'>
                    Next
                </button>

                <div className='form-option-2-container'> 
                    <span className="form-label">New Member? </span>
                    <a href="" className="form-link">Sign Up here</a>
                </div>
            </div>
        </div>
        </div>
        
    );
}