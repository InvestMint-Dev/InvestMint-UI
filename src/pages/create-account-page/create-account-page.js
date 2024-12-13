import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { CreateAccountSidebar } from "./create-account-sidebar/create-account-sidebar";
import { CreateAccountPage1 } from "./create-account-page-1/create-account-page-1";
import { CreateAccountPage2 } from "./create-account-page-2/create-account-page-2";
import { CreateAccountPage3 } from "./create-account-page-3/create-account-page-3";
import { CreateAccountPage4 } from "./create-account-page-4/create-account-page-4";

export const CreateAccountPage = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const navigate = useNavigate();
    
    // Combined state for all form data
    const [formData, setFormData] = useState({
        // Page 1 data
        email: '',
        password: '',
        confirmPassword: '',
        
        // Page 2 data
        securityQuestion1: '',
        securityAnswer1: '',
        securityQuestion2: '',
        securityAnswer2: '',
        
        // Page 3 data
        phoneNumber: '',
        companyName: '',
        countryName: '',
        addressLine: '',
        state: '',
        city: '',
        zipcode: '',
        authPersonnel: [{ id: Date.now(), firstName: "", lastName: "", phoneNumber: ""}],
        bankAccounts: [{ id: Date.now(), bank: "", accountNumber: "", bankerName: "", currency: "", currentInterestRate: ""}],
        investmentAdvisors: [{ id: Date.now(), broker: "", investmentAccountNumber: "", advisorName: "", investmentCurrency: "", investmentInterestRate: ""}]
    });

    const handleNext = () => {
        if (currentStep < 4) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const updateFormData = (newData) => {
        setFormData(prevData => ({
            ...prevData,
            ...newData
        }));
    };

    const handleSubmit = async () => {
        try {
            // Create user account
            const signupResponse = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    auth0_id: Date.now(),
                    email: formData.email,
                    password: formData.password,
                    securityQuestion1: formData.securityQuestion1,
                    securityAnswer1: formData.securityAnswer1,
                    securityQuestion2: formData.securityQuestion2,
                    securityAnswer2: formData.securityAnswer2,
                }),
            });

            if (!signupResponse.ok) {
                throw new Error('Failed to create account');
            }

            const { userId } = await signupResponse.json();

            // Save company information
            const companyInfoResponse = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/companyInformation/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    phoneNumber: formData.phoneNumber,
                    companyName: formData.companyName,
                    countryName: formData.countryName,
                    companyAddressLine: formData.addressLine,
                    state: formData.state,
                    city: formData.city,
                    zipcode: formData.zipcode,
                    companyBankAccounts: formData.bankAccounts,
                    authPersonnel: formData.authPersonnel,
                    investmentAdvisors: formData.investmentAdvisors
                }),
            });

            if (!companyInfoResponse.ok) {
                throw new Error('Failed to save company information');
            }

            const investingQuestionnaireResponse = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/investingQuestionnaire/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    investingQ1: formData.investingQ1,
                    investingQ2: formData.investingQ2,
                    investingQ2CashAmount: formData.investingQ2CashAmount,
                    investingQ2BusinessDuration: formData.investingQ2BusinessDuration,
                    investingQ2AverageCashPerYear: formData.investingQ2AverageCashPerYear,
                    investingQ3: formData.investingQ3,
                    investingQ4: formData.investingQ4,
                    investingQ4CashBackDate: formData.investingQ4CashBackDate,
                    investingQ4CashBackDuration: formData.investingQ4CashBackDuration,
                    investingQ5: formData.investingQ5,
                    investingQ6: formData.investingQ6,
                    investingQ7: formData.investingQ7,
                    investingQ8: formData.investingQ8
                }),
            });

            if (!investingQuestionnaireResponse.ok) {
                throw new Error('Failed to save investing questionnaire.');
            }

            // Handle successful completion
            navigate('/dashboard'); // Navigate to the next page
        } catch (error) {
            console.error('Error during account creation:', error);
            // Handle error appropriately
        }
    };

    return (
        <div>
            <CreateAccountSidebar currentPage={currentStep}/>

            {currentStep >= 1 && (
                <CreateAccountPage1 
                    isCurrentPage={(currentStep === 1)}
                    formData={formData}
                    updateFormData={updateFormData}
                    onNext={handleNext}
                />
            )}
            {currentStep >= 2 && (
                <CreateAccountPage2
                    isCurrentPage={(currentStep === 2)}
                    formData={formData}
                    updateFormData={updateFormData}
                    onBack={handleBack}
                    onNext={handleNext}
                />
            )}
            {currentStep >= 3 && (
                <CreateAccountPage3
                    isCurrentPage={(currentStep === 3)}
                    formData={formData}
                    updateFormData={updateFormData}
                    onBack={handleBack}
                    onNext={handleNext}
                />
            )}
            {currentStep >= 4 && (
                <CreateAccountPage4
                    isCurrentPage={(currentStep === 4)}
                    formData={formData}
                    updateFormData={updateFormData}
                    onBack={handleBack}
                    onSubmit={handleSubmit}
                />
            )}
        </div>
    );
};