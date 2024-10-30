import { View, Text, StyleSheet } from 'react-native';
import React, { type FC } from 'react';
import { useTheme } from '@/hooks/useTheme';
import type { childrenType, themeType } from '@/types/general';

interface sectionProps {
  head: string;
  children: childrenType;
}

const Section: FC<sectionProps> = ({ head, children }) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  return (
    <View style={styles.container}>
      <Text style={styles.head}>{head}</Text>
      <View style={styles.children}>{children}</View>
    </View>
  );
};

function getStyles(theme: themeType) {
  const styles = StyleSheet.create({
    head: {
      fontFamily: 'Roboto500',
      fontSize: 14,
      lineHeight: 24,
      color: theme.colors.textColor,
      marginBottom: 20,
    },
    children: {
      paddingLeft: 12,
      display: 'flex',
      flexDirection: 'column',
      gap: 32,
    },
    container: {
      paddingHorizontal: 32,
      marginBottom: 32,
    },
  });

  return styles;
}

export default Section;

