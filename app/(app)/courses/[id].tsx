import {
  View,
  StyleSheet,
  BackHandler,
  TouchableOpacity,
  Text,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useTheme } from '@/hooks/useTheme';
import { useTranslation } from 'react-i18next';
import data from '../data';
import VideoPage from '@/components/courses/video';
import QuizPage from '@/components/courses/quiz';
import ArticlePage from '@/components/courses/article';
import type { themeType } from '@/types/general';
import DropdownMenu from '@/components/courses/navigator';
import CertificatePage from '@/components/courses/certificate';

export default function Course() {
  const params = useLocalSearchParams();
  const id = params.id; // Get course ID from params
  const selectedIndexParam = params.selectedIndex; // Get selected index from params
  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = getStyles(theme);
  const course = data[0].courses[0]; // Assuming there's only one course
  const content = course.content;

  // Determine the first incomplete content index
  const getFirstIncompleteContentIndex = () => {
    const index = content.findIndex((item) => !item.isCompleted);
    return index === -1 ? content.length - 1 : index;
  };

  const [currentIndex, setCurrentIndex] = useState(
    selectedIndexParam !== undefined
      ? parseInt(selectedIndexParam)
      : getFirstIncompleteContentIndex(),
  );

  const [quizStarted, setQuizStarted] = useState(false); // Track if the quiz has started

  const handleNextContent = () => {
    if (currentIndex < content.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePreviousContent = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Handle content selection from the sliding navigation
  const handleSelectContent = (index) => {
    setCurrentIndex(index);
  };

  const renderContent = () => {
    const currentContent = content[currentIndex]; // Get current content
    switch (currentContent.contentType) {
      case 'video':
        return (
          <>
            <VideoPage
              courseId={course.id}
              videoData={currentContent}
              onNextContent={handleNextContent}
              onPreviousContent={handlePreviousContent}
              index={currentIndex}
              content={content}
            />
            <View style={styles.navigationButtons}>
              <TouchableOpacity
                onPress={handlePreviousContent}
                style={styles.navigation}>
                <Text style={styles.navigationText}>
                  {t('courses.previous')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleNextContent}
                style={styles.navigation}>
                <Text style={styles.navigationText}>{t('courses.next')}</Text>
              </TouchableOpacity>
            </View>
          </>
        );
      case 'quiz':
        return (
          <>
            <QuizPage
              courseId={course.id}
              quizData={currentContent}
              onPreviousContent={handlePreviousContent}
              onNextContent={handleNextContent}
              setQuizStarted={setQuizStarted} // Pass the setter to update quiz state
            />
            {!quizStarted && (
              <View style={styles.navigationButtons}>
                <TouchableOpacity
                  onPress={handlePreviousContent}
                  style={styles.navigation}>
                  <Text style={styles.navigationText}>
                    {t('courses.previous')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleNextContent}
                  style={styles.navigation}>
                  <Text style={styles.navigationText}>{t('courses.next')}</Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        );
      case 'article':
        return (
          <>
            <ArticlePage
              courseId={course.id}
              articleData={currentContent}
              onNextContent={handleNextContent}
              onPreviousContent={handlePreviousContent}
            />
            <View style={styles.navigationButtons}>
              <TouchableOpacity
                onPress={handlePreviousContent}
                style={styles.navigation}>
                <Text style={styles.navigationText}>
                  {t('courses.previous')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleNextContent}
                style={styles.navigation}>
                <Text style={styles.navigationText}>{t('courses.next')}</Text>
              </TouchableOpacity>
            </View>
          </>
        );
      case 'certificate':
        return (
          <>
            <CertificatePage
              courseId={course.id}
              certificateData={currentContent}
              courseContent={content}
              onNextContent={handleNextContent}
              onPreviousContent={handlePreviousContent}
            />
            <View style={styles.navigationButtons}>
              <TouchableOpacity
                onPress={handlePreviousContent}
                style={styles.navigation}>
                <Text style={styles.navigationText}>
                  {t('courses.previous')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleNextContent}
                style={styles.navigation}>
                <Text style={styles.navigationText}>{t('courses.next')}</Text>
              </TouchableOpacity>
            </View>
          </>
        );

      default:
        return null;
    }
  };

  const currentContent = content[currentIndex]; // Define currentContent outside renderContent
  // alert(`CONTENT IS: ${JSON.stringify(currentContent)}`);

  // Handle hardware back button press
  useEffect(() => {
    const backAction = () => {
      if (quizStarted) {
        // Prevent back action when quiz is started
        return true; // Returning true prevents the default behavior
      }
      return false; // Allow the default back behavior
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove(); // Cleanup the listener on unmount
  }, [quizStarted]);

  return (
    <>
      <Stack.Screen
        options={{
          title: course.name,
          headerShown: !quizStarted, // Hide header if quiz is started
          headerRight: !quizStarted // Hide headerRight if quiz is started
            ? () => (
                <DropdownMenu
                  courseContent={content}
                  courseId={course.id}
                  data={currentContent}
                />
              )
            : undefined,
          gestureEnabled: !quizStarted, // Disable back gesture if quiz is started
        }}
      />
      <View style={styles.container}>{renderContent()}</View>
    </>
  );
}

function getStyles(theme: themeType) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.backgroundColor,
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
  });
}

