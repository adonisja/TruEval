import React, { useState } from 'react';
import type { DocumentUpload }  from '../../types/Document.js';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { TruEvalConfig } from '../../awsConfig.js';

interface Props {
  uploaderId: string;
  uploaderRole: 'doctor' | 'patient' | 'caretaker';
  onUpload: (doc: DocumentUpload) => void;
}

const DocumentUploadForm: React.FC<Props> = ({ uploaderId, uploaderRole, onUpload }) => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [patientId, setPatientId] = useState('');
  const [description, setDescription] = useState('');


  // S3 configuration from awsConfig.ts
  const REGION = TruEvalConfig.s3.region;
  const BUCKET = TruEvalConfig.s3.bucketName;
  // Credentials should be provided by Cognito or other secure method
  // For demo, this is left out. Never hardcode secrets in production!
  const s3 = new S3Client({ region: REGION });

  // Generate a secure S3 key for the file
  const generateS3Key = (file: File) => {
    return `${patientId}/${Date.now()}_${file.name}`;
  };

  // Upload file to S3 using AWS SDK
  const uploadToS3 = async (file: File, key: string) => {
    try {
      // Convert file to ArrayBuffer
      const fileBuffer = await file.arrayBuffer();
      const command = new PutObjectCommand({
        Bucket: BUCKET,
        Key: key,
        Body: fileBuffer,
        ContentType: file.type,
      });
      await s3.send(command);
      return true;
    } catch (error) {
      console.error('S3 upload error:', error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title || !type || !patientId) return;
    const s3Key = generateS3Key(file);
    // Upload file to S3
    const success = await uploadToS3(file, s3Key);
    if (!success) {
      alert('File upload failed. Please try again.');
      return;
    }
    // Build document metadata for backend
    const doc: DocumentUpload = {
      file,
      metadata: {
        title,
        type,
        patientId,
        description,
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
      <h2>Upload Medical Document</h2>
      <input type="file" accept=".pdf,.jpg,.png" onChange={e => setFile(e.target.files?.[0] || null)} required />
      <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
      <input type="text" placeholder="Type" value={type} onChange={e => setType(e.target.value)} required />
      <input type="text" placeholder="Patient ID" value={patientId} onChange={e => setPatientId(e.target.value)} required />
      <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
      <button type="submit">Upload</button>
    </form>
  );
};

export default DocumentUploadForm;
