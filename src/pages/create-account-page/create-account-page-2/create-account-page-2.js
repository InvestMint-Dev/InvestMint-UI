import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ErrorAlertPanel } from '../../../components/error-alert-panel/error-alert-panel';
import { CreateAccountSidebar } from '../create-account-sidebar/create-account-sidebar';
import '../create-account-page.css';

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
            const validationErrors = validateCompanyLegalInfo(updatedData);
            setErrors(validationErrors);
            return updatedData;
        });
    };


    const handleNext = async () => {
        setNextButtonClicked(true);
        const validationErrors = validateCompanyLegalInfo(formData);
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
                <select 
                    style={{ border: (errors[`securityQuestion1`] && nextButtonClicked) ? "2px solid #61b090" : "none" }} 
                    id= "securityQuestion1"
                    name="securityQuestion1" 
                    value={formData.securityQuestion1} // Ensure the value is set correctly
                    onChange={(e) => handleChange(e)}
                >
                    <option value="">Select Bank</option>
                    <option value="RBC">Royal Bank of Canada (RBC)</option>
                    <option value="TD">Toronto-Dominion Bank (TD)</option>
                    <option value="BMO">Bank of Montreal (BMO)</option>
                    <option value="Scotiabank">Scotiabank (TD)</option>
                    <option value="CIBC">Canadian Imperial Bank of Commerce (CIBC)</option>
                    <option value="NBC">National Bank of Canada (NBC)</option>
                    <option value="Laurentian Bank">Laurentian Bank</option>
                    <option value="EQ Bank">Equitable Bank (EQ Bank)</option>
                </select>                            
                {(errors[`securityQuestion1`] && nextButtonClicked) && <p style={{ color: '#61b090' }}>{errors[`securityQuestion1`]}</p>}
                
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