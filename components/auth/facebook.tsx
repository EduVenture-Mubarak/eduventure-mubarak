import { useAuth } from '@/hooks/useAuth';
import { useNotification } from '@/hooks/useNotifications';
import { post } from '@/utils/request';
import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { AccessToken, Profile, LoginManager } from 'react-native-fbsdk-next';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';

export default function FacebookLogin({
  setIsLoading,
  setIsVisible,
  setError,
}) {
  // Function to handle Facebook login

  const { updateAuthData } = useAuth();
  const { expoPushToken } = useNotification();
  const router = useRouter();

  const loginWithFacebook = () => {
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      (result) => {
        if (result.isCancelled) {
        } else {
          AccessToken.getCurrentAccessToken().then(async (data) => {
            if (data) {
              try {
                setIsLoading(true);
                console.log(data.accessToken);
                const res = await post('/facebook', {
                  authToken: data.accessToken,
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
          });
        }
      },
      (error) => {
        setError(error.message);
        setIsVisible(true);
      },
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={loginWithFacebook}>
        <Text style={styles.buttonText}>Login with Facebook</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#3b5998', // Facebook blue color
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

