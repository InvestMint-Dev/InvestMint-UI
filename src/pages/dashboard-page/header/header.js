import './header.css';

export const DashboardHeader = () => {
    return (
        <div className='header-container'>
            <b className='logo'>InvestMint</b>
            <div className='header-nav-container'>
                <button>Dashboard</button>
                <button>Portfolio</button>
                <button>Risk</button>
                <button>Bank</button>
                <button>Sandbox</button>
            </div>
        </div>
    );
}