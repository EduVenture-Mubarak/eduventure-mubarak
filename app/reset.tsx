import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';

import { useTranslation } from 'react-i18next';
import { useTheme } from '@/hooks/useTheme';
import Input from '@/components/form/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { type FieldErrors, useForm } from 'react-hook-form';
import { useLocalSearchParams, useRouter } from 'expo-router';
import CustomButton from '@/components/form/Button';
import useResetSchema from '@/schemas/useResetSchema';
import AuthLayout from '@/components/layouts/auth';
import type * as z from 'zod';
import type { themeType } from '@/types/general';

export default function Verify() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const resetSchema = useResetSchema();
  type dataType = z.infer<typeof resetSchema>;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<dataType>({
    resolver: zodResolver(resetSchema), // Use the Zod resolver
  });

  const router = useRouter();
  const myRoute = useLocalSearchParams();

  const email = myRoute.email;
  const code = myRoute.code;

  const onSuccess = (data: dataType) => {
    router.push('/login');
  };

  const onFailure = (errors: FieldErrors) => {};

  return (
    <AuthLayout isBack={true} backHref="/forget-password">
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={[styles.head, styles.text]}>{t('resetHead')}</Text>
          <Text style={[styles.description, styles.text]}>
            {t('resetDescription')}
          </Text>

          <View style={styles.form}>
            <Input
              control={control}
              name={'password'}
              errors={errors}
              type="password"
              customErrorPath={'resetSchema.password'}
              placeholderPath={'resetSchema.passwordPlaceholder'}
            />
            <Input
              control={control}
              name={'confirm'}
              errors={errors}
              type="password"
              customErrorPath={'resetSchema.passwordConfirm'}
              placeholderPath={'resetSchema.passwordConfirmPlaceholder'}
            />
          </View>

          <CustomButton
            onClick={() => {
              handleSubmit(onSuccess, onFailure)();
            }}>
            {t('resetSchema.confirm')}
          </CustomButton>
        </ScrollView>
      </View>
    </AuthLayout>
  );
}

function getStyles(theme: themeType) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollContainer: {
      flexGrow: 1,
      justifyContent: 'center',
    },
    imageContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    description: {
      fontSize: 15,
      lineHeight: 22.5,
      textAlign: 'center',
      fontFamily: 'Poppins',
      color: theme.colors.secondaryLink,
    },
    form: {
      marginTop: 48,
      marginBottom: 24,
      gap: 16,
      width: '100%', // Ensure form takes full width
    },
    image: {
      height: 30,
      width: 210,
    },
    text: {
      color: theme.colors.textColor,
    },
    head: {
      fontFamily: 'Poppins600',
      fontSize: 20,
      lineHeight: 30,
      textAlign: 'center',
      marginBottom: 8,
    },
  });

  return styles;
}

