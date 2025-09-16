import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext.js";
import { cognitoConfig } from "./awsConfig.js";
import type { DocumentUpload as DocumentUploadType } from "./types/Document.js";
import DocumentUploadForm from "./components/Shared/DocumentUpload.js";

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

    // Dummy uploader info for demonstration
    const uploaderId = "user-123";
    const uploaderRole = "doctor";
    const handleDocumentUpload = (doc: DocumentUploadType) => {
        // You can send doc metadata to your backend here
        console.log("Uploaded document:", doc);
    };

    return (
        <div>
            <h1>User Page</h1>
            <DocumentUploadForm
                uploaderId={uploaderId}
                uploaderRole={uploaderRole}
                onUpload={handleDocumentUpload}
            />
        </div>
    );
};

export default UserPage;
