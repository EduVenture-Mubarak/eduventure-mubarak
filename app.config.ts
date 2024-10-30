require('dotenv').config();

module.exports = ({ config }) => {
  const newConfig = {
    ...config,
    "ios": {
      "supportsTablet": true,
      "infoPlist": {
        "ExpoLocalization_supportsRTL": true
      },
      "bundleIdentifier": process.env.PACKAGE_NAME
    },
    android: {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon.png",
        "backgroundColor": "#ecf0eb"
      },
      "package": process.env.PACKAGE_NAME,
      "googleServicesFile": process.env.GOOGLE_SERVICES_JSON
    },
    plugins: [
      "expo-router",
      [
        "@react-native-google-signin/google-signin",
        {
          "iosUrlScheme": process.env.IOS_URL_SCHEME, // Use an env variable or default value
        },
      ],
      [
        "react-native-fbsdk-next",
        {
          "appID": process.env.FACEBOOK_APP_ID,
          "clientToken": process.env.FACEBOOK_TOKEN,
          "displayName": "Login with Facebook",
          "scheme": process.env.FACEBOOK_SCHEME,
          "advertiserIDCollectionEnabled": false,
          "autoLogAppEventsEnabled": false,
          "isAutoInitEnabled": true,
        },
      ],
      "expo-localization",
    ],
    extra: {
      "eas": {
        "projectId": process.env.PROJECT_ID,
        "GOOGLE_ANDROID_CLIENT_ID": process.env.GOOGLE_ANDROID_CLIENT_ID,
        "GOOGLE_IOS_CLIENT_ID": process.env.GOOGLE_IOS_CLIENT_ID,
        "GOOGLE_WEB_CLIENT_ID": process.env.GOOGLE_WEB_CLIENT_ID,
        "GOOGLE_WEB_SECRET": process.env.GOOGLE_WEB_SECRET,
        "FACEBOOK_APP_ID": process.env.FACEBOOK_APP_ID,
        "FACEBOOK_SCHEME": process.env.FACEBOOK_SCHEME,
        "FACEBOOK_TOKEN": process.env.FACEBOOK_TOKEN,
        "FACEBOOK_SECRET": process.env.FACEBOOK_SECRET,
        "STRIPE_KEY": process.env.STRIPE_KEY,
        "STRIPE_SECRET": process.env.STRIPE_SECRET,
        "IOS_URL_SCHEME": process.env.IOS_URL_SCHEME,
        "PROJECT_ID": process.env.PROJECT_ID,
        "GOOGLE_SERVICES_JSON": process.env.GOOGLE_SERVICES_JSON,
        "PACKAGE_NAME": process.env.PACKAGE_NAME

      }
    }
  };

  return newConfig
};
