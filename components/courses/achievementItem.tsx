import { View, Text, StyleSheet } from 'react-native';
import React, { type FC } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { useTranslation } from 'react-i18next';
import type { courseProps, themeType } from '@/types/general';
import { formatDate } from '@/utils/utils';

const AchievementItem: FC<courseProps> = ({ course }) => {
  console.log(course)
  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.name}>{course.achievementName}</Text>
        <Text style={styles.completed}>
          {t('courses.completed')} {formatDate(course.completedOn)}
        </Text>
      </View>
      <Text style={styles.degree}>{course.degree || '0%'}</Text>
    </View>
  );
};

function getStyles(theme: themeType) {
  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 12,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: theme.colors.textColor,
      borderStyle: 'solid',
      marginBottom: 20,
    },
    name: {
      color: theme.colors.textColor,
      fontFamily: 'Roboto500',
      fontSize: 14,
    },
    completed: {
      color: theme.colors.lessons,
      fontFamily: 'Roboto',
      fontSize: 12,
    },
    degree: {
      fontFamily: 'RobotoBold',
      fontSize: 24,
      color: theme.colors.textColor,
    },
  });

  return styles;
}

export default AchievementItem;

