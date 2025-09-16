import { ServerSideEncryption } from "@aws-sdk/client-s3"

export const cognitoConfig = {
    cognitoDomain: 'https://us-east-1u4bsrpmuh.auth.us-east-1.amazoncognito.com',
    clientId: '1j4agkj0dddlgbl69t83ckr7q3',
    redirectUri: 'http://localhost:5173/user'
}

export const TruEvalConfig = {
    cognito: {
        userPoolId: 'us-east-1u4bsrpmuh',
        clientId: '1j4agkj0dddlgbl69t83ckr7q3',
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