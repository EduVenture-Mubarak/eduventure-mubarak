import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { type FC } from 'react';
import { useTheme } from '@/hooks/useTheme';
import SearchLinkSVG from '../svgs/search-link';
import { useRouter } from 'expo-router';
import type { themeType } from '@/types/general';

interface searchItemProps {
  query: string;
}

const SearchItem: FC<searchItemProps> = ({ query }) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() =>
        router.push(`/results?query=${encodeURIComponent(query)}`)
      }>
      <View style={styles.container}>
        <SearchLinkSVG />
        <Text style={styles.text}>{query}</Text>
      </View>
    </TouchableOpacity>
  );
};

function getStyles(theme: themeType) {
  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      gap: 16,
      alignItems: 'center',
    },
    text: {
      fontFamily: 'Roboto',
      fontSize: 16,
      paddingVertical: 8,
      color: theme.colors.textColor,
      borderBottomColor: theme.colors.textColorOpacity,
      borderBottomWidth: 1,
      borderStyle: 'solid',
      flex: 1,
    },
  });

  return styles;
}

export default SearchItem;

