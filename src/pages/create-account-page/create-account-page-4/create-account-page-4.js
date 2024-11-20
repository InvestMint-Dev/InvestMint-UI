import React, { useState, useRef, useEffect } from 'react';
import './create-account-page-4.css';

import { handleKeyDown } from '../../../utils/utils';
import { validateInvestingQuestionnaire } from '../../../validators/validators';

import { ErrorAlertPanel } from '../../../components/error-alert-panel/error-alert-panel';
import chart from '../../../assets/images/create-account-page/page-4-chart.png';

export const CreateAccountPage4 = ( { formData, updateFormData, onBack, onSubmit } ) => {
    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {
        setFadeIn(true); // Trigger fade-in effect on mount
    }, []);

    const [nextButtonClicked, setNextButtonClicked] = useState(false);

    const [errors, setErrors] = useState({});
    const [expandedSections, setExpandedSections] = useState({
        1: false,
        2.1: false,
        2.2: false,
        3.1: false,
        3.2: false,
        5.1: false,
        5.2: false,
        6.1: false,
        6.2: false
    });
    const sectionRef = useRef({});
    const toggleSection = (sectionKey) => {
        setExpandedSections((prevSections) => ({
            ...prevSections,
            [sectionKey]: !prevSections[sectionKey],
        }));
    };
    
    const handleNext = async () => {
        setNextButtonClicked(true);
        const validationErrors = validateInvestingQuestionnaire(formData);
        setErrors(validationErrors);
        let isValid = Object.keys(validationErrors).length === 0;
    
        if (isValid) {
            onSubmit();
            setNextButtonClicked(false);
        } else {
            window.scrollTo({ top: 0, behavior: 'auto' });
        }
    };

    const handleBack = () => {
        onBack();
    };

    const formatCashValue = (fieldName, e) => {
        const rawValue = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
        const formattedValue = '$ ' + Number(rawValue).toLocaleString(); // Add commas and $ sign
        return { [fieldName]: formattedValue }; // Return in correct format
    };
    

    return (
        <div id='create-account-4' className={`fade-in ${fadeIn ? 'visible' : ''}`}>
            <div className='create-account-form-container'>
                {Object.keys(errors).length > 0 && nextButtonClicked && (
                    <ErrorAlertPanel errors={errors} />
                )}

                <h1 className='form-heading'>Investing Questionnaire</h1>

                {/* Q1 */}
                <div className='question-container'
                    name = 'investingQ1'
                    style={{ border: (errors.investingQ1 && nextButtonClicked) ? "3px solid #71CCA8" : "none" }}>
                    <p className='question-label'>When it comes to investing in money markets/fixed income securities or ETFs, I would describe myself as:</p>
                    {(errors.investingQ1 && nextButtonClicked) && <p className='form-error'>{errors.investingQ1}</p>}
                    <button 
                        className={`question-answer-button ${(formData.investingQ1 !== "" && formData.investingQ1 === "Very experienced") ? 'clicked' : ''}`} 
                        onClick={() => updateFormData({ investingQ1: "Very experienced" })}>
                        Very experienced
                    </button>
                    <button 
                        className={`question-answer-button ${(formData.investingQ1 !== "" && formData.investingQ1 === "Experienced") ? 'clicked' : ''}`}
                        onClick={() => updateFormData({ investingQ1: "Experienced" })}>
                        Experienced
                    </button>
                    <button 
                        className={`question-answer-button ${(formData.investingQ1 !== "" && formData.investingQ1 === "Somewhat experienced") ? 'clicked' : ''}`}
                        onClick={() => updateFormData({ investingQ1: "Somewhat experienced" })}>
                        Somewhat experienced
                    </button>
                    <button 
                        className={`question-answer-button ${(formData.investingQ1 !== "" && formData.investingQ1 === "Somewhat inexperienced") ? 'clicked' : ''}`}
                        onClick={() => updateFormData({ investingQ1: "Somewhat inexperienced" })}>
                        Somewhat inexperienced
                    </button>
                    <button 
                        className={`question-answer-button ${(formData.investingQ1 !== "" && formData.investingQ1 === "Very inexperienced") ? 'clicked' : ''}`}
                        onClick={() => updateFormData({ investingQ1: "Very inexperienced" })}>
                        Very inexperienced
                    </button>
                </div>
                <div className='question-footer question-footer-last'>
                    Why am I being asked this question?
                    <button 
                        onClick={() => toggleSection(1)}
                    >
                        {expandedSections[1] ? '−' : '+'}
                    </button>
                    <p 
                        ref={(el) => (sectionRef.current[1] = el)}
                        className={`section ${expandedSections[1] ? 'expanded' : ''}`}
                        style={{
                            maxHeight: expandedSections[1] ? `${sectionRef.current[1].scrollHeight}px` : '0',
                        }}>
                        Establishing your comfort level in investing is the first step of an effective asset/liability management program.
                    </p>
                </div>

                {/* Q2 */}
                <div className='question-container'
                name='investingQ2'
                style={{ border: (errors.investingQ2 && nextButtonClicked) ? "3px solid #71CCA8" : "none" }}>
                    <p className='question-label'>Do you know the total amount of cash you would like to invest?</p>
                    {(errors.investingQ2 && nextButtonClicked) && <p className='form-error'>{errors.investingQ2}</p>}
                    <button 
                        className={`question-answer-button ${(formData.investingQ2 !== "" && formData.investingQ2 === "Yes") ? 'clicked' : ''}`} 
                        onClick={() => updateFormData({ investingQ2: "Yes" })}>
                        Yes
                    </button>
                    <button 
                        className={`question-answer-button ${(formData.investingQ2 !== "" && formData.investingQ2 === "No") ? 'clicked' : ''}`} 
                        onClick={() => updateFormData({ investingQ2: "No" })}>
                        No
                    </button>

                    {(formData.investingQ2 !== "" && formData.investingQ2 === "Yes") && 
                    <div style={{marginTop: '1.875rem'}}>
                        {(errors.investingQ2CashAmount && nextButtonClicked) && <p className='form-error'>{errors.investingQ2CashAmount}</p>}
                        <p>Enter Amount:</p>
                        <textarea name='investingQ2CashAmount' onKeyDown={handleKeyDown}  id="form-textarea" style={{ border: (errors.investingQ2CashAmount && nextButtonClicked) ? "3px solid #71CCA8" : "none" }} 
                            className='form-textarea text-input' 
                            placeholder='$ 0'
                            value={formData.investingQ2CashAmount} // Set the current value from the state
                            onChange={(e) => updateFormData(formatCashValue('investingQ2CashAmount', e))}/>
                    </div>}

                    {(formData.investingQ2 !== "" && formData.investingQ2 === "No") && 
                    <div style={{marginTop: '1.875rem'}}>
                        <p>How long have you been in business? (in days)</p>
                        {(errors.investingQ2BusinessDuration && nextButtonClicked) && <p className='form-error'>{errors.investingQ2BusinessDuration}</p>}
                        <textarea onKeyDown={handleKeyDown}  id="form-textarea" style={{ border: (errors.investingQ2BusinessDuration && nextButtonClicked) ? "3px solid #71CCA8" : "none" }} className='form-textarea text-input' 
                            value={formData.investingQ2BusinessDuration} // Set the current value from the state
                            onChange={(e) => updateFormData({ investingQ2BusinessDuration: e.target.value })}/>

                        <p>What is your average cash per year?</p>
                        {(errors.investingQ2AverageCashPerYear && nextButtonClicked) && <p className='form-error'>{errors.investingQ2AverageCashPerYear}</p>}
                        <textarea onKeyDown={handleKeyDown} name='investingQ2AverageCashPerYear' id="form-textarea" style={{ border: (errors.investingQ2AverageCashPerYear && nextButtonClicked) ? "3px solid #71CCA8" : "none" }} className='form-textarea text-input' 
                            placeholder='$ 0'
                            value={formData.investingQ2AverageCashPerYear} // Set the current value from the state
                            onChange={(e) => updateFormData(formatCashValue('investingQ2AverageCashPerYear', e))}/>
                        <a href="#/cash-calculator" target="_blank">Average cash calculator</a>
                    </div>}
                </div>
                <div className='question-footer question-footer-middle'>
                    What am I being asked?
                    <button 
                        onClick={() => toggleSection(2.1)}
                    >
                        {expandedSections[2.1] ? '−' : '+'}
                    </button>
                    <p 
                    ref={(el) => (sectionRef.current[2.1] = el)}
                    className={`section ${expandedSections[2.1] ? 'expanded' : ''}`}
                    style={{
                        maxHeight: expandedSections[2.1] ? `${sectionRef.current[2.1].scrollHeight}px` : '0',
                    }}>
                        It is important to know exactly how much idle cash you have.  Just because you have a certain bank balance, the amount of cash you have available to invest is a function of how much money you have and when you need your cash back in the bank.
                    </p>
                </div>
                <div className='question-footer question-footer-last'>
                    Why am I being asked this question?
                    <button 
                        onClick={() => toggleSection(2.2)}
                    >
                        {expandedSections[2.2] ? '−' : '+'}
                    </button>
                    <p 
                    ref={(el) => (sectionRef.current[2.2] = el)}
                    className={`section ${expandedSections[2.2] ? 'expanded' : ''}`}
                    style={{
                        maxHeight: expandedSections[2.2] ? `${sectionRef.current[2.2].scrollHeight}px` : '0',
                    }}>
                        Determining how much money you want invested needs to be assessed with the timing when you want the cash back in your bank account. Depending on your goal, that could be a short or long period of time. It might be a onetime expense, such as buying inventory, paying bills, or even making an acquisition. These future plans are important to consider when mapping out an asset / liability management strategy.
                    </p>
                </div>

                {/* Q3 */}
                <div className='question-container' name='investingQ3' style={{ border: (errors.investingQ3 && nextButtonClicked) ? "3px solid #71CCA8" : "none" }}>
                    <p className='question-label'>Generally when making investments, I would like the money 
                    available to be returned to my bank account within:</p>
                    {(errors.investingQ3 && nextButtonClicked) && <p className='form-error'>{errors.investingQ3}</p>}
                    <button 
                        className={`question-answer-button ${(formData.investingQ3 !== "" && formData.investingQ3 === "1 month or less") ? 'clicked' : ''}`}
                        onClick={() => updateFormData({ investingQ3: "1 month or less" })}>
                        1 month or less
                    </button>
                    <button 
                        className={`question-answer-button ${(formData.investingQ3 !== "" && formData.investingQ3 === "1 to 3 months") ? 'clicked' : ''}`}
                        onClick={() => updateFormData({ investingQ3: "1 to 3 months" })}>
                        1 to 3 months
                    </button>
                    <button 
                        className={`question-answer-button ${(formData.investingQ3 !== "" && formData.investingQ3 === "3 to 6 months") ? 'clicked' : ''}`}
                        onClick={() => updateFormData({ investingQ3: "3 to 6 months" })}>
                        3 to 6 months
                    </button>
                    <button 
                        className={`question-answer-button ${(formData.investingQ3 !== "" && formData.investingQ3 === "6 to 9 months") ? 'clicked' : ''}`}
                        onClick={() => updateFormData({ investingQ3: "6 to 9 months" })}>
                        6 to 9 months
                    </button>
                    <button 
                        className={`question-answer-button ${(formData.investingQ3 !== "" && formData.investingQ3 === "9 to 12 months") ? 'clicked' : ''}`}
                        onClick={() => updateFormData({ investingQ3: "9 to 12 months" })}>
                        9 to 12 months
                    </button>
                </div>
                <div className='question-footer question-footer-middle'>
                    What does my answer mean?
                    <button 
                        onClick={() => toggleSection(3.1)}
                    >
                        {expandedSections[3.1] ? '−' : '+'}
                    </button>
                    <p 
                    ref={(el) => (sectionRef.current[3.1] = el)}
                    className={`section ${expandedSections[3.1] ? 'expanded' : ''}`}
                    style={{
                        maxHeight: expandedSections[3.1] ? `${sectionRef.current[3.1].scrollHeight}px` : '0',
                    }}>
                        Estimate the amount of time you have until you need to start spending the money you're investing. If your time frame is short, we'll suggest a more conservative allocation to preserve your assets. If you won't need the money for many years, we'll suggest an allocation that will target a slightly higher return for your risk tolerances.
                    </p>
                </div>
                <div className='question-footer question-footer-last'>
                    Why am I being asked this question?
                    <button 
                        onClick={() => toggleSection(3.2)}
                    >
                        {expandedSections[3.2] ? '−' : '+'}
                    </button>
                    <p 
                    ref={(el) => (sectionRef.current[3.2] = el)}
                    className={`section ${expandedSections[3.2] ? 'expanded' : ''}`}
                    style={{
                        maxHeight: expandedSections[3.2] ? `${sectionRef.current[3.2].scrollHeight}px` : '0',
                    }}>
                        Once you start withdrawing and spending your money, you'll want to be sure it will last as long as you need it to. Depending on your goal, that could be a short or long period of time. Your annual plan is critical to consider when mapping out an investment strategy.
                    </p>
                </div>

                {/* Q4 */}
                <div name='investingQ4' className='question-container question-container-no-footer' style={{ border: (errors.investingQ4 && nextButtonClicked) ? "3px solid #71CCA8" : "none" }}>
                    <p className='question-label'>Do you need the cash back in the bank by a certain date or are 
                    you okay to define a duration in which the investments will be available but not necessarily sold?</p>
                    {(errors.investingQ4 && nextButtonClicked) && <p className='form-error'>{errors.investingQ4}</p>}
                    <button className={`question-answer-button ${(formData.investingQ4 !== "" && formData.investingQ4 === "Date") ? 'clicked' : ''}`} 
                        onClick={() => updateFormData({ investingQ4: "Date" })}>
                        Date
                    </button>
                    <button className={`question-answer-button ${(formData.investingQ4 !== "" && formData.investingQ4 === "Duration") ? 'clicked' : ''}`} 
                        onClick={() => updateFormData({ investingQ4: "Duration" })}>
                        Duration
                    </button>

                    {(formData.investingQ4 !== "" && formData.investingQ4 === "Date") && 
                    <div style={{ marginTop: '1.875rem' }}>
                        <p>Enter Date:</p>
                        {(errors.investingQ4CashBackDate && nextButtonClicked) && <p className='form-error'>{errors.investingQ4CashBackDate}</p>}
                        <input
                            name='investingQ4CashBackDate'
                            type="date"
                            id="form-date"
                            className='form-textarea text-input'
                            style={{ border: (errors.investingQ4CashBackDate && nextButtonClicked) ? "3px solid #71CCA8" : "none" }}
                            value={formData.investingQ4CashBackDate}
                            onChange={(e) => updateFormData({ investingQ4CashBackDate: e.target.value })}
                        />
                    </div>}
                

                    {(formData.investingQ4 !== "" && formData.investingQ4 === "Duration") && 
                    <div style={{marginTop: '1.875rem'}}>
                        <p>Enter Duration:</p>
                        {(errors.investingQ4CashBackDuration && nextButtonClicked) && <p className='form-error'>{errors.investingQ4CashBackDuration}</p>}
                        <textarea 
                            name='investingQ4CashBackDuration'
                            onKeyDown={handleKeyDown}  id="form-textarea" className='form-textarea text-input'
                            style={{ border: (errors.investingQ4CashBackDuration && nextButtonClicked) ? "3px solid #71CCA8" : "none" }}
                            value={formData.investingQ4CashBackDuration} // Set the current value from the state
                            onChange={(e) => updateFormData({ investingQ4CashBackDuration: e.target.value })}/>
                    </div>}
                </div>

                {/* Q5 */}
                <div className='question-container'
                    name='investingQ5'
                    style={{ border: (errors.investingQ5 && nextButtonClicked) ? "3px solid #71CCA8" : "none" }}>
                    <p className='question-label'>My current and future sources of cash are:</p>
                    {(errors.investingQ5 && nextButtonClicked) && <p className='form-error'>{errors.investingQ5}</p>}
                    
                    <button 
                        className={`question-answer-button ${(formData.investingQ5 !== "" && formData.investingQ5 === "Very unpredictable") ? 'clicked' : ''}`}
                        onClick={() => updateFormData({ investingQ5: "Very unpredictable" })}>
                        Very unpredictable
                    </button>
                    <button 
                        className={`question-answer-button ${(formData.investingQ5 !== "" && formData.investingQ5 === "Unpredictable") ? 'clicked' : ''}`}
                        onClick={() => updateFormData({ investingQ5: "Unpredictable" })}>
                        Unpredictable
                    </button>
                    <button 
                        className={`question-answer-button ${(formData.investingQ5 !== "" && formData.investingQ5 === "Somewhat predictable") ? 'clicked' : ''}`}
                        onClick={() => updateFormData({ investingQ5: "Somewhat predictable" })}>
                        Somewhat predictable
                    </button>
                    <button 
                        className={`question-answer-button ${(formData.investingQ5 !== "" && formData.investingQ5 === "Predictable") ? 'clicked' : ''}`}
                        onClick={() => updateFormData({ investingQ5: "Predictable" })}>
                        Predictable
                    </button>
                    <button 
                        className={`question-answer-button ${(formData.investingQ5 !== "" && formData.investingQ5 === "Very predictable") ? 'clicked' : ''}`}
                        onClick={() => updateFormData({ investingQ5: "Very predictable" })}>
                        Very predictable
                    </button>
                </div>
                <div className='question-footer question-footer-middle'>
                    What does my answer mean?
                    <button 
                        onClick={() => toggleSection(5.1)}
                    >
                        {expandedSections[5.1] ? '−' : '+'}
                    </button>
                    <p 
                    ref={(el) => (sectionRef.current[5.1] = el)}
                    className={`section ${expandedSections[5.1] ? 'expanded' : ''}`}
                    style={{
                        maxHeight: expandedSections[5.1] ? `${sectionRef.current[5.1].scrollHeight}px` : '0',
                    }}>
                        Consider the sources of cash you expect to have in the future. How certain are you that they'll materialize? We'll consider your estimated degree of financial stability as another factor in determining an appropriate asset allocation.
                    </p>
                </div>
                <div className='question-footer question-footer-last'>
                    Why am I being asked this question?
                    <button 
                        onClick={() => toggleSection(5.2)}
                    >
                        {expandedSections[5.2] ? '−' : '+'}
                    </button>
                    <p 
                    ref={(el) => (sectionRef.current[5.2] = el)}
                    className={`section ${expandedSections[5.2] ? 'expanded' : ''}`}
                    style={{
                        maxHeight: expandedSections[5.2] ? `${sectionRef.current[5.2].scrollHeight}px` : '0',
                    }}>
                        Your asset mix could be completely conservative or moderately conservative depending on your current and future sources of cash. A stable financial outlook provides the foundation on which to base your investment strategy. Generally, more stability affords you more opportunity to take on investment risk. Less stability suggests that a more conservative approach might better serve you.
                    </p>
                </div>

                {/* Q6 */}
                <div className='question-container'
                    name='investingQ6'
                    style={{ border: (errors.investingQ6 && nextButtonClicked) ? "3px solid #71CCA8" : "none" }}>
                    <p className='question-label'>
                        From September 2008 through October 2008, bonds lost 4%. If I owned a fixed income investment that lost 4% in two months, I would:
                    </p>
                    {(errors.investingQ6 && nextButtonClicked) && <p className='form-error'>{errors.investingQ6}</p>}
                    
                    <button 
                        className={`question-answer-button ${(formData.investingQ6 !== "" && formData.investingQ6 === "Sell the entire investment") ? 'clicked' : ''}`}
                        onClick={() => updateFormData({ investingQ6: "Sell the entire investment" })}>
                        Sell the entire investment
                    </button>
                    <button 
                        className={`question-answer-button ${(formData.investingQ6 !== "" && formData.investingQ6 === "Sell a portion of the investment") ? 'clicked' : ''}`}
                        onClick={() => updateFormData({ investingQ6: "Sell a portion of the investment" })}>
                        Sell a portion of the investment
                    </button>
                </div>
                <div className='question-footer question-footer-middle'>
                    What does my answer mean?
                    <button 
                        onClick={() => toggleSection(6.1)}
                    >
                        {expandedSections[6.1] ? '−' : '+'}
                    </button>
                    <p 
                    ref={(el) => (sectionRef.current[6.1] = el)}
                    className={`section ${expandedSections[6.1] ? 'expanded' : ''}`}
                    style={{
                        maxHeight: expandedSections[6.1] ? `${sectionRef.current[6.1].scrollHeight}px` : '0',
                    }}>
                        If you're inclined to sell all or a portion of your investments during a volatile time in the market, that suggests you have a lower risk tolerance and may prefer a more conservative asset mix. If you tend to hold on to your investments or even buy more during this time, you have a slightly higher risk tolerance and may feel comfortable with an higher target return allocation.
                    </p>
                </div>
                <div className='question-footer question-footer-last'>
                    Why am I being asked this question?
                    <button 
                        onClick={() => toggleSection(6.2)}
                    >
                        {expandedSections[6.2] ? '−' : '+'}
                    </button>
                    <p 
                    ref={(el) => (sectionRef.current[6.2] = el)}
                    className={`section ${expandedSections[6.2] ? 'expanded' : ''}`}
                    style={{
                        maxHeight: expandedSections[6.2] ? `${sectionRef.current[6.2].scrollHeight}px` : '0',
                    }}>
                        Market volatility can trigger uncertainty and fear. Your risk tolerance is how comfortable you are during volatile times, when market swings can  change the return of your investments. Taking on more risk can lead to higher returns, but could also have lower returns (or even small losses) in certain scenarios. Conversely, a mix that's too conservative can miss out of risk-appropriate returns.
                    </p>
                </div>

                {/* Q7 */}
                <div className='question-container question-container-no-footer'
                    name='investingQ7'
                    style={{ border: (errors.investingQ7 && nextButtonClicked) ? "3px solid #71CCA8" : "none" }}>
                    <p className='question-label'>
                        The chart shows the greatest possible 1-year loss and the highest 1-year gain on 3 different hypothetical investments of $1,000,000.* Given the potential gain or loss in any 1 year, I would invest my money in:
                    </p>
                    {(errors.investingQ7 && nextButtonClicked) && <p className='form-error'>{errors.investingQ7}</p>}
                    
                    <img alt='Investment Options Chart (jpg)' src={chart}></img>
                    
                    <button 
                        className={`question-answer-button ${(formData.investingQ7 !== "" && formData.investingQ7 === "The lowest volatility ETF") ? 'clicked' : ''}`}
                        onClick={() => updateFormData({ investingQ7: "The lowest volatility ETF" })}>
                        The lowest volatility ETF
                    </button>
                    <button 
                        className={`question-answer-button ${(formData.investingQ7 !== "" && formData.investingQ7 === "A low volatility ETF") ? 'clicked' : ''}`}
                        onClick={() => updateFormData({ investingQ7: "A low volatility ETF" })}>
                        A low volatility ETF
                    </button>
                    <button 
                        className={`question-answer-button ${(formData.investingQ7 !== "" && formData.investingQ7 === "A low to moderate volatility ETF") ? 'clicked' : ''}`}
                        onClick={() => updateFormData({ investingQ7: "A low to moderate volatility ETF" })}>
                        A low to moderate volatility ETF
                    </button>
                </div>

                {/* Q8 */}
                <div className='question-container question-container-no-footer'
                    name='investingQ8'
                    style={{ border: (errors.investingQ8 && nextButtonClicked) ? "3px solid #71CCA8" : "none" }}>
                    <p className='question-label'>
                        Generally, I prefer an investment with few (or no) ups and downs in value, and I am willing to accept the lower returns these investments may make.
                    </p>
                    {(errors.investingQ8 && nextButtonClicked) && <p className='form-error'>{errors.investingQ8}</p>}
                    
                    <button 
                        className={`question-answer-button ${(formData.investingQ8 !== "" && formData.investingQ8 === "Strongly disagree") ? 'clicked' : ''}`}
                        onClick={() => updateFormData({ investingQ8: "Strongly disagree" })}>
                        Strongly disagree
                    </button>
                    <button 
                        className={`question-answer-button ${(formData.investingQ8 !== "" && formData.investingQ8 === "Disagree") ? 'clicked' : ''}`}
                        onClick={() => updateFormData({ investingQ8: "Disagree" })}>
                        Disagree
                    </button>
                    <button 
                        className={`question-answer-button ${(formData.investingQ8 !== "" && formData.investingQ8 === "Somewhat disagree") ? 'clicked' : ''}`}
                        onClick={() => updateFormData({ investingQ8: "Somewhat disagree" })}>
                        Somewhat disagree
                    </button>
                    <button 
                        className={`question-answer-button ${(formData.investingQ8 !== "" && formData.investingQ8 === "Somewhat agree") ? 'clicked' : ''}`}
                        onClick={() => updateFormData({ investingQ8: "Somewhat agree" })}>
                        Somewhat agree
                    </button>
                    <button 
                        className={`question-answer-button ${(formData.investingQ8 !== "" && formData.investingQ8 === "Agree") ? 'clicked' : ''}`}
                        onClick={() => updateFormData({ investingQ8: "Agree" })}>
                        Agree
                    </button>
                    <button 
                        className={`question-answer-button ${(formData.investingQ8 !== "" && formData.investingQ8 === "Strongly agree") ? 'clicked' : ''}`}
                        onClick={() => updateFormData({ investingQ8: "Strongly agree" })}>
                        Strongly agree
                    </button>
                </div>

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
            </div>
        </div>
    );
};