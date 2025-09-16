#!/bin/bash

# Script to create a public Cognito App Client
# Replace YOUR_USER_POOL_ID with your actual user pool ID

USER_POOL_ID="us-east-1_u4bsrpmuh"  # Your user pool ID (extracted from domain)

echo "Creating public app client..."

aws cognito-idp create-user-pool-client \
    --user-pool-id $USER_POOL_ID \
    --client-name "TruEval-Frontend-Public" \
    --generate-secret false \
    --supported-identity-providers "COGNITO" \
    --callback-urls "http://localhost:5173/user" \
    --logout-urls "http://localhost:5173/" \
    --allowed-o-auth-flows "code" \
    --allowed-o-auth-scopes "openid" "email" "profile" \
    --allowed-o-auth-flows-user-pool-client true \
    --explicit-auth-flows "ALLOW_USER_SRP_AUTH" "ALLOW_REFRESH_TOKEN_AUTH" \
    --region us-east-1

echo "App client created! Copy the ClientId from the output above."