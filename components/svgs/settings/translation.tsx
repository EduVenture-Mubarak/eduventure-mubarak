import { View, Text } from 'react-native';
import React from 'react';
import { Path, Rect, Svg } from 'react-native-svg';
import { useTheme } from '@/hooks/useTheme';

export default function TranslationSVG() {
  const { theme } = useTheme();

  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Rect
        width="24"
        height="24"
        fill="none"
        fill-opacity="0.01"
        style="mix-blend-mode:multiply"
      />
      <Path
        d="M8 14H6.5C4.55 14 3 12.45 3 10.5V8.5H4V10.5C4 11.9 5.1 13 6.5 13H8V14Z"
        fill={theme.colors.textColor}
      />
      <Path
        d="M14 15H15.1L12.8 9.5H11.7L9.4 15H10.5L10.9 14H13.55L14 15ZM11.35 13L12.25 10.8L13.15 13H11.35Z"
        fill={theme.colors.textColor}
      />
      <Path
        d="M14 7.5H13V5.5C13 4.1 11.9 3 10.5 3H8.5V2H10.5C12.45 2 14 3.55 14 5.5V7.5Z"
        fill={theme.colors.textColor}
      />
      <Path
        d="M7 2.5V1.5H4.5V0.5H3.5V1.5H1V2.5H5.1C5 2.95 4.7 3.75 4 4.5C3.7 4.15 3.45 3.8 3.3 3.5H2.15C2.35 4 2.7 4.6 3.2 5.15C2.8 5.5 2.2 5.8 1.5 6.05L1.85 7C2.75 6.65 3.45 6.25 4 5.85C4.55 6.3 5.25 6.7 6.15 7L6.5 6.05C5.8 5.8 5.2 5.45 4.75 5.15C5.7 4.15 6 3.1 6.1 2.5H7Z"
        fill={theme.colors.textColor}
      />
    </Svg>
  );
}

