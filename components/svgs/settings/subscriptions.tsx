import { View, Text } from 'react-native';
import React from 'react';
import { Path, Rect, Svg } from 'react-native-svg';
import { useTheme } from '@/hooks/useTheme';

export default function SubscriptionsSVG() {
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
        d="M11.4999 10.2576C11.4999 7.94995 9.60989 7.687 8.09134 7.47605C6.43634 7.2456 5.49989 7.04605 5.49989 5.62105C5.49989 4.42455 6.75344 4 7.82679 4C8.36177 3.9827 8.8932 4.09281 9.37726 4.32126C9.86131 4.54972 10.2841 4.88997 10.6108 5.31395L11.3889 4.68605C11.039 4.23615 10.6037 3.85984 10.1079 3.57875C9.61208 3.29765 9.06561 3.11732 8.49989 3.0481V1.5H7.49989V3.011C5.69229 3.1206 4.49989 4.141 4.49989 5.621C4.49989 7.986 6.41489 8.25235 7.95364 8.466C9.57989 8.6924 10.4999 8.8872 10.4999 10.2576C10.4999 11.7737 8.93359 12 7.99989 12C6.28519 12 5.56079 11.5181 4.88894 10.6861L4.11084 11.3139C4.50724 11.8363 5.01992 12.259 5.60821 12.5486C6.1965 12.8383 6.84419 12.9868 7.49989 12.9824V14.5H8.49989V12.9775C10.3627 12.8254 11.4999 11.814 11.4999 10.2576Z"
        fill={theme.colors.textColor}
      />
    </Svg>
  );
}
