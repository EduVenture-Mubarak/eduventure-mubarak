import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/hooks/useTheme'; // Assuming you use a custom theme hook
import { useTranslation } from 'react-i18next'; // For translations
import SearchSVG from '../svgs/search';
import { useRouter } from 'expo-router';
import type { themeType } from '@/types/general';

export default function SearchInput() {
  const [value, setValue] = useState('');
  const { theme } = useTheme(); // Custom hook to get theme
  const { t } = useTranslation(); // Custom hook to get translations
  const styles = getStyles(theme);
  const router = useRouter();

  const onChangeText = (text: string) => {
    setValue(text);
  };

  function handleSearch() {
    if (value) {
      router.push(`/results?query=${value}`);
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handleSearch()}>
        <SearchSVG />
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText} // Use the handler to update the state
        value={value} // Controlled input
        placeholder={t('courses.search')} // Use the translation for placeholder
        placeholderTextColor={theme.colors.placeholderColor} // Theme color
      />
    </View>
  );
}

function getStyles(theme: themeType) {
  return StyleSheet.create({
    container: {
      height: 56,
      borderColor: theme.colors.textColor,
      borderWidth: 1,
      borderRadius: 4,
      paddingHorizontal: 16,
      color: theme.colors.textColor,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    input: {
      height: '100%',
      flex: 1,
      width: '100%',
      overflow: 'hidden',
      color: theme.colors.textColor,
    },
  });
}

