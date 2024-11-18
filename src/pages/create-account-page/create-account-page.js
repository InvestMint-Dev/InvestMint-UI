import { useState } from "react";

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
            {/* Conditionally render pages based on the current step */}
            {currentStep === 1 && <CreateAccountPage1 />}
            {currentStep === 2 && <CreateAccountPage2 />}
            {currentStep === 3 && <CreateAccountPage3 />}
            {currentStep === 4 && <CreateAccountPage4 />}

            {/* Navigation buttons */}
            <div className="stepper-container">
                {currentStep > 1 && (
                    <button onClick={handleBack}>Back</button>
                )}
                {currentStep < 4 && (
                    <button onClick={handleNext}>Next</button>
                )}
            </div>
        </div>
    );
}