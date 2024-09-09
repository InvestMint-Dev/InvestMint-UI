import './../create-account-page.css';
import './create-account-page-2.css';
import { useState } from 'react';

export const CreateAccountPage2 = () => {


    return (
        <div className='page-2-container'>
            <h1 className='form-heading'>Duo Factor Authentication</h1>
            <div className='duo-factor-authentication-form'>
                <div className="form-select">
                    <select>
                        <option value="">Select a Security Question</option>
                        <option value="1">Option 1</option>
                        <option value="2">Option 2</option>
                        <option value="3">Option 3</option>
                    </select>
                </div>
                <textarea className='form-textarea form-textarea-full' placeholder='Answer'></textarea>

                <h2>or</h2>

                <div className="form-select">
                    <select>
                        <option value="">Choose an Authentication Method</option>
                        <option value="1">Option 1</option>
                        <option value="2">Option 2</option>
                        <option value="3">Option 3</option>
                    </select>
                </div>
                <textarea className='form-textarea form-textarea-full' placeholder='SMS'></textarea>
            </div>
        </div>
    );
}