import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './create-account-page-4.css';

import { handleKeyDown } from '../../../utils/utils';
import { validateInvestingQuestionnaire } from '../../../validators/validators';
import { useProgress } from '../../../context/ProgressContext'; // Use the progress context

import { ErrorAlertPanel } from '../../../components/error-alert-panel/error-alert-panel';
import { CreateAccountSidebar } from '../create-account-sidebar/create-account-sidebar';
import chart from '../../../assets/images/create-account-page/page-4-chart.png';

export const CreateAccountPage4 = ({onLogin}) => {
    const [fadeIn, setFadeIn] = useState(false);

    const location = useLocation();

    const navigate = useNavigate(); // Navigate hook
    const { currentStep, goToNextStep, logIn } = useProgress();

    const { userId } = location.state || {};

    useEffect(() => {
        setFadeIn(true); // Trigger fade-in effect on mount
        if (currentStep < 3) {
            navigate("/create-account-1");
        }
    }, []);

    const [nextButtonClicked, setNextButtonClicked] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false); // State for alert visibility
    const [alertClass, setAlertClass] = useState(""); // State for alert class

    const [formData, setFormData] = useState({
        investingQ1: "",
        investingQ2: "",
        investingQ2CashAmount: "$",
        investingQ2BusinessDuration: "",
        investingQ2AverageCashPerYear: "$",
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
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/investingQuestionnaire/${userId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        investingQ1: formData.investingQ1,
                        investingQ2: formData.investingQ2,
                        investingQ2CashAmount: formData.investingQ2CashAmount,
                        investingQ2BusinessDuration: formData.investingQ2BusinessDuration,
                        investingQ2AverageCashPerYear: formData.investingQ2AverageCashPerYear,
                        investingQ3: formData.investingQ3,
                        investingQ4: formData.investingQ4,
                        investingQ4CashBackDate: formData.investingQ4CashBackDate,
                        investingQ4CashBackDuration: formData.investingQ4CashBackDuration,
                        investingQ5: formData.investingQ5,
                        investingQ6: formData.investingQ6,
                        investingQ7: formData.investingQ7,
                        investingQ8: formData.investingQ8
                    }),
                });

                if (!response.ok) {
                    const errorMessage = await response.text();
                    console.error('Error response:', errorMessage);
                    throw new Error('Failed to save investing information');
                }
                
                logIn(); // Set the user as authenticated

                navigate('/dashboard'); // Navigate to the next page
                setNextButtonClicked(false);
                setShowErrorAlert(false);
                onLogin(); // Call onLogin here
            } catch (error) {
                console.error('Error saving investing information:', error);
            }
        } else {
            setAlertClass("show"); // Show error alert
            setShowErrorAlert(true); // Show error alert on validation failure
            window.scrollTo({ top: 0, behavior: 'auto' });
    
            // Hide error alert after 2 seconds
            setTimeout(() => {
                setAlertClass("hide"); // Start fade-out
                setTimeout(() => {
                setShowErrorAlert(false); // Remove from DOM after fade-out
                }, 1000); // Duration of the fade-out transition
            }, 2000);
        }
    };

    const handleBack = () => {
        navigate('/create-account-3');
    };

    return (
        <div className={`fade-in ${fadeIn ? 'visible' : ''}`}>
            {showErrorAlert && (
                <ErrorAlertPanel className={alertClass} />
            )}
            <CreateAccountSidebar currentPage={4}/>

            <div className='page-4-container'>
                <h1 className='form-heading'>Investing Questionnaire</h1>

                {/* Q1 */}
                <div className='question-container'
                style={{ border: (errors.investingQ1 && nextButtonClicked) ? "2px solid #61b090" : "none" }}>
                    <p className='question-label'>When it comes to investing in money markets/fixed income securities or ETFs, I would describe myself as:</p>
                    {(errors.investingQ1 && nextButtonClicked) && <p style={{ color: '#61b090' }}>{errors.investingQ1}</p>}
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
                style={{ border: (errors.investingQ2 && nextButtonClicked) ? "2px solid #61b090" : "none" }}>
                    <p className='question-label'>Do you know the total amount of cash you would like to invest?</p>
                    {(errors.investingQ2 && nextButtonClicked) && <p style={{ color: '#61b090' }}>{errors.investingQ2}</p>}
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
                    <div style={{marginTop: '1.875rem'}}>
                        {(errors.investingQ2CashAmount && nextButtonClicked) && <p style={{ color: '#61b090' }}>{errors.investingQ2CashAmount}</p>}
                        <p>Enter Amount:</p>
                        <textarea onKeyDown={handleKeyDown}  id="form-textarea" style={{ border: (errors.investingQ2CashAmount && nextButtonClicked) ? "2px solid #61b090" : "none" }} 
                            className='form-textarea text-input' 
                            value={formData.investingQ2CashAmount} // Set the current value from the state
                            onChange={(e) => setFormData({ ...formData, investingQ2CashAmount: e.target.value })}/>
                    </div>}

                    {(formData.investingQ2 !== "" && formData.investingQ2 === "No") && 
                    <div style={{marginTop: '1.875rem'}}>
                        <p>How long have you been in business? (in days)</p>
                        {(errors.investingQ2BusinessDuration && nextButtonClicked) && <p style={{ color: '#61b090' }}>{errors.investingQ2BusinessDuration}</p>}
                        <textarea onKeyDown={handleKeyDown}  id="form-textarea" style={{ border: (errors.investingQ2BusinessDuration && nextButtonClicked) ? "2px solid #61b090" : "none" }} className='form-textarea text-input' 
                            value={formData.investingQ2BusinessDuration} // Set the current value from the state
                            onChange={(e) => setFormData({ ...formData, investingQ2BusinessDuration: e.target.value })}/>

                        <p>What is your average cash per year?</p>
                        {(errors.investingQ2AverageCashPerYear && nextButtonClicked) && <p style={{ color: '#61b090' }}>{errors.investingQ2AverageCashPerYear}</p>}
                        <textarea onKeyDown={handleKeyDown}  id="form-textarea" style={{ border: (errors.investingQ2AverageCashPerYear && nextButtonClicked) ? "2px solid #61b090" : "none" }} className='form-textarea text-input' 
                            value={formData.investingQ2AverageCashPerYear} // Set the current value from the state
                            onChange={(e) => setFormData({ ...formData, investingQ2AverageCashPerYear: e.target.value })}/>
                        <a href='/cash-calculator' target="_blank">Average cash calculator</a>
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
                <div className='question-container'  style={{ border: (errors.investingQ3 && nextButtonClicked) ? "2px solid #61b090" : "none" }}>
                    <p className='question-label'>Generally when making investments, I would like the money 
                    available to be returned to my bank account within:</p>
                    {(errors.investingQ3 && nextButtonClicked) && <p style={{ color: '#61b090' }}>{errors.investingQ3}</p>}
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
                <div className='question-container question-container-no-footer' style={{ border: (errors.investingQ4 && nextButtonClicked) ? "2px solid #61b090" : "none" }}>
                    <p className='question-label'>Do you need the cash back in the bank by a certain date or are 
                    you okay to define a duration in which the investments will be available but not necessarily sold?</p>
                    {(errors.investingQ4 && nextButtonClicked) && <p style={{ color: '#61b090' }}>{errors.investingQ4}</p>}
                    <button className={`question-answer-button ${(formData.investingQ4 !== "" && formData.investingQ4 === "Date") ? 'clicked' : ''}`} 
                        onClick={() => setFormData({ ...formData, investingQ4: "Date" })}>
                        Date
                    </button>
                    <button className={`question-answer-button ${(formData.investingQ4 !== "" && formData.investingQ4 === "Duration") ? 'clicked' : ''}`} 
                        onClick={() => setFormData({ ...formData, investingQ4: "Duration" })}>
                        Duration
                    </button>

                    {(formData.investingQ4 !== "" && formData.investingQ4 === "Date") && 
                    <div style={{marginTop: '1.875rem'}}>
                        <p>Enter Date:</p>
                        {(errors.investingQ4CashBackDate && nextButtonClicked) && <p style={{ color: '#61b090' }}>{errors.investingQ4CashBackDate}</p>}
                        <textarea onKeyDown={handleKeyDown}  id="form-textarea" className='form-textarea text-input'
                            style={{ border: (errors.investingQ4CashBackDate && nextButtonClicked) ? "2px solid #61b090" : "none" }}
                            value={formData.investingQ4CashBackDate} // Set the current value from the state
                            onChange={(e) => setFormData({ ...formData, investingQ4CashBackDate: e.target.value })}/>
                    </div>}

                    {(formData.investingQ4 !== "" && formData.investingQ4 === "Duration") && 
                    <div style={{marginTop: '1.875rem'}}>
                        <p>Enter Duration:</p>
                        {(errors.investingQ4CashBackDuration && nextButtonClicked) && <p style={{ color: '#61b090' }}>{errors.investingQ4CashBackDuration}</p>}
                        <textarea onKeyDown={handleKeyDown}  id="form-textarea" className='form-textarea text-input'
                            style={{ border: (errors.investingQ4CashBackDuration && nextButtonClicked) ? "2px solid #61b090" : "none" }}
                            value={formData.investingQ4CashBackDuration} // Set the current value from the state
                            onChange={(e) => setFormData({ ...formData, investingQ4CashBackDuration: e.target.value })}/>
                    </div>}
                </div>

                {/* Q5 */}
                <div className='question-container'
                    style={{ border: (errors.investingQ5 && nextButtonClicked) ? "2px solid #61b090" : "none" }}>
                    <p className='question-label'>My current and future sources of cash are:</p>
                    {(errors.investingQ5 && nextButtonClicked) && <p style={{ color: '#61b090' }}>{errors.investingQ5}</p>}
                    
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
                    style={{ border: (errors.investingQ6 && nextButtonClicked) ? "2px solid #61b090" : "none" }}>
                    <p className='question-label'>
                        From September 2008 through October 2008, bonds lost 4%. If I owned a fixed income investment that lost 4% in two months, I would:
                    </p>
                    {(errors.investingQ6 && nextButtonClicked) && <p style={{ color: '#61b090' }}>{errors.investingQ6}</p>}
                    
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
                    style={{ border: (errors.investingQ7 && nextButtonClicked) ? "2px solid #61b090" : "none" }}>
                    <p className='question-label'>
                        The chart shows the greatest possible 1-year loss and the highest 1-year gain on 3 different hypothetical investments of $1,000,000.* Given the potential gain or loss in any 1 year, I would invest my money in:
                    </p>
                    {(errors.investingQ7 && nextButtonClicked) && <p style={{ color: '#61b090' }}>{errors.investingQ7}</p>}
                    
                    <img src={chart}></img>
                    
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

                {/* Q8 */}
                <div className='question-container question-container-no-footer'
                    style={{ border: (errors.investingQ8 && nextButtonClicked) ? "2px solid #61b090" : "none" }}>
                    <p className='question-label'>
                        Generally, I prefer an investment with few (or no) ups and downs in value, and I am willing to accept the lower returns these investments may make.
                    </p>
                    {(errors.investingQ8 && nextButtonClicked) && <p style={{ color: '#61b090' }}>{errors.investingQ8}</p>}
                    
                    <button 
                        className={`question-answer-button ${(formData.investingQ8 !== "" && formData.investingQ8 === "Strongly disagree") ? 'clicked' : ''}`}
                        onClick={() => setFormData({ ...formData, investingQ8: "Strongly disagree" })}>
                        Strongly disagree
                    </button>
                    <button 
                        className={`question-answer-button ${(formData.investingQ8 !== "" && formData.investingQ8 === "Disagree") ? 'clicked' : ''}`}
                        onClick={() => setFormData({ ...formData, investingQ8: "Disagree" })}>
                        Disagree
                    </button>
                    <button 
                        className={`question-answer-button ${(formData.investingQ8 !== "" && formData.investingQ8 === "Somewhat disagree") ? 'clicked' : ''}`}
                        onClick={() => setFormData({ ...formData, investingQ8: "Somewhat disagree" })}>
                        Somewhat disagree
                    </button>
                    <button 
                        className={`question-answer-button ${(formData.investingQ8 !== "" && formData.investingQ8 === "Somewhat agree") ? 'clicked' : ''}`}
                        onClick={() => setFormData({ ...formData, investingQ8: "Somewhat agree" })}>
                        Somewhat agree
                    </button>
                    <button 
                        className={`question-answer-button ${(formData.investingQ8 !== "" && formData.investingQ8 === "Agree") ? 'clicked' : ''}`}
                        onClick={() => setFormData({ ...formData, investingQ8: "Agree" })}>
                        Agree
                    </button>
                    <button 
                        className={`question-answer-button ${(formData.investingQ8 !== "" && formData.investingQ8 === "Strongly agree") ? 'clicked' : ''}`}
                        onClick={() => setFormData({ ...formData, investingQ8: "Strongly agree" })}>
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