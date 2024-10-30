// src/utils/oauthUtils.js

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';

// Configure Google Sign-In
GoogleSignin.configure({
  webClientId:
    '233667771618-u5tlfe465np6io25g03rkp8ralakofth.apps.googleusercontent.com',
});

// Google Sign-In Function
export async function signInWithGoogle() {
  try {
    await GoogleSignin.hasPlayServices();
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    // Sign-in the user with the credential
    return await auth().signInWithCredential(googleCredential);
  } catch (error) {
    throw new Error(error.message);
  }
}

// Facebook Sign-In Function
export async function signInWithFacebook() {
  try {
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);
    if (result.isCancelled) {
      throw new Error('User cancelled the login process');
    }
    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
      throw new Error('Something went wrong obtaining access token');
    }
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );
    // Sign-in the user with the credential
    return await auth().signInWithCredential(facebookCredential);
  } catch (error) {
    throw new Error(error.message);
  }
}

