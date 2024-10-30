import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { StripeProvider } from '@stripe/stripe-react-native';

import { AuthProvider } from '@/hooks/useAuth';
import { ThemeProvider } from '@/hooks/useTheme';
import { initializeI18n } from '@/utils/i18n';
import { LanguageProvider } from '@/hooks/useLanguage';
import { Slot } from 'expo-router';
import { NotificationProvider } from '@/hooks/useNotifications';
import * as Notifications from 'expo-notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Constants from 'expo-constants';

import storage from '@/utils/storage';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Setup QueryClient without persistence
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0, // Set stale time to 5 minutes (in milliseconds)
      refetchOnWindowFocus: true,
    },
  },
});

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Roboto: require('../assets/fonts/Roboto-Regular.ttf'),
    Roboto500: require('../assets/fonts/Roboto-Medium.ttf'),
    RobotoBold: require('../assets/fonts/Roboto-Bold.ttf'),
    Rambla: require('../assets/fonts/Rambla-Regular.ttf'),
    Poppins: require('../assets/fonts/Poppins-Regular.ttf'),
    Poppins600: require('../assets/fonts/Poppins-Bold.ttf'),
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const setupLocalization = async () => {
      await initializeI18n();
      setIsLoaded(true);
    };
    setupLocalization();
  }, []);

  useEffect(() => {
    if (fontsLoaded && isLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, isLoaded]);

  if (!fontsLoaded || !isLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <NotificationProvider>
        <StripeProvider
          publishableKey={Constants.expoConfig.extra.eas.STRIPE_KEY}
          merchantIdentifier="Edventure Mubarak"
          urlScheme="your-url-scheme">
          <ThemeProvider>
            <AuthProvider>
              <LanguageProvider>
                <Slot />
              </LanguageProvider>
            </AuthProvider>
          </ThemeProvider>
        </StripeProvider>
      </NotificationProvider>
    </QueryClientProvider>
  );
}

