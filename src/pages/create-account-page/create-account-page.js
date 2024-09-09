import { useState } from 'react';
import { CreateAccountSidebar } from './create-account-sidebar/create-account-sidebar';
import { CreateAccountPage1 } from './create-account-page-1/create-account-page-1';
import { CreateAccountPage2 } from './create-account-page-2/create-account-page-2';
import { CreateAccountPage3 } from './create-account-page-3/create-account-page-3';
import { CreateAccountPage4 } from './create-account-page-4/create-account-page-4';
import './create-account-page.css';

import bigLeafLogo from '../../assets/images/logo/InvestMint Big Leaf Logo - 2.png';

export const CreateAccountPage = () => {
    const [currentPage, setCurrentPage] = useState(1);

    // Function to move to the next page
    const handleNext = () => {
        if (currentPage < 4) {
            setCurrentPage(currentPage + 1);
        }
    };

    // Function to move to the previous page
    const handleBack = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div>
            <CreateAccountSidebar/>

            <div className='page-container'>
                {/* Conditionally render pages based on the current page state */}
                {currentPage === 1 && <CreateAccountPage1 />}
                {currentPage === 2 && <CreateAccountPage2 />}
                {currentPage === 3 && <CreateAccountPage3 />}
                {currentPage === 4 && <CreateAccountPage4 />}

                <div>
                     <div className="stepper-container">
                        {(currentPage > 1) && (
                            <button className='form-stepper-button' onClick={handleBack}>
                                Back
                            </button>
                        )}
                        {(currentPage < 4) && (
                            <button className='form-stepper-button' onClick={handleNext}>
                                Next
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
