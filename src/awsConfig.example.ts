import { ServerSideEncryption } from "@aws-sdk/client-s3"

// Configuration for AWS services (S3, CloudTrail, etc.)
// Copy this file to awsConfig.ts and update with your actual values
export const TruEvalConfig = {
    cognito: {
        userPoolId: 'YOUR_USER_POOL_ID',
        clientId: 'YOUR_CLIENT_ID',
        identityPoolId: 'YOUR_IDENTITY_POOL_ID', // Optional
        domain: 'YOUR_COGNITO_DOMAIN' // Optional
    },
    s3: {
        bucketName: 'your-bucket-name',
        region: 'us-east-1',
        ServerSideEncryption: 'AES256'
    },
    cloudTrail: {
        enabled: true,
        s3BucketLogs: 'your-cloudtrail-logs-bucket' // Optional
    }
}