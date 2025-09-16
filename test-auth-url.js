// Test Authentication URL Generator
// Run this in browser console or use directly in browser

const testAuthUrl = () => {
  const domain = "https://us-east-1u4bsrpmuh.auth.us-east-1.amazoncognito.com";
  const clientId = "7566unmbfs2jvnnth4eascgiv0";
  const redirectUri = "http://localhost:5173/user";
  const responseType = "code";
  const scope = "email openid profile";

  const authUrl = `${domain}/oauth2/authorize?response_type=${responseType}&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}`;
  
  console.log("Test this URL in your browser:");
  console.log(authUrl);
  
  return authUrl;
};

// Call the function
testAuthUrl();

// Copy this URL and test it directly in your browser:
// https://us-east-1u4bsrpmuh.auth.us-east-1.amazoncognito.com/oauth2/authorize?response_type=code&client_id=7566unmbfs2jvnnth4eascgiv0&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fuser&scope=email%20openid%20profile