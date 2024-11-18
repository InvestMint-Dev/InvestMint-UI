import { useState } from "react";

import { CreateAccountSidebar } from "./create-account-sidebar/create-account-sidebar";
import { CreateAccountPage1 } from "./create-account-page-1/create-account-page-1";
import { CreateAccountPage2 } from "./create-account-page-2/create-account-page-2";
import { CreateAccountPage3 } from "./create-account-page-3/create-account-page-3";
import { CreateAccountPage4 } from "./create-account-page-4/create-account-page-4";

export const CreateAccountPage = () => {
    const [currentStep, setCurrentStep] = useState(1); // Step tracking

    const handleNext = () => {
        if (currentStep < 4) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <div>
            <CreateAccountSidebar currentPage={currentStep}/>

            {/* Conditionally render pages based on the current step */}
            {currentStep >= 1 && <CreateAccountPage1 renderNextPage={handleNext} />}
            {currentStep >= 2 && <CreateAccountPage2 renderPreviousPage={handleBack} renderNextPage={handleNext}/>}
            {currentStep >= 3 && <CreateAccountPage3 renderPreviousPage={handleBack} renderNextPage={handleNext}/>}
            {currentStep >= 4 && <CreateAccountPage4 renderPreviousPage={handleBack}/>}
        </div>
    );
}