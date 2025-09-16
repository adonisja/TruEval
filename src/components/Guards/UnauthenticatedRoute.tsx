import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext.js';

interface UnauthenticatedRouteProps {
    children: React.ReactNode;
    redirectTo?: string;
}

const UnauthenticatedRoute: React.FC<UnauthenticatedRouteProps> = ({ children, redirectTo = "/user" }) => {
    const navigate = useNavigate();
    const { user, idToken } = useAuth();

    useEffect(() => {
        if (user) {
            navigate(redirectTo);
        }
    }, [user, navigate, redirectTo]);

    if (user) {
        return null;
    }

    if (idToken && !user) {
        return <div>Loading...</div>
    }

    return <>{children}</>
};

export default UnauthenticatedRoute;
