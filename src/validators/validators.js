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

export const validateTwoFactorAuth = (formData) => {
    const errors = {};

    if (!formData.securityQuestion1 || formData.securityQuestion1.trim() === "") {
        errors.securityQuestion1 = "Choose your first security question.";
    }

    if (!errors.securityQuestion1 && (!formData.securityAnswer1 || formData.securityAnswer1.trim() === "")) {
        errors.securityAnswer1 = "Answer your first security question."
    }

    if (!formData.securityQuestion2 || formData.securityQuestion2.trim() === "") {
        errors.securityQuestion2 = "Choose your second security question.";
    }

    if (!errors.securityQuestion2 && (!formData.securityAnswer2 || formData.securityAnswer2.trim() === "")) {
        errors.securityAnswer2 = "Answer your second security question."
    }

    return errors;
};

export const validateCompanyLegalInfo = (formData) => {
    const errors = {};

    // // Validate first name and last name
    // if (!formData.firstName || formData.firstName.trim() === "") {
    //     errors.firstName = "First Name is required.";
    // }
    // if (!formData.lastName || formData.lastName.trim() === "") {
    //     errors.lastName = "Last Name is required.";
    // }

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
    // Validate company information
    if (!formData.companyName || formData.companyName.trim() === "") {
        errors.companyName = "Company Name is required.";
    }
    if (!formData.countryName || formData.countryName.trim() === "") {
        errors.countryName = "Country Name is required.";
    }
    if (!formData.addressLine || formData.addressLine.trim() === "") {
        errors.addressLine = "Company Address Line 1 is required.";
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

    if (!formData.bankAccounts || formData.bankAccounts.length === 0) {
        errors.bankAccounts = "At least one company bank account is required.";
    }

    if (!formData.authPersonnel || formData.authPersonnel.length === 0) {
        errors.authPersonnel = "At least one authorised personnel is required.";
    }
    // Validate bank accounts
    formData.authPersonnel.forEach((personnel, index) => {
        if (!personnel.firstName) {
            errors[`firstName-${index}`] = "First name is required.";
        }
        if (!personnel.lastName) {
            errors[`lastName-${index}`] = "Last name is required.";
        }

        if (!personnel.phoneNumber || personnel.phoneNumber.trim() === "") {
            errors[`phoneNumber-${index}`] = "Phone Number is required.";
        } else if (!phoneRegex.test(personnel.phoneNumber)) {
            errors[`phoneNumber-${index}`] = "Phone Number must be in the format (000) 000-0000.";
        }
    });

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

        if (!account.bankerName) {
            errors[`bankerName-${index}`] = "Banker name is required.";
        }

        if (!account.currency) {
            errors[`currency-${index}`] = "Select currency.";
        }

        if (!account.currentInterestRate) {
            errors[`currentInterestRate-${index}`] = "Current interest rate is required.";
        }
    });

    // Validate investment advisors
    formData.investmentAdvisors.forEach((advisor, index) => {
        if (!advisor.broker) {
            errors[`broker-${index}`] = "Broker selection is required.";
        }

        if (!advisor.investmentAccountNumber || advisor.investmentAccountNumber.trim() === "") {
            errors[`investmentAccountNumber-${index}`] = "Account number is required.";
        } else if (!/^\d+$/.test(advisor.investmentAccountNumber)) {
            errors[`investmentAccountNumber-${index}`] = "Account number must be numeric.";
        }

        if (!advisor.advisorName) {
            errors[`advisorName-${index}`] = "Advisor name is required.";
        }

        if (!advisor.investmentCurrency) {
            errors[`investmentCurrency-${index}`] = "Select currency.";
        }

        if (!advisor.investmentInterestRate) {
            errors[`investmentInterestRate-${index}`] = "Current interest rate is required.";
        }
    });

    return errors;
};

export const validateInvestingQuestionnaire = (formData) => {
    const errors = {};

    //Q1
    if (!formData.investingQ1 || formData.investingQ1.trim() === "") {
        errors.investingQ1 = "Answer question 1.";
    }
    
    //Q2
    if (!formData.investingQ2 || formData.investingQ2.trim() === "") {
        errors.investingQ2 = "Answer question 2.";
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
        errors.investingQ3 = "Answer question 3.";
    }

    //Q4
    if (!formData.investingQ4 || formData.investingQ4.trim() === "") {
        errors.investingQ4 = "Answer question 4.";
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
        errors.investingQ5 = "Answer question 5.";
    }

    //Q6
    if (!formData.investingQ6 || formData.investingQ6.trim() === "") {
        errors.investingQ6 = "Answer question 6.";
    }

    //Q7
    if (!formData.investingQ7 || formData.investingQ7.trim() === "") {
        errors.investingQ7 = "Answer question 7.";
    }

    //Q8
    if (!formData.investingQ8 || formData.investingQ8.trim() === "") {
        errors.investingQ8 = "Answer question 8.";
    }

    return errors;
};