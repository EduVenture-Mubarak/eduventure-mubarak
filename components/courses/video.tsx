import React, { useState, useEffect, type FC } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Video } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { useTheme } from '@/hooks/useTheme';
import { useTranslation } from 'react-i18next';
import type { VideoContent, idType, themeType } from '@/types/general';

const { width } = Dimensions.get('window');

interface VideoPageProps {
  courseId: idType;
  videoData: VideoContent;
  onNextVideo: () => void;
  onPreviousVideo: () => void;
  index: number;
  content: VideoContent[];
}

interface Question {
  id: number;
  type: 'single' | 'multiple'; // Define the types of questions
  correctAnswer: string[]; // Assume correctAnswer is an array for multiple-choice
}

interface Quiz {
  questions: Question[];
}

// Define the type for quiz answers
interface QuizAnswers {
  [questionId: number]: {
    selected: string[]; // Allow multiple selected answers
    isCorrect: boolean;
  };
}

// Assuming videoData has the following structure
interface VideoData {
  quiz: Quiz;
}

const VideoPage: FC<VideoPageProps> = ({
  courseId,
  videoData,
  onNextContent,
  onPreviousContent,
  index,
  content,
}) => {
  // alert(`VideoData ${JSON.stringify(videoData)}`);
  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = getStyles(theme);
  const [progress, setProgress] = useState(null);

  const [isDownloaded, setIsDownloaded] = useState<boolean>(false);
  const [downloading, setDownloading] = useState<boolean>(false);
  const [localVideoUri, setLocalVideoUri] = useState<null | string>(null);
  const [activeTab, setActiveTab] = useState<string>('transcript');
  const [quizAnswers, setQuizAnswers] = useState<any>({});
  const [downloadResumable, setDownloadResumable] = useState<any>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  const videoFileName = videoData.video_url.split('/').pop();
  const fileUri = `${FileSystem.documentDirectory}${videoFileName}`;

  useEffect(() => {
    checkIfVideoDownloaded();
  }, [videoData]);

  const checkIfVideoDownloaded = async () => {
    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    if (fileInfo.exists) {
      setIsDownloaded(true);
      setLocalVideoUri(fileUri);
    } else {
      setIsDownloaded(false);
    }
  };

  const downloadVideo = async () => {
    setDownloading(true);
    const downloadResumableInstance = FileSystem.createDownloadResumable(
      videoData.video_url,
      fileUri,
      {},
      (downloadProgress) => {
        const progress =
          downloadProgress.totalBytesWritten /
          downloadProgress.totalBytesExpectedToWrite;
        setProgress(progress * 100);
      },
    );

    setDownloadResumable(downloadResumableInstance);

    try {
      const downloadResult = await downloadResumableInstance.downloadAsync();

      // Check if downloadResult is defined and has a uri property
      if (downloadResult && 'uri' in downloadResult) {
        const { uri } = downloadResult; // Destructure uri from downloadResult
        setLocalVideoUri(uri);
        setIsDownloaded(true);
      } else {
        alert('Download failed: No URI returned');
      }
    } catch (error) {
      alert('Download failed');
    } finally {
      setDownloading(false);
      setProgress(null);
    }
  };

  const cancelDownload = async () => {
    if (downloadResumable) {
      await downloadResumable.pauseAsync();
      setDownloading(false);
    }
  };

  const deleteVideo = async () => {
    await FileSystem.deleteAsync(fileUri);
    setIsDownloaded(false);
  };

  const toggleCompleted = async () => {};

  const renderTabContent = () => {
    if (activeTab === 'transcript') {
      return <Text style={styles.text}>{videoData.transcript}</Text>;
    } else if (activeTab === 'summary') {
      return <Text style={styles.text}>{videoData.summary}</Text>;
    }
  };

  return (
    <>
      <View style={styles.container}>
        <ScrollView>
          <Video
            source={{
              uri: isDownloaded
                ? localVideoUri
                  ? localVideoUri
                  : videoData.video_url
                : videoData.video_url,
            }}
            style={styles.video}
            useNativeControls
          />
          <View style={styles.infoContainer}>
            <Text style={styles.title}>{videoData.name}</Text>
            <Text style={styles.lesson}>{`${t('courses.lesson')} ${
              index + 1
            } ${t('courses.of')} ${content.length}`}</Text>

            {downloading ? (
              <TouchableOpacity
                onPress={cancelDownload}
                style={styles.downloadButton}>
                <Text style={styles.downloadText}>
                  {progress && Number(progress).toFixed(2)} % - [
                  {t('courses.cancelDownload')}]
                </Text>
              </TouchableOpacity>
            ) : isDownloaded ? (
              <TouchableOpacity
                onPress={deleteVideo}
                style={styles.downloadButton}>
                <Text style={styles.downloadText}>
                  {t('courses.deleteDownload')}
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={downloadVideo}
                style={styles.downloadButton}>
                <Text style={styles.downloadText}>{t('courses.download')}</Text>
              </TouchableOpacity>
            )}
          </View>
          <View>
            <TouchableOpacity
              onPress={async () => await toggleCompleted()}
              style={styles.completedButton}>
              <Text style={styles.completedText}>
                {videoData.isCompleted
                  ? t('courses.unmark')
                  : t('courses.mark')}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.tabContainer}>
            <TouchableOpacity
              onPress={() => setActiveTab('transcript')}
              style={
                activeTab === 'transcript' ? styles.activeTab : styles.tab
              }>
              <Text
                style={
                  activeTab === 'transcript'
                    ? styles.activeTabText
                    : styles.tabText
                }>
                {t('courses.transcript')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setActiveTab('summary')}
              style={activeTab === 'summary' ? styles.activeTab : styles.tab}>
              <Text
                style={
                  activeTab === 'summary'
                    ? styles.activeTabText
                    : styles.tabText
                }>
                {t('courses.summary')}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.tabContent}>{renderTabContent()}</View>
        </ScrollView>
      </View>
    </>
  );
};

export default VideoPage;

function getStyles(theme: themeType) {
  const styles = StyleSheet.create({
    downloadButton: {
      backgroundColor: theme.colors.textColor,
      padding: 8,
      borderRadius: 8,
      marginTop: 16,
      marginBottom: 12,
    },
    downloadText: {
      color: theme.colors.backgroundColor,
      textAlign: 'center',
    },
    container: {
      flex: 1,
    },
    video: {
      width: '100%',
      height: 240,
      marginTop: -20,
      marginBottom: 36,
    },
    infoContainer: {
      marginTop: -20,
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.colors.textColor,
    },
    lesson: {
      color: theme.colors.lessons,
    },
    tabContainer: {
      display: 'flex',
      flexDirection: 'row',
      flex: 1,
      marginTop: 16,
    },
    tab: {
      paddingVertical: 10,
      flex: 1,
      borderBottomColor: 'transparent',
      borderBottomWidth: 4,
      borderStyle: 'solid',
    },
    activeTab: {
      flex: 1,
      paddingVertical: 10,
      color: theme.colors.textColor,
      borderBottomColor: theme.colors.textColor,
      borderBottomWidth: 4,
      borderStyle: 'solid',
    },
    tabText: {
      textAlign: 'center',
      color: theme.colors.lessons,
    },
    activeTabText: {
      fontWeight: 'bold',
      fontSize: 16,
      textAlign: 'center',
      color: theme.colors.textColor,
    },
    tabContent: {
      padding: 20,
    },
    quizContainer: {
      marginVertical: 10,
    },
    questionLabel: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    choiceButton: {
      padding: 10,
      marginVertical: 5,
      borderWidth: 1,
      borderColor: theme.colors.lessons,
      borderRadius: 5,
      backgroundColor: theme.colors.questionBackground,
    },
    selectedChoice: {
      backgroundColor: theme.colors.questionChoiceBackground,
    },
    choiceText: {
      fontSize: 14,
      color: theme.colors.textColor,
    },
    navigationButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 20,
    },
    navigation: {
      padding: 8,
      borderRadius: 8,
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: theme.colors.textColor,
    },
    navigationText: {
      color: theme.colors.textColor,
    },
    text: {
      color: theme.colors.textColor,
    },
    completedText: {
      color: theme.colors.textColor,
      textAlign: 'center',
    },
    completedButton: {
      padding: 8,
      borderColor: theme.colors.textColor,
      borderWidth: 1,
      borderRadius: 8,
      marginHorizontal: 20,
    },
  });

  return styles;
}

