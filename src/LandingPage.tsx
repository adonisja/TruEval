import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cognitoConfig } from './awsConfig.js';
import { useAuth } from './AuthContext.js'
import './assets/LandingPage.css';

const LandingPage: React.FC = () => {
    const navigate = useNavigate();
    const { user, idToken } = useAuth();

    const getButtonText = () => {
        if (user && (user.name || user.username)) {
            return `Welcome back, ${user.name || user.username}!`;
        }
        return `Let's Get You Started`
    }

    const handleButtonClick = () => {
        if (idToken) {
            navigate('/user');
        } else {
            const loginUrl = `${cognitoConfig.cognitoDomain}/login?response_type=code&client_id=${cognitoConfig.clientId}&redirect_uri=${encodeURIComponent(cognitoConfig.redirectUri)}`;
            window.location.href = loginUrl;
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
                            className={`cta-button ${idToken ? 'returning-user' : 'new-user'}`}
                            onClick={handleButtonClick}
                        >
                            {getButtonText()}
                            <span className="button-icon">
                                {idToken ? '→' : '✨'}
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