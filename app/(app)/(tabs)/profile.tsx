import { View, Text, Image, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import TabsLayout from '@/components/layouts/tabs';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/hooks/useTheme';
import data from '../data';
import AchievementItem from '@/components/courses/achievementItem';
import type { themeType } from '@/types/general';
import { useAuth } from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import InformativeModal from '@/components/informativeModal';
import { get } from '@/utils/request';
import Loading from '@/components/loading';
import TryLater from '@/components/try-later';

export default function profile() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const { authData } = useAuth();

  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  function onClose() {
    setIsVisible(false);
  }

  async function getUser() {
    const res = await get('/profile', {
      headers: {
        Authorization: `Bearer ${authData.token}`, // Use Bearer token format
      },
    });

    if (res.status === 'error') {
      throw new Error(t(`errors.${res.eid}`));
    }

    return res;
  }

  const { isPending, isError, data } = useQuery({
    queryKey: ['userData'],
    queryFn: getUser,
  });

  useEffect(() => {
    if (isError) {
      setError(t('errors.7'));
      setIsVisible(true);
    }
  }, [isError]);

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    return (
      <TabsLayout head={t('tabs.profile')}>
        <InformativeModal
          visible={isVisible}
          onClose={onClose}
          head={t('errors.error')}
          description={error}
        />
        <TryLater />
      </TabsLayout>
    );
  }

  return (
    <TabsLayout head={t('tabs.profile')}>
      <InformativeModal
        visible={isVisible}
        onClose={onClose}
        head={t('errors.error')}
        description={error}
      />

      <View style={styles.profileContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={require('@/assets/images/default.png')}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.email}>{data.email}</Text>
        </View>
      </View>
      <Text style={styles.achievements}>{t('courses.achievements')}</Text>
      <View>
        {data?.achievements?.map((achievement) => {
          return <AchievementItem key={achievement.id} course={achievement} />;
        })}
      </View>
    </TabsLayout>
  );
}

function getStyles(theme: themeType) {
  const styles = StyleSheet.create({
    achievements: {
      color: theme.colors.textColor,
      fontFamily: 'Roboto500',
      fontSize: 16,
      marginBottom: 20,
    },
    imageContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 70,
      height: 70,
    },
    image: {
      height: '100%',
      width: '100%',
    },
    textContainer: {},
    profileContainer: {
      marginTop: 48,
      marginBottom: 40,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
    },
    name: {
      fontFamily: 'RobotoBold',
      fontSize: 16,
      color: theme.colors.textColor,
    },
    email: {
      fontFamily: 'Roboto',
      fontSize: 12,
      color: theme.colors.lessons,
    },
  });

  return styles;
}

