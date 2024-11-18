import { useState } from "react";

import { CreateAccountSidebar } from "./create-account-sidebar/create-account-sidebar";
import { CreateAccountPage1 } from "./create-account-page-1/create-account-page-1";
import { CreateAccountPage2 } from "./create-account-page-2/create-account-page-2";
import { CreateAccountPage3 } from "./create-account-page-3/create-account-page-3";
import { CreateAccountPage4 } from "./create-account-page-4/create-account-page-4";

export const CreateAccountPage = () => {
    const [currentStep, setCurrentStep] = useState(1);
    
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
        firstName: '',
        lastName: '',
        phoneNumber: '',
        mobileNumber: '',
        companyName: '',
        countryName: '',
        addressLine1: '',
        state: '',
        city: '',
        zipcode: '',
        companyPhoneNumber: '',
        bankAccounts: [{ id: Date.now(), bank: "", accountNumber: "" }],
        advisorName: '',
        investmentAccountNumber: ''
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
            // First, check if email exists
            const emailCheckResponse = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/auth/check-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: formData.email }),
            });

            if (!emailCheckResponse.ok) {
                throw new Error('Email already exists');
            }

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
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    phoneNumber: formData.phoneNumber,
                    mobileNumber: formData.mobileNumber,
                    companyName: formData.companyName,
                    countryName: formData.countryName,
                    companyPhoneNumber: formData.companyPhoneNumber,
                    companyAddressLine: formData.addressLine1,
                    state: formData.state,
                    city: formData.city,
                    zipcode: formData.zipcode,
                    companyBankAccounts: formData.bankAccounts,
                    advisorName: formData.advisorName,
                    companyInvestmentAccountNumber: formData.investmentAccountNumber,
                }),
            });

            if (!companyInfoResponse.ok) {
                throw new Error('Failed to save company information');
            }

            // Handle successful completion
            handleNext();
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
                    formData={formData}
                    updateFormData={updateFormData}
                    onNext={handleNext}
                />
            )}
            {currentStep >= 2 && (
                <CreateAccountPage2
                    formData={formData}
                    updateFormData={updateFormData}
                    onBack={handleBack}
                    onNext={handleNext}
                />
            )}
            {currentStep >= 3 && (
                <CreateAccountPage3
                    formData={formData}
                    updateFormData={updateFormData}
                    onBack={handleBack}
                    onNext={handleNext}
                />
            )}
            {currentStep >= 4 && (
                <CreateAccountPage4
                    formData={formData}
                    onBack={handleBack}
                    onSubmit={handleSubmit}
                />
            )}
        </div>
    );
};