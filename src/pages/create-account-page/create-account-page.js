import { CreateAccountPage1 } from './create-account-page-1/create-account-page-1';
import { CreateAccountPage2 } from './create-account-page-2/create-account-page-2';
import './create-account-page.css';

import bigLeafLogo from '../../assets/images/logo/InvestMint Big Leaf Logo - 2.png';

export const CreateAccountPage = () => {
    return (
        <div>
            <img className='top-left-logo-display' src={bigLeafLogo}></img>
            <CreateAccountPage1/>
            {/* <CreateAccountPage2/> */}
        </div>
    );
}