import { validateInvestingQuestionnaire } from '../../../validators/validators';
import './create-account-page-4.css';
import { useState } from 'react';

export const CreateAccountPage4 = forwardRef((props, ref) => {
    const [knowTotalAmount, setKnowTotalAmount] = useState(null);
    const [cashBackByDate, setCashBackByDate] = useState(null);
    const { nextButtonClicked } = props;

    const [formData, setFormData] = useState({
        investingQ1: "",
        investingQ2: "",
        investingQ2CashAmount: "",
        investingQ2BusinessDuration: "",
        investingQ2AverageCashPerYear: "",
        investingQ3: "",
        investingQ4: "",
        investingQ4CashBackDate: "",
        investingQ4CashBackDuration: "",
        investingQ5: "",
        investingQ6: "",
        investingQ7: "",
        investingQ8: ""
    });

    const [errors, setErrors] = useState({});

    useImperativeHandle(ref, () => ({
        validate() {
            const validationErrors = validateInvestingQuestionnaire(formData);
            setErrors(validationErrors);
            return Object.keys(validationErrors).length === 0;
        }
    }));

    return (
        <div className='page-4-container'>
            <h1 className='form-heading'>Investing Questionnaire</h1>

            <div className='question-container'
            style={{ border: (errors.investingQ1 && nextButtonClicked) ? "2px solid red" : "none" }}>
                <p className='question-label'>When it comes to investing in money markets/fixed income securities or ETFs, I would describe myself as:</p>
                {(errors.investingQ1 && nextButtonClicked) && <p style={{ color: 'red' }}>{errors.investingQ1}</p>}
                <button className='question-answer-button'>Very experienced</button>
                <button className='question-answer-button'>Experienced</button>
                <button className='question-answer-button'>Somewhat experienced</button>
                <button className='question-answer-button'>Somewhat inexperienced</button>
                <button className='question-answer-button'>Very inexperienced</button>
            </div>
            <div className='question-footer question-footer-last'>
                Why am I being asked this question?
            </div>

            <div className='question-container'
            style={{ border: (errors.investingQ2 && nextButtonClicked) ? "2px solid red" : "none" }}>
                <p className='question-label'>Do you know the total amount of cash you would like to invest?</p>
                {(errors.investingQ2 && nextButtonClicked) && <p style={{ color: 'red' }}>{errors.investingQ2}</p>}
                <button className={`question-answer-button ${(knowTotalAmount !== null && knowTotalAmount === true) ? 'clicked' : ''}`} onClick={()=>setKnowTotalAmount(true)}>Yes</button>
                <button className={`question-answer-button ${(knowTotalAmount !== null && knowTotalAmount === false) ? 'clicked' : ''}`} onClick={()=>setKnowTotalAmount(false)}>No</button>

                {(knowTotalAmount !== null && knowTotalAmount === true) && 
                <div>
                    {(errors.investingQ2CashAmount && nextButtonClicked) && <p style={{ color: 'red' }}>{errors.investingQ2CashAmount}</p>}
                    <p>Enter Amount:</p>
                    <textarea style={{ border: (errors.investingQ2CashAmount && nextButtonClicked) ? "2px solid red" : "none" }} 
                    className='form-textarea text-input'>$ </textarea>
                </div>}

                {(knowTotalAmount !== null && knowTotalAmount === false) && 
                <div>
                    <p>How long have you been in business?</p>
                    {(errors.investingQ2BusinessDuration && nextButtonClicked) && <p style={{ color: 'red' }}>{errors.investingQ2BusinessDuration}</p>}
                    <div className='form-select duration-select'>
                        <select style={{ border: (errors.investingQ2BusinessDuration && nextButtonClicked) ? "2px solid red" : "none" }} >
                            <option value="">Select Duration</option>
                            <option value="duration1">Duration 1</option>
                            <option value="duration2">Duration 2</option>
                        </select>
                    </div>

                    <p>What is your average cash per year?</p>
                    {(errors.investingQ2AverageCashPerYear && nextButtonClicked) && <p style={{ color: 'red' }}>{errors.investingQ2AverageCashPerYear}</p>}
                    <textarea style={{ border: (errors.investingQ2AverageCashPerYear && nextButtonClicked) ? "2px solid red" : "none" }} className='form-textarea text-input'>$ </textarea>
                </div>}
            </div>
            <div className='question-footer question-footer-middle'>
                What am I being asked?
            </div>
            <div className='question-footer question-footer-last'>
                Why am I being asked this question?
            </div>

            <div className='question-container'  style={{ border: (errors.investingQ3 && nextButtonClicked) ? "2px solid red" : "none" }}>
                <p className='question-label'>Generally when making investments, I would like the money 
                available to be returned to my bank account within:</p>
                {(errors.investingQ3 && nextButtonClicked) && <p style={{ color: 'red' }}>{errors.investingQ3}</p>}
                <button className='question-answer-button'>1 month or less</button>
                <button className='question-answer-button'>1 to 3 months</button>
                <button className='question-answer-button'>3 to 6 months</button>
                <button className='question-answer-button'>6 to 9 months</button>
                <button className='question-answer-button'>9 to 12 months</button>
            </div>
            <div className='question-footer question-footer-middle'>
                What does my answer mean?
            </div>
            <div className='question-footer question-footer-last'>
                Why am I being asked this question?
            </div>

            <div className='question-container question-container-no-footer' style={{ border: (errors.investingQ4 && nextButtonClicked) ? "2px solid red" : "none" }}>
                <p className='question-label'>Do you need the cash back in the bank by a certain date or are 
                you okay to define a duration in which the investments will be available but not necessarily sold?</p>
                {(errors.investingQ4 && nextButtonClicked) && <p style={{ color: 'red' }}>{errors.investingQ4}</p>}
                <button className={`question-answer-button ${(cashBackByDate !== null && cashBackByDate === true) ? 'clicked' : ''}`} onClick={()=>setCashBackByDate(true)}>Date</button>
                <button className={`question-answer-button ${(cashBackByDate !== null && cashBackByDate === false) ? 'clicked' : ''}`} onClick={()=>setCashBackByDate(false)}>Duration</button>

                {(cashBackByDate !== null && cashBackByDate === true) && 
                <div>
                    <p>Enter Date:</p>
                    {(errors.investingQ4CashBackDate && nextButtonClicked) && <p style={{ color: 'red' }}>{errors.investingQ4CashBackDate}</p>}
                    <textarea className='form-textarea text-input'
                    style={{ border: (errors.investingQ4CashBackDate && nextButtonClicked) ? "2px solid red" : "none" }}></textarea>
                </div>}

                {(cashBackByDate !== null && cashBackByDate === false) && 
                <div>
                    <p>Enter Duration:</p>
                    {(errors.investingQ4CashBackDuration && nextButtonClicked) && <p style={{ color: 'red' }}>{errors.investingQ4CashBackDuration}</p>}
                    <textarea className='form-textarea text-input'
                    style={{ border: (errors.investingQ4CashBackDuration && nextButtonClicked) ? "2px solid red" : "none" }}></textarea>
                </div>}
            </div>

            <div className='question-container'
            style={{ border: (errors.investingQ5 && nextButtonClicked) ? "2px solid red" : "none" }}>
                <p className='question-label'>My current and future sources of cash are:</p>
                {(errors.investingQ5 && nextButtonClicked) && <p style={{ color: 'red' }}>{errors.investingQ5}</p>}
                <button className='question-answer-button'>Very unpredictable</button>
                <button className='question-answer-button'>Unpredictable</button>
                <button className='question-answer-button'>Somewhat predictable</button>
                <button className='question-answer-button'>Predictable</button>
                <button className='question-answer-button'>Very predictable</button>
            </div>
            <div className='question-footer question-footer-middle'>
                What does my answer mean?
            </div>
            <div className='question-footer question-footer-last'>
                Why am I being asked this question?
            </div>

            <div className='question-container'
            style={{ border: (errors.investingQ6 && nextButtonClicked) ? "2px solid red" : "none" }}>
                <p className='question-label'>From September 2008 through October 2008, bonds lost 4%. If I owned a fixed income investment that lost 4% in two months, I would:</p>
                {(errors.investingQ6 && nextButtonClicked) && <p style={{ color: 'red' }}>{errors.investingQ6}</p>}
                <button className='question-answer-button'>Sell the entire investment</button>
                <button className='question-answer-button'>Sell a portion of the investment</button>
            </div>
            <div className='question-footer question-footer-middle'>
                What does my answer mean?
            </div>
            <div className='question-footer question-footer-last'>
                Why am I being asked this question?
            </div>

            <div className='question-container question-container-no-footer'
            style={{ border: (errors.investingQ7 && nextButtonClicked) ? "2px solid red" : "none" }}>
                <p className='question-label'>The chart shows the greatest possible 1-year loss and the
                highest 1-year fain on 3 different hypothetical investments 
                of $1,000,000.* Given the potential gain or loss in any 
                1 year, I would invest my money in:</p>
                {(errors.investingQ7 && nextButtonClicked) && <p style={{ color: 'red' }}>{errors.investingQ7}</p>}
                <button className='question-answer-button'>The lowest volatility ETF</button>
                <button className='question-answer-button'>A low volatility ETF</button>
                <button className='question-answer-button'>A low to moderate volatility ETF</button>
            </div>

            <div className='question-container question-container-no-footer'
            style={{ border: (errors.investingQ8 && nextButtonClicked) ? "2px solid red" : "none" }}>
                <p className='question-label'>Generally, I prefer an investment with few (or no) ups and
                downs in value, and I am willing to accept the lower
                returns these investments may make.</p>
                {(errors.investingQ8 && nextButtonClicked) && <p style={{ color: 'red' }}>{errors.investingQ8}</p>}
                <button className='question-answer-button'>Strongly disagree</button>
                <button className='question-answer-button'>Disagree</button>
                <button className='question-answer-button'>Somewhat disagree</button>
                <button className='question-answer-button'>Somewhat agree</button>
                <button className='question-answer-button'>Agree</button>
                <button className='question-answer-button'>Strongly agree</button>
            </div>
        </div>
    );
});