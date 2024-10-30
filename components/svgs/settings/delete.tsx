import { View, Text } from 'react-native';
import React from 'react';
import { Path, Rect, Svg } from 'react-native-svg';
import { useTheme } from '@/hooks/useTheme';

export default function DeleteSVG() {
  const { theme } = useTheme();

  return (
    <Svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Rect
        width="16"
        height="16"
        fill="none"
        fill-opacity="0.01"
        style="mix-blend-mode:multiply"
      />
      <Path d="M7 6H6V12H7V6Z" fill={theme.colors.textColor} />
      <Path d="M10 6H9V12H10V6Z" fill={theme.colors.textColor} />
      <Path
        d="M2 3V4H3V14C3 14.2652 3.10536 14.5196 3.29289 14.7071C3.48043 14.8946 3.73478 15 4 15H12C12.2652 15 12.5196 14.8946 12.7071 14.7071C12.8946 14.5196 13 14.2652 13 14V4H14V3H2ZM4 14V4H12V14H4Z"
        fill={theme.colors.textColor}
      />
      <Path d="M10 1H6V2H10V1Z" fill={theme.colors.textColor} />
    </Svg>
  );
}

