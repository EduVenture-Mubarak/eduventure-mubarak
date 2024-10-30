import { View, Text } from 'react-native';
import React from 'react';
import { Path, Rect, Svg } from 'react-native-svg';
import { useTheme } from '@/hooks/useTheme';

export default function PolicySVG() {
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
        d="M8 15L4.9121 13.3535C4.03173 12.8852 3.2955 12.186 2.78246 11.3309C2.26941 10.4758 1.99892 9.49719 2 8.5V2C2.00029 1.73487 2.10574 1.48069 2.29322 1.29321C2.48069 1.10574 2.73488 1.00029 3 1H13C13.2651 1.00029 13.5193 1.10574 13.7068 1.29321C13.8943 1.48069 13.9997 1.73487 14 2V8.5C14.0011 9.49717 13.7306 10.4758 13.2175 11.3309C12.7045 12.1859 11.9683 12.8851 11.0879 13.3534L8 15ZM3 2V8.5C2.99914 9.3159 3.22048 10.1166 3.64028 10.8163C4.06007 11.5159 4.66246 12.088 5.3828 12.4712L8 13.8666L10.6172 12.4712C11.3375 12.088 11.9399 11.5159 12.3597 10.8163C12.7795 10.1166 13.0009 9.3159 13 8.5V2H3Z"
        fill={theme.colors.textColor}
      />
      <Path
        d="M8 12.6385V3H12V8.4024C12 9.03617 11.8279 9.65804 11.5021 10.2016C11.1762 10.7452 10.7089 11.1902 10.15 11.4889L8 12.6385Z"
        fill={theme.colors.textColor}
      />
    </Svg>
  );
}

