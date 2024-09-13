import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { CreateAccountSidebar } from './create-account-sidebar/create-account-sidebar';
import { CreateAccountPage1 } from './create-account-page-1/create-account-page-1';
import { CreateAccountPage2 } from './create-account-page-2/create-account-page-2';
import { CreateAccountPage3 } from './create-account-page-3/create-account-page-3';
import { CreateAccountPage4 } from './create-account-page-4/create-account-page-4';
import './create-account-page.css';

export const CreateAccountPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [nextButtonClicked, setNextButtonClicked] = useState(false);
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
                }
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
                    {currentPage < totalSteps && (
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
