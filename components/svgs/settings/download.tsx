import { View, Text } from 'react-native';
import React from 'react';
import { Ellipse, Path, Svg } from 'react-native-svg';
import { useTheme } from '@/hooks/useTheme';

export default function DownloadSVG() {
  const { theme } = useTheme();
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Ellipse
        cx="6"
        cy="6"
        rx="6"
        ry="6"
        transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 18 20)"
        fill={theme.colors.secondaryLink}
        fill-opacity="0.9"
      />
      <Path
        d="M9.5 12.5L12 15M12 15L14.5 12.5M12 15L12 5"
        stroke={theme.colors.textColor}
        stroke-linecap="round"
      />
    </Svg>
  );
}

