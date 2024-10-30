import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { useTheme } from '@/hooks/useTheme';
import { useTranslation } from 'react-i18next';
import { Path, Svg } from 'react-native-svg';

export default function FacebookSVG() {
  const { theme } = useTheme();
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={theme.colors.textColor}>
      <Path d="M18 2h-3a5 5 0 0 0-5 5v3H8v4h2v8h4v-8h3.64l.36-4H14V7a1 1 0 0 1 1-1h3z" />
    </Svg>
  );
}

