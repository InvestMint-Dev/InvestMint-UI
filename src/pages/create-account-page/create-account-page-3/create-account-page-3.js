import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { validateCompanyLegalInfo } from '../../../validators/validators';
import './create-account-page-3.css';

export const CreateAccountPage3 = forwardRef((props, ref) => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        mobileNumber: "",
        companyName: "",
        country: "",
        addressLine1: "",
        state: "",
        city: "",
        zipcode: "",
        companyPhoneNumber: "",
        bankAccounts: [{ id: 1, bank: "", accountNumber: "" }], // Example initial bank account
        advisorName: "",
        investmentAccountNumber: ""
    });

    const [errors, setErrors] = useState({});

    useImperativeHandle(ref, () => ({
        validate() {
            const validationErrors = validateCompanyLegalInfo(formData);
            setErrors(validationErrors);
            return Object.keys(validationErrors).length === 0;
        }
    }));

    const handleChange = (e, index) => {
        const { name, value } = e.target;

        if (name.startsWith('bank-')) {
            // Handle changes for bank account fields
            const fieldName = name.split('-')[0]; // bank or accountNumber
            setFormData(prevData => {
                const updatedBankAccounts = [...prevData.bankAccounts];
                updatedBankAccounts[index] = { ...updatedBankAccounts[index], [fieldName]: value };
                const updatedData = { ...prevData, bankAccounts: updatedBankAccounts };
                const validationErrors = validateCompanyLegalInfo(updatedData);
                setErrors(validationErrors);
                return updatedData;
            });
        } else {
            // Handle changes for other form fields
            setFormData(prevData => {
                const updatedData = { ...prevData, [name]: value };
                const validationErrors = validateCompanyLegalInfo(updatedData);
                setErrors(validationErrors);
                return updatedData;
            });
        }
    };

    const addBankInputSet = () => {
        setFormData(prevData => ({
            ...prevData,
            bankAccounts: [...prevData.bankAccounts, { id: Date.now(), bank: "", accountNumber: "" }]
        }));
    };

    const removeBankInputSet = (index) => {
        setFormData(prevData => ({
            ...prevData,
            bankAccounts: prevData.bankAccounts.filter((_, i) => i !== index)
        }));
    };

    return (
        <div className='page-3-container'>
            <h1 className='form-heading'>Company Legal Information</h1>
            <div className='company-legal-information-form'>
                {/* Form fields */}
                {errors.firstName && <p style={{ color: 'red' }}>{errors.firstName}</p>}
                {errors.lastName && <p style={{ color: 'red' }}>{errors.lastName}</p>}
                <div className='form-flex-container'>
                    <textarea className='form-textarea form-textarea-half' name="firstName" placeholder='First Name' value={formData.firstName} onChange={handleChange} style={{ border: errors.firstName ? "2px solid red" : "none" }} />
                    <textarea className='form-textarea form-textarea-half' name="lastName" placeholder='Last Name' value={formData.lastName} onChange={handleChange} style={{ border: errors.lastName ? "2px solid red" : "none" }} />
                </div>

                {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
                <textarea className='form-textarea form-textarea-full' name="email" placeholder='Email' value={formData.email} onChange={handleChange} style={{ border: errors.email ? "2px solid red" : "none" }} />

                {errors.phoneNumber && <p style={{ color: 'red' }}>{errors.phoneNumber}</p>}
                {errors.mobileNumber && <p style={{ color: 'red' }}>{errors.mobileNumber}</p>}
                <div className='form-flex-container'>
                    <textarea className='form-textarea form-textarea-half' name="phoneNumber" placeholder='Phone Number' value={formData.phoneNumber} onChange={handleChange} style={{ border: errors.phoneNumber ? "2px solid red" : "none" }} />
                    <textarea className='form-textarea form-textarea-half' name="mobileNumber" placeholder='Mobile Number' value={formData.mobileNumber} onChange={handleChange} style={{ border: errors.mobileNumber ? "2px solid red" : "none" }} />
                </div>

                {errors.companyName && <p style={{ color: 'red' }}>{errors.companyName}</p>}
                {errors.country && <p style={{ color: 'red' }}>{errors.country}</p>}
                {errors.addressLine1 && <p style={{ color: 'red' }}>{errors.addressLine1}</p>}
                <textarea className='form-textarea form-textarea-full' name="companyName" placeholder='Company Name' value={formData.companyName} onChange={handleChange} style={{ border: errors.companyName ? "2px solid red" : "none" }} />
                <textarea className='form-textarea form-textarea-full' name="country" placeholder='Country' value={formData.country} onChange={handleChange} style={{ border: errors.country ? "2px solid red" : "none" }} />
                <textarea className='form-textarea form-textarea-full' name="addressLine1" placeholder='Company Address Line 1' value={formData.addressLine1} onChange={handleChange} style={{ border: errors.addressLine1 ? "2px solid red" : "none" }} />

                {errors.state && <p style={{ color: 'red' }}>{errors.state}</p>}
                {errors.city && <p style={{ color: 'red' }}>{errors.city}</p>}
                {errors.zipcode && <p style={{ color: 'red' }}>{errors.zipcode}</p>}
                <div className='form-flex-container'>
                    <textarea className='form-textarea form-textarea-third' name="state" placeholder='State' value={formData.state} onChange={handleChange} style={{ border: errors.state ? "2px solid red" : "none" }} />
                    <textarea className='form-textarea form-textarea-third' name="city" placeholder='City' value={formData.city} onChange={handleChange} style={{ border: errors.city ? "2px solid red" : "none" }} />
                    <textarea className='form-textarea form-textarea-third' name="zipcode" placeholder='Zipcode' value={formData.zipcode} onChange={handleChange} style={{ border: errors.zipcode ? "2px solid red" : "none" }} />
                </div>

                {errors.companyPhoneNumber && <p style={{ color: 'red' }}>{errors.companyPhoneNumber}</p>}
                <textarea className='form-textarea form-textarea-full' name="companyPhoneNumber" placeholder='Company Phone Number' value={formData.companyPhoneNumber} onChange={handleChange} style={{ border: errors.companyPhoneNumber ? "2px solid red" : "none" }} />

                <h3>Company Bank Accounts</h3>
                <div className="bankinputs-container">
                    <button className="bankinputs-add-button" onClick={addBankInputSet}>+</button>

                    {formData.bankAccounts.map((set, index) => (
                        <div key={set.id} className="bankinputs-set">
                            <button className="bankinputs-remove-button" onClick={() => removeBankInputSet(index)}>Delete</button>

                            <div className='form-select bankinputs-select'>
                                {errors[`bank-${index}`] && <p style={{ color: 'red' }}>{errors[`bank-${index}`]}</p>}
                                <select 
                                    id={`bank-${index}`} 
                                    name="bank" 
                                    onChange={(e) => handleChange(e, index)}
                                >
                                    <option value="">Bank Name</option>
                                    <option value="bank1">Bank 1</option>
                                    <option value="bank2">Bank 2</option>
                                    {/* Add more options as needed */}
                                </select>                            
                            </div>
                            
                            {errors[`account-${index}`] && <p style={{ color: 'red' }}>{errors[`account-${index}`]}</p>}
                            <textarea 
                                className='form-textarea bankinputs-textarea'
                                id={`account-${index}`} 
                                name="accountNumber" 
                                placeholder="Account number" 
                                onChange={(e) => handleChange(e, index)}
                            />
                        </div>
                    ))}
                </div>

                <h3>If your company has an investment advisor:</h3>
                <textarea className='form-textarea form-textarea-full' name="advisorName" placeholder='Advisor Name' value={formData.advisorName} onChange={handleChange} style={{ border: errors.advisorName ? "2px solid red" : "none" }} />
                {errors.advisorName && <p style={{ color: 'red' }}>{errors.advisorName}</p>}
                <textarea className='form-textarea form-textarea-full' name="investmentAccountNumber" placeholder='Company Investment Account Number' value={formData.investmentAccountNumber} onChange={handleChange} style={{ border: errors.investmentAccountNumber ? "2px solid red" : "none" }} />
                {errors.investmentAccountNumber && <p style={{ color: 'red' }}>{errors.investmentAccountNumber}</p>}
            </div>
        </div>
    );
});