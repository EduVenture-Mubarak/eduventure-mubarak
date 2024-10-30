import { useTheme } from '@/hooks/useTheme';
import type {
  articleContent,
  onNextContent,
  onPreviousContent,
  themeType,
} from '@/types/general';
import React, { type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface articleProps {
  articleData: articleContent;
  onNextContent: onNextContent;
  onPreviousContent: onPreviousContent;
}

const ArticlePage: FC<articleProps> = ({
  articleData,
  onNextContent,
  onPreviousContent,
}) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const { t } = useTranslation();

  const toggleCompleted = async () => {};

  return (
    <View style={styles.articleContainer}>
      <Text style={styles.articleText}>{articleData.text}</Text>
      <TouchableOpacity
        onPress={async () => await toggleCompleted()}
        style={styles.completedButton}>
        <Text style={styles.completedText}>
          {articleData.isCompleted ? t('courses.unmark') : t('courses.mark')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

function getStyles(theme: themeType) {
  const styles = StyleSheet.create({
    articleContainer: {
      padding: 20,
      backgroundColor: theme.colors.backgroundColor,
      flex: 1,
      justifyContent: 'center',
    },
    articleText: {
      fontSize: 16,
      lineHeight: 24,
      color: theme.colors.textColor,
      marginBottom: 20,
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
      textAlign: 'center',
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

export default ArticlePage;

