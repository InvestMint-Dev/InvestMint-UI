import './../create-account-page.css';
import './create-account-page-2.css';
import { useState } from 'react';
import expandArrow from '../../../assets/images/expand-arrow.png';

export const CreateAccountPage2 = () => {
    const [isDropdown1Open, setIsDropdown1Open] = useState(false);
    const [isDropdown2Open, setIsDropdown2Open] = useState(false);

    const dropdownFunction1 = () => {
        setIsDropdown1Open(!isDropdown1Open); // Toggle dropdown open/close
    };

    const dropdownFunction2 = () => {
        setIsDropdown2Open(!isDropdown2Open); // Toggle dropdown open/close
    };


    return (
        <div className='page-container'>
            <div className='page-2-container'>
                <h1 className='form-heading'>Duo Factor Authentication</h1>
                <div className='duo-factor-authentication-form'>
                    <div className="form-dropdown">
                        <button onClick={dropdownFunction1} className="form-drop-button">Select a Security Question 
                        <text className="form-drop-arrow">▼</text>
                        </button>
                        {isDropdown1Open && (
                            <div id="dropdown-content-1" className="form-dropdown-content">
                                <a href="#">Option 1</a>
                                <a href="#">Option 2</a>
                                <a href="#">Option 3</a>
                            </div>
                        )}
                    </div>
                    <textarea className='form-textarea' placeholder='Answer'></textarea>

                    <h2>or</h2>

                    <div className="form-dropdown">
                        <button onClick={dropdownFunction2} className="form-drop-button"> Choose an Authentication Method
                        <text className="form-drop-arrow">▼</text>
                        </button>
                        {isDropdown2Open && (
                            <div id="dropdown-content-2" className="form-dropdown-content">
                                <a href="#">Option 1</a>
                                <a href="#">Option 2</a>
                                <a href="#">Option 3</a>
                            </div>
                        )}
                    </div>

                    <textarea className='form-textarea' placeholder='SMS'></textarea>

                    <div className='stepper-container'>
                        <button className='form-stepper-button'>
                            Back
                        </button>

                        <button className='form-stepper-button'>
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}