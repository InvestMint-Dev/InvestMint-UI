import './create-account-sidebar.css';
import bigLeafLogo from '../../../assets/images/logo/InvestMint Big Leaf Logo - 2.png';

export const CreateAccountSidebar = () => {
    return (
        <div className="create-account-sidebar-container">
            <img className='top-left-logo-display' src={bigLeafLogo}></img>

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