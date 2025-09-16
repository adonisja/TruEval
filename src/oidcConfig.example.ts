import type { UserManagerSettings } from 'oidc-client-ts';

// OIDC Configuration for AWS Cognito (simplified, following AWS docs)
// Copy this file to oidcConfig.ts and update with your actual values
export const cognitoAuthConfig: UserManagerSettings = {
  authority: "https://cognito-idp.us-east-1.amazonaws.com/YOUR_USER_POOL_ID",
  client_id: "YOUR_SPA_CLIENT_ID", // Public client ID (no secret)
  redirect_uri: "http://localhost:5173/user",
  response_type: "code",
  scope: "email openid profile",
};