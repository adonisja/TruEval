# Configuration Setup

This project requires two configuration files that are not committed to git for security reasons.

## Required Configuration Files

### 1. OIDC Authentication Config
Copy `src/oidcConfig.example.ts` to `src/oidcConfig.ts` and update with your AWS Cognito settings:

```bash
cp src/oidcConfig.example.ts src/oidcConfig.ts
```

Update the following values:
- `authority`: Your Cognito User Pool issuer URL
- `client_id`: Your SPA (Single Page Application) Client ID from Cognito

### 2. AWS Services Config  
Copy `src/awsConfig.example.ts` to `src/awsConfig.ts` and update with your AWS settings:

```bash
cp src/awsConfig.example.ts src/awsConfig.ts
```

Update the following values:
- `userPoolId`: Your Cognito User Pool ID
- `clientId`: Your Cognito App Client ID
- `bucketName`: Your S3 bucket name for document storage

## AWS Cognito Setup Required

1. Create a **Public** SPA App Client (no client secret)
2. Enable **Authorization code grant** flow
3. Add callback URL: `http://localhost:5173/user`
4. Add logout URL: `http://localhost:5173/`
5. Enable scopes: `email`, `openid`, `profile`

## Development

After setting up the config files:

```bash
npm install
npm run dev
```