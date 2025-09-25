
// DocumentUpload interface defines the structure for uploading medical documents securely.
// Separates file upload from metadata for compliance and maintainability.
export interface DocumentUpload {
	/**
	 * The actual file to be uploaded (e.g., PDF, image, etc.)
	 */
	file: File;

	/**
	 * Metadata about the document (title, type, patient ID, etc.)
	 */
	metadata: {
		title: string;
		type: string;
		patientId: string;
		description?: string;
		dateUploaded?: string;
	};

	/**
	 * Information about the uploader (user ID, role)
	 */
	uploader: {
		userId: string;
		role: 'doctor' | 'patient' | 'caretaker';
	};

	/**
	 * System-generated S3 key for secure storage
	 */
	s3Key: string;
}
