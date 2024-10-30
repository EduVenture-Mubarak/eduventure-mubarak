import { ScrollView, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import Category from '@/components/courses/category';
import { useTheme } from '@/hooks/useTheme';
import type { themeType } from '@/types/general';
import { useAuth } from '@/hooks/useAuth';
import { get } from '@/utils/request';
import { useQuery } from '@tanstack/react-query';
import Loading from '@/components/loading';
import InformativeModal from '@/components/informativeModal';
import TryLater from '@/components/try-later';

export default function categories() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const { authData } = useAuth();

  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  function onClose() {
    setIsVisible(false);
  }

  async function getCategories() {
    try {
      const res = await get('/categories', {
        headers: {
          Authorization: `Bearer ${authData.token}`, // Use Bearer token format
        },
      });

      if (res.status === 'error') {
        setError(t(`errors.${res.eid}`));
        setIsVisible(true);
      }

      return res;
    } catch (e) {
      setError(t('errors.7'));
      setIsVisible(true);
      throw new Error(t('errors.7'));
    }
  }

  const { isPending, data } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  if (isPending) {
    return <Loading />;
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: t('pages.categories'),
          headerShown: true, // This disables the header
        }}
      />
      <InformativeModal
        visible={isVisible}
        onClose={onClose}
        head={t('errors.error')}
        description={error}
      />

      {error && <TryLater />}

      <ScrollView style={styles.scrollContainer}>
        {data.categories.map((category, index) => {
          return (
            <Category index={index} category={category} key={category.id} />
          );
        })}
      </ScrollView>
    </>
  );
}

function getStyles(theme: themeType) {
  const styles = StyleSheet.create({
    scrollContainer: {
      flex: 1,
      padding: 32,
      backgroundColor: theme.colors.backgroundColor,
    },
  });

  return styles;
}

