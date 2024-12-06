import React from 'react';
// import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import './dashboard-page.css';
import { DashboardHeader } from './header/header';
import { DashboardSidebar } from './sidebar/sidebar';

import sandbox from '../../assets/images/icons/Sandbox.png';

export const DashboardPage = () => {
    // const { logout } = useAuth0();
    const navigate = useNavigate();

    const handleLogout = () => {
        // // Log out from Auth0 and then navigate to the login page
        // logout({
        //     returnTo: window.location.origin // Redirects to the home page or login after logging out
        // });
        navigate('/'); // Navigate to login page after logout
    };

    return (
        <div>
            <DashboardHeader />
            <div className='dashboard-container'>
                <DashboardSidebar />
                <div className='main-page-container'>
                    <div className='portfolio-container'>
                        <h4>Portfolio</h4>
                        <div className='etf-container flex-container'>
                            <div className='etf-item-container'>
                                <h2>$4520</h2>
                                <p><b>ETF 1</b></p>
                            </div>
                            <div className='etf-item-container'>
                                <h2>$4520</h2>
                                <p><b>ETF 2</b></p>
                            </div>
                            <div className='etf-item-container'>
                                <h2>$4520</h2>
                                <p><b>ETF 3</b></p>
                            </div>
                            <div className='etf-item-container'>
                                <h2>$4520</h2>
                                <p><b>ETF 4</b></p>
                            </div>
                        </div>
                    </div>

                    <div className='flex-container'>
                        <div className='risk-bank-container risk-container'>
                            <h4>Risk</h4>
                        </div>

                        <div className='risk-bank-container bank-container'>
                            <h4>Bank</h4>
                            <div className='bank-item-container'></div>
                            <div className='bank-item-container'></div>
                            <div className='bank-item-container'></div>
                            <div className='bank-item-container'></div>
                        </div>
                    </div>

                        <div className='go-to-sandbox-container flex-container'>
                            <img style={{width: '2rem', height: 'auto'}} src={sandbox} alt='Sandbox icon'></img>
                            <div>
                                <h3>Go to Sandbox</h3>
                                <p>The Sandbox is an interface to experiment with and change your portfolio preferences.</p>
                            </div>
                        </div>
                </div>
            </div>
            {/* <button className='logout-button' onClick={handleLogout}>
                Log Out
            </button> */}
        </div>
    );
};
