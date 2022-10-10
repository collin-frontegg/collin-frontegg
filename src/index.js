import React from 'react';
// import ReactDOM from 'react-dom'; // For react 17
// For react 18: 
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import { FronteggProvider } from '@frontegg/react';
import { ContextHolder } from '@frontegg/rest-api';

const base = ContextHolder.getContext().baseUrl;

const contextOptionsDev = {
  baseUrl: process.env.REACT_APP_FRONTEGG_BASE_URL_DEV,
  clientId: process.env.REACT_APP_FRONTEGG_CLIENT_ID_DEV
};

const contextOptionsProd = {
  baseUrl: process.env.REACT_APP_FRONTEGG_BASE_URL_PROD,
  clientId: process.env.REACT_APP_FRONTEGG_CLIENT_ID_PROD
};

const contextOptions = base.includes('ngrok') ? contextOptionsProd : contextOptionsDev;

// For react 18: 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
// ReactDOM.render(
    <FronteggProvider contextOptions={contextOptions} hostedLoginBox={true}>
        <App />
    </FronteggProvider>,
    document.getElementById('root')
);
