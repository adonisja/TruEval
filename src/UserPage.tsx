import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext.js";
import { cognitoConfig } from "./awsConfig.js";

const UserPage: React.FC = () => {
    const location = useLocation();
    const { setAuth } = useAuth()

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const code = params.get('code');
        if (code) {
            const exchangeCodeForToken = async () => {
                const data = new URLSearchParams({
                    grant_type: 'authorization_code',
                    client_id: cognitoConfig.clientId,
                    code,
                    redirect_uri: cognitoConfig.redirectUri
                });
                const response = await fetch(`${cognitoConfig.cognitoDomain}/oauth2/token`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
                    body: data.toString()
                });
                const result = await response.json();
                setAuth({
                    idToken: result.id_token,
                    accessToken: result.access_token,
                    refreshToken: result.refresh_token
                });
            }; 
            exchangeCodeForToken();
        }
    }, [location, setAuth]);

    return (
        <div>
            <h1>User Page</h1>
        </div>
    );
};

export default UserPage;
