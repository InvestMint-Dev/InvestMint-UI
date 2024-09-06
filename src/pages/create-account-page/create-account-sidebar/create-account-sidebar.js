import './create-account-sidebar.css';

export const CreateAccountSidebar = () => {
    return (
        <div className="create-account-sidebar-container">
            <div className='create-account-sidebar-stepper-container'>
                <div className='create-account-sidebar-stepper'>
                    <div className="create-account-sidebar-stepper-circle"/>
                    <text className="create-account-sidebar-stepper-label">Create Your Account</text>
                </div>

                <div className='create-account-sidebar-stepper'>
                    <div className="create-account-sidebar-stepper-circle"/>
                    <text className="create-account-sidebar-stepper-label">Duo Factor Authentication</text>
                </div>

                <div className='create-account-sidebar-stepper'>
                    <div className="create-account-sidebar-stepper-circle"/>
                    <text className="create-account-sidebar-stepper-label">Company Legal Information</text>
                </div>

                <div className='create-account-sidebar-stepper'>
                    <div className="create-account-sidebar-stepper-circle"/>
                    <text className="create-account-sidebar-stepper-label">Investing Questionnaire</text>
                </div>
            </div>
        </div>
    );
}