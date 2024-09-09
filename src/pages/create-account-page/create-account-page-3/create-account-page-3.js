import './create-account-page-3.css';
import React, { useState } from 'react';

export const CreateAccountPage3 = () => {
    const [bankInputSets, setBankInputSets] = useState([]); // Initial state with one input set

    const addBankInputSet = () => {
        setBankInputSets([...bankInputSets, { id: Date.now() }]); // Add new set with unique ID
    };

    const handleChange = (e, id) => {
        // Handle input change if needed
        const { name, value } = e.target;
        setBankInputSets(bankInputSets.map(set => 
            set.id === id ? { ...set, [name]: value } : set
        ));
    };

    return (
        <div className='page-3-container'>
            <h1 className='form-heading'>Company Legal Information</h1>
            <div className='company-legal-information-form'>
                <div className='form-flex-container'>
                    <textarea className='form-textarea form-textarea-half' placeholder='First Name'></textarea>
                    <textarea className='form-textarea form-textarea-half' placeholder='Last Name'></textarea>
                </div>

                <textarea className='form-textarea form-textarea-full' placeholder='Email'></textarea>

                <div className='form-flex-container'>
                    <textarea className='form-textarea form-textarea-half' placeholder='Phone Number'></textarea>
                    <textarea className='form-textarea form-textarea-half' placeholder='Mobile Number'></textarea>
                </div>

                <br/>

                <textarea className='form-textarea form-textarea-full' placeholder='Company Name'></textarea>
                <textarea className='form-textarea form-textarea-full' placeholder='Country'></textarea>
                <textarea className='form-textarea form-textarea-full' placeholder='Company Address Line 1'></textarea>
                
                <div className='form-flex-container'>
                    <textarea className='form-textarea form-textarea-third' placeholder='State'></textarea>
                    <textarea className='form-textarea form-textarea-third' placeholder='City'></textarea>
                    <textarea className='form-textarea form-textarea-third' placeholder='Zipcode'></textarea>
                </div>

                <textarea className='form-textarea form-textarea-full' placeholder='Company Phone Number'></textarea>

                <h3>Company Bank Accounts</h3>
                <div className="bankinputs-container">
                    <button className="bankinputs-add-button" onClick={addBankInputSet}>+</button>

                    {bankInputSets.map(set => (
                        <div key={set.id} className="bankinputs-set">
                            <select 
                            className='form-drop-button bankinputs-drop-button'
                                id={`bank-${set.id}`} 
                                name="bank" 
                                onChange={(e) => handleChange(e, set.id)}
                            >
                                <option value="">Select Bank</option>
                                <option value="bank1">Bank 1</option>
                                <option value="bank2">Bank 2</option>
                                {/* Add more options as needed */}
                            </select>
                            
                            <textarea 
                            className='form-textarea bankinputs-textarea'
                                id={`account-${set.id}`} 
                                name="account" 
                                placeholder="Account number" 
                                onChange={(e) => handleChange(e, set.id)}
                            />

                        </div>
                    ))}
                </div>


                <h3>If your company has an investment advisor:</h3>
                <textarea className='form-textarea form-textarea-full' placeholder='Advisor Name'></textarea>
                <textarea className='form-textarea form-textarea-full' placeholder='Company Investment Account Number'></textarea>
            </div>
        </div>
    );
}