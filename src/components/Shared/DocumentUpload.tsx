import React, { useState } from 'react';
import type { DocumentUpload }  from '../../types/Document.js';

interface Props {
  uploaderId: string;
  uploaderRole: 'doctor' | 'patient' | 'caretaker';
  onUpload: (doc: DocumentUpload) => void;
}

const DocumentUpload: React.FC<Props> = ({ uploaderId, uploaderRole, onUpload }) => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [patientId, setPatientId] = useState('');
  const [description, setDescription] = useState('');

  // Simulate S3 key generation (replace with backend logic)
  const generateS3Key = (file: File) => {
    return `${patientId}/${Date.now()}_${file.name}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title || !type || !patientId) return;
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
      s3Key: generateS3Key(file),
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

export default DocumentUpload;
