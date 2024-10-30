import { View, Text, ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Stack } from 'expo-router';
import AuthLayout from '@/components/layouts/auth';
import { useTheme } from '@/hooks/useTheme';
import type { themeType } from '@/types/general';

export default function Terms() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = getStyles(theme);
  return (
    <>
      <AuthLayout isBack={true} backHref="/signup">
        <View>
          <ScrollView>
            <Text style={styles.content}>{t('termsText')}</Text>
          </ScrollView>
        </View>
      </AuthLayout>
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
      marginVertical: 48,
    },
  });
}

