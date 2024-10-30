import { ScrollView, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import TabsLayout from '@/components/layouts/tabs';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/hooks/useTheme';
import Subject from '@/components/courses/subject';
import type { themeType } from '@/types/general';
import InformativeModal from '@/components/informativeModal';
import { useAuth } from '@/hooks/useAuth';
import { get } from '@/utils/request';
import { useQuery } from '@tanstack/react-query';
import Loading from '@/components/loading';
import TryLater from '@/components/try-later';

export default function learn() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const { authData } = useAuth();

  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  function onClose() {
    setIsVisible(false);
  }

  async function getLearn() {
    try {
      const res = await get('/learn', {
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
    queryKey: ['learn'],
    queryFn: getLearn,
    staleTime: 0,
  });

  if (isPending) {
    return <Loading />;
  }

  return (
    <TabsLayout head={t('tabs.learn')}>
      <InformativeModal
        visible={isVisible}
        onClose={onClose}
        head={t('errors.error')}
        description={error}
      />

      {error && <TryLater />}

      <ScrollView style={styles.scrollContainer}>
        {data?.courses?.map((subject, index) => {
          return (
            <Subject
              index={index}
              key={subject.id}
              course={subject}
              type="learn"
            />
          );
        })}
      </ScrollView>
    </TabsLayout>
  );
}

function getStyles(theme: themeType) {
  const styles = StyleSheet.create({
    scrollContainer: {
      paddingVertical: 48,
    },
  });

  return styles;
}

