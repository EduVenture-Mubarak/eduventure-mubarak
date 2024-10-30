import { View, Text } from 'react-native';
import React from 'react';
import { G, Mask, Path, Rect, Svg } from 'react-native-svg';
import { useTheme } from '@/hooks/useTheme';

export default function SendSVG() {
  const { theme } = useTheme();
  return (
    <Svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Mask
        id="mask0_649_4325"
        style="mask-type:alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="20"
        height="20">
        <Rect
          x="0.400024"
          y="0.399902"
          width="19.2"
          height="19.2"
          fill="#D9D9D9"
        />
      </Mask>
      <G mask="url(#mask0_649_4325)">
        <Path
          d="M2.09601 16.4001V11.6001L8.48001 10.0001L2.09601 8.4001V3.6001L17.258 10.0001L2.09601 16.4001Z"
          fill={theme.colors.backgroundColor}
        />
      </G>
    </Svg>
  );
}

