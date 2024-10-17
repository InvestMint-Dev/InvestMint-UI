import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ErrorAlertPanel } from '../../../components/error-alert-panel/error-alert-panel';
import { CreateAccountSidebar } from '../create-account-sidebar/create-account-sidebar';
import '../create-account-page.css';

import { handleKeyDown } from '../../../utils/utils';
import { validateTwoFactorAuth } from '../../../validators/validators';

export const CreateAccountPage2 = () => {
    const navigate = useNavigate();
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
                const response = await fetch(`http://localhost:8000/api/companyInformation/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        firstName: formData.firstName,
                        lastName: formData.lastName,
                        email: formData.email,
                        phoneNumber: formData.phoneNumber, 
                        mobileNumber: formData.mobileNumber, 
                        companyName: formData.companyName, 
                        companyPhoneNumber: formData.companyPhoneNumber, 
                        companyAddressLine: formData.companyAddressLine, 
                        city: formData.city, 
                        state: formData.state, 
                        zipcode: formData.zipcode, 
                        country: formData.country, 
                        companyBankAccounts: formData.bankAccounts, 
                        advisorName: formData.advisorName, 
                        companyInvestmentAccountNumber: formData.investmentAccountNumber, 
                    }),
                });
        
                if (!response.ok) {
                    throw new Error('Failed to save company information');
                }
        
                const data = await response.json();
                console.log('Company information saved:', data);

                navigate('/create-account-3'); // Navigate to the next page
                setNextButtonClicked(false);
                setShowErrorAlert(false);
            } catch (error) {
                console.error('Error saving company information:', error);
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
        <div>
            {showErrorAlert && (
                <ErrorAlertPanel className={alertClass} />
            )}

            <CreateAccountSidebar currentPage={3}/>

            <div className='page-3-container'>
                <div className='two-factor-auth-form'>
                    <select 
                        style={{ border: (errors.securityQuestion1 && nextButtonClicked) ? "2px solid #61b090" : "none" }} 
                        id= "securityQuestion1"
                        name="securityQuestion1" 
                        value={formData.securityQuestion1} // Ensure the value is set correctly
                        onChange={(e) => handleChange(e)}
                    >
                        <option value="">Select Security Question</option>
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
                    
                    <div className='form-textarea-container-full'>
                        <textarea onKeyDown={handleKeyDown}  id="form-textarea" className='form-textarea'  name="securityAnswer1" placeholder='Answer' value={formData.securityAnswer1} onChange={handleChange} style={{ border: (errors.securityAnswer1 && nextButtonClicked) ? "2px solid #61b090" : "none" }}></textarea>
                        {(errors.securityAnswer1 && nextButtonClicked) && <p style={{ color: '#61b090' }}>{errors.securityAnswer1}</p>}
                    </div>

                    <select 
                        style={{ border: (errors.securityQuestion2 && nextButtonClicked) ? "2px solid #61b090" : "none" }} 
                        id= "securityQuestion2"
                        name="securityQuestion2" 
                        value={formData.securityQuestion2} // Ensure the value is set correctly
                        onChange={(e) => handleChange(e)}
                    >
                        <option value="">Select Security Question</option>
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
                    
                    <div className='form-textarea-container-full'>
                        <textarea onKeyDown={handleKeyDown}  id="form-textarea" className='form-textarea'  name="securityAnswer2" placeholder='Answer' value={formData.securityAnswer2} onChange={handleChange} style={{ border: (errors.securityAnswer2 && nextButtonClicked) ? "2px solid #61b090" : "none" }}></textarea>
                        {(errors.securityAnswer2 && nextButtonClicked) && <p style={{ color: '#61b090' }}>{errors.securityAnswer2}</p>}
                    </div>
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