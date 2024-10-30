import { View, ScrollView, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import Section from '@/components/settings/section';
import SectionItem from '@/components/settings/sectionItem';
import DarkSVG from '@/components/svgs/settings/dark';
import { useTranslation } from 'react-i18next';
import LightSVG from '@/components/svgs/settings/light';
import DeviceSVG from '@/components/svgs/settings/device';
import LanguageSVG from '@/components/svgs/language';
import TranslationSVG from '@/components/svgs/settings/translation';
import SubscriptionsSVG from '@/components/svgs/settings/subscriptions';
import HelpSVG from '@/components/svgs/settings/help';
import IssueSVG from '@/components/svgs/settings/issue';
import PolicySVG from '@/components/svgs/settings/policy';
import TermsSVG from '@/components/svgs/settings/terms';
import LogoutSVG from '@/components/svgs/settings/logout';
import DeleteSVG from '@/components/svgs/settings/delete';
import { useTheme } from '@/hooks/useTheme';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import ConfirmModal from '@/components/confirmModal';
import * as FileSystem from 'expo-file-system';
import type { themeType } from '@/types/general';
import DownloadSVG from '@/components/svgs/settings/download';
import DeleteDownloadsSVG from '@/components/svgs/settings/delete-downloads';
import { post } from '@/utils/request';
import { useNotification } from '@/hooks/useNotifications';
import InformativeModal from '@/components/informativeModal';

export default function settings() {
  const { t } = useTranslation();
  const { theme, setTheme } = useTheme();
  const { clearAuthData, authData } = useAuth();
  const { saveLanguage } = useLanguage();
  const { expoPushToken } = useNotification();
  const router = useRouter();
  const styles = getStyles(theme);
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isDeleteDownloadsModalVisible, setIsDeleteDownloadsModalVisible] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState('');
  function onClose() {
    setIsVisible(false);
  }

  function openLogoutModal() {
    setIsLogoutModalVisible(true);
  }
  function openDeleteModal() {
    setIsDeleteModalVisible(true);
  }
  function openDeleteDownloadsModal() {
    setIsDeleteDownloadsModalVisible(true);
  }
  function closeLogoutModal() {
    setIsLogoutModalVisible(false);
  }
  function closeDeleteModal() {
    setIsDeleteModalVisible(false);
  }
  function closeDeleteDownloadsModal() {
    setIsDeleteDownloadsModalVisible(false);
  }
  async function logoutAction() {
    try {
      setIsLoading(true);
      const res = await post(
        '/logout',
        {
          pushToken: expoPushToken,
        },
        {
          headers: {
            Authorization: `Bearer ${authData.token}`, // Use Bearer token format
          },
        },
      );
      if (res.status === 'error') {
        setError(t(`errors.${res.eid}`));
        setIsVisible(true);
      } else {
        clearAuthData();
      }
    } catch (e) {
      setError(e.message);
      setIsVisible(true);
    } finally {
      setIsLoading(false);
      closeLogoutModal();
    }
  }
  function deleteAction() {
    alert('Deleted');
    closeDeleteModal();
  }

  async function deleteDownloadsAction() {
    try {
      const files = await FileSystem.readDirectoryAsync(
        String(FileSystem.documentDirectory),
      );
      const videoFiles = files.filter((file) => file.endsWith('.mp4')); // Adjust the extension if needed
      if (videoFiles) {
        const deletePromises = videoFiles.map((video) =>
          FileSystem.deleteAsync(`${FileSystem.documentDirectory}${video}`),
        );
        await Promise.all(deletePromises);
      }
    } catch (error) {
      alert('Error deleting all videos');
    }

    closeDeleteDownloadsModal();
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: t('pages.settings'),
          headerShown: true, // This disables the header
        }}
      />

      <InformativeModal
        visible={isVisible}
        onClose={onClose}
        head={t('errors.error')}
        description={error}
      />

      <ConfirmModal
        visible={isLogoutModalVisible}
        onConfirm={logoutAction}
        onCancel={closeLogoutModal}
        head={t('modals.logoutHead')}
        text={t('modals.logout')}
      />
      <ConfirmModal
        visible={isDeleteModalVisible}
        onConfirm={deleteAction}
        onCancel={closeDeleteModal}
        head={t('modals.deleteHead')}
        text={t('modals.delete')}
      />
      <ConfirmModal
        visible={isDeleteDownloadsModalVisible}
        onConfirm={deleteDownloadsAction}
        onCancel={closeDeleteDownloadsModal}
        head={t('modals.deleteDownloadsHead')}
        text={t('modals.deleteDownloads')}
      />

      <View style={styles.container}>
        <ScrollView style={{ paddingVertical: 24 }}>
          <Section head={t('settings.apperance')}>
            <SectionItem
              head={t('settings.dark')}
              onClick={() => setTheme('dark')}>
              <DarkSVG />
            </SectionItem>
            <SectionItem
              head={t('settings.light')}
              onClick={() => setTheme('light')}>
              <LightSVG />
            </SectionItem>
            <SectionItem
              head={t('settings.device')}
              onClick={() => setTheme('device')}>
              <DeviceSVG />
            </SectionItem>
          </Section>

          <Section head={t('settings.language')}>
            <SectionItem
              head={t('settings.en')}
              onClick={() => saveLanguage('en')}>
              <LanguageSVG />
            </SectionItem>
            <SectionItem
              head={t('settings.ar')}
              onClick={() => saveLanguage('ar')}>
              <TranslationSVG />
            </SectionItem>
            <SectionItem
              head={t('settings.device')}
              onClick={() => saveLanguage('device')}>
              <DeviceSVG />
            </SectionItem>
          </Section>

          <Section head={t('settings.downloads')}>
            <SectionItem
              head={t('settings.downloads')}
              onClick={() => router.push('/downloads')}>
              <DownloadSVG />
            </SectionItem>
            <SectionItem
              head={t('settings.deleteDownloads')}
              onClick={() => openDeleteDownloadsModal()}>
              <DeleteDownloadsSVG />
            </SectionItem>
          </Section>

          <Section head={t('settings.account')}>
            <SectionItem
              head={t('settings.subscriptions')}
              onClick={() => router.push('/subscriptions')}>
              <SubscriptionsSVG />
            </SectionItem>
            <SectionItem
              head={t('settings.plans')}
              onClick={() => router.push('/plans')}>
              <SubscriptionsSVG />
            </SectionItem>
          </Section>
          <Section head={t('settings.support')}>
            <SectionItem
              head={t('settings.help')}
              onClick={() => router.push('/help')}>
              <HelpSVG />
            </SectionItem>
            <SectionItem
              head={t('settings.issue')}
              onClick={() => router.push('/issue')}>
              <IssueSVG />
            </SectionItem>
          </Section>
          <Section head={t('settings.about')}>
            <SectionItem
              head={t('settings.terms')}
              onClick={() => router.push('/terms')}>
              <TermsSVG />
            </SectionItem>
            <SectionItem
              head={t('settings.privacy')}
              onClick={() => router.push('/privacy')}>
              <PolicySVG />
            </SectionItem>
          </Section>

          <Section head={t('settings.logout')}>
            <SectionItem
              head={t('settings.logout')}
              onClick={() => openLogoutModal()}>
              <LogoutSVG />
            </SectionItem>
          </Section>

          <Section head={t('settings.delete')}>
            <SectionItem
              head={t('settings.delete')}
              onClick={() => openDeleteModal()}>
              <DeleteSVG />
            </SectionItem>
          </Section>
        </ScrollView>
      </View>
    </>
  );
}

function getStyles(theme: themeType) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.backgroundColor,
    },
  });

  return styles;
}

