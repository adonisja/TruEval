#!/bin/bash

echo "🔍 Testing Cognito Domain Availability..."
echo "======================================="

DOMAIN="https://trueval-auth.auth.us-east-1.amazoncognito.com"
ENDPOINT="$DOMAIN/.well-known/openid-configuration"

echo "Testing: $ENDPOINT"
echo ""

while true; do
    echo -n "$(date '+%H:%M:%S') - Checking domain status... "
    
    if curl -s -f "$ENDPOINT" > /dev/null 2>&1; then
        echo "✅ DOMAIN IS ACTIVE!"
        echo ""
        echo "🎉 You can now test authentication in your app!"
        echo "📋 Full response:"
        curl -s "$ENDPOINT" | jq '.' 2>/dev/null || curl -s "$ENDPOINT"
        break
    else
        echo "❌ Still setting up (404)"
        echo "💤 Waiting 30 seconds before next check..."
        sleep 30
    fi
done