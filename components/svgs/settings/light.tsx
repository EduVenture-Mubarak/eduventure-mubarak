import { View, Text } from 'react-native';
import React from 'react';
import { Circle, Path, Svg } from 'react-native-svg';
import { useTheme } from '@/hooks/useTheme';

export default function LightSVG() {
  const { theme } = useTheme();
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Circle cx="12" cy="12" r="3.5" stroke={theme.colors.textColor} />
      <Path
        d="M12 5V3"
        stroke={theme.colors.textColor}
        stroke-linecap="round"
      />
      <Path
        d="M12 21V19"
        stroke={theme.colors.textColor}
        stroke-linecap="round"
      />
      <Path
        d="M16.9498 7.04996L18.364 5.63574"
        stroke={theme.colors.textColor}
        stroke-linecap="round"
      />
      <Path
        d="M5.63608 18.3644L7.05029 16.9502"
        stroke={theme.colors.textColor}
        stroke-linecap="round"
      />
      <Path
        d="M19 12L21 12"
        stroke={theme.colors.textColor}
        stroke-linecap="round"
      />
      <Path
        d="M3 12L5 12"
        stroke={theme.colors.textColor}
        stroke-linecap="round"
      />
      <Path
        d="M16.9498 16.95L18.364 18.3643"
        stroke={theme.colors.textColor}
        stroke-linecap="round"
      />
      <Path
        d="M5.63608 5.63559L7.05029 7.0498"
        stroke={theme.colors.textColor}
        stroke-linecap="round"
      />
    </Svg>
  );
}

