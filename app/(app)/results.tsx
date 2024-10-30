import { StyleSheet, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/hooks/useTheme';
import Subject from '@/components/courses/subject';
import type { themeType } from '@/types/general';
import Loading from '@/components/loading';
import { get } from '@/utils/request';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import InformativeModal from '@/components/informativeModal';

export default function results() {
  const params = useLocalSearchParams();
  const query = params.query;
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const { authData } = useAuth();

  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  function onClose() {
    setIsVisible(false);
  }

  async function getSearch() {
    try {
      const res = await get(`/search?query=${query}`, {
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

  const { isPending, isSuccess, isError, data } = useQuery({
    queryKey: ['search'],
    queryFn: getSearch,
  });

  if (isPending) {
    return <Loading />;
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: t('courses.searchResults'),
          headerShown: true, // This disables the header
        }}
      />

      <InformativeModal
        visible={isVisible}
        onClose={onClose}
        head={t('errors.error')}
        description={error}
      />

      <ScrollView style={styles.scrollContainer}>
        {data.courses?.map((subject, index) => {
          return (
            <Subject
              index={index}
              key={subject.id}
              course={subject}
              type="explore"
            />
          );
        })}
      </ScrollView>
    </>
  );
}

function getStyles(theme: themeType) {
  const styles = StyleSheet.create({
    scrollContainer: {
      padding: 32,
      flex: 1,
      backgroundColor: theme.colors.backgroundColor,
    },
  });

  return styles;
}

