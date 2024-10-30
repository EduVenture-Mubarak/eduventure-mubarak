import {
  View,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import { useTheme } from '@/hooks/useTheme';
import type { themeType } from '@/types/general';

export default function Loading() {
  const { theme } = useTheme();

  if (!theme) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  const styles = getStyles(theme);

  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size="large" color={theme.colors.textColor} />
    </SafeAreaView>
  );

  function getStyles(theme: themeType) {
    return StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.backgroundColor,
      },
    });
  }
}

