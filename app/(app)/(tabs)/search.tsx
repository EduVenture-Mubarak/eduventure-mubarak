import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import TabsLayout from '@/components/layouts/tabs';
import { useTranslation } from 'react-i18next';
import SearchInput from '@/components/courses/searchInput';
import { useTheme } from '@/hooks/useTheme';
import SearchItem from '@/components/courses/searchItem';
import type { themeType } from '@/types/general';
import { useAuth } from '@/hooks/useAuth';
import { get } from '@/utils/request';
import { useQuery } from '@tanstack/react-query';
import Loading from '@/components/loading';
import InformativeModal from '@/components/informativeModal';

export default function search() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const { authData } = useAuth();

  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  function onClose() {
    setIsVisible(false);
  }

  async function getPopularSearches() {
    try {
      const res = await get('/popular-searches', {
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
    queryKey: ['popularSearches'],
    queryFn: getPopularSearches,
  });

  if (isPending) {
    return <Loading />;
  }

  return (
    <TabsLayout head={t('tabs.search')}>
      <InformativeModal
        visible={isVisible}
        onClose={onClose}
        head={t('errors.error')}
        description={error}
      />

      <View style={styles.searchContainer}>
        <SearchInput />
      </View>
      <Text style={styles.head}>{t('courses.popularSearches')}</Text>
      {data?.queries && (
        <View style={styles.searchSection}>
          {data?.queries.map((query, index) => {
            return (
              <>
                <SearchItem key={query.searchTerm} query={query.searchTerm} />
              </>
            );
          })}
        </View>
      )}
    </TabsLayout>
  );
}

function getStyles(theme: themeType) {
  const styles = StyleSheet.create({
    searchContainer: {
      marginTop: 48,
    },
    head: {
      fontFamily: 'RobotoBold',
      fontSize: 16,
      color: theme.colors.textColor,
      marginBottom: 16,
      marginTop: 40,
    },
    searchSection: {
      display: 'flex',
      gap: 16,
    },
  });

  return styles;
}

