import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/hooks/useTheme';
import type { themeType } from '@/types/general';

export default function Issue() {
  const { t } = useTranslation();
  const { theme } = useTheme(); // Use the theme context
  const [issue, setIssue] = useState('');

  const handleSubmit = () => {
    if (issue.trim()) {
      // Here you can handle the issue submission, e.g., send it to a server or save it
      Alert.alert(
        'Issue Recorded',
        'Your issue has been recorded successfully.',
      );
      setIssue(''); // Clear the input field
    } else {
      Alert.alert('Error', 'Please enter an issue before submitting.');
    }
  };

  const styles = getStyles(theme);

  return (
    <>
      <Stack.Screen
        options={{
          title: t('pages.issue'),
          headerShown: true, // This disables the header
        }}
      />

      <View style={styles.container}>
        <Text style={styles.title}>{t('issue.title')}</Text>
        <TextInput
          style={styles.input}
          placeholder={t('issue.placeholder')}
          placeholderTextColor={theme.colors.placeholderColor} // Using the placeholderColor from the theme
          value={issue}
          onChangeText={setIssue}
          multiline
          numberOfLines={4}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>{t('issue.submit')}</Text>
        </TouchableOpacity>
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
      marginTop: 48,
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.textColor,
      marginBottom: 16,
    },
    input: {
      height: 100,
      borderColor: theme.colors.textColor,
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      marginBottom: 16,
      color: theme.colors.textColor, // Ensuring the input text color matches the theme
    },
    button: {
      backgroundColor: theme.colors.textColor,
      padding: 12,
      borderRadius: 5,
      alignItems: 'center',
    },
    buttonText: {
      color: theme.colors.backgroundColor, // Set button text color
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
}

