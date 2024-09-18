import { validateInvestingQuestionnaire } from '../../../validators/validators';
import './create-account-page-4.css';
import { useState } from 'react';

export const CreateAccountPage4 = forwardRef((props, ref) => {
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

            {/* Q1 */}
            <div className='question-container'
            style={{ border: (errors.investingQ1 && nextButtonClicked) ? "2px solid red" : "none" }}>
                <p className='question-label'>When it comes to investing in money markets/fixed income securities or ETFs, I would describe myself as:</p>
                {(errors.investingQ1 && nextButtonClicked) && <p style={{ color: 'red' }}>{errors.investingQ1}</p>}
                <button 
                    className={`question-answer-button ${(formData.investingQ1 !== "" && formData.investingQ1 === "Very experienced") ? 'clicked' : ''}`} 
                    onClick={() => setFormData({ ...formData, investingQ1: "Very experienced" })}>
                    Very experienced
                </button>
                <button 
                    className={`question-answer-button ${(formData.investingQ1 !== "" && formData.investingQ1 === "Experienced") ? 'clicked' : ''}`}
                    onClick={() => setFormData({ ...formData, investingQ1: "Experienced" })}>
                    Experienced
                </button>
                <button 
                    className={`question-answer-button ${(formData.investingQ1 !== "" && formData.investingQ1 === "Somewhat experienced") ? 'clicked' : ''}`}
                    onClick={() => setFormData({ ...formData, investingQ1: "Somewhat experienced" })}>
                    Somewhat experienced
                </button>
                <button 
                    className={`question-answer-button ${(formData.investingQ1 !== "" && formData.investingQ1 === "Somewhat inexperienced") ? 'clicked' : ''}`}
                    onClick={() => setFormData({ ...formData, investingQ1: "Somewhat inexperienced" })}>
                    Somewhat inexperienced
                </button>
                <button 
                    className={`question-answer-button ${(formData.investingQ1 !== "" && formData.investingQ1 === "Very inexperienced") ? 'clicked' : ''}`}
                    onClick={() => setFormData({ ...formData, investingQ1: "Very inexperienced" })}>
                    Very inexperienced
                </button>
            </div>
            <div className='question-footer question-footer-last'>
                Why am I being asked this question?
            </div>

            {/* Q2 */}
            <div className='question-container'
            style={{ border: (errors.investingQ2 && nextButtonClicked) ? "2px solid red" : "none" }}>
                <p className='question-label'>Do you know the total amount of cash you would like to invest?</p>
                {(errors.investingQ2 && nextButtonClicked) && <p style={{ color: 'red' }}>{errors.investingQ2}</p>}
                <button 
                    className={`question-answer-button ${(formData.investingQ2 !== "" && formData.investingQ2 === "Yes") ? 'clicked' : ''}`} 
                    onClick={() => setFormData({ ...formData, investingQ2: "Yes" })}>
                    Yes
                </button>
                <button 
                    className={`question-answer-button ${(formData.investingQ2 !== "" && formData.investingQ2 === "No") ? 'clicked' : ''}`} 
                    onClick={() => setFormData({ ...formData, investingQ2: "No" })}>
                    No
                </button>

                {(formData.investingQ2 !== "" && formData.investingQ2 === "Yes") && 
                <div>
                    {(errors.investingQ2CashAmount && nextButtonClicked) && <p style={{ color: 'red' }}>{errors.investingQ2CashAmount}</p>}
                    <p>Enter Amount:</p>
                    <textarea style={{ border: (errors.investingQ2CashAmount && nextButtonClicked) ? "2px solid red" : "none" }} 
                        className='form-textarea text-input' 
                        value={formData.investingQ2CashAmount} // Set the current value from the state
                        onChange={(e) => setFormData({ ...formData, investingQ2CashAmount: e.target.value })} // Update the state with the input value
                        placeholder="$"/>
                </div>}

                {(formData.investingQ2 !== "" && formData.investingQ2 === "No") && 
                <div>
                    <p>How long have you been in business?</p>
                    {(errors.investingQ2BusinessDuration && nextButtonClicked) && <p style={{ color: 'red' }}>{errors.investingQ2BusinessDuration}</p>}
                    <div className='form-select duration-select'>
                        <select style={{ border: (errors.investingQ2BusinessDuration && nextButtonClicked) ? "2px solid red" : "none" }} 
                            onChange={(e) => setFormData({ ...formData, investingQ2BusinessDuration: e.target.value })}>
                            <option value="">Select Duration</option>
                            <option value="duration1">Duration 1</option>
                            <option value="duration2">Duration 2</option>
                        </select>
                    </div>

                    <p>What is your average cash per year?</p>
                    {(errors.investingQ2AverageCashPerYear && nextButtonClicked) && <p style={{ color: 'red' }}>{errors.investingQ2AverageCashPerYear}</p>}
                    <textarea style={{ border: (errors.investingQ2AverageCashPerYear && nextButtonClicked) ? "2px solid red" : "none" }} className='form-textarea text-input' 
                        value={formData.investingQ2AverageCashPerYear} // Set the current value from the state
                        onChange={(e) => setFormData({ ...formData, investingQ2AverageCashPerYear: e.target.value })} // Update the state with the input value
                        placeholder="$"/>
                </div>}
            </div>
            <div className='question-footer question-footer-middle'>
                What am I being asked?
            </div>
            <div className='question-footer question-footer-last'>
                Why am I being asked this question?
            </div>

            {/* Q3 */}
            <div className='question-container'  style={{ border: (errors.investingQ3 && nextButtonClicked) ? "2px solid red" : "none" }}>
                <p className='question-label'>Generally when making investments, I would like the money 
                available to be returned to my bank account within:</p>
                {(errors.investingQ3 && nextButtonClicked) && <p style={{ color: 'red' }}>{errors.investingQ3}</p>}
                <button 
                    className={`question-answer-button ${(formData.investingQ3 !== "" && formData.investingQ3 === "1 month or less") ? 'clicked' : ''}`}
                    onClick={() => setFormData({ ...formData, investingQ3: "1 month or less" })}>
                    1 month or less
                </button>
                <button 
                    className={`question-answer-button ${(formData.investingQ3 !== "" && formData.investingQ3 === "1 to 3 months") ? 'clicked' : ''}`}
                    onClick={() => setFormData({ ...formData, investingQ3: "1 to 3 months" })}>
                    1 to 3 months
                </button>
                <button 
                    className={`question-answer-button ${(formData.investingQ3 !== "" && formData.investingQ3 === "3 to 6 months") ? 'clicked' : ''}`}
                    onClick={() => setFormData({ ...formData, investingQ3: "3 to 6 months" })}>
                    3 to 6 months
                </button>
                <button 
                    className={`question-answer-button ${(formData.investingQ3 !== "" && formData.investingQ3 === "6 to 9 months") ? 'clicked' : ''}`}
                    onClick={() => setFormData({ ...formData, investingQ3: "6 to 9 months" })}>
                    6 to 9 months
                </button>
                <button 
                    className={`question-answer-button ${(formData.investingQ3 !== "" && formData.investingQ3 === "9 to 12 months") ? 'clicked' : ''}`}
                    onClick={() => setFormData({ ...formData, investingQ3: "9 to 12 months" })}>
                    9 to 12 months
                </button>
            </div>
            <div className='question-footer question-footer-middle'>
                What does my answer mean?
            </div>
            <div className='question-footer question-footer-last'>
                Why am I being asked this question?
            </div>

            {/* Q4 */}
            <div className='question-container question-container-no-footer' style={{ border: (errors.investingQ4 && nextButtonClicked) ? "2px solid red" : "none" }}>
                <p className='question-label'>Do you need the cash back in the bank by a certain date or are 
                you okay to define a duration in which the investments will be available but not necessarily sold?</p>
                {(errors.investingQ4 && nextButtonClicked) && <p style={{ color: 'red' }}>{errors.investingQ4}</p>}
                <button className={`question-answer-button ${(investingQ4 !== "" && investingQ4 === "Date") ? 'clicked' : ''}`} 
                    onClick={() => setFormData({ ...formData, investingQ4: "Date" })}>
                    Date
                </button>
                <button className={`question-answer-button ${(investingQ4 !== "" && investingQ4 === "Duration") ? 'clicked' : ''}`} 
                    onClick={() => setFormData({ ...formData, investingQ4: "Duration" })}>
                    Duration
                </button>

                {(investingQ4 !== "" && investingQ4 === "Date") && 
                <div>
                    <p>Enter Date:</p>
                    {(errors.investingQ4CashBackDate && nextButtonClicked) && <p style={{ color: 'red' }}>{errors.investingQ4CashBackDate}</p>}
                    <textarea className='form-textarea text-input'
                        style={{ border: (errors.investingQ4CashBackDate && nextButtonClicked) ? "2px solid red" : "none" }}
                        value={formData.investingQ4CashBackDate} // Set the current value from the state
                        onChange={(e) => setFormData({ ...formData, investingQ4CashBackDate: e.target.value })}/>
                </div>}

                {(investingQ4 !== "" && investingQ4 === "Duration") && 
                <div>
                    <p>Enter Duration:</p>
                    {(errors.investingQ4CashBackDuration && nextButtonClicked) && <p style={{ color: 'red' }}>{errors.investingQ4CashBackDuration}</p>}
                    <textarea className='form-textarea text-input'
                        style={{ border: (errors.investingQ4CashBackDuration && nextButtonClicked) ? "2px solid red" : "none" }}
                        value={formData.investingQ4CashBackDuration} // Set the current value from the state
                        onChange={(e) => setFormData({ ...formData, investingQ4CashBackDuration: e.target.value })}/>
                </div>}
            </div>

            {/* Q5 */}
            <div className='question-container'
                style={{ border: (errors.investingQ5 && nextButtonClicked) ? "2px solid red" : "none" }}>
                <p className='question-label'>My current and future sources of cash are:</p>
                {(errors.investingQ5 && nextButtonClicked) && <p style={{ color: 'red' }}>{errors.investingQ5}</p>}
                
                <button 
                    className={`question-answer-button ${(formData.investingQ5 !== "" && formData.investingQ5 === "Very unpredictable") ? 'clicked' : ''}`}
                    onClick={() => setFormData({ ...formData, investingQ5: "Very unpredictable" })}>
                    Very unpredictable
                </button>
                <button 
                    className={`question-answer-button ${(formData.investingQ5 !== "" && formData.investingQ5 === "Unpredictable") ? 'clicked' : ''}`}
                    onClick={() => setFormData({ ...formData, investingQ5: "Unpredictable" })}>
                    Unpredictable
                </button>
                <button 
                    className={`question-answer-button ${(formData.investingQ5 !== "" && formData.investingQ5 === "Somewhat predictable") ? 'clicked' : ''}`}
                    onClick={() => setFormData({ ...formData, investingQ5: "Somewhat predictable" })}>
                    Somewhat predictable
                </button>
                <button 
                    className={`question-answer-button ${(formData.investingQ5 !== "" && formData.investingQ5 === "Predictable") ? 'clicked' : ''}`}
                    onClick={() => setFormData({ ...formData, investingQ5: "Predictable" })}>
                    Predictable
                </button>
                <button 
                    className={`question-answer-button ${(formData.investingQ5 !== "" && formData.investingQ5 === "Very predictable") ? 'clicked' : ''}`}
                    onClick={() => setFormData({ ...formData, investingQ5: "Very predictable" })}>
                    Very predictable
                </button>
            </div>
            <div className='question-footer question-footer-middle'>
                What does my answer mean?
            </div>
            <div className='question-footer question-footer-last'>
                Why am I being asked this question?
            </div>

            {/* Q6 */}
            <div className='question-container'
                style={{ border: (errors.investingQ6 && nextButtonClicked) ? "2px solid red" : "none" }}>
                <p className='question-label'>
                    From September 2008 through October 2008, bonds lost 4%. If I owned a fixed income investment that lost 4% in two months, I would:
                </p>
                {(errors.investingQ6 && nextButtonClicked) && <p style={{ color: 'red' }}>{errors.investingQ6}</p>}
                
                <button 
                    className={`question-answer-button ${(formData.investingQ6 !== "" && formData.investingQ6 === "Sell the entire investment") ? 'clicked' : ''}`}
                    onClick={() => setFormData({ ...formData, investingQ6: "Sell the entire investment" })}>
                    Sell the entire investment
                </button>
                <button 
                    className={`question-answer-button ${(formData.investingQ6 !== "" && formData.investingQ6 === "Sell a portion of the investment") ? 'clicked' : ''}`}
                    onClick={() => setFormData({ ...formData, investingQ6: "Sell a portion of the investment" })}>
                    Sell a portion of the investment
                </button>
            </div>
            <div className='question-footer question-footer-middle'>
                What does my answer mean?
            </div>
            <div className='question-footer question-footer-last'>
                Why am I being asked this question?
            </div>

            {/* Q7 */}
            <div className='question-container question-container-no-footer'
                style={{ border: (errors.investingQ7 && nextButtonClicked) ? "2px solid red" : "none" }}>
                <p className='question-label'>
                    The chart shows the greatest possible 1-year loss and the highest 1-year gain on 3 different hypothetical investments of $1,000,000.* Given the potential gain or loss in any 1 year, I would invest my money in:
                </p>
                {(errors.investingQ7 && nextButtonClicked) && <p style={{ color: 'red' }}>{errors.investingQ7}</p>}
                
                <button 
                    className={`question-answer-button ${(formData.investingQ7 !== "" && formData.investingQ7 === "The lowest volatility ETF") ? 'clicked' : ''}`}
                    onClick={() => setFormData({ ...formData, investingQ7: "The lowest volatility ETF" })}>
                    The lowest volatility ETF
                </button>
                <button 
                    className={`question-answer-button ${(formData.investingQ7 !== "" && formData.investingQ7 === "A low volatility ETF") ? 'clicked' : ''}`}
                    onClick={() => setFormData({ ...formData, investingQ7: "A low volatility ETF" })}>
                    A low volatility ETF
                </button>
                <button 
                    className={`question-answer-button ${(formData.investingQ7 !== "" && formData.investingQ7 === "A low to moderate volatility ETF") ? 'clicked' : ''}`}
                    onClick={() => setFormData({ ...formData, investingQ7: "A low to moderate volatility ETF" })}>
                    A low to moderate volatility ETF
                </button>
            </div>


            <div className='question-container question-container-no-footer'
                style={{ border: (errors.investingQ8 && nextButtonClicked) ? "2px solid red" : "none" }}>
                <p className='question-label'>
                    Generally, I prefer an investment with few (or no) ups and downs in value, and I am willing to accept the lower returns these investments may make.
                </p>
                {(errors.investingQ8 && nextButtonClicked) && <p style={{ color: 'red' }}>{errors.investingQ8}</p>}
                
                <button 
                    className='question-answer-button' 
                    onClick={() => setFormData({ ...formData, investingQ8: "Strongly disagree" })}>
                    Strongly disagree
                </button>
                <button 
                    className='question-answer-button' 
                    onClick={() => setFormData({ ...formData, investingQ8: "Disagree" })}>
                    Disagree
                </button>
                <button 
                    className='question-answer-button' 
                    onClick={() => setFormData({ ...formData, investingQ8: "Somewhat disagree" })}>
                    Somewhat disagree
                </button>
                <button 
                    className='question-answer-button' 
                    onClick={() => setFormData({ ...formData, investingQ8: "Somewhat agree" })}>
                    Somewhat agree
                </button>
                <button 
                    className='question-answer-button' 
                    onClick={() => setFormData({ ...formData, investingQ8: "Agree" })}>
                    Agree
                </button>
                <button 
                    className='question-answer-button' 
                    onClick={() => setFormData({ ...formData, investingQ8: "Strongly agree" })}>
                    Strongly agree
                </button>
            </div>
        </div>
    );
});