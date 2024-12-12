import React, { useState, useEffect} from 'react';
import axios from 'axios';

import { validateCompanyLegalInfo } from '../../../validators/validators';

import { ErrorAlertPanel } from '../../../components/error-alert-panel/error-alert-panel';
import '../create-account-page.css';
import './create-account-page-3.css'
;
import { handleKeyDown } from '../../../utils/utils';

export const CreateAccountPage3 = ({ isCurrentPage, formData, updateFormData, onBack, onNext }) => {
    const [fadeIn, setFadeIn] = useState(false);
    const [displayStepper, setDisplayStepper] = useState(isCurrentPage);

    useEffect(() => {
        setDisplayStepper(isCurrentPage)
        setFadeIn(true); // Trigger fade-in effect on mount
    }, [isCurrentPage]);
    

    const [nextButtonClicked, setNextButtonClicked] = useState(false);
    const [suggestions, setSuggestions] = useState({
        state: [],
        city: [],
        zipcode: [],
        countryName: []
    });

    const REACT_APP_HERE_API_KEY = process.env.REACT_APP_HERE_API_KEY;

    const [errors, setErrors] = useState({});

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        
        // Phone number masking logic
        const formatPhoneNumber = (phoneNumber) => {
            const cleaned = phoneNumber.replace(/\D/g, ''); // Remove all non-numeric characters
            let formattedPhoneNumber = '';
            if (cleaned.length > 0) {
                formattedPhoneNumber += '(' + cleaned.substring(0, 3);
            }
            if (cleaned.length > 3) {
                formattedPhoneNumber += ') ' + cleaned.substring(3, 6);
            }
            if (cleaned.length > 6) {
                formattedPhoneNumber += '-' + cleaned.substring(6, 10);
            }
            return formattedPhoneNumber;
        };

        if (name === 'bank' || name === 'accountNumber'  || name === 'bankerName'  || name === 'currency'  || name === 'currentInterestRate') {
            const updatedBankAccounts = [...formData.bankAccounts];
            updatedBankAccounts[index] = { ...updatedBankAccounts[index], [name]: value };
            const newData = { ...formData, bankAccounts: updatedBankAccounts };
            updateFormData({ bankAccounts: updatedBankAccounts });
            setErrors(validateCompanyLegalInfo(newData));
        } 
        else if (name === 'authPersonnelFirstName' || name === 'authPersonnelLastName' || name === 'authPersonnelPhoneNumber') {
            const updatedAuthPersonnel = [...formData.authPersonnel];
            updatedAuthPersonnel[index] = { 
                ...updatedAuthPersonnel[index], 
                firstName: name === 'authPersonnelFirstName' ? value : updatedAuthPersonnel[index].firstName,
                lastName: name === 'authPersonnelLastName' ? value : updatedAuthPersonnel[index].lastName,
                phoneNumber: name === 'authPersonnelPhoneNumber' ? value : updatedAuthPersonnel[index].phoneNumber
            };            
            const newData = { ...formData, authPersonnel: updatedAuthPersonnel };
            updateFormData({ authPersonnel: updatedAuthPersonnel});
            setErrors(validateCompanyLegalInfo(newData));
        } 
        else if (name === 'broker' || name === 'advisorName' || name === 'investmentAccountNumber' || name === 'investmentCurrency' || name === 'investmentInterestRate') {
            const updatedInvestmentAdvisors = [...formData.investmentAdvisors];
            updatedInvestmentAdvisors[index] = { ...updatedInvestmentAdvisors[index], [name]: value };
            const newData = { ...formData, investmentAdvisors: updatedInvestmentAdvisors };
            updateFormData({ investmentAdvisors: updatedInvestmentAdvisors});
            setErrors(validateCompanyLegalInfo(newData));
        } 
        else {
            const formattedValue = ['phoneNumber', 'mobileNumber'].includes(name) 
                ? formatPhoneNumber(value) 
                : value;
            const newData = { ...formData, [name]: formattedValue };
            updateFormData({ [name]: formattedValue });
            setErrors(validateCompanyLegalInfo(newData));
        }

        if (name === 'addressLine' && value.length > 2) {
            // Fetch suggestions based on addressLine
            fetchAddressSuggestions(value);
        }
    };

    const handleNext = async () => {
        setNextButtonClicked(true);
        const validationErrors = validateCompanyLegalInfo(formData);
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

    const fetchAddressSuggestions = async (address) => {
        try {
            const response = await axios.get(`https://autocomplete.search.hereapi.com/v1/autocomplete`, {
                params: {
                    q: address,
                    in: 'countryCode:CAN', // For Canada
                    apiKey: REACT_APP_HERE_API_KEY, // Replace with your actual API key
                },
            });

            if (response.data && response.data.items) {
                const addressSuggestions = response.data.items.map(item => ({
                    title: item.address.label,
                    city: item.address.city || '', // Handle cases where city might be undefined
                    state: item.address.state || '', // Handle cases where state might be undefined
                    zipcode: item.address.postalCode || '', // Handle cases where zipcode might be undefined
                    countryName: item.address.countryName || '' // Handle cases where zipcode might be undefined
                }));

                setSuggestions(addressSuggestions);
            }
        } catch (error) {
            console.error('Error fetching suggestions:', error);
            setSuggestions([]); // Clear suggestions on error
        }
    };

    const handleLocationSuggestionClick = (suggestion) => {
        const updates = {
            addressLine: suggestion.title,
            city: suggestion.city,
            state: suggestion.state,
            zipcode: suggestion.zipcode,
            countryName: suggestion.countryName
        };
        updateFormData(updates);
        setSuggestions([]);
        setErrors(validateCompanyLegalInfo({ ...formData, ...updates }));
    };

    const addBankInputSet = () => {
        const newBankAccount = { id: Date.now(), bank: "", accountNumber: "", bankerName: "", currency: "", currentInterestRate: ""};
        const updatedBankAccounts = [...(formData.bankAccounts || []), newBankAccount];
        updateFormData({ bankAccounts: updatedBankAccounts });
        setErrors(validateCompanyLegalInfo({ ...formData, bankAccounts: updatedBankAccounts }));
    };

    const removeBankInputSet = (index) => {
        const updatedBankAccounts = formData.bankAccounts.filter((_, i) => i !== index);
        updateFormData({ bankAccounts: updatedBankAccounts });
        setErrors(validateCompanyLegalInfo({ ...formData, bankAccounts: updatedBankAccounts }));
    };

    const addauthPersonnel = () => {
        const newauthPersonnel = { id: Date.now(), firstName: "", lastName: "", phoneNumber: ""};
        const updatedAuthPersonnel = [...(formData.authPersonnel || []), newauthPersonnel];
        updateFormData({ authPersonnel: updatedAuthPersonnel });
        setErrors(validateCompanyLegalInfo({ ...formData, authPersonnel: updatedAuthPersonnel }));
    };

    const removeauthPersonnel = (index) => {
        const updatedAuthPersonnel = formData.authPersonnel.filter((_, i) => i !== index);
        updateFormData({ authPersonnel: updatedAuthPersonnel });
        setErrors(validateCompanyLegalInfo({ ...formData, authPersonnel: updatedAuthPersonnel }));
    };

    const addInvestmentAdvisorSet = () => {
        const newInvestmentAdvisor = { id: Date.now(), broker: "", investmentAccountNumber: "", advisorName: "", investmentCurrency: "", investmentInterestRate: ""};
        const updatedInvestmentAdvisors = [...(formData.investmentAdvisors || []), newInvestmentAdvisor];
        updateFormData({ investmentAdvisors: updatedInvestmentAdvisors });
        setErrors(validateCompanyLegalInfo({ ...formData, investmentAdvisors: updatedInvestmentAdvisors }));
    };

    const removeInvestmentAdvisorSet = (index) => {
        const updatedInvestmentAdvisors = formData.investmentAdvisors.filter((_, i) => i !== index);
        updateFormData({ investmentAdvisors: updatedInvestmentAdvisors });
        setErrors(validateCompanyLegalInfo({ ...formData, investmentAdvisors: updatedInvestmentAdvisors }));
    };


    return (
        <div id='create-account-3' className={`fade-in ${fadeIn ? 'visible' : ''}`}>
            <div className='create-account-form-container'>
                {!isCurrentPage && <div className="overlay"></div>}

                {Object.keys(errors).length > 0 && nextButtonClicked && (
                    <ErrorAlertPanel errors={errors} />
                )}

                <h1 className='form-heading'>Company Legal Information</h1>
                <div className='company-legal-information-form'>
                    {/* Form fields */}
                    <div className='form-textarea-container-full'>
                        <textarea onKeyDown={handleKeyDown}  id="form-textarea" className='form-textarea form-textarea-full' name="companyName" placeholder='Company Legal Name' value={formData.companyName} onChange={handleChange} style={{ border: (errors.companyName && nextButtonClicked) ? "3px solid #71CCA8" : "none" }} />
                        {(errors.companyName && nextButtonClicked) && <p className='form-error'>{errors.companyName}</p>}

                        <textarea onKeyDown={handleKeyDown}  id="form-textarea" className='form-textarea'  name="email" placeholder='Email' value={formData.email} onChange={handleChange} style={{ border: (errors.email && nextButtonClicked) ? "3px solid #71CCA8" : "none" }}></textarea>
                        {(errors.email && nextButtonClicked) && <p className='form-error'>{errors.email}</p>}
                        
                        <textarea onKeyDown={handleKeyDown}  id="form-textarea"
                            className='form-textarea'
                            name="phoneNumber"
                            placeholder='Phone Number (e.g. (123) 456-7890)'
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            style={{ border: (errors.phoneNumber && nextButtonClicked) ? "3px solid #71CCA8" : "none" }}
                        />
                        {(errors.phoneNumber && nextButtonClicked) && <p className='form-error'>{errors.phoneNumber}</p>}
                    </div>

                    <div className='form-textarea-container-full'>
                        <textarea onKeyDown={handleKeyDown}  id="form-textarea"
                            className='form-textarea form-textarea-full'
                            name="addressLine"
                            placeholder='Company Registered Address'
                            value={formData.addressLine}
                            onChange={handleChange}
                            style={{ border: (errors.addressLine && nextButtonClicked) ? "3px solid #71CCA8" : "none" }}
                        />
                        {/* Render suggestions for address line */}
                        {suggestions.length > 0 && (
                            <ul className="suggestions-list">
                                {suggestions.map((suggestion, index) => (
                                    <li key={index} onClick={() => handleLocationSuggestionClick(suggestion)}>
                                        {suggestion.title}
                                    </li>
                                ))}
                            </ul>
                        )}
                        {(errors.addressLine && nextButtonClicked) && <p className='form-error'>{errors.addressLine}</p>}
                    </div>

                    <div className='form-flex-container'>
                        {/* City Input */}
                        <div className='form-textarea-container-third'>
                            <textarea onKeyDown={handleKeyDown}  id="form-textarea"
                                className='form-textarea'
                                style={{ border: (errors.state && nextButtonClicked)  ? "3px solid #71CCA8" : "none" }} 
                                name="city"
                                placeholder='City'
                                value={formData.city}
                                readOnly // Make this read-only since it's auto-filled
                            />
                            {(errors.city && nextButtonClicked) && <p className='form-error'>{errors.city}</p>}
                        </div>

                        {/* State Input */}
                        <div className='form-textarea-container-third'>
                            <textarea onKeyDown={handleKeyDown}  id="form-textarea"
                                className='form-textarea'
                                style={{ border: (errors.city && nextButtonClicked) ? "3px solid #71CCA8" : "none" }} 
                                name="state"
                                placeholder='Province / State'
                                value={formData.state}
                                readOnly // Make this read-only since it's auto-filled
                            />
                            {(errors.state && nextButtonClicked) && <p className='form-error'>{errors.state}</p>}
                        </div>

                        {/* Zipcode Input */}
                        <div className='form-textarea-container-third'>
                            <textarea onKeyDown={handleKeyDown}  id="form-textarea"
                                className='form-textarea'
                                style={{ border: (errors.zipcode && nextButtonClicked)  ? "3px solid #71CCA8" : "none" }} 
                                name="zipcode"
                                placeholder='Zipcode'
                                value={formData.zipcode}
                                readOnly // Make this read-only since it's auto-filled
                            />
                            {(errors.zipcode && nextButtonClicked) && <p className='form-error'>{errors.zipcode}</p>}
                        </div>
                    </div>

                    <textarea onKeyDown={handleKeyDown}  id="form-textarea" 
                        className='form-textarea form-textarea-full' 
                        name="countryName" 
                        placeholder='Country' 
                        value={formData.countryName} 
                        style={{ border: (errors.countryName && nextButtonClicked) ? "3px solid #71CCA8" : "none" }} 
                        readOnly/>
                    {(errors.countryName && nextButtonClicked) && <p className='form-error'>{errors.countryName}</p>}

                    <div className='subtitle-container'>
                        <h3>Authorised Personnel Information</h3>
                        <button className="setinputs-add-button" onClick={addauthPersonnel}>+</button>
                    </div>
                    
                    {/* <div className='form-flex-container'>
                        <div className='form-textarea-container-half'>
                            <textarea onKeyDown={handleKeyDown}  id="form-textarea" className='form-textarea' name="firstName" placeholder='First Name' value={formData.firstName} onChange={handleChange} style={{ border: (errors.firstName && nextButtonClicked) ? "3px solid #71CCA8" : "none" }} />
                            {(errors.firstName && nextButtonClicked) && <p className='form-error'>{errors.firstName}</p>}
                        </div>

                        <div className='form-textarea-container-half'>
                            <textarea onKeyDown={handleKeyDown}  id="form-textarea" className='form-textarea' name="lastName" placeholder='Last Name' value={formData.lastName} onChange={handleChange} style={{ border: (errors.lastName && nextButtonClicked) ? "3px solid #71CCA8" : "none" }} />
                            {(errors.lastName && nextButtonClicked) && <p className='form-error'>{errors.lastName}</p>}
                        </div>
                    </div> */}
                    
                    <div className="setinputs-container"
                    style={{ border: (errors.authPersonnel && nextButtonClicked) ? "3px solid #71CCA8" : "none" }} >
                        {formData.authPersonnel.map((set, index) => (
                            <div key={set.id} className="setinputs-set">
                                <button className="setinputs-remove-button" onClick={() => removeauthPersonnel(index)}>Delete</button>

                                <textarea onKeyDown={handleKeyDown}
                                    className='form-textarea setinputs-textarea'
                                    id={`firstName-${index}`} 
                                    style={{ border: (errors[`firstName-${index}`] && nextButtonClicked) ? "3px solid #71CCA8" : "none" }} 
                                    name="authPersonnelFirstName" 
                                    value={formData.authPersonnel[index].firstName} // Ensure the value is set correctly
                                    placeholder="First Name" 
                                    onChange={(e) => handleChange(e, index)}
                                />
                                {(errors[`firstName-${index}`] && nextButtonClicked) && <p className='form-error'>{errors[`firstName-${index}`]}</p>}

                                <textarea onKeyDown={handleKeyDown}
                                    className='form-textarea setinputs-textarea'
                                    id={`lastName-${index}`} 
                                    style={{ border: (errors[`lastName-${index}`] && nextButtonClicked) ? "3px solid #71CCA8" : "none" }} 
                                    name="authPersonnelLastName" 
                                    value={formData.authPersonnel[index].lastName} // Ensure the value is set correctly
                                    placeholder="Last Name" 
                                    onChange={(e) => handleChange(e, index)}
                                />
                                {(errors[`lastName-${index}`] && nextButtonClicked) && <p className='form-error'>{errors[`lastName-${index}`]}</p>}


                                <textarea onKeyDown={handleKeyDown}
                                    className='form-textarea setinputs-textarea'
                                    id={`phoneNumber-${index}`} 
                                    style={{ border: (errors[`phoneNumber-${index}`] && nextButtonClicked) ? "3px solid #71CCA8" : "none" }} 
                                    name="authPersonnelPhoneNumber" 
                                    value={formData.authPersonnel[index].phoneNumber} // Ensure the value is set correctly
                                    placeholder="Phone Number" 
                                    onChange={(e) => handleChange(e, index)}
                                />
                                {(errors[`phoneNumber-${index}`] && nextButtonClicked) && <p className='form-error'>{errors[`phoneNumber-${index}`]}</p>}
                            </div>
                        ))}
                    </div>
                    {(errors.authPersonnel && nextButtonClicked) && <p className='form-error'>{errors.authPersonnel}</p>}
                    
                    <div className='subtitle-container'>
                        <h3>Company Bank Accounts</h3>
                        <button className="setinputs-add-button" onClick={addBankInputSet}>+</button>
                    </div>
                    
                    <div className="setinputs-container"
                    style={{ border: (errors.bankAccounts && nextButtonClicked) ? "3px solid #71CCA8" : "none" }} >
                        {formData.bankAccounts.map((set, index) => (
                            <div key={set.id} className="setinputs-set">
                                <button className="setinputs-remove-button" onClick={() => removeBankInputSet(index)}>Delete</button>

                                <div className='form-select setinputs-select'>
                                    <select 
                                        style={{ border: (errors[`account-${index}`] && nextButtonClicked) ? "3px solid #71CCA8" : "none" }} 
                                        id={`bank-${index}`} 
                                        name="bank" 
                                        value={formData.bankAccounts[index].bank} // Ensure the value is set correctly
                                        onChange={(e) => handleChange(e, index)}
                                    >
                                        <option value="">Select Bank</option>
                                        <option value="RBC">Royal Bank of Canada (RBC)</option>
                                        <option value="TD">Toronto-Dominion Bank (TD)</option>
                                        <option value="BMO">Bank of Montreal (BMO)</option>
                                        <option value="Scotiabank">Scotiabank (BNS)</option>
                                        <option value="CIBC">Canadian Imperial Bank of Commerce (CIBC)</option>
                                        <option value="NBC">National Bank of Canada (NBC)</option>
                                        <option value="Laurentian Bank">Laurentian Bank</option>
                                        <option value="EQ Bank">Equitable Bank (EQ Bank)</option>
                                    </select>                            
                                </div>
                                {(errors[`bank-${index}`] && nextButtonClicked) && <p className='form-error'>{errors[`bank-${index}`]}</p>}
                                
                                <textarea onKeyDown={handleKeyDown}
                                    className='form-textarea setinputs-textarea'
                                    id={`account-${index}`} 
                                    style={{ border: (errors[`account-${index}`] && nextButtonClicked) ? "3px solid #71CCA8" : "none" }} 
                                    name="accountNumber" 
                                    value={formData.bankAccounts[index].accountNumber} // Ensure the value is set correctly
                                    placeholder="Account Number" 
                                    onChange={(e) => handleChange(e, index)}
                                />
                                {(errors[`account-${index}`] && nextButtonClicked) && <p className='form-error'>{errors[`account-${index}`]}</p>}
                                
                                <textarea onKeyDown={handleKeyDown}
                                    className='form-textarea setinputs-textarea'
                                    id={`bankerName-${index}`} 
                                    style={{ border: (errors[`bankerName-${index}`] && nextButtonClicked) ? "3px solid #71CCA8" : "none" }} 
                                    name="bankerName" 
                                    value={formData.bankAccounts[index].bankerName} // Ensure the value is set correctly
                                    placeholder="Banker Name" 
                                    onChange={(e) => handleChange(e, index)}
                                />
                                {(errors[`bankerName-${index}`] && nextButtonClicked) && <p className='form-error'>{errors[`bankerName-${index}`]}</p>}
                                
                                <div className='form-select setinputs-select'>
                                    <select 
                                        style={{ border: (errors[`currency-${index}`] && nextButtonClicked) ? "3px solid #71CCA8" : "none" }} 
                                        id={`currency-${index}`} 
                                        name="currency" 
                                        value={formData.bankAccounts[index].currency} // Ensure the value is set correctly
                                        onChange={(e) => handleChange(e, index)}
                                    >
                                        <option value="">Select Currency</option>
                                        <option value="CAD">CAD (CA$)</option>
                                        <option value="USD">USD (US$)</option>
                                    </select>                            
                                </div>
                                {(errors[`currency-${index}`] && nextButtonClicked) && <p className='form-error'>{errors[`currency-${index}`]}</p>}

                                <textarea onKeyDown={handleKeyDown}
                                    className='form-textarea setinputs-textarea'
                                    id={`currentInterestRate-${index}`} 
                                    style={{ border: (errors[`currentInterestRate-${index}`] && nextButtonClicked) ? "3px solid #71CCA8" : "none" }} 
                                    name="currentInterestRate" 
                                    value={formData.bankAccounts[index].currentInterestRate} // Ensure the value is set correctly
                                    placeholder="Current Interest Rate (%)" 
                                    onChange={(e) => handleChange(e, index)}
                                />
                                {(errors[`currentInterestRate-${index}`] && nextButtonClicked) && <p className='form-error'>{errors[`currentInterestRate-${index}`]}</p>}
                            </div>
                        ))}
                    </div>
                    {(errors.bankAccounts && nextButtonClicked) && <p className='form-error'>{errors.bankAccounts}</p>}


                    <h3>Investment Advisors</h3>
                    {/* <textarea onKeyDown={handleKeyDown}  id="form-textarea" className='form-textarea form-textarea-full' name="advisorName" placeholder='Advisor Name' value={formData.advisorName} onChange={handleChange} style={{ border: errors.advisorName ? "3px solid #71CCA8" : "none" }} />
                    {errors.advisorName && <p className='form-error'>{errors.advisorName}</p>}
                    <textarea onKeyDown={handleKeyDown}  id="form-textarea" className='form-textarea form-textarea-full' name="investmentAccountNumber" placeholder='Company Investment Account Number' value={formData.investmentAccountNumber} onChange={handleChange} style={{ border: errors.investmentAccountNumber ? "3px solid #71CCA8" : "none" }} />
                    {errors.investmentAccountNumber && <p className='form-error'>{errors.investmentAccountNumber}</p>} */}

                    <div className="setinputs-container"
                    style={{ border: (errors.investmentAdvisors && nextButtonClicked) ? "3px solid #71CCA8" : "none" }} >
                        <button className="setinputs-add-button" onClick={addInvestmentAdvisorSet}>+</button>

                        {formData.investmentAdvisors.map((set, index) => (
                            <div key={set.id} className="setinputs-set">
                                <button className="setinputs-remove-button" onClick={() => removeInvestmentAdvisorSet(index)}>Delete</button>

                                <div className='form-select setinputs-select'>
                                    <select 
                                        style={{ border: (errors[`broker-${index}`] && nextButtonClicked) ? "3px solid #71CCA8" : "none" }} 
                                        id={`broker-${index}`} 
                                        name="broker" 
                                        value={formData.investmentAdvisors[index].broker} // Ensure the value is set correctly
                                        onChange={(e) => handleChange(e, index)}
                                    >
                                        <option value="">Select Broker</option>
                                        <option value="RBC">Royal Bank of Canada (RBC)</option>
                                        <option value="TD">Toronto-Dominion Bank (TD)</option>
                                        <option value="BMO">Bank of Montreal (BMO)</option>
                                        <option value="Scotiabank">Scotiabank (BNS)</option>
                                        <option value="CIBC">Canadian Imperial Bank of Commerce (CIBC)</option>
                                        <option value="NBC">National Bank of Canada (NBC)</option>
                                        <option value="Laurentian Bank">Laurentian Bank</option>
                                        <option value="EQ Bank">Equitable Bank (EQ Bank)</option>
                                    </select>                            
                                </div>
                                {(errors[`broker-${index}`] && nextButtonClicked) && <p className='form-error'>{errors[`broker-${index}`]}</p>}
                                
                                <textarea onKeyDown={handleKeyDown}
                                    className='form-textarea setinputs-textarea'
                                    id={`advisorName-${index}`} 
                                    style={{ border: (errors[`advisorName-${index}`] && nextButtonClicked) ? "3px solid #71CCA8" : "none" }} 
                                    name="advisorName" 
                                    value={formData.investmentAdvisors[index].advisorName} // Ensure the value is set correctly
                                    placeholder="Advisor Name" 
                                    onChange={(e) => handleChange(e, index)}
                                />
                                {(errors[`advisorName-${index}`] && nextButtonClicked) && <p className='form-error'>{errors[`advisorName-${index}`]}</p>}
                                
                                <textarea onKeyDown={handleKeyDown}
                                    className='form-textarea setinputs-textarea'
                                    id={`investmentAccountNumber-${index}`} 
                                    style={{ border: (errors[`investmentAccountNumber-${index}`] && nextButtonClicked) ? "3px solid #71CCA8" : "none" }} 
                                    name="investmentAccountNumber" 
                                    value={formData.investmentAdvisors[index].investmentAccountNumber} // Ensure the value is set correctly
                                    placeholder="Account Number" 
                                    onChange={(e) => handleChange(e, index)}
                                />
                                {(errors[`investmentAccountNumber-${index}`] && nextButtonClicked) && <p className='form-error'>{errors[`investmentAccountNumber-${index}`]}</p>}
                                
                                <div className='form-select setinputs-select'>
                                    <select 
                                        style={{ border: (errors[`investmentCurrency-${index}`] && nextButtonClicked) ? "3px solid #71CCA8" : "none" }} 
                                        id={`investmentCurrency-${index}`} 
                                        name="investmentCurrency" 
                                        value={formData.investmentAdvisors[index].investmentCurrency} // Ensure the value is set correctly
                                        onChange={(e) => handleChange(e, index)}
                                    >
                                        <option value="">Select Currency</option>
                                        <option value="CAD">CAD (CA$)</option>
                                        <option value="USD">USD (US$)</option>
                                    </select>                            
                                </div>
                                {(errors[`investmentCurrency-${index}`] && nextButtonClicked) && <p className='form-error'>{errors[`investmentCurrency-${index}`]}</p>}

                                <textarea onKeyDown={handleKeyDown}
                                    className='form-textarea setinputs-textarea'
                                    id={`investmentInterestRate-${index}`} 
                                    style={{ border: (errors[`investmentInterestRate-${index}`] && nextButtonClicked) ? "3px solid #71CCA8" : "none" }} 
                                    name="investmentInterestRate" 
                                    value={formData.investmentAdvisors[index].investmentInterestRate} // Ensure the value is set correctly
                                    placeholder="Current Interest Rate (%)" 
                                    onChange={(e) => handleChange(e, index)}
                                />
                                {(errors[`investmentInterestRate-${index}`] && nextButtonClicked) && <p className='form-error'>{errors[`investmentInterestRate-${index}`]}</p>}
                            </div>
                        ))}
                    </div>
                    {(errors.bankAccounts && nextButtonClicked) && <p className='form-error'>{errors.bankAccounts}</p>}
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