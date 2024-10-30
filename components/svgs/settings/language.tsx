import { View, Text } from 'react-native';
import React from 'react';
import { Circle, Path, Svg } from 'react-native-svg';
import { useTheme } from '@/hooks/useTheme';

export default function LanguageSVG() {
  const { theme } = useTheme();

  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Circle cx="12" cy="12" r="7.5" stroke={theme.colors.textColor} />
      <Path
        d="M14.5 12C14.5 14.1651 14.1701 16.1029 13.6532 17.4813C13.394 18.1723 13.0975 18.6969 12.7936 19.0396C12.4892 19.383 12.2199 19.5 12 19.5C11.7801 19.5 11.5108 19.383 11.2064 19.0396C10.9025 18.6969 10.606 18.1723 10.3468 17.4813C9.82994 16.1029 9.5 14.1651 9.5 12C9.5 9.83494 9.82994 7.89713 10.3468 6.51871C10.606 5.82765 10.9025 5.30314 11.2064 4.96038C11.5108 4.61704 11.7801 4.5 12 4.5C12.2199 4.5 12.4892 4.61704 12.7936 4.96038C13.0975 5.30314 13.394 5.82765 13.6532 6.51871C14.1701 7.89713 14.5 9.83494 14.5 12Z"
        stroke={theme.colors.textColor}
      />
      <Path d="M4.5 12H19.5" stroke="#33363F" stroke-linecap="round" />
    </Svg>
  );
}