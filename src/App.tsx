import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from './LandingPage';
import UserPage from './UserPage';
import ProtectedRoute from './components/Guards/ProtectedRoute';
import UnauthenticatedRoute from './components/Guards/UnauthenticatedRoute';
import React from 'react';
import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';

// Configure Amplify
Amplify.configure(awsExports);

/* Authentication flow:
   - LandingPage: Open to ALL users (no automatic redirects)
   - UserPage: Protected behind Cognito authentication
*/
const App: React.FC = () => (
    <Router>
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/user" element={
                <ProtectedRoute>
                    <UserPage />
                </ProtectedRoute>
            } />
        </Routes>
    </Router>
);

export default App;