import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

type AuthState = {
    user: any;
    idToken: string | null;
    accessToken: string | null;
    refreshToken: string | null;
    setAuth: (auth: Partial<AuthState>) => void;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [user, setUser] = useState<any>(null);
    const [idToken, setIdToken] = useState<string | null>(localStorage.getItem('id_token'));
    const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem('access_token'));
    const [refreshToken, setRefreshToken] = useState<string | null>(localStorage.getItem('refresh_token'));

    useEffect(() => {
        if (idToken) {
            const tokenParts = idToken.split('.');
            if (tokenParts.length === 3 && tokenParts[1]) {
                const payload = JSON.parse(atob(tokenParts[1]));
                setUser(payload);
            } else {
                setUser(null);
            }
        } else { 
            setUser(null);
        }
    }, [idToken]);

    const setAuth = (auth: Partial<AuthState>) => {
    if (auth.accessToken !== undefined) {
        setAccessToken(auth.accessToken)
        if (auth.accessToken) localStorage.setItem('access_token', auth.accessToken);
        else localStorage.removeItem('access_token');
    }
    if (auth.refreshToken !== undefined) {
        setRefreshToken(auth.refreshToken)
        if (auth.refreshToken) localStorage.setItem('refresh_token', auth.refreshToken);
        else localStorage.removeItem('refresh_token');
    }
    if (auth.idToken !== undefined) {
        setIdToken(auth.idToken)
        if (auth.idToken) localStorage.setItem('id_token', auth.idToken);
        else localStorage.removeItem('id_token');
    }};

    return (
        <AuthContext.Provider value={{ user, idToken, accessToken, refreshToken, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error(`useAuth must be used within AuthProvider`);
    return context;
}