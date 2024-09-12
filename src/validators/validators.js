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

    // Validate phone numbers
    if (!formData.phoneNumber || formData.phoneNumber.trim() === "") {
        errors.phoneNumber = "Phone Number is required.";
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
        errors.phoneNumber = "Phone Number must be 10 digits.";
    }

    if (!formData.mobileNumber || formData.mobileNumber.trim() === "") {
        errors.mobileNumber = "Mobile Number is required.";
    } else if (!/^\d{10}$/.test(formData.mobileNumber)) {
        errors.mobileNumber = "Mobile Number must be 10 digits.";
    }

    // Validate company information
    if (!formData.companyName || formData.companyName.trim() === "") {
        errors.companyName = "Company Name is required.";
    }
    if (!formData.country || formData.country.trim() === "") {
        errors.country = "Country is required.";
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
    } else if (!/^\d{5}$/.test(formData.zipcode)) {
        errors.zipcode = "Zipcode must be 5 digits.";
    }
    if (!formData.companyPhoneNumber || formData.companyPhoneNumber.trim() === "") {
        errors.companyPhoneNumber = "Company Phone Number is required.";
    } else if (!/^\d{10}$/.test(formData.companyPhoneNumber)) {
        errors.companyPhoneNumber = "Company Phone Number must be 10 digits.";
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