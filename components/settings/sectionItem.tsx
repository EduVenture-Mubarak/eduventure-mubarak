import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { type FC } from 'react';
import { useTheme } from '@/hooks/useTheme';
import type { childrenType, themeType } from '@/types/general';

interface sectionItemProps {
  head: string;
  children: childrenType;
  onClick: () => void;
}

const SectionItem: FC<sectionItemProps> = ({ head, children, onClick }) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  return (
    <TouchableOpacity style={styles.container} onPress={() => onClick()}>
      {children}
      <Text style={styles.head}>{head}</Text>
    </TouchableOpacity>
  );
};

function getStyles(theme: themeType) {
  const styles = StyleSheet.create({
    head: {
      fontFamily: 'Roboto',
      fontSize: 14,
      lineHeight: 24,
      color: theme.colors.textColor,
    },
    container: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
  });

  return styles;
}

export default SectionItem;

