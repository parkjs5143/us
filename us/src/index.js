import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import { HelmetProvider } from 'react-helmet-async';
import '@fortawesome/fontawesome-free/js/all.js';

ReactDOM.render(
  <HelmetProvider>
    <App />
  </HelmetProvider>,
  document.getElementById('root')
);
