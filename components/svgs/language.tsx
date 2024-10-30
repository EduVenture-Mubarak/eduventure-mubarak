import { useTheme } from '@/hooks/useTheme';
import React from 'react';
import { Path, Svg } from 'react-native-svg';

export default function LanguageSVG() {
  const { theme } = useTheme();
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3M12 21C9.82538 21 8.0625 16.9706 8.0625 12C8.0625 7.02944 9.82538 3 12 3M12 21C14.1746 21 15.9375 16.9706 15.9375 12C15.9375 7.02944 14.1746 3 12 3M4.6875 16.3744C6.33632 15.4302 9.07573 14.8125 12.1764 14.8125C15.4124 14.8125 18.255 15.4854 19.875 16.5M4.6875 7.62558C6.33632 8.56975 9.07573 9.1875 12.1764 9.1875C15.4124 9.1875 18.255 8.5146 19.875 7.5"
        stroke={theme.colors.textColor}
        strokeWidth="2"
      />
    </Svg>
  );
}
