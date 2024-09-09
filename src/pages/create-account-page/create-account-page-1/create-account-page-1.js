import { CreateAccountSidebar } from '../create-account-sidebar/create-account-sidebar';
import './../create-account-page.css';

export const CreateAccountPage1 = () => {
    return (
        <div className='page-1-container'>
            <h1 className='form-heading'>Create Your Account</h1>
            <div className='create-account-form'>
                <textarea className='form-textarea form-textarea-full' placeholder='Email'></textarea>
                <textarea className='form-textarea form-textarea-full' placeholder='Password'></textarea>
                <textarea className='form-textarea form-textarea-full' placeholder='Confirm Password'></textarea>

                <div className='form-option-2-container'> 
                    <span className="form-label">New Member? </span>
                    <a href="" className="form-link">Sign Up here</a>
                </div>
            </div>
        </div>       
        
    );
}