import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { CreateAccountSidebar } from './create-account-sidebar/create-account-sidebar';
import { CreateAccountPage1 } from './create-account-page-1/create-account-page-1';
import { CreateAccountPage2 } from './create-account-page-2/create-account-page-2';
import { CreateAccountPage3 } from './create-account-page-3/create-account-page-3';
import { CreateAccountPage4 } from './create-account-page-4/create-account-page-4';
import './create-account-page.css';
import { ErrorAlertPanel } from '../../components/error-alert-panel/error-alert-panel';

export const CreateAccountPage = () => {
    const [currentPage, setCurrentPage] = useState(4);
    const [nextButtonClicked, setNextButtonClicked] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false); // State for alert visibility
    const [alertClass, setAlertClass] = useState(""); // State for alert class
    const totalSteps = 4; // Define total steps here
    const navigate = useNavigate();

    // Create refs for each page to access the validate function
    const pageRefs = {
        1: useRef(null),
        2: useRef(null),
        3: useRef(null),
        4: useRef(null)
    };

    const handleNext = () => {
        setNextButtonClicked(true);

        // Trigger validation for the current page
        const currentPageRef = pageRefs[currentPage];
        if (currentPageRef.current) {
            const isValid = currentPageRef.current.validate();
            if (isValid) {
                if (currentPage < totalSteps) {
                    setCurrentPage(currentPage + 1);
                    setNextButtonClicked(false);
                    setShowErrorAlert(false); // Hide error alert on successful validation
                }
            }
            else if (!isValid) {
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
        }
    };

    const handleBack = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        } else if (currentPage === 1) {
            navigate('/');
        }
    };

    return (
        <div>
            {/* Pass currentPage and totalSteps to the sidebar */}
            <CreateAccountSidebar currentPage={currentPage} totalSteps={totalSteps} />

            <div className='page-container'>
                {showErrorAlert && (
                    <ErrorAlertPanel className={alertClass} />
                )}
                
                {/* Conditionally render pages based on the current page state */}
                {currentPage === 1 && <CreateAccountPage1 nextButtonClicked={nextButtonClicked} ref={pageRefs[1]} />}
                {currentPage === 2 && <CreateAccountPage2 nextButtonClicked={nextButtonClicked} ref={pageRefs[2]} />}
                {currentPage === 3 && <CreateAccountPage3 nextButtonClicked={nextButtonClicked} ref={pageRefs[3]} />}
                {currentPage === 4 && <CreateAccountPage4 nextButtonClicked={nextButtonClicked} ref={pageRefs[4]} />}

                <div className="stepper-container">
                    {currentPage >= 1 && (
                        <button className='form-stepper-button' onClick={handleBack}>
                            Back
                        </button>
                    )}
                    {currentPage <= totalSteps && (
                        <button
                            className='form-stepper-button'
                            onClick={handleNext}
                        >
                            Next
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
