// ContentDetail.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useTheme } from '@/hooks/useTheme';
import type { themeType } from '@/types/general';
import CheckSVG from '@/components/svgs/check';
import { useTranslation } from 'react-i18next';

const ContentDetail = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { content, courseId, data } = useLocalSearchParams(); // Retrieve the content parameter
  const courseContent = JSON.parse(content); // Parse the content string back into an object
  const dataContent = JSON.parse(data);
  const styles = getStyles(theme);

  // Function to handle the item click
  const handleItemPress = (index) => {
    router.dismiss();
    router.replace(`/courses/${courseId}?selectedIndex=${index}`); // Adjust the course ID as needed
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: t('pages.content'),
          headerShown: true,
        }}
      />

      <View style={styles.container}>
        <ScrollView>
          {courseContent.map((item, index: number) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => handleItemPress(index)}
              style={styles.itemContainer}>
              {item.id === dataContent.id && (
                <Text style={styles.titleCurrent}>{item.name}</Text>
              )}
              {item.id !== dataContent.id && (
                <Text style={styles.title}>{item.name}</Text>
              )}
              {item.isCompleted && <CheckSVG color={theme.colors.textColor} />}

              {/* Additional content details can be displayed here */}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </>
  );
};

function getStyles(theme: themeType) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: theme.colors.backgroundColor,
    },
    itemContainer: {
      marginBottom: 20,
      flexDirection: 'row',
    },
    title: {
      fontSize: 16,
      color: theme.colors.lessons,
    },
    titleCurrent: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.colors.textColor,
    },
  });
  return styles;
}

export default ContentDetail;

