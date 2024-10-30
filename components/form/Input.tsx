import { View, Text, TextInput, StyleSheet } from 'react-native';
import React, { type FC } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { type Control, Controller, type FieldErrors } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { getErrorStyle } from '@/styles/gloabls';
import type { themeType } from '@/types/general';

interface inputProps {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  control: Control<any>; // Replace 'any' with the specific form type if available
  name: string;
  errors: FieldErrors;
  customErrorPath: string;
  placeholderPath: string;
  type?: string;
}

const Input: FC<inputProps> = ({
  control,
  name,
  errors,
  customErrorPath,
  placeholderPath,
  type = 'text',
}) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = getStyles(theme);

  return (
    <>
      <View style={styles.inputView}>
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry={type === 'password'}
              placeholder={t(placeholderPath)}
              placeholderTextColor={theme.colors.placeholderColor}
            />
          )}
        />
        {errors[name] && (
          <Text style={getErrorStyle(theme)}>
            {errors[name]?.message === 'Required'
              ? `* ${t(customErrorPath)}`
              : `* ${errors[name]?.message}`}
          </Text>
        )}
      </View>
    </>
  );
};

function getStyles(theme: themeType) {
  const styles = StyleSheet.create({
    inputView: {
      display: 'flex',
      gap: 4,
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 16,
      backgroundColor: '#f0f0f0',
    },
    label: {
      marginBottom: 8,
      fontSize: 18,
    },
    input: {
      height: 56,
      borderColor: theme.colors.textColor,
      borderWidth: 1,
      borderRadius: 4,
      paddingHorizontal: 16,
      color: theme.colors.textColor,
    },
    result: {
      marginTop: 16,
      fontSize: 16,
      color: '#333',
    },
  });

  return styles;
}

export default Input;

