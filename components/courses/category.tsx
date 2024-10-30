import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { type FC } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import type { categoryProps, themeType } from '@/types/general';

const Category: FC<categoryProps> = ({ category, index }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = getStyles(theme, index);
  const router = useRouter();

  return (
    <TouchableOpacity onPress={() => router.push(`/categories/${category.id}`)}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: category.image || 'https://picsum.photos/200' }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.name}>{category.name}</Text>
          <Text style={[styles.gray, styles.lessons]}>
            {category.numberOfCourses} {t('courses.lessons')}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

function getStyles(theme: themeType, index: number) {
  const styles = StyleSheet.create({
    gray: {
      color: theme.colors.lessons,
    },
    container: {
      flexDirection: 'row',
      marginBottom: 24, // Reduced margin for better spacing
      borderRadius: 8,
      backgroundColor:
        index % 2 === 0 ? theme.colors.courses1 : theme.colors.courses2,
      alignItems: 'center',
      maxHeight: 100,
    },
    imageContainer: {
      width: 124,
      height: '100%', // Fixed height to prevent layout issues
      borderRadius: 8,
      overflow: 'hidden',
      marginRight: 16, // Adjust margin to replace the gap
    },
    image: {
      width: '100%',
      height: '100%',
    },
    textContainer: {
      flex: 1,
      paddingRight: 16,
    },
    name: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.colors.textColor,
      marginBottom: 8,
    },
    lessons: {
      fontSize: 14,
      color: theme.colors.lessons,
      marginBottom: 8,
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    rating: {
      marginLeft: 4, // Adjust spacing between star and rating text
      fontSize: 14,
    },
    bottomContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 8,
    },
    total: {
      fontSize: 14,
      color: theme.colors.lessons,
    },
  });

  return styles;
}

export default Category;

