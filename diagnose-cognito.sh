#!/bin/bash

echo "🔍 Cognito Configuration Diagnostic"
echo "=================================="

USER_POOL_ID="us-east-1_u4bsrpmuh"
CLIENT_ID="7566unmbfs2jvnnth4eascgiv0"

echo "1. Checking User Pool..."
aws cognito-idp describe-user-pool --user-pool-id $USER_POOL_ID --region us-east-1 --query 'UserPool.Domain' 2>/dev/null || echo "❌ User Pool not found or no permissions"

echo ""
echo "2. Checking App Client..."
aws cognito-idp describe-user-pool-client --user-pool-id $USER_POOL_ID --client-id $CLIENT_ID --region us-east-1 --query 'UserPoolClient.{CallbackURLs:CallbackURLs,LogoutURLs:LogoutURLs,AllowedOAuthFlows:AllowedOAuthFlows,AllowedOAuthScopes:AllowedOAuthScopes}' 2>/dev/null || echo "❌ App Client not found or no permissions"

echo ""
echo "3. Testing OAuth endpoint availability..."
curl -s -o /dev/null -w "Status: %{http_code}\n" "https://us-east-1u4bsrpmuh.auth.us-east-1.amazoncognito.com/.well-known/openid_configuration" || echo "❌ OAuth endpoint not reachable"

echo ""
echo "4. Direct auth URL to test:"
echo "https://us-east-1u4bsrpmuh.auth.us-east-1.amazoncognito.com/oauth2/authorize?response_type=code&client_id=$CLIENT_ID&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fuser&scope=email%20openid%20profile"