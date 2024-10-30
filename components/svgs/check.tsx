import React, { type FC } from 'react';
import { Path, Svg } from 'react-native-svg';
import { useTheme } from '@/hooks/useTheme';

interface CheckSVGprops {
  color?: string;
}

const CheckSVG: FC<CheckSVGprops> = ({ color }) => {
  const { theme } = useTheme();
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M7 11.8784C7.94144 12.5631 9.82432 14.4459 10.5946 15.7297C11.536 13.6757 13.9324 9.05405 16.5 7"
        stroke={color ? color : theme.colors.backgroundColor}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default CheckSVG;
