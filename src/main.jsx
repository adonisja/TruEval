window.global = window;
window.process = { env: {} };

import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from 'react-oidc-context';
import { cognitoAuthConfig } from './oidcConfig.js';

// Debug logging
console.log('OIDC Configuration:', cognitoAuthConfig);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);