// validators.js

export const validateLogInFields = (formData, formType) => {
    const errors = {};

    switch (formType) {
    case 'login':
        if (!formData.email) {
        errors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = 'Email is invalid.';
        }

        if (!formData.password) {
        errors.password = 'Password is required.';
        } else if (formData.password.length < 6) {
        errors.password = 'Password must be at least 6 characters long.';
        }
        break;

    case 'createAccount':
        if (!formData.email) {
        errors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = 'Email is invalid.';
        }

        if (!formData.password) {
        errors.password = 'Password is required.';
        } else if (formData.password.length < 6) {
        errors.password = 'Password must be at least 6 characters long.';
        }

        if (!formData.confirmPassword) {
            errors.confirmPassword = 'Confirm your password.';
        }
        else if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match.';
        }
        break;

    default:
        break;
    }

    return errors;
};


export const validateCompanyLegalInfo = (formData) => {
    const errors = {};

    // Validate first name and last name
    if (!formData.firstName || formData.firstName.trim() === "") {
        errors.firstName = "First Name is required.";
    }
    if (!formData.lastName || formData.lastName.trim() === "") {
        errors.lastName = "Last Name is required.";
    }

    // Validate email
    if (!formData.email || formData.email.trim() === "") {
        errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = "Email is invalid.";
    }

    const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;

    // Validate phone numbers
    if (!formData.phoneNumber || formData.phoneNumber.trim() === "") {
        errors.phoneNumber = "Phone Number is required.";
    } else if (!phoneRegex.test(formData.phoneNumber)) {
        errors.phoneNumber = "Phone Number must be in the format (000) 000-0000.";
    }

    if (!formData.mobileNumber || formData.mobileNumber.trim() === "") {
        errors.mobileNumber = "Mobile Number is required.";
    } else if (!phoneRegex.test(formData.mobileNumber)) {
        errors.mobileNumber = "Mobile Number must be 10 digits.";
    }

    // Validate company information
    if (!formData.companyName || formData.companyName.trim() === "") {
        errors.companyName = "Company Name is required.";
    }
    if (!formData.countryName || formData.countryName.trim() === "") {
        errors.countryName = "Country Name is required.";
    }
    if (!formData.addressLine1 || formData.addressLine1.trim() === "") {
        errors.addressLine1 = "Company Address Line 1 is required.";
    }
    if (!formData.state || formData.state.trim() === "") {
        errors.state = "State is required.";
    }
    if (!formData.city || formData.city.trim() === "") {
        errors.city = "City is required.";
    }
    if (!formData.zipcode || formData.zipcode.trim() === "") {
        errors.zipcode = "Zipcode is required.";
    }
    if (!formData.companyPhoneNumber || formData.companyPhoneNumber.trim() === "") {
        errors.companyPhoneNumber = "Company Phone Number is required.";
    } else if (!phoneRegex.test(formData.companyPhoneNumber)) {
        errors.companyPhoneNumber = "Company Phone Number must be 10 digits.";
    }

    if (!formData.bankAccounts || formData.bankAccounts.length === 0) {
        errors.bankAccounts = "At least one company bank account is required.";
    }
    // Validate bank accounts
    formData.bankAccounts.forEach((account, index) => {
        if (!account.bank) {
            errors[`bank-${index}`] = "Bank selection is required.";
        }
        if (!account.accountNumber || account.accountNumber.trim() === "") {
            errors[`account-${index}`] = "Account number is required.";
        } else if (!/^\d+$/.test(account.accountNumber)) {
            errors[`account-${index}`] = "Account number must be numeric.";
        }
    });

    // Validate advisor information
    if (formData.advisorName && formData.advisorName.trim() === "") {
        errors.advisorName = "Advisor Name is required.";
    }
    if (formData.investmentAccountNumber && formData.investmentAccountNumber.trim() === "") {
        errors.investmentAccountNumber = "Company Investment Account Number is required.";
    }

    return errors;
};

export const validateInvestingQuestionnaire = (formData) => {
    const errors = {};

    //Q1
    if (!formData.investingQ1 || formData.investingQ1.trim() === "") {
        errors.investingQ1 = "Answer this question.";
    }
    
    //Q2
    if (!formData.investingQ2 || formData.investingQ2.trim() === "") {
        errors.investingQ2 = "Answer this question.";
    }
    if (formData.investingQ2 === "Yes") {
        if (!formData.investingQ2CashAmount || formData.investingQ2CashAmount.trim() === "$") {
            errors.investingQ2CashAmount = "Enter cash amount.";
        }
    }
    if (formData.investingQ2 === "No") {
        if (!formData.investingQ2BusinessDuration || formData.investingQ2BusinessDuration.trim() === "") {
            errors.investingQ2BusinessDuration = "Enter duration.";
        }
        if (!formData.investingQ2AverageCashPerYear || formData.investingQ2AverageCashPerYear.trim() === "$") {
            errors.investingQ2AverageCashPerYear = "Enter average cash per year.";
        }
    }

    //Q3
    if (!formData.investingQ3 || formData.investingQ3.trim() === "") {
        errors.investingQ3 = "Answer this question.";
    }

    //Q4
    if (!formData.investingQ4 || formData.investingQ4.trim() === "") {
        errors.investingQ4 = "Answer this question.";
    }
    if (formData.investingQ4 === "Date") {
        if (!formData.investingQ4CashBackDate || formData.investingQ4CashBackDate.trim() === "") {
            errors.investingQ4CashBackDate = "Enter date.";
        }
    }
    if (formData.investingQ4 === "Duration") {
        if (!formData.investingQ4CashBackDuration || formData.investingQ4CashBackDuration.trim() === "") {
            errors.investingQ4CashBackDuration = "Enter duration.";
        }
    }

    //Q5
    if (!formData.investingQ5 || formData.investingQ5.trim() === "") {
        errors.investingQ5 = "Answer this question.";
    }

    //Q6
    if (!formData.investingQ6 || formData.investingQ6.trim() === "") {
        errors.investingQ6 = "Answer this question.";
    }

    //Q7
    if (!formData.investingQ7 || formData.investingQ7.trim() === "") {
        errors.investingQ7 = "Answer this question.";
    }

    //Q8
    if (!formData.investingQ8 || formData.investingQ8.trim() === "") {
        errors.investingQ8 = "Answer this question.";
    }

    return errors;
};