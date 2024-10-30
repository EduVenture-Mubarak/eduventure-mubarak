import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/hooks/useTheme';
import Input from '@/components/form/Input';
import useLoginSchema from '@/schemas/useLoginSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useRouter } from 'expo-router';
import CustomButton from '@/components/form/Button';
import SecondaryText from '@/components/form/seondaryText';
import { useAuth } from '@/hooks/useAuth';
import AuthLayout from '@/components/layouts/auth';
import type { themeType } from '@/types/general';
import FacebookLogin from '@/components/auth/facebook';
import GoogleLogin from '@/components/auth/google';
import type * as z from 'zod';
import Loading from '@/components/loading';
import { useMutation } from '@tanstack/react-query';
import { post } from '@/utils/request';
import InformativeModal from '@/components/informativeModal';
import { useNotification } from '@/hooks/useNotifications';
import Constants from 'expo-constants';

export default function Login() {
  const { t } = useTranslation();
  const { theme, themeValue } = useTheme();
  const styles = getStyles(theme);
  const { updateAuthData } = useAuth();
  const { expoPushToken } = useNotification();

  const loginSchema = useLoginSchema();
  type dataType = z.infer<typeof loginSchema>;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<dataType>({
    resolver: zodResolver(loginSchema), // Use the Zod resolver
  });

  const router = useRouter();

  const onSuccess = async (data: dataType) => {
    Login(data);
  };

  const onFailure = async () => {};

  async function loginUser(data: dataType) {
    const res = await post('/login/email', {
      pushToken: expoPushToken,
      email: data.email,
      password: data.password,
    });

    if (res.status === 'error') {
      throw new Error(t(`errors.${res.eid}`));
    }

    return res;
  }

  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState('');
  function onClose() {
    setIsVisible(false);
  }

  const { mutate: Login, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: (myData) => {
      updateAuthData(myData.token, 'jwt');
      router.replace('/');
    },
    onError: (error) => {
      setError(error.message);
      setIsVisible(true);
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  if (isLoading || isPending) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <>
      <AuthLayout>
        <InformativeModal
          visible={isVisible}
          onClose={onClose}
          head={t('errors.error')}
          description={error}
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
            <Text style={[styles.head, styles.text]}>{t('loginHead')}</Text>

            <View style={styles.form}>
              <Input
                control={control}
                name={'email'}
                errors={errors}
                customErrorPath={'loginSchema.emptyEmail'}
                placeholderPath={'loginSchema.emailPlaceholder'}
              />
              <Input
                control={control}
                name={'password'}
                errors={errors}
                type="password"
                customErrorPath={'loginSchema.password'}
                placeholderPath={'loginSchema.passwordPlaceholder'}
              />
            </View>
            <Link href="/forget-password" style={styles.forget}>
              {t('loginSchema.forgetPassword')}
            </Link>

            <CustomButton
              onClick={() => {
                handleSubmit(onSuccess, onFailure)();
              }}>
              {t('loginSchema.login')}
            </CustomButton>

            <SecondaryText
              first={t('loginSchema.register')}
              second={t('loginSchema.registerLink')}
              href="/signup"
            />

            <View style={styles.social}>
              <FacebookLogin
                setIsLoading={setIsLoading}
                setIsVisible={setIsVisible}
                setError={setError}
              />
              <GoogleLogin
                setIsLoading={setIsLoading}
                setIsVisible={setIsVisible}
                setError={setError}
              />
            </View>
          </ScrollView>
        </View>
      </AuthLayout>
    </>
  );
}

function getStyles(theme: themeType) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    social: {
      marginTop: 16,
      display: 'flex',
      gap: 8,
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

