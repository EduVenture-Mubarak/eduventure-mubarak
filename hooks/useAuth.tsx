import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  type FC,
} from 'react';
import { MMKV } from 'react-native-mmkv';
import type { childrenProps } from '@/types/general';

import storage from '@/utils/storage';

type Token = string | null;
type TokenType = string | null;
type TokenExpirationDate = string | null;

interface AuthData {
  token: Token;
  token_type: TokenType;
  token_expiration_date: TokenExpirationDate;
}

interface authContextReturn {
  authData: AuthData;
  updateAuthData: (token: Token, token_type: TokenType) => void;
  clearAuthData: () => void;
  getUserDataFromToken: () => any;
}

// Create the context
const AuthContext = createContext<authContextReturn | undefined>(undefined);

// Export the custom hook for consuming the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an Authentication Provider');
  }

  return context;
};

export const AuthProvider: FC<childrenProps> = ({ children }) => {
  const [authData, setAuthData] = useState<AuthData>({
    token: 'loading',
    token_type: null,
    token_expiration_date: null,
  });

  useEffect(() => {
    // Load the auth data from MMKV when the app loads
    const loadAuthData = () => {
      try {
        const token = storage.getString('token');
        const token_type = storage.getString('token_type');
        const token_expiration_date = storage.getString(
          'token_expiration_date',
        );

        if (token && token_type && token_expiration_date) {
          const isExpired = checkTokenExpiration(token_expiration_date);
          if (!isExpired) {
            setAuthData({ token, token_type, token_expiration_date });
          } else {
            clearAuthData();
          }
        } else {
          setAuthData({
            token: null,
            token_type: null,
            token_expiration_date: null,
          });
        }
      } catch (error) {
        console.error('Error loading auth data');
      }
    };

    loadAuthData();
  }, []);

  // Function to update and store the token data
  const updateAuthData = (token: Token, token_type: TokenType) => {
    try {
      const expirationDate = new Date();
      expirationDate.setHours(expirationDate.getHours() + 1); // Set expiration to 1 hour from now
      const token_expiration_date = expirationDate.toISOString();

      storage.set('token', String(token));
      storage.set('token_type', String(token_type));
      storage.set('token_expiration_date', token_expiration_date);

      setAuthData({
        token,
        token_type,
        token_expiration_date,
      });
    } catch (error) {
      console.error('Error updating auth data', error);
    }
  };

  // Function to clear the auth data (logout)
  const clearAuthData = () => {
    try {
      storage.delete('token');
      storage.delete('token_type');
      storage.delete('token_expiration_date');

      setAuthData({
        token: null,
        token_type: null,
        token_expiration_date: null,
      });
    } catch (error) {
      console.error('Error clearing auth data', error);
    }
  };

  const checkTokenExpiration = (token_expiration_date: TokenExpirationDate) => {
    if (!token_expiration_date) return true;
    const now = new Date().getTime();
    const expirationTime = new Date(token_expiration_date).getTime();
    return now >= expirationTime;
  };

  const decodeToken = (token: Token) => {
    if (!token) return null;

    const parts = token.split('.');
    if (parts.length !== 3) {
      console.error('Invalid JWT token format');
      return null;
    }

    const payload = base64UrlDecode(parts[1]);
    return payload;
  };

  const base64UrlDecode = (str: string) => {
    const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    const paddedBase64 = base64.padEnd(
      base64.length + ((4 - (base64.length % 4)) % 4),
      '=',
    );

    try {
      const decodedStr = atob(paddedBase64);
      return JSON.parse(decodedStr);
    } catch (e) {
      console.error('Error parsing JWT payload', e);
      return null;
    }
  };

  const getUserDataFromToken = () => {
    if (!authData.token || authData.token_type !== 'jwt') {
      return null;
    }

    if (checkTokenExpiration(authData.token_expiration_date)) {
      return null;
    }

    const decodedToken = decodeToken(authData.token);
    if (!decodedToken) return null;

    const currentTime = Math.floor(Date.now() / 1000);
    if (decodedToken.exp && decodedToken.exp < currentTime) {
      return null;
    }

    return decodedToken;
  };

  return (
    <AuthContext.Provider
      value={{ authData, updateAuthData, clearAuthData, getUserDataFromToken }}>
      {children}
    </AuthContext.Provider>
  );
};

