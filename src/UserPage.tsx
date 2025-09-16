import React, { useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";
import type { DocumentUpload as DocumentUploadType } from "./types/Document.js";
import DocumentUploadForm from "./components/Shared/DocumentUpload.js";

const UserPage: React.FC = () => {
    const auth = useAuth();
    
    // Debug logging
    console.log('UserPage - Auth state:', {
        isLoading: auth.isLoading,
        isAuthenticated: auth.isAuthenticated,
        user: auth.user,
        error: auth.error
    });
    
    // State for error handling and loading
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [userProfile, setUserProfile] = useState<{
        userId: string;
        role: 'doctor' | 'patient' | 'caretaker';
        email?: string;
        name?: string;
    } | null>(null);

    // Extract user profile from OIDC user data
    useEffect(() => {
        if (auth.user) {
            const userClaims = auth.user.profile as any; // Type assertion for Cognito claims
            setUserProfile({
                userId: userClaims.sub || "unknown",
                role: userClaims['custom:role'] || userClaims.role || 'patient', // Cognito custom attributes
                email: userClaims.email,
                name: userClaims.name || `${userClaims.given_name || ''} ${userClaims.family_name || ''}`.trim()
            });
        } else {
            setUserProfile(null);
        }
    }, [auth.user]);

    const handleSignOut = () => {
        const clientId = "7566unmbfs2jvnnth4eascgiv0";
        const logoutUri = "http://localhost:5173/";
        const cognitoDomain = "https://trueval-auth.auth.us-east-1.amazoncognito.com";
        window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
    };

    const handleDocumentUpload = async (doc: DocumentUploadType) => {
        
        try {
            setLoading(true);
            setError(null);
            
            // Send document metadata to backend for validation and audit logging
            const response = await fetch('/api/documents', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.user?.access_token}`
                },
                body: JSON.stringify({
                    metadata: doc.metadata,
                    uploader: doc.uploader,
                    s3Key: doc.s3Key,
                    timestamp: new Date().toISOString()
                })
            });
            
            if (!response.ok) {
                throw new Error(`Upload failed: ${response.status}`);
            }
            
            const result = await response.json();
            console.log("Document uploaded successfully:", result);
            
            // Show success message to user
            alert('Document uploaded successfully!');
            
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Upload failed';
            setError(errorMessage);
            console.error('Document upload error:', err);
            alert(`Upload failed: ${errorMessage}`);
        } finally {
            setLoading(false);
        }
    };

    // Handle loading states
    if (auth.isLoading) {
        return (
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <p>Loading authentication...</p>
            </div>
        );
    }

    // Handle authentication errors
    if (auth.error) {
        return (
            <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>
                <h2>Authentication Error</h2>
                <p>{auth.error.message}</p>
                <button onClick={() => auth.signinRedirect()}>
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div>
            <h1>User Page</h1>
            
            {error && (
                <div style={{ color: 'red', marginBottom: '20px' }}>
                    <p>Error: {error}</p>
                    <button onClick={() => setError(null)}>Dismiss</button>
                </div>
            )}
            
            {userProfile ? (
                <>
                    <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#f5f5f5' }}>
                        <h3>Welcome, {userProfile.name || userProfile.email}!</h3>
                        <p>Role: {userProfile.role}</p>
                        <p>User ID: {userProfile.userId}</p>
                        <button 
                            onClick={() => handleSignOut()}
                            style={{ marginTop: '10px', padding: '8px 16px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                        >
                            Sign Out
                        </button>
                    </div>
                    
                    <DocumentUploadForm
                        uploaderId={userProfile.userId}
                        uploaderRole={userProfile.role}
                        onUpload={handleDocumentUpload}
                    />
                </>
            ) : (
                <div style={{ padding: '20px', textAlign: 'center' }}>
                    <p>Loading user profile...</p>
                </div>
            )}
        </div>
    );
};

export default UserPage;