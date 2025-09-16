const jwt = require('jsonwebtoken');
const jswksClient = require('jwks-rsa');
const client = jswksClient({
    jwksUri: 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_6GmVWIx5Q/.well-known/jwks.json'
});

function getKey(header, callback){
    client.getSigningKey(header.kid, function(err, key) {
        const signingKey = key.getPublicKey();
        callback(null, signingKey);
    })
}

const token = '';

jwt.verify(token, getKey, {
    algorithms: ['RS256'],
    issuer: 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_6GmVWIx5Q'
}, function(err, decoded) {
    if (err) {
        console.error(`Token invalid: ${err}`);
    } else {
        console.log(`Token valid! Decoded payload: ${decoded}`);
    }
});