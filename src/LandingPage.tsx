import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'react-oidc-context';
import './assets/LandingPage.css';

const LandingPage: React.FC = () => {
    const navigate = useNavigate();
    const auth = useAuth();
    const [authState, setAuthState] = useState<'loading' | 'authenticated' | 'unauthenticated'>('loading');

    // Debug logging
    console.log('LandingPage - Auth state:', {
        isLoading: auth.isLoading,
        isAuthenticated: auth.isAuthenticated,
        user: auth.user,
        error: auth.error,
        authState: authState
    });

    // Hybrid approach: Auth state management with timeout
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (authState === 'loading') {
                setAuthState('unauthenticated'); // Timeout fallback after 2.5 seconds
            }
        }, 2500);

        // Determine auth state based on OIDC auth state
        if (auth.isAuthenticated && auth.user) {
            setAuthState('authenticated');
            clearTimeout(timeout);
        } else if (!auth.isLoading && !auth.isAuthenticated) {
            setAuthState('unauthenticated');
            clearTimeout(timeout);
        }

        return () => clearTimeout(timeout);
    }, [auth.isAuthenticated, auth.user, auth.isLoading, authState]);

    const getButtonText = () => {
        switch (authState) {
            case 'loading':
                return 'Loading...';
            case 'authenticated':
                const userClaims = auth.user?.profile as any;
                const userName = userClaims?.name || userClaims?.given_name || userClaims?.email;
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
        console.log('🔴 BUTTON CLICKED! Current state:', authState);
        console.log('🔴 Auth object details:', {
            isAuthenticated: auth.isAuthenticated,
            isLoading: auth.isLoading,
            user: auth.user,
            error: auth.error,
            settings: auth.settings
        });
        
        if (auth.error) {
            console.error('🔴 OIDC Error detected:', auth.error);
            alert(`Authentication Error: ${auth.error.message}`);
            return;
        }
        
        switch (authState) {
            case 'loading':
                console.log('🔴 Still loading, doing nothing...');
                return;
            case 'authenticated':
                console.log('🔴 User is authenticated, navigating to /user');
                navigate('/user');
                break;
            case 'unauthenticated':
                console.log('🔴 User not authenticated, attempting signin redirect...');
                try {
                    console.log('🔴 Calling auth.signinRedirect()...');
                    const result = auth.signinRedirect();
                    console.log('🔴 SigninRedirect result:', result);
                } catch (error) {
                    console.error('🔴 SigninRedirect error:', error);
                    alert(`Signin error: ${error instanceof Error ? error.message : 'Unknown error'}`);
                }
                break;
            default:
                console.log('🔴 Unknown auth state:', authState);
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