import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/hooks/useTheme';
import Input from '@/components/form/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { type FieldErrors, useForm } from 'react-hook-form';
import { useLocalSearchParams, useRouter } from 'expo-router';
import CustomButton from '@/components/form/Button';
import useVerifySchema from '@/schemas/useVerifySchema';
import AuthLayout from '@/components/layouts/auth';
import type { themeType } from '@/types/general';
import type * as z from 'zod';

export default function Verify() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = getStyles(theme);

  type dataProps = z.infer<typeof verifySchema>;

  const verifySchema = useVerifySchema();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<dataProps>({
    resolver: zodResolver(verifySchema),
  });

  const router = useRouter();
  const myRoute = useLocalSearchParams();
  const email = String(myRoute.email);

  // Correctly typed onSuccess function
  const onSuccess = (data: dataProps) => {
    router.push(
      `/reset?email=${encodeURIComponent(email)}&code=${encodeURIComponent(
        data.code,
      )}`,
    );
  };

  const onFailure = (errors: FieldErrors) => {
    // Handle errors here
  };

  return (
    <AuthLayout isBack={true} backHref="/forget-password">
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={[styles.head, styles.text]}>{t('verifyHead')}</Text>
          <Text style={[styles.description, styles.text]}>
            {t('verifyDescription')}
          </Text>

          <View style={styles.form}>
            <Input
              control={control}
              name={'code'}
              errors={errors}
              customErrorPath={'verifySchema.emptyCode'}
              placeholderPath={'verifySchema.codePlaceholder'}
            />
          </View>

          <CustomButton
            onClick={handleSubmit(onSuccess, onFailure)} // Directly pass handlers
          >
            {t('verifySchema.verify')}
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
      width: '100%',
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

