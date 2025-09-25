import React, { useEffect, useState } from "react";
import { useAuthenticator } from '@aws-amplify/ui-react';
import type { DocumentUpload as DocumentUploadType } from "./types/Document";
import DocumentUploadForm from "./components/Shared/DocumentUpload";

const UserPage: React.FC = () => {
    const { user, signOut } = useAuthenticator((context) => [context.user]);
    
    // Debug logging
    console.log('UserPage - Auth state:', {
        user: user
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

    // Extract user profile from Amplify user data
    useEffect(() => {
        if (user) {
            // For Amplify, user attributes are accessed differently
            setUserProfile({
                userId: user.username || "unknown",
                role: 'patient', // TODO: Get role from user attributes
                email: user.username, // Often the email in Amplify
                name: user.username || "User"
            });
        } else {
            setUserProfile(null);
        }
    }, [user]);

    const handleSignOut = () => {
        signOut();
    };

    const handleDocumentUpload = async (doc: DocumentUploadType) => {
        
        // S3 upload and metadata creation are already handled in DocumentUploadForm
        alert('Document uploaded successfully!');
        setLoading(false);
    };

    // If no user, show loading (Amplify will handle auth flow)
    if (!user) {
        return (
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <p>Loading...</p>
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