import {
  View,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, { type FC, useState } from 'react';
import SelectionModal from '@/components/selectionModal';
import { useTheme } from '@/hooks/useTheme';
import { useLanguage } from '@/hooks/useLanguage';
import { useTranslation } from 'react-i18next';
import ThemeSVG from '@/components/svgs/theme';
import LanguageSVG from '@/components/svgs/language';
import BackSVG from '@/components/svgs/back';
import { Link } from 'expo-router';
import type { childrenType, themeType } from '@/types/general';
import type { Href } from 'expo-router';
import InformativeModal from '../informativeModal';

interface authLayoutProps {
  children: childrenType;
  isBack?: boolean;
  backHref?: string;
}

const AuthLayout: FC<authLayoutProps> = ({
  children,
  isBack = false,
  backHref = '',
}) => {
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isThemeSelectedOpen, setIsThemeSelectedOpen] = useState(false);
  const [isLanguageSelectedOpen, setIsLanguageSelectedOpen] = useState(false);
  const typedBackHref = backHref as Href<string>;

  const { theme, setTheme, themeValue } = useTheme();
  const { saveLanguage, language } = useLanguage();

  const styles = getStyles(theme);

  const handleThemeChoiceSelect = (choice: string) => {
    setIsThemeSelectedOpen(true);
    setIsThemeOpen(false);
    setTheme(choice);
  };

  const handleLanguageChoiceSelect = (choice: string) => {
    setIsLanguageSelectedOpen(true);
    setIsLanguageOpen(false);
    saveLanguage(choice);
  };
  const { t, i18n } = useTranslation();

  const themeChoices = [
    {
      label: t('modals.light'),
      onSelect: () => handleThemeChoiceSelect('light'),
    },
    {
      label: t('modals.dark'),
      onSelect: () => handleThemeChoiceSelect('dark'),
    },
    {
      label: t('modals.device'),
      onSelect: () => handleThemeChoiceSelect('device'),
    },
  ];

  const languagesChoices = [
    {
      label: t('modals.english'),
      onSelect: () => handleLanguageChoiceSelect('en'),
    },
    {
      label: t('modals.arabic'),
      onSelect: () => handleLanguageChoiceSelect('ar'),
    },
    {
      label: t('modals.device'),
      onSelect: () => handleLanguageChoiceSelect('device'),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        {isBack && (
          <Link href={typedBackHref}>
            <BackSVG />
          </Link>
        )}

        <View
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 10,
            marginLeft: 'auto',
            flexDirection: 'row',
          }}>
          <TouchableOpacity onPress={() => setIsThemeOpen((old) => !old)}>
            <ThemeSVG />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsLanguageOpen((old) => !old)}>
            <LanguageSVG />
          </TouchableOpacity>
        </View>
      </View>

      <SelectionModal
        isVisible={isThemeOpen}
        onClose={() => setIsThemeOpen(false)}
        title={t('modals.theme')}
        choices={themeChoices} // Pass the choices as props
      />

      <SelectionModal
        isVisible={isLanguageOpen}
        onClose={() => setIsLanguageOpen(false)}
        title={t('modals.language')}
        choices={languagesChoices} // Pass the choices as props
      />

      <InformativeModal
        visible={isThemeSelectedOpen}
        onClose={() => setIsThemeSelectedOpen(false)}
        head={t('modals.selectedTheme')}
        description={t(`settings.${themeValue}`)}
      />

      <InformativeModal
        visible={isLanguageSelectedOpen}
        onClose={() => setIsLanguageSelectedOpen(false)}
        head={t('modals.selectedLanguage')}
        description={t(`settings.${language}`)}
      />

      {children}
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
    button: {
      backgroundColor: '#007BFF',
      padding: 10,
      borderRadius: 5,
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 16,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    modalContent: {
      width: 300,
      backgroundColor: '#FFFFFF',
      borderRadius: 10,
      padding: 20,
      alignItems: 'center',
    },
    modalTitle: {
      fontSize: 20,
      marginBottom: 20,
    },
    choice: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      width: '100%', // Make the choice button full width
    },
    closeButton: {
      marginTop: 15,
      padding: 10,
      backgroundColor: '#FF5733', // Close button color
      borderRadius: 5,
    },
    closeButtonText: {
      color: '#FFFFFF',
    },
  });
  return styles;
}

export default AuthLayout;

