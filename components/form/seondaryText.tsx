import { View, Text, StyleSheet } from 'react-native';
import React, { type FC } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { Link, type Href } from 'expo-router';
import type { themeType } from '@/types/general';

interface secondaryTextProps {
  first: string;
  second: string;
  href: string;
}

const SecondaryText: FC<secondaryTextProps> = ({ first, second, href }) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const typedHref = href as Href<string>;

  return (
    <View style={styles.view}>
      <Text style={styles.text1}>{first}</Text>
      <Link href={typedHref} style={styles.text2}>
        {second}
      </Link>
    </View>
  );
};

function getStyles(theme: themeType) {
  const styles = StyleSheet.create({
    view: {
      display: 'flex',
      flexDirection: 'row',
      gap: 4,
      justifyContent: 'center',
      marginTop: 16,
      flexWrap: 'wrap',
    },
    text1: {
      fontSize: 14,
      fontFamily: 'Poppins',
      color: theme.colors.secondaryLink,
    },
    text2: {
      fontFamily: 'Poppins',
      fontSize: 14,
      color: theme.colors.textColor,
    },
  });

  return styles;
}

export default SecondaryText;

