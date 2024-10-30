import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Redirect, Stack } from 'expo-router';
import { useTheme } from '@/hooks/useTheme';
import { useLanguage } from '@/hooks/useLanguage';
import Loading from '@/components/loading';

export default function AppLayout() {
  const { authData, getUserDataFromToken } = useAuth();
  const { theme, themeValue } = useTheme();
  const { language } = useLanguage();

  const user = getUserDataFromToken();

  if (authData.token === 'loading' || !themeValue || !language || !theme) {
    return <Loading />;
  }

  if (user) {
    return (
      <Stack screenOptions={{ headerShown: false }} initialRouteName="learn" />
    );
  }

  return <Redirect href="/login" />;
}

