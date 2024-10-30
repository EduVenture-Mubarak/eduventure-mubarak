import {
  View,
  Text,
  StyleSheet,
  Linking,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/hooks/useTheme';
import FacebookSVG from '@/components/svgs/social/facebook';
import TwitterSVG from '@/components/svgs/social/twitter';
import InstagramSVG from '@/components/svgs/social/instagram';
import EmailSVG from '@/components/svgs/social/email';
import type { themeType } from '@/types/general';

export default function Help() {
  const { t } = useTranslation();
  const { theme } = useTheme(); // Get theme for styling
  const styles = getStyles(theme); // Get dynamically generated styles

  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: t('pages.help'),
          headerShown: true, // Enable header with title from translation
        }}
      />

      <View style={styles.container}>
        <Text style={styles.titleText}>{t('help.title')}</Text>

        <TouchableOpacity
          onPress={() => openLink('https://facebook.com')}
          style={styles.linkContainer}>
          <FacebookSVG />
          <Text style={styles.linkText}>Facebook</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => openLink('https://twitter.com')}
          style={styles.linkContainer}>
          <TwitterSVG />
          <Text style={styles.linkText}>Twitter</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => openLink('https://instagram.com')}
          style={styles.linkContainer}>
          <InstagramSVG />
          <Text style={styles.linkText}>Instagram</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => openLink('mailto:support@example.com')}
          style={styles.linkContainer}>
          <EmailSVG />
          <Text style={styles.linkText}>Email Us</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

// Dynamically generated styles based on the theme
function getStyles(theme: themeType) {
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: theme.colors.backgroundColor,
    },
    titleText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.colors.textColor,
      marginTop: 48,
      marginBottom: 32,
    },
    linkText: {
      fontSize: 18,
      color: theme.colors.textColor, // Styled according to theme
    },
    linkContainer: {
      padding: 8,
      borderColor: theme.colors.textColor,
      borderStyle: 'solid',
      borderWidth: 1,
      display: 'flex',
      flexDirection: 'row',
      gap: 12,
      alignItems: 'center',
      marginBottom: 16,
      borderRadius: 8,
    },
  });
}

