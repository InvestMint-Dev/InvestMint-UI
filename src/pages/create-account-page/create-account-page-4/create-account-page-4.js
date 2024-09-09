import './create-account-page-4.css';
import { useState } from 'react';

export const CreateAccountPage4 = () => {
    const [knowTotalAmount, setKnowTotalAmount] = useState(null);
    const [cashBackByDate, setCashBackByDate] = useState(null);

    return (
        <div className='page-4-container'>
            <h1 className='form-heading'>Investing Questionnaire</h1>

            <div className='question-container'>
                <p className='question-label'>When it comes to investing in money markets/fixed income securities or ETFs, I would describe myself as:</p>

                <button className='question-answer-button'>Very experienced</button>
                <button className='question-answer-button'>Experienced</button>
                <button className='question-answer-button'>Somewhat experienced</button>
                <button className='question-answer-button'>Somewhat inexperienced</button>
                <button className='question-answer-button'>Very inexperienced</button>
            </div>
            <div className='question-footer question-footer-last'>
                Why am I being asked this question?
            </div>

            <div className='question-container'>
                <p className='question-label'>Do you know the total amount of cash you would like to invest?</p>

                <button className={`question-answer-button ${knowTotalAmount ? 'clicked' : ''}`} onClick={()=>setKnowTotalAmount(true)}>Yes</button>
                <button className={`question-answer-button ${!knowTotalAmount ? 'clicked' : ''}`} onClick={()=>setKnowTotalAmount(false)}>No</button>

                {knowTotalAmount && 
                <div>
                    <p>Enter Amount:</p>
                    <textarea className='form-textarea text-input'>$ </textarea>
                </div>}

                {!knowTotalAmount && 
                <div>
                    <p>How long have you been in business?</p>
                    <div className='form-select duration-select'>
                        <select>
                            <option value="">Select Duration</option>
                            <option value="duration1">Duration 1</option>
                            <option value="duration2">Duration 2</option>
                        </select>
                    </div>

                    <p>What is your average cash per year?</p>
                    <textarea className='form-textarea text-input'>$ </textarea>
                </div>}
            </div>
            <div className='question-footer question-footer-middle'>
                What am I being asked?
            </div>
            <div className='question-footer question-footer-last'>
                Why am I being asked this question?
            </div>

            <div className='question-container question-container-no-footer'>
                <p className='question-label'>Do you need the cash back in the bank by a certain date or are 
                you okay to define a duration in which the investments will be available but not necessarily sold?</p>

                <button className={`question-answer-button ${cashBackByDate ? 'clicked' : ''}`} onClick={()=>setCashBackByDate(true)}>Date</button>
                <button className={`question-answer-button ${!cashBackByDate ? 'clicked' : ''}`} onClick={()=>setCashBackByDate(false)}>Duration</button>

                {cashBackByDate && 
                <div>
                    <p>Enter Date:</p>
                    <textarea className='form-textarea text-input'></textarea>
                </div>}

                {!cashBackByDate && 
                <div>
                    <p>Enter Duration:</p>
                    <textarea className='form-textarea text-input'></textarea>
                </div>}
            </div>
        </div>
    );
}