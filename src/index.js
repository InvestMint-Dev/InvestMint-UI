import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// // Determine the redirect URI based on the current path
// const getRedirectUri = () => {
//   const currentPath = window.location.pathname;
  
//   if (currentPath === '/create-account-1') {
//     return window.location.origin + '/create-account-3'; // Redirect from /create-account-1 to /create-account-3
//   } else if (currentPath === '/log-in') {
//     return window.location.origin + '/dashboard'; // Redirect from /log-in to /dashboard
//   } else {
//     return window.location.origin; // Fallback redirect (can be modified as needed)
//   }
// };

// root.render(
//   <Auth0Provider
//     domain={process.env.REACT_APP_AUTH0_DOMAIN}
//     clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
//     redirectUri={getRedirectUri()} // Use dynamic redirect URI
//   >
//     <App />
//   </Auth0Provider>,
//   document.getElementById('root')
// );