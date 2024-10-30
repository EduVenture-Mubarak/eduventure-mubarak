import React from 'react';
import { Tabs } from 'expo-router';
import { useTheme } from '@/hooks/useTheme';
import LearnSVG from '@/components/svgs/tabs/learn';
import SearchSVG from '@/components/svgs/tabs/search';
import ProfileSVG from '@/components/svgs/tabs/profile';
import { useTranslation } from 'react-i18next';
import ExploreSVG from '@/components/svgs/tabs/explore';

export default function TabsLayout() {
  const { theme } = useTheme();
  const { t } = useTranslation();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.selectedTab,
        tabBarInactiveTintColor: theme.colors.notSelectedTab,
        tabBarStyle: { backgroundColor: theme.colors.tabBackgroundColor },
        headerShown: false,
      }}>
      <Tabs.Screen
        name="explore"
        options={{
          title: t('tabs.explore'),
          tabBarIcon: ({ color, focused }) => (
            <ExploreSVG focused={focused} /> // Custom color for Explore tab
          ),
        }}
      />
      <Tabs.Screen
        name="learn"
        options={{
          title: t('tabs.learn'),
          tabBarIcon: ({ color, focused }) => <LearnSVG focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: t('tabs.search'),
          tabBarIcon: ({ color, focused }) => <SearchSVG focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t('tabs.profile'),
          tabBarIcon: ({ color, focused }) => <ProfileSVG focused={focused} />,
        }}
      />
    </Tabs>
  );
}

