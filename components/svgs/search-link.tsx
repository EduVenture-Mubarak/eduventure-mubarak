import { View, Text } from 'react-native';
import React from 'react';
import { G, Mask, Path, Rect, Svg } from 'react-native-svg';
import { useTheme } from '@/hooks/useTheme';

export default function SearchLinkSVG() {
  const { theme } = useTheme();
  return (
    <Svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Mask
        id="mask0_287_506"
        style="mask-type:alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="25"
        height="24">
        <Rect width="24.0789" height="24" fill="#D9D9D9" />
      </Mask>
      <G mask="url(#mask0_287_506)">
        <Path
          d="M17.6579 18L8.02635 8.4V17H6.01978V5H18.0592V7H9.43096L19.0625 16.6L17.6579 18Z"
          fill={theme.colors.textColorOpacity}
          fill-opacity="0.25"
        />
      </G>
    </Svg>
  );
}

