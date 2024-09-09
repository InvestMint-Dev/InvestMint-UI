import './create-account-sidebar.css';
import bigLeafLogo from '../../../assets/images/logo/InvestMint Big Leaf Logo - 2.png';

export const CreateAccountSidebar = ({ currentPage }) => {
    // Array of step labels for easier management
    const steps = [
        'Create Your Account',
        'Duo Factor Authentication',
        'Company Legal Information',
        'Investing Questionnaire'
    ];

    return (
        <div className="create-account-sidebar-container">
            <img className='top-left-logo-display' src={bigLeafLogo} alt="InvestMint Logo" />

            <div className='create-account-sidebar-stepper-container'>
                {steps.map((step, index) => (
                    <div key={index} className='create-account-sidebar-stepper'>
                        {/* Change circle style based on currentPage */}
                        <div 
                            className={`create-account-sidebar-stepper-circle ${
                                index + 1 <= currentPage ? 'active-circle' : ''
                            }`} 
                        />
                        <span className={`create-account-sidebar-stepper-label ${
                                index + 1 <= currentPage ? 'active-label' : ''
                            }`}>
                            {step}
                        </span>

                        {/* Render small vertical circles if not the last step
                        {index < steps.length - 1 && (
                            <div>
                                <div className="small-circles-container">
                                    <div className="small-circle"></div>
                                    <div className="small-circle"></div>
                                    <div className="small-circle"></div>
                                </div>
                            </div>
                            
                        )} */}
                    </div>
                ))}
            </div>
        </div>
    );
}
