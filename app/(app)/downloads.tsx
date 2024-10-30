import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/hooks/useTheme';
import * as FileSystem from 'expo-file-system';
import ConfirmModal from '@/components/confirmModal';
import type { themeType } from '@/types/general';

export default function Downloads() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const [videos, setVideos] = useState<string[]>([]);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchDownloadedVideos();
  }, []);

  const fetchDownloadedVideos = async () => {
    try {
      const files = await FileSystem.readDirectoryAsync(
        String(FileSystem.documentDirectory),
      );
      const videoFiles = files.filter((file) => file.endsWith('.mp4')); // Adjust the extension if needed
      setVideos(videoFiles);
    } catch (error) {
      alert('Error fetching downloaded videos');
    }
  };

  const handleVideoSelect = (videoUri: string) => {
    // Navigate to the VideoPlayer screen with the video URI
    router.push(`/videoplayer?videoUri=${encodeURIComponent(videoUri)}`);
  };

  const handleDeleteVideo = (videoUri: string) => {
    setSelectedVideo(videoUri);
    setIsDeleteModalVisible(true); // Show modal instead of alert
  };

  const confirmDeleteVideo = async () => {
    if (selectedVideo) {
      try {
        const fullPath = `${FileSystem.documentDirectory}${selectedVideo}`;
        await FileSystem.deleteAsync(fullPath);
        // Refresh the video list
        fetchDownloadedVideos();
      } catch (error) {
        alert('Error deleting video');
      }
      setSelectedVideo(null);
      setIsDeleteModalVisible(false);
    }
  };

  const closeDeleteModal = () => {
    setIsDeleteModalVisible(false);
    setSelectedVideo(null);
  };

  const renderVideoItem = ({ item }: { item: string }) => (
    <View style={styles.videoItemContainer}>
      <TouchableOpacity
        onPress={() => handleVideoSelect(item)} // Handle video selection
        style={styles.videoItem}>
        <Text style={styles.videoText}>{item}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleDeleteVideo(item)} // Handle video deletion
        style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>{t('delete')}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: t('pages.downloads'),
          headerShown: true,
        }}
      />

      <ConfirmModal
        visible={isDeleteModalVisible}
        onConfirm={confirmDeleteVideo}
        onCancel={closeDeleteModal}
        head={t('modals.deleteVideoHead')}
        text={`${t('modals.deleteVideo')}`}
      />

      <View style={styles.container}>
        {videos.length > 0 ? (
          <FlatList
            data={videos}
            keyExtractor={(item) => item}
            renderItem={renderVideoItem}
            contentContainerStyle={styles.flatListContent}
          />
        ) : (
          <Text style={styles.noVideosText}>{t('courses.noDownloads')}</Text>
        )}
      </View>
    </>
  );
}

function getStyles(theme: themeType) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: theme.colors.backgroundColor,
    },
    videoItemContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 10,
    },
    videoItem: {
      flex: 1,
      padding: 15,
      borderWidth: 1,
      borderColor: theme.colors.textColor,
      borderRadius: 5,
      marginVertical: 5,
      marginRight: 10, // Adjust spacing between video name and delete button
    },
    videoText: {
      color: theme.colors.textColor,
    },
    deleteButton: {
      padding: 10,
      backgroundColor: theme.colors.error,
      borderRadius: 5,
    },
    deleteButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    noVideosText: {
      color: theme.colors.error,
      textAlign: 'center',
      marginTop: 20,
    },
    flatListContent: {
      paddingBottom: 20,
    },
  });

  return styles;
}

