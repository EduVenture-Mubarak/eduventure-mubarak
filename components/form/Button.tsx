import { Text, Pressable, StyleSheet } from 'react-native';
import React, { type FC } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { Link } from 'expo-router';
import type { Href } from 'expo-router';
import type { childrenType, themeType } from '@/types/general';

interface customButtonProps {
  children: childrenType;
  type?: 'button' | 'link';
  href?: string;
  onClick: () => void;
  disabled?: boolean;
}

const CustomButton: FC<customButtonProps> = ({
  children,
  type = 'button',
  href = '/',
  onClick = () => {},
  disabled = false,
}) => {
  const { theme } = useTheme();
  const typedHref = href as Href<string>;
  const styles = getStyles(disabled, theme);
  if (type === 'link') {
    return (
      <Link href={typedHref} style={styles.button}>
        <Text style={styles.text}>{children}</Text>
      </Link>
    );
  }
  return (
    <Pressable
      style={styles.button}
      disabled={disabled}
      onPress={() => onClick()}>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

function getStyles(disabled: boolean, theme: themeType) {
  const styles = StyleSheet.create({
    button: {
      height: 45,
      backgroundColor: disabled
        ? theme.colors.disabledButton
        : theme.colors.textColor,
      color: theme.colors.backgroundColor,
      textAlign: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 3,
      // paddingVertical: 16,
    },
    text: {
      fontFamily: 'Roboto500',
      fontSize: 15,
      lineHeight: 24,
      letterSpacing: 0.5,
      color: disabled
        ? theme.colors.disabledButtonText
        : theme.colors.backgroundColor,
    },
  });

  return styles;
}

export default CustomButton;

