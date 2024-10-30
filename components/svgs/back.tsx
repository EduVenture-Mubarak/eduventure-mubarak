import { View, Text } from 'react-native';
import React from 'react';
import { Path, Svg } from 'react-native-svg';
import { useTheme } from '@/hooks/useTheme';

export default function BackSVG() {
  const { theme } = useTheme();
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M15 17L10 12L15 7"
        stroke={theme.colors.textColor}
        strokeWidth="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}
