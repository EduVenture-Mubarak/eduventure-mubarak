import { useAuth } from '@/hooks/useAuth';
import { useNotification } from '@/hooks/useNotifications';
import { post } from '@/utils/request';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import Constants from 'expo-constants';

GoogleSignin.configure({
  webClientId: Constants.expoConfig.extra.eas.GOOGLE_WEB_CLIENT_ID, // client ID of type WEB for your server. Required to get the `idToken` on the user object, and for offline access.
  scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  hostedDomain: '', // specifies a hosted domain restriction
  forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
  accountName: '', // [Android] specifies an account name on the device that should be used
  iosClientId: Constants.expoConfig.extra.eas.GOOGLE_IOS_CLIENT_ID, // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
  googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. "GoogleService-Info-Staging"
  openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
  profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
});

export default function GoogleLogin({ setIsLoading, setError, setIsVisible }) {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const [userInfo, setUserInfo] = useState<any>(null);
  const { updateAuthData } = useAuth();
  const { expoPushToken } = useNotification();
  const { t } = useTranslation();
  const router = useRouter();

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices(); // Ensure Google Play Services are available
      const user = await GoogleSignin.signIn();
      setIsLoading(true);
      // await get('/auth/google');
      setUserInfo(user);
      if (user.data) {
        try {
          setIsLoading(true);
          const res = await post('/google', {
            googleToken: user.data?.idToken,
            pushToken: expoPushToken,
          });
          updateAuthData(res.token, 'jwt');
          router.replace('/');
        } catch (e) {
          setError(e.message);
          setIsVisible(true);
        } finally {
          setIsLoading(false);
        }
      }
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // User cancelled the sign-in
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // Operation in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // Play services not available or outdated
      } else {
        // Some other error
      }
      setError(error.message);
      setIsVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  function onClose() {
    setIsVisible(false);
  }

  return (
    <View style={styles.container}>
      <GoogleSigninButton
        style={styles.signInButton}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signIn}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInButton: {
    width: 200,
    height: 60,
  },
  userInfo: {
    marginTop: 20,
    fontSize: 18,
    color: '#333',
  },
});

