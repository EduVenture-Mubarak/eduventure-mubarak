import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { useTheme } from '@/hooks/useTheme';
import { useTranslation } from 'react-i18next';
import { Path, Svg } from 'react-native-svg';

export default function TwitterSVG() {
  const { theme } = useTheme();
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={theme.colors.textColor}>
      <Path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.46.4a9 9 0 0 1-2.82 1.08 4.2 4.52 0 0 0-7.72 4.13A12.94 12.94 0 0 1 1.64.88a4.52 4.52 0 0 0 1.4 6.06A4.39 4.39 0 0 1 .88 6v.05a4.53 4.53 0 0 0 3.6 4.43 4.55 4.55 0 0 1-2.05.08 4.52 4.52 0 0 0 4.22 3.13A9.07 9.07 0 0 1 1 18.57 12.8 12.8 0 0 0 7 20c7.55 0 11.68-6.26 11.68-11.68v-.53A8.37 8.37 0 0 0 23 3z" />
    </Svg>
  );
}

