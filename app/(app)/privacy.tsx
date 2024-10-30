import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Stack } from 'expo-router';
import { useTheme } from '@/hooks/useTheme';
import type { themeType } from '@/types/general';

export default function Terms() {
  const { t } = useTranslation();
  const { theme } = useTheme(); // Use the theme context

  const styles = getStyles(theme);

  return (
    <>
      <Stack.Screen
        options={{
          title: t('pages.privacy'),
          headerShown: true,
        }}
      />

      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.content}>{t('termsText')}</Text>
        </ScrollView>
      </View>
    </>
  );
}

function getStyles(theme: themeType) {
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: theme.colors.backgroundColor,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.textColor,
      marginBottom: 16,
    },
    content: {
      fontSize: 16,
      color: theme.colors.textColor,
      lineHeight: 24,
    },
  });
}

