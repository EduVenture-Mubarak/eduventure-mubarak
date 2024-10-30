import { View, Text } from 'react-native';
import React from 'react';
import { Path, Svg } from 'react-native-svg';
import { useTheme } from '@/hooks/useTheme';

export default function DeleteDownloadsSVG() {
  const { theme } = useTheme();
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M15.4 9.11884V18.722H7.7V9.11884H15.4ZM13.9563 3.35693H9.14375L8.18125 4.31725H4.8125V6.23789H18.2875V4.31725H14.9188L13.9563 3.35693ZM17.325 7.1982H5.775V18.722C5.775 19.7784 6.64125 20.6426 7.7 20.6426H15.4C16.4588 20.6426 17.325 19.7784 17.325 18.722V7.1982Z"
        fill={theme.colors.textColor}
      />
    </Svg>
  );
}

