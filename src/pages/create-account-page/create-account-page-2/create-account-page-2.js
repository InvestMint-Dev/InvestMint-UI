import { React, useState, useEffect} from 'react';

import { ErrorAlertPanel } from '../../../components/error-alert-panel/error-alert-panel';
import '../create-account-page.css';
import './create-account-page-2.css';

import { handleKeyDown } from '../../../utils/utils';
import { validateTwoFactorAuth } from '../../../validators/validators';

export const CreateAccountPage2 = ({ isCurrentPage, formData, updateFormData, onBack, onNext }) => {
    const [fadeIn, setFadeIn] = useState(false);
    const [displayStepper, setDisplayStepper] = useState(isCurrentPage);

    useEffect (() => {
        setDisplayStepper(isCurrentPage);
        setFadeIn(true); // Trigger fade-in effect on mount
    }, [isCurrentPage]);

    const [errors, setErrors] = useState({});
    const [nextButtonClicked, setNextButtonClicked] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newData = { ...formData, [name]: value };
        updateFormData({ [name]: value });
        
        const validationErrors = validateTwoFactorAuth(newData);
        setErrors(validationErrors);
    };


    const handleNext = async () => {
        setNextButtonClicked(true);
        const validationErrors = validateTwoFactorAuth(formData);
        setErrors(validationErrors);
        const isValid = Object.keys(validationErrors).length === 0;
        
        if (isValid) {
            onNext();
            setDisplayStepper(false);
            setNextButtonClicked(false);
        } else {
            const errorAlertPanel = document.getElementById('error-alert-panel');
            if (errorAlertPanel) {
                errorAlertPanel.scrollIntoView({ behavior: 'smooth' });
            }
        }
      };

      const handleBack = () => {
        onBack();
      };

    return (
        <div id='create-account-2' className={`fade-in ${fadeIn ? 'visible' : ''}`}>
            <div className='create-account-form-container'>
                {!isCurrentPage && <div className="overlay"></div>}

                {Object.keys(errors).length > 0 && nextButtonClicked && (
                    <ErrorAlertPanel errors={errors} />
                )}

                <h1 className="form-heading">Two-Factor Authentication</h1>
                
                <div className='two-factor-auth-form'>
                    <div className='form-select security-questions-select'>
                        <select 
                            style={{ border: (errors.securityQuestion1 && nextButtonClicked) ? "3px solid #71CCA8" : "none" }} 
                            id= "securityQuestion1"
                            name="securityQuestion1" 
                            value={formData.securityQuestion1} // Ensure the value is set correctly
                            onChange={(e) => handleChange(e)}
                        >
                            <option value="">Select Security Question 1</option>
                            <option value="firstClient">What was the first name of your company's first major client?</option>
                            <option value="foundingYear">In what year was your company founded?</option>
                            <option value="firstOffice">What city was your company’s first office located in?</option>
                            <option value="founder">What is the first name of your company’s founder?</option>
                            <option value="firstProject">What was the name of your company’s first project?</option>
                            <option value="companyMotto">What is your company’s motto or mission statement?</option>
                            <option value="firstProduct">What was the name of your company's first product or service?</option>
                            <option value="firstEmployee">What is the first name of your company’s first employee?</option>
                            <option value="parentCompany">What is the name of your company’s parent company (if applicable)?</option>
                        </select>                            
                        {(errors.securityQuestion1 && nextButtonClicked) && <p className='form-error'>{errors.securityQuestion1}</p>}
                    </div>
                    
                    {formData.securityQuestion1 && 
                        <div className='form-textarea-container-full'>
                            <textarea onKeyDown={handleKeyDown}  id="form-textarea" className='form-textarea'  name="securityAnswer1" placeholder='Answer' value={formData.securityAnswer1} onChange={handleChange} style={{ border: (errors.securityAnswer1 && nextButtonClicked) ? "3px solid #71CCA8" : "none" }}></textarea>
                            {(errors.securityAnswer1 && nextButtonClicked) && <p className='form-error'>{errors.securityAnswer1}</p>}
                        </div>
                    }

                    <div className='form-textarea-container-full'>
                        <textarea onKeyDown={handleKeyDown}  id="form-textarea" className='form-textarea securityQuestion2-textarea'  name="securityQuestion2" placeholder='Enter your second security question.' value={formData.securityQuestion2} onChange={handleChange} style={{ border: (errors.securityQuestion2 && nextButtonClicked) ? "3px solid #71CCA8" : "none" }}></textarea>
                        {(errors.securityQuestion2 && nextButtonClicked) && <p className='form-error'>{errors.securityQuestion2}</p>}
                    </div>

                    {/* <div className='form-select security-questions-select'>
                        <select 
                            style={{ border: (errors.securityQuestion2 && nextButtonClicked) ? "3px solid #71CCA8" : "none" }} 
                            id= "securityQuestion2"
                            name="securityQuestion2" 
                            value={formData.securityQuestion2} // Ensure the value is set correctly
                            onChange={(e) => handleChange(e)}
                        >
                            <option value="">Select Security Question 2</option>
                            <option value="taxID">What is the last four digits of your company’s tax ID?</option>
                            <option value="firstSupplier">What was the name of your company’s first supplier?</option>
                            <option value="firstProductLaunch">In what year did your company launch its first product?</option>
                            <option value="patentNumber">What is the number of your company’s first patent (if applicable)?</option>
                            <option value="headquartersNickname">What is the internal nickname for your company's headquarters?</option>
                            <option value="firstClientContract">What was the name of the company involved in your first major client contract?</option>
                            <option value="industryAssociation">What is the name of the first industry association your company joined?</option>
                            <option value="companyAnniversary">What date does your company celebrate as its official anniversary?</option>
                            <option value="firstBoardMember">What is the first name of the first board member in your company?</option>
                            <option value="annualRevenue">What was your company’s reported annual revenue in its first year of operation?</option>
                        </select>                            
                        {(errors.securityQuestion2 && nextButtonClicked) && <p className='form-error'>{errors.securityQuestion2}</p>}
                    </div> */}

                    {formData.securityQuestion2 && 
                        <div>
                            <textarea onKeyDown={handleKeyDown}  id="form-textarea" className='form-textarea'  name="securityAnswer2" placeholder='Answer' value={formData.securityAnswer2} onChange={handleChange} style={{ border: (errors.securityAnswer2 && nextButtonClicked) ? "3px solid #71CCA8" : "none" }}></textarea>
                            {(errors.securityAnswer2 && nextButtonClicked) && <p className='form-error'>{errors.securityAnswer2}</p>}
                        </div>
                    }
                    
                </div>
                {
                    displayStepper && (
                        <div className='stepper-container'>
                            <div className="stepper-button-container">
                                <button className='form-stepper-button' onClick={handleBack}>
                                Back
                                </button>
                                <button className='form-stepper-button' onClick={handleNext}>
                                Next
                                </button>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};