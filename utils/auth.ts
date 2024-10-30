// Function to decode Base64Url encoded string
const decodeBase64Url = (base64Url: string) => {
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const padding = base64.length % 4;
  if (padding === 2) {
    base64 += '==';
  } else if (padding === 3) {
    base64 += '=';
  }
  return atob(base64); // Decode the Base64 string
};

// Function to parse JWT
const parseJWT = (token: string | null | undefined) => {
  if (!token) {
    throw new Error('Token is required');
  }

  const parts = token.split('.');
  if (parts.length !== 3) {
    throw new Error('Invalid token format');
  }

  const header = JSON.parse(decodeBase64Url(parts[0]));
  const payload = JSON.parse(decodeBase64Url(parts[1]));

  return {
    header,
    payload,
    signature: parts[2], // Signature is not decoded
  };
};

