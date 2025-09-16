import { ServerSideEncryption } from "@aws-sdk/client-s3"

// Configuration for AWS services (S3, CloudTrail, etc.)
export const TruEvalConfig = {
    cognito: {
        userPoolId: 'us-east-1u4bsrpmuh',
        clientId: '7566unmbfs2jvnnth4eascgiv0',
        identityPoolId: '',
        domain: ''
    },
    s3: {
        bucketName: 'trueval-bucket',
        region: 'us-east-1',
        ServerSideEncryption: 'AES256'
    },
    cloudTrail: {
        enabled: true,
        s3BucketLogs: ''
    }
}