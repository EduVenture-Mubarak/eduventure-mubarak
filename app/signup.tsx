import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';
import { useTheme } from '@/hooks/useTheme';
import Input from '@/components/form/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'expo-router';
import CustomButton from '@/components/form/Button';
import SecondaryText from '@/components/form/seondaryText';
import AgreeCheckbox from '@/components/form/checkBox';
import useSignupSchema from '@/schemas/useSignupSchema';
import AuthLayout from '@/components/layouts/auth';
import type { themeType } from '@/types/general';
import type * as z from 'zod';
import { post } from '@/utils/request';
import { useMutation } from '@tanstack/react-query';
import InformativeModal from '@/components/informativeModal';
import Loading from '@/components/loading';

export default function signup() {
  const { t } = useTranslation();
  const { theme, themeValue } = useTheme();
  const styles = getStyles(theme);
  const router = useRouter();

  const signupSchema = useSignupSchema();
  type dataType = z.infer<typeof signupSchema>;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema), // Use the Zod resolver
  });

  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);
  function onClose() {
    setIsVisible(false);
  }
  function onCloseSuccess() {
    setIsSuccessVisible(false);
  }

  const [isChecked, setIsChecked] = useState(false);

  const onSuccess = (data) => {
    Signup(data);
  };

  const onFailure = (errors) => {};

  async function signupUser(data: dataType) {
    const res = await post('/signup', {
      name: data.name,
      email: data.email,
      password: data.password,
    });

    if (res.status === 'error') {
      throw new Error(t(`errors.${res.eid}`));
    }
  }

  const { mutate: Signup, isPending } = useMutation({
    mutationFn: signupUser,
    onSuccess: () => {
      setIsSuccessVisible(true);
      // router.replace('/login');
    },
    onError: (error) => {
      setError(error.message);
      setIsVisible(true);
    },
  });

  if (isPending) {
    return <Loading />;
  }

  return (
    <AuthLayout>
      <InformativeModal
        visible={isVisible}
        onClose={onClose}
        head={t('errors.error')}
        description={error}
      />

      <InformativeModal
        visible={isSuccessVisible}
        onClose={onCloseSuccess}
        head={t('success.success')}
        description={t('success.account')}
      />

      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={
                themeValue === 'light'
                  ? require('@/assets/images/logo-image.png')
                  : require('@/assets/images/logo-image2.png')
              }
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          <Text style={[styles.head, styles.text]}>{t('signupHead')}</Text>

          <View style={styles.form}>
            <Input
              control={control}
              name={'name'}
              errors={errors}
              customErrorPath={'signupSchema.name'}
              placeholderPath={'signupSchema.namePlaceholder'}
            />

            <Input
              control={control}
              name={'email'}
              errors={errors}
              customErrorPath={'signupSchema.emptyEmail'}
              placeholderPath={'signupSchema.emailPlaceholder'}
            />
            <Input
              control={control}
              name={'password'}
              errors={errors}
              type="password"
              customErrorPath={'signupSchema.password'}
              placeholderPath={'signupSchema.passwordPlaceholder'}
            />
          </View>
          <AgreeCheckbox isChecked={isChecked} setIsChecked={setIsChecked} />

          <CustomButton
            onClick={() => {
              handleSubmit(onSuccess, onFailure)();
            }}
            disabled={!isChecked}>
            {t('signupSchema.signup')}
          </CustomButton>

          <SecondaryText
            first={t('signupSchema.login')}
            second={t('signupSchema.loginLink')}
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
    forget: {
      fontFamily: 'Roboto500',
      fontSize: 11,
      lineHeight: 16,
      letterSpacing: 0.5,
      color: theme.colors.textColor,
      textAlign: 'right',
      marginTop: 12,
      marginBottom: 20,
    },
    form: {
      marginTop: 48,
      gap: 16,
      width: '100%', // Ensure form takes full width
    },
    image: {
      height: 100,
      width: 210,
    },
    text: {
      color: theme.colors.textColor,
    },
    head: {
      fontFamily: 'Rambla',
      fontSize: 16,
      lineHeight: 24,
      letterSpacing: 0.5,
      textAlign: 'center',
      marginTop: 16,
    },
  });

  return styles;
}

