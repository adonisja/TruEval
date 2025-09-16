import React from 'react';
import { useAuth } from 'react-oidc-context';

interface ProtectedRouteProps {
    children: React.ReactNode;
    redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, redirectTo = "/" }) => {
    const auth = useAuth();

    // Handle loading state
    if (auth.isLoading) {
        return <div style={{ padding: '20px', textAlign: 'center' }}>Loading...</div>;
    }

    // Handle authentication errors
    if (auth.error) {
        return (
            <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>
                <h3>Authentication Error</h3>
                <p>{auth.error.message}</p>
                <button onClick={() => auth.signinRedirect()}>
                    Try Again
                </button>
            </div>
        );
    }

    // If user is authenticated, show the protected content
    if (auth.isAuthenticated) {
        return <>{children}</>;
    }

    // If not authenticated, redirect to signin
    auth.signinRedirect();
    
    // Show loading while redirecting
    return <div style={{ padding: '20px', textAlign: 'center' }}>Redirecting to login...</div>;
};

export default ProtectedRoute;