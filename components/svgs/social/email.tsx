import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { useTheme } from '@/hooks/useTheme';
import { useTranslation } from 'react-i18next';
import { Path, Polyline, Svg } from 'react-native-svg';

export default function EmailSVG() {
  const { theme } = useTheme();
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={theme.colors.textColor}>
      <Path d="M4 4h16v16H4z" />
      <Polyline points="22 6 12 13 2 6" />
    </Svg>
  );
}

