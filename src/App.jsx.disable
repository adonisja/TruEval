import { useState } from 'react'
import Login from './Login';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // TODO: Replace with your AWS region and Cognito Identity Pool ID
  const REGION = "us-east-2";
  const IDENTITY_POOL_ID = "us-east-2:62bf11bf-67d0-41f9-822c-fc85d75ea540";

  const s3Client = new S3Client({
    region: REGION,
    credentials: fromCognitoIdentityPool({
      clientConfig: { region: REGION },
      identityPoolId: IDENTITY_POOL_ID,
    }),
  });

  // TODO: Set your target S3 bucket name
  const BUCKET_NAME = "projcet01";

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setSuccess(null);
    setError(null);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setError("Please select a file to upload.");
      return;
    }
    setUploading(true);
    setError(null);
    setSuccess(null);
    try {
      const params = {
        Bucket: BUCKET_NAME,
        Key: selectedFile.name,
        Body: selectedFile,
        ContentType: selectedFile.type,
      };
      await s3Client.send(new PutObjectCommand(params));
      setSuccess("File uploaded successfully!");
      setSelectedFile(null);
    } catch (err) {
      setError(err.message || "Upload failed");
    }
    setUploading(false);
  };

  if (!loggedInUser) {
    return <Login onLogin={setLoggedInUser} />;
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Welcome, {loggedInUser}!</h1>
      <h2>Upload a File to AWS S3</h2>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit" disabled={uploading} style={{ marginLeft: 10 }}>
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <p style={{ marginTop: 20 }}>
        <strong>Note:</strong> Update <code>REGION</code>, <code>IDENTITY_POOL_ID</code>, and <code>BUCKET_NAME</code> in <code>src/App.jsx</code> with your AWS details.
      </p>
    </div>
  );
}

export default App
