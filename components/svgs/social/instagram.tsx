import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { useTheme } from '@/hooks/useTheme';
import { useTranslation } from 'react-i18next';
import { Circle, Line, Path, Rect, Svg } from 'react-native-svg';

export default function InstagramSVG() {
  const { theme } = useTheme();
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={theme.colors.textColor}>
      <Rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <Path d="M12 8a4 4 0 1 1-4 4 4 4 0 0 1 4-4z" />
      <Circle cx="17.5" cy="6.5" r="1.5" />
    </Svg>
  );
}

