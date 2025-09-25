import React, { useState } from 'react';
import type { DocumentUpload }  from '../../types/Document';
import { Storage } from 'aws-amplify';

interface Props {
  uploaderId: string;
  uploaderRole: 'doctor' | 'patient' | 'caretaker';
  onUpload: (doc: DocumentUpload) => void;
}

const DocumentUploadForm: React.FC<Props> = ({ uploaderId, uploaderRole, onUpload }) => {
  const [file, setFile] = useState<File | null>(null);

  // S3 configuration is handled by Amplify Storage and aws-exports.js

  // Generate a secure S3 key for the file
  const generateS3Key = (file: File) => {
    return `documents/${uploaderId}/${Date.now()}_${file.name}`;
  };

  // Upload file to S3 using Amplify Storage classic API
  const uploadToS3 = async (file: File, key: string) => {
    try {
      // Ensure Storage is available and Amplify is configured
      if (!Storage || typeof Storage.put !== 'function') {
        throw new Error('Amplify Storage is not available. Check your Amplify version and import.');
      }
      await Storage.put(key, file, {
        contentType: file.type,
        level: 'protected',
      });
      return true;
    } catch (error) {
      console.error('Amplify Storage upload error:', error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    
    const s3Key = generateS3Key(file);
    
    // Upload file to S3
    const success = await uploadToS3(file, s3Key);
    if (!success) {
      alert('File upload failed. Please try again.');
      return;
    }
    
    // Build document metadata for backend with simple defaults
    const doc: DocumentUpload = {
      file,
      metadata: {
        title: file.name, // Use filename as title
        type: file.type || 'document', // Use file type or default
        patientId: uploaderId, // Use uploader ID as patient ID for now
        description: '', // Empty description
        dateUploaded: new Date().toISOString(),
      },
      uploader: {
        userId: uploaderId,
        role: uploaderRole,
      },
      s3Key,
    };
    onUpload(doc);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Upload Document</h2>
      <div style={{ marginBottom: '20px' }}>
        <input 
          type="file" 
          accept=".pdf,.jpg,.png,.jpeg,.doc,.docx" 
          onChange={e => setFile(e.target.files?.[0] || null)} 
          required 
          style={{ padding: '10px', width: '100%', marginBottom: '10px' }}
        />
      </div>
      <button 
        type="submit" 
        disabled={!file}
        style={{ 
          padding: '12px 24px', 
          backgroundColor: file ? '#007bff' : '#ccc', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px', 
          cursor: file ? 'pointer' : 'not-allowed',
          fontSize: '16px'
        }}
      >
        {file ? 'Upload Document' : 'Select a file to upload'}
      </button>
    </form>
  );
};

export default DocumentUploadForm;
