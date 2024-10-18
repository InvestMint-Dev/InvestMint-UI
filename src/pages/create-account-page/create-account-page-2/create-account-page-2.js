import { React, useState, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { ErrorAlertPanel } from '../../../components/error-alert-panel/error-alert-panel';
import { CreateAccountSidebar } from '../create-account-sidebar/create-account-sidebar';
import '../create-account-page.css';
import './create-account-page-2.css';

import { handleKeyDown } from '../../../utils/utils';
import { validateTwoFactorAuth } from '../../../validators/validators';
import { useProgress } from '../../../context/ProgressContext'; // Use the progress context

export const CreateAccountPage2 = () => {
    const [fadeIn, setFadeIn] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const { currentStep, goToNextStep } = useProgress();

    useEffect (() => {
        setFadeIn(true); // Trigger fade-in effect on mount

        if (currentStep < 2) {
            navigate("/create-account-1");
        }
    }, []);

    // Access email and password from the state
    const { email, password } = location.state || {};

    const [showErrorAlert, setShowErrorAlert] = useState(false); // State for alert visibility
    const [alertClass, setAlertClass] = useState(""); // State for alert class

    const [formData, setFormData] = useState({
        securityQuestion1: "",
        securityAnswer1: "",
        securityQuestion2: "",
        securityAnswer2: ""
    });

    const [errors, setErrors] = useState({});
    const [nextButtonClicked, setNextButtonClicked] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prevData => {
            const updatedValue = value;
            const updatedData = { ...prevData, [name]: updatedValue };
            const validationErrors = validateTwoFactorAuth(updatedData);
            setErrors(validationErrors);
            return updatedData;
        });
    };


    const handleNext = async () => {
        setNextButtonClicked(true);
        const validationErrors = validateTwoFactorAuth(formData);
        setErrors(validationErrors);
        const isValid = Object.keys(validationErrors).length === 0;
        
        if (isValid) {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/auth/signup`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        auth0_id: Date.now(),
                        email: email,
                        password: password,
                        securityQuestion1: formData.securityQuestion1,
                        securityAnswer1: formData.securityAnswer1,
                        securityQuestion2: formData.securityQuestion2,
                        securityAnswer2: formData.securityAnswer2,
                    }),
                });

                const data = await response.json();
                console.log(data);
        
                if (response.ok) {
                    goToNextStep();
                    navigate('/create-account-3', { state: { userId: data.userId } }); // Navigate to the next page
                    setNextButtonClicked(false);
                    setShowErrorAlert(false);
                }
                else {
                    throw new Error('Failed to save signup information');
                }
            } catch (error) {
                console.error('Error saving signup information:', error);
            }
        } else {
            setAlertClass("show"); // Show error alert
            setShowErrorAlert(true); // Show error alert on validation failure
            window.scrollTo({ top: 0, behavior: 'auto' });
    
            // Hide error alert after 2 seconds
            setTimeout(() => {
                setAlertClass("hide"); // Start fade-out
                setTimeout(() => {
                setShowErrorAlert(false); // Remove from DOM after fade-out
                }, 1000); // Duration of the fade-out transition
            }, 2000);
        }
      };

      const handleBack = () => {
        navigate('/create-account-1');
      };

    return (
        <div className={`fade-in ${fadeIn ? 'visible' : ''}`}>
            {showErrorAlert && (
                <ErrorAlertPanel className={alertClass} />
            )}

            <CreateAccountSidebar currentPage={2}/>

            <div className='page-2-container'>\
                <h1 className="form-heading">Two-Factor Authentication</h1>
                
                <div className='two-factor-auth-form'>
                    <div className='form-select security-questions-select'>
                        <select 
                            style={{ border: (errors.securityQuestion1 && nextButtonClicked) ? "2px solid #61b090" : "none" }} 
                            id= "securityQuestion1"
                            name="securityQuestion1" 
                            value={formData.securityQuestion1} // Ensure the value is set correctly
                            onChange={(e) => handleChange(e)}
                        >
                            <option value="">Select Security Question 1</option>
                            <option value="firstClient">What was the name of your company's first major client?</option>
                            <option value="foundingYear">In what year was your company founded?</option>
                            <option value="firstOffice">What city was your company’s first office located in?</option>
                            <option value="founder">What is the name of your company’s founder?</option>
                            <option value="firstProject">What was the name of your company’s first project?</option>
                            <option value="companyMotto">What is your company’s motto or mission statement?</option>
                            <option value="firstProduct">What was the name of your company's first product or service?</option>
                            <option value="firstEmployee">What is the name of your company’s first employee?</option>
                            <option value="parentCompany">What is the name of your company’s parent company (if applicable)?</option>
                        </select>                            
                        {(errors.securityQuestion1 && nextButtonClicked) && <p style={{ color: '#61b090' }}>{errors.securityQuestion1}</p>}
                    </div>
                    
                    {formData.securityQuestion1 && 
                        <div className='form-textarea-container-full'>
                            <textarea onKeyDown={handleKeyDown}  id="form-textarea" className='form-textarea'  name="securityAnswer1" placeholder='Answer' value={formData.securityAnswer1} onChange={handleChange} style={{ border: (errors.securityAnswer1 && nextButtonClicked) ? "2px solid #61b090" : "none" }}></textarea>
                            {(errors.securityAnswer1 && nextButtonClicked) && <p style={{ color: '#61b090' }}>{errors.securityAnswer1}</p>}
                        </div>
                    }

                    <div className='form-select security-questions-select'>
                        <select 
                            style={{ border: (errors.securityQuestion2 && nextButtonClicked) ? "2px solid #61b090" : "none" }} 
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
                            <option value="firstBoardMember">What is the name of the first board member in your company?</option>
                            <option value="annualRevenue">What was your company’s reported annual revenue in its first year of operation?</option>
                        </select>                            
                        {(errors.securityQuestion2 && nextButtonClicked) && <p style={{ color: '#61b090' }}>{errors.securityQuestion2}</p>}
                    </div>

                    {formData.securityQuestion2 && 
                        <div className='form-textarea-container-full'>
                            <textarea onKeyDown={handleKeyDown}  id="form-textarea" className='form-textarea'  name="securityAnswer2" placeholder='Answer' value={formData.securityAnswer2} onChange={handleChange} style={{ border: (errors.securityAnswer2 && nextButtonClicked) ? "2px solid #61b090" : "none" }}></textarea>
                            {(errors.securityAnswer2 && nextButtonClicked) && <p style={{ color: '#61b090' }}>{errors.securityAnswer2}</p>}
                        </div>
                    }
                    
                </div>

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
            </div>
        </div>
    );
};