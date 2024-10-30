import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, { type FC } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { Link, useRouter } from 'expo-router';
import SettingsSVG from '../svgs/settings';
import type { childrenType, themeType } from '@/types/general';

interface tabsLayoutProps {
  children: childrenType;
  head: string;
}

const TabsLayout: FC<tabsLayoutProps> = ({ children, head }) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.headContainer}>
          <Text style={styles.head}>{head}</Text>
          <View style={styles.top}>
            {/* <Link href="/chat" style={styles.chat}> */}
            <TouchableOpacity onPress={() => router.push('/chat')}>
              <View style={styles.imageContainer}>
                <Image
                  source={require('@/assets/images/chat.png')}
                  style={styles.image}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/settings')}>
              <SettingsSVG />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          // showsVerticalScrollIndicator={false} // Optional: Hide vertical scroll indicator
        >
          {/* <Link href="/chat"> */}
          {/* </Link> */}
          {children}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

function getStyles(theme: themeType) {
  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 32,
      marginTop: Number(StatusBar.currentHeight),
      paddingTop: Number(StatusBar.currentHeight),
      flex: 1,
      backgroundColor: theme.colors.backgroundColor,
    },
    innerContainer: {
      flex: 1,
    },
    scrollContainer: {
      flexGrow: 1,
      justifyContent: 'flex-start',
    },
    headContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    top: {
      display: 'flex',
      flexDirection: 'row',
      gap: 16,
      alignItems: 'center',
    },
    head: {
      color: theme.colors.textColor,
      fontSize: 24,
      fontFamily: 'Roboto500',
    },
    imageContainer: {
      width: 32,
      height: 32,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      height: 32,
      width: 32,
    },
  });

  return styles;
}

export default TabsLayout;

