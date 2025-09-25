import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';

interface UnauthenticatedRouteProps {
    children: React.ReactNode;
    redirectTo?: string;
}

const UnauthenticatedRoute: React.FC<UnauthenticatedRouteProps> = ({ 
    children, 
    redirectTo = "/user" 
}) => {
    const navigate = useNavigate();
    const { user } = useAuthenticator((context) => [context.user]);

    useEffect(() => {
        if (user) {
            navigate(redirectTo);
        }
    }, [user, navigate, redirectTo]);

    // If user is authenticated, don't render children (we're redirecting)
    if (user) {
        return null;
    }

    // If user is not authenticated, render the children
    return <>{children}</>;
};

export default UnauthenticatedRoute;