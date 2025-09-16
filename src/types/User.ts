export interface CognitoUser {
    sub: string;
    email: string;
    'custom:tenant_id': string;
    'custom:role': string;
    'custom:doctor_id'?: string;
    'custom:caretakers'?: string;
    'custom:organization': string;
    'custom:patient_ids'?: string;
    'cognito:groups'?: string[];
}

export interface ParsedUser {

    
    id: string;
    email: string;
    tenantId: string;
    role: 'patient' | 'doctor' | 'caretaker' | 'admin';
    doctorId?: string;
    patientIds: string[];
    caretakers: string[];
    organization: string;
    groups: string[];
}

export interface UserPermissions {

    // Basic File Operation Permissions
    canUpload: boolean;
    canView: boolean;
    canDelete: boolean;
    canEdit: boolean;

    // Access control permissions
    allowedCategories: string[];
    acessiblePatients: string[];

    // Medical-specific permissions
    canViewMedicalRecords: boolean;
    canPrescribeMedication: boolean;
    canModifyExistingFiles: boolean;
    canAccessEmergencyFiles: boolean;

    // Administrative permissions
    canManageCaretakers: boolean;
    canViewAuditLogs: boolean;
    canExportData: boolean;
}

export interface RoleCapabilities {
    patient: {
        uploadToPersonal: boolean;
        shareWithDoctor: boolean;
        shareWithCaretakers: boolean;
        viewOwnMedicalRecords: boolean;
        manageOwnCaretakers: boolean;
    };
    doctor: {
        viewAllPatientData: boolean;
        prescribeMedication: boolean;
        createMedicalRecords: boolean;
        accessEmergencyFiles: boolean;
        managePatientCaretakers: boolean;
        viewCaretakerContributions: boolean;
    };
    caretaker: {
        uploadVitals: boolean;
        createObservations: boolean;
        manageMedications: boolean;
        viewPatientSharedFiles: boolean;
        createCarePlans: boolean;
        accessEmergencyInfo: boolean;
    };
}