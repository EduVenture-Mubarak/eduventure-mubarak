import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { type FC } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import type { courseType, themeType } from '@/types/general';

interface subjectProps {
  course: courseType;
  type: 'learn' | 'explore';
  index: number;
}

const Subject: FC<subjectProps> = ({ course, type = 'learn', index }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = getStyles(theme, index);
  const router = useRouter();

  function enrollCourse() {
    router.push('/learn');
  }

  function continueLearning(id: string | number) {
    router.push(`/courses/${id}`);
  }

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <View>
          <Text style={styles.courseName}>{course.name}</Text>
          <Text style={styles.grade}>
            {t('courses.grade')}: {course.grade}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={
            type === 'explore'
              ? () => enrollCourse()
              : () => continueLearning(course.id)
          }>
          {type === 'explore' && (
            <Text style={styles.buttonText}>{t('courses.enroll')}</Text>
          )}
          {type === 'learn' && (
            <Text style={styles.buttonText}>{t('courses.continue')}</Text>
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: course.image }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
    </View>
  );
};

function getStyles(theme: themeType, index: number) {
  const styles = StyleSheet.create({
    container: {
      borderRadius: 14,
      padding: 16,
      display: 'flex',
      flexDirection: 'row', // Ensure proper alignment of image and text
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
      backgroundColor:
        index % 2 === 0 ? theme.colors.courses1 : theme.colors.courses2, // Add background color
    },
    textContainer: {
      marginRight: 16, // Space between text and image
    },
    courseName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.colors.textColor,
    },
    grade: {
      fontSize: 14,
      color: theme.colors.textColor,
    },
    button: {
      borderRadius: 9999,
      paddingHorizontal: 32,
      paddingVertical: 8,
      marginTop: 24,
      backgroundColor: theme.colors.textColor,
    },
    buttonText: {
      color: theme.colors.backgroundColor,
      fontFamily: 'Roboto500',
      fontSize: 16,
    },
    imageContainer: {
      width: 124, // Adjust width for better layout
      height: 124, // Set consistent height
      borderRadius: 8,
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: '100%',
    },
  });

  return styles;
}

export default Subject;

