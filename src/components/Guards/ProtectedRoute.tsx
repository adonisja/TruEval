import React from 'react';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

// Inner component that uses useAuthenticator inside the provider
const AuthenticatedContent: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { user } = useAuthenticator((context) => [context.user]);

    // If user is authenticated, show the protected content
    if (user) {
        return <>{children}</>;
    }

    // This will never render because Authenticator handles unauthenticated state
    return null;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    return (
        <Authenticator>
            <AuthenticatedContent>
                {children}
            </AuthenticatedContent>
        </Authenticator>
    );
};

export default ProtectedRoute;