import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import TabsLayout from '@/components/layouts/tabs';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/hooks/useTheme';
import Category from '@/components/courses/category';
import type { themeType } from '@/types/general';
import { get } from '@/utils/request';
import { useQuery } from '@tanstack/react-query';
import Loading from '@/components/loading';
import InformativeModal from '@/components/informativeModal';
import TryLater from '@/components/try-later';

export default function index() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const router = useRouter();

  const styles = getStyles(theme);

  const { authData } = useAuth();

  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  function onClose() {
    setIsVisible(false);
  }

  async function getExplore() {
    try {
      const res = await get('/explore', {
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
    queryKey: ['explore'],
    queryFn: getExplore,
  });

  if (isPending) {
    return <Loading />;
  }

  return (
    <>
      <TabsLayout head={t('tabs.explore')}>
        <InformativeModal
          visible={isVisible}
          onClose={onClose}
          head={t('errors.error')}
          description={error}
        />

        <View style={styles.guidedContainer}>
          <Text style={styles.text}>{t('explore.guided')}</Text>
          <TouchableOpacity onPress={() => router.push('/categories')}>
            <Text style={styles.text}>{t('explore.all')}</Text>
          </TouchableOpacity>
        </View>
        {error && <TryLater />}

        <ScrollView style={styles.scrollContainer}>
          {data?.categories?.map((category, index) => {
            return (
              <Category category={category} key={category.id} index={index} />
            );
          })}
        </ScrollView>
      </TabsLayout>
    </>
  );
}

function getStyles(theme: themeType) {
  const styles = StyleSheet.create({
    guidedContainer: {
      marginTop: 48,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 40,
    },
    scrollContainer: {
      flex: 1,
    },
    head: {
      color: theme.colors.textColor,
      fontFamily: 'Roboto500',
      fontSize: 16,
    },
    text: {
      color: theme.colors.textColor,
    },
  });

  return styles;
}

