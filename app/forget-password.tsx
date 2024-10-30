import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/hooks/useTheme';
import Input from '@/components/form/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { type FieldErrors, useForm } from 'react-hook-form';
import { useRouter } from 'expo-router';
import CustomButton from '@/components/form/Button';
import SecondaryText from '@/components/form/seondaryText';
import useForgetSchema from '@/schemas/useForgetPasswordSchema';
import AuthLayout from '@/components/layouts/auth';
import type { themeType } from '@/types/general';
import type * as z from 'zod';

export default function Forget() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const forgetSchema = useForgetSchema();
  type dataType = z.infer<typeof forgetSchema>;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<dataType>({
    resolver: zodResolver(forgetSchema), // Use the Zod resolver
  });
  const router = useRouter();

  const onSuccess = (data: dataType) => {
    router.push(`/verify?email=${encodeURIComponent(data.email)}`);
  };

  const onFailure = (errors: FieldErrors) => {};

  return (
    <AuthLayout isBack={true} backHref="/login">
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          // showsVerticalScrollIndicator={false} // Optional: Hide vertical scroll indicator
        >
          <Text style={[styles.head, styles.text]}>{t('forgetHead')}</Text>
          <Text style={[styles.description, styles.text]}>
            {t('forgetDescription')}
          </Text>

          <View style={styles.form}>
            <Input
              control={control}
              name={'email'}
              errors={errors}
              customErrorPath={'forgetSchema.emptyEmail'}
              placeholderPath={'forgetSchema.emailPlaceholder'}
            />
          </View>

          <CustomButton
            onClick={() => {
              handleSubmit(onSuccess, onFailure)();
            }}>
            {t('forgetSchema.send')}
          </CustomButton>

          <SecondaryText
            first={t('forgetSchema.login')}
            second={t('forgetSchema.loginHref')}
            href="/login"
          />
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

