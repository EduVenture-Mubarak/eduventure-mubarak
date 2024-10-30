import { View, Text } from 'react-native';
import React from 'react';
import { Path, Svg } from 'react-native-svg';
import { useTheme } from '@/hooks/useTheme';

export default function ThemeSVG() {
  const { theme } = useTheme();

  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M8.5 5.5L18.5 15.5"
        stroke={theme.colors.textColor}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Path
        d="M14.5 4.5L4 15L3.5 20.5L9 20L19.5 9.5C20.8807 8.11929 20.8807 5.88071 19.5 4.5C18.1193 3.11929 15.8807 3.11929 14.5 4.5Z"
        stroke={theme.colors.textColor}
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

