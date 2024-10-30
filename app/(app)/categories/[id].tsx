import { ScrollView, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useTheme } from '@/hooks/useTheme';
import { useTranslation } from 'react-i18next';
import Subject from '@/components/courses/subject';
import type { themeType } from '@/types/general';
import { useAuth } from '@/hooks/useAuth';
import { get } from '@/utils/request';
import { useQuery } from '@tanstack/react-query';
import Loading from '@/components/loading';
import InformativeModal from '@/components/informativeModal';
import TryLater from '@/components/try-later';

export default function category() {
  const params = useLocalSearchParams(); // Extract the dynamic 'id' parameter
  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = getStyles(theme);

  const id = Number(params.id);

  const { authData } = useAuth();

  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  function onClose() {
    setIsVisible(false);
  }

  async function getCourses() {
    try {
      const res = await get(`/categories/${id}/courses`, {
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
    queryKey: ['courses'],
    queryFn: getCourses,
    staleTime: 0,
  });

  if (isPending) {
    return <Loading />;
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: category.name,
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
        {data.courses?.map((course, index) => {
          return (
            <Subject
              course={course}
              type="explore"
              key={course.id}
              index={index}
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
      flex: 1,
      backgroundColor: theme.colors.backgroundColor,
      padding: 32,
    },
  });

  return styles;
}

