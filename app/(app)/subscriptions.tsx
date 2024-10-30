import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/hooks/useTheme'; // Adjust the import according to your theme context location
import type { themeType } from '@/types/general';

export default function Subscriptions() {
  const { t } = useTranslation();
  const { theme } = useTheme(); // Use the theme context

  const styles = getStyles(theme);
  // Replace this with actual plan name from your data
  const currentPlanName = 'Premium Plan';

  function handleCancelSubscription() {}

  return (
    <>
      <Stack.Screen
        options={{
          title: t('pages.subscriptions'),
          headerShown: true, // This enables the header
        }}
      />

      <View style={styles.container}>
        <Text style={[styles.text, { color: theme.colors.textColor }]}>
          Your current subscription is:
          <Text style={[styles.planName, { color: theme.colors.textColor }]}>
            {` ${currentPlanName}`}
          </Text>
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={handleCancelSubscription}>
          <Text style={styles.buttonText}>Cancel Subscription</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

function getStyles(theme: themeType) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 48,
      paddingHorizontal: 32,
      // justifyContent: 'center',
      // alignItems: 'center',
      backgroundColor: theme.colors.backgroundColor, // Apply background color from theme
    },
    text: {
      fontSize: 18,
    },
    planName: {
      fontWeight: 'bold',
      fontSize: 18,
    },
    button: {
      marginTop: 20,
      padding: 10,
      backgroundColor: theme.colors.textColor, // Button background color
      borderRadius: 5,
    },
    buttonText: {
      color: theme.colors.backgroundColor, // Button text color
      fontSize: 16,
      textAlign: 'center',
    },
  });

  return styles;
}

