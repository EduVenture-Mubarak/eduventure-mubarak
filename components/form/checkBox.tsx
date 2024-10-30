import React, { type FC } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import CheckSVG from '../svgs/check';
import { useTheme } from '@/hooks/useTheme';
import { Link } from 'expo-router';
import { useTranslation } from 'react-i18next';
import type { themeType } from '@/types/general';

interface agreeCheckBoxProps {
  isChecked: boolean;
  setIsChecked: (isChecked: boolean) => void;
}

const AgreeCheckbox: FC<agreeCheckBoxProps> = ({ isChecked, setIsChecked }) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const { t } = useTranslation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => setIsChecked(!isChecked)}>
      <View style={[styles.checkbox, isChecked && styles.checked]}>
        {isChecked && <CheckSVG />}
      </View>
      <Text style={styles.label}>
        {t('terms.part1')}
        <Link href={'/terms'} style={styles.link}>
          &nbsp;{t('terms.terms')}&nbsp;
        </Link>
        {t('terms.and')}
        <Link href={'/privacy'} style={styles.link}>
          &nbsp;{t('terms.privacy')}
        </Link>
      </Text>
    </TouchableOpacity>
  );
};

export default AgreeCheckbox;

function getStyles(theme: themeType) {
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      marginTop: 16,
      marginBottom: 32,
      // alignItems: '',
    },
    checkbox: {
      height: 20,
      width: 20,
      borderWidth: 2,
      borderColor: theme.colors.textColor,
      marginRight: 8,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4, // Optional: for rounded corners
    },
    checked: {
      backgroundColor: theme.colors.textColor, // Change to desired color when checked
    },
    label: {
      fontSize: 12,
      fontFamily: 'Roboto',
      color: theme.colors.textColor,
    },
    link: {
      color: theme.colors.error,
    },
  });

  return styles;
}

