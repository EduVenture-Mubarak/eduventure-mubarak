import { View, Text } from 'react-native';
import React from 'react';
import { Path, Rect, Svg } from 'react-native-svg';
import { useTheme } from '@/hooks/useTheme';

export default function LogoutSVG() {
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
      <Path
        d="M3 15H9C9.26512 14.9997 9.5193 14.8942 9.70677 14.7068C9.89424 14.5193 9.9997 14.2651 10 14V12.5H9V14H3V2H9V3.5H10V2C9.9997 1.73488 9.89424 1.4807 9.70677 1.29323C9.5193 1.10576 9.26512 1.0003 9 1H3C2.73488 1.0003 2.4807 1.10576 2.29323 1.29323C2.10576 1.4807 2.0003 1.73488 2 2V14C2.0003 14.2651 2.10576 14.5193 2.29323 14.7068C2.4807 14.8942 2.73488 14.9997 3 15Z"
        fill={theme.colors.textColor}
      />
      <Path
        d="M10.293 10.293L12.086 8.5H5V7.5H12.086L10.293 5.707L11 5L14 8L11 11L10.293 10.293Z"
        fill={theme.colors.textColor}
      />
    </Svg>
  );
}
