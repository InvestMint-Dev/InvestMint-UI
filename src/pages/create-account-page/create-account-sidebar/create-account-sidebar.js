import './create-account-sidebar.css';
import bigLeafLogo from '../../../assets/images/logo/InvestMint Big Leaf Logo - 2.png';

export const CreateAccountSidebar = ({ currentPage }) => {
    // Array of step labels for easier management
    const steps = [
        'Create Your Account',
        'Two-Factor Authentication',
        'Company Legal Information',
        'Investing Questionnaire'
    ];

    const onStepperClick = (index) => {
        const element = document.getElementById('create-account-' + (index + 1));
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        } else {
            console.warn(`Element with ID create-account-${index} not found.`);
        }
    };


    return (
        <div className="create-account-sidebar-container">
            <img className='logo-display' src={bigLeafLogo} alt="InvestMint Logo" />

            <div className='create-account-sidebar-stepper-container'>
                {steps.map((step, index) => (
                    <div key={index} className='create-account-sidebar-stepper' onClick={() => onStepperClick(index)}>
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
                    </div>
                ))}
            </div>
        </div>
    );
}
