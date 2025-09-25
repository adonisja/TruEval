import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './assets/LandingPage.css';

// Import auth functions from Amplify
import { Auth } from 'aws-amplify';

// Imports the default styles for the Amplify UI components. This line ensures that the authenticator looks nice out of the box.
import '@aws-amplify/ui-react/styles.css';

/* Note: Amplify is configured in App.tsx, no need to configure it again here */

/* Switched to using the React Router component for web and TypeScript as the main language for 
    strict type enforcement, making it easier for us to catch potential bugs
*/


const LandingPage: React.FC = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<any>(null);
    const [authState, setAuthState] = useState<'loading' | 'authenticated' | 'unauthenticated'>('loading');

    // Check authentication status on component mount
    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            const currentUser = await Auth.currentAuthenticatedUser();
            setUser(currentUser);
            setAuthState('authenticated');
        } catch (error) {
            setUser(null);
            setAuthState('unauthenticated');
        }
    };

    // Debug logging
    console.log('LandingPage - Auth state:', {
        user: user,
        authState: authState
    });
    console.log('LandingPage - Detailed auth values:', 
        'hasUser:', !!user,
        'authState:', authState
    );

    const getButtonText = () => {
        switch (authState) {
            case 'loading':
                return 'Loading...';
            case 'authenticated':
                const userName = user?.username || user?.signInDetails?.loginId || 'User';
                return userName ? `Welcome back, ${userName}!` : 'Continue to Dashboard';
            case 'unauthenticated':
                return `Let's Get You Started`;
        }
    };

    const getButtonIcon = () => {
        switch (authState) {
            case 'loading':
                return '⏳';
            case 'authenticated':
                return '→';
            case 'unauthenticated':
                return '✨';
        }
    };

    const handleButtonClick = () => {
        console.log('Button clicked! Auth state:', authState);
        
        if (authState === 'authenticated' && user) {
            // If user is already authenticated, navigate to dashboard
            console.log('Authenticated user, navigating to /user');
            navigate('/user');
        } else {
            // If user is not authenticated, navigate to protected route which will show Amplify auth
            console.log('Unauthenticated user, navigating to protected route');
            navigate('/user'); // This will trigger ProtectedRoute to show authentication
        }
    };

    return (
        <div className="landing-container">
            <div className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">Welcome to TruEval</h1>
                    <p className="hero-subtitle">
                        Your trusted platform for comprehensive evaluation and assessment
                    </p>
                    <div className="cta-section">
                        <button 
                            className={`cta-button ${
                                authState === 'loading' ? 'loading' : 
                                authState === 'authenticated' ? 'returning-user' : 'new-user'
                            }`}
                            onClick={handleButtonClick}
                            disabled={authState === 'loading'}
                        >
                            {getButtonText()}
                            <span className="button-icon">
                                {getButtonIcon()}
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            
            <div className="features-section">
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">🔒</div>
                        <h3>Secure Authentication</h3>
                        <p>Enterprise-grade security with AWS Cognito</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">📊</div>
                        <h3>Smart Analytics</h3>
                        <p>Comprehensive evaluation tools and insights</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">⚡</div>
                        <h3>Fast & Reliable</h3>
                        <p>Lightning-fast performance you can count on</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;