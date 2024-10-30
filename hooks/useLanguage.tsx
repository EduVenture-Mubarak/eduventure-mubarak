import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  type FC,
} from 'react';
import { MMKV } from 'react-native-mmkv'; // Import MMKV
import i18n from 'i18next';
import * as Localization from 'expo-localization'; // Import Localization
import { I18nManager } from 'react-native';
import RNRestart from 'react-native-restart'; // For restarting the app
import type { childrenProps } from '@/types/general';

interface LanguageContextReturn {
  language: null | string;
  saveLanguage: (lang: string) => void;
}

// Initialize MMKV storage
import storage from '@/utils/storage';

const LanguageContext = createContext<LanguageContextReturn | undefined>(
  undefined,
);

export const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (context === undefined) {
    throw new Error('useLanguage must be used within a Language Provider');
  }

  return context;
};

// Function to get the device's default language
const getDeviceDefaultLanguage = () => {
  const locales = Localization.getLocales();
  if (locales.length > 0) {
    // Return only the language code (e.g., 'ar')
    return locales[0].languageTag.split('-')[0];
  }
  return 'en'; // Fallback to English if no locale is found
};

export const LanguageProvider: FC<childrenProps> = ({ children }) => {
  const [language, setLanguage] = useState<string | null>(null); // Default language

  // Function to load the language from MMKV
  const loadLanguage = () => {
    try {
      const storedLanguage = storage.getString('language'); // Get from MMKV
      if (storedLanguage) {
        setLanguage(storedLanguage);
        i18n.changeLanguage(storedLanguage); // Change language in i18n
        if (storedLanguage === 'ar') {
          I18nManager.forceRTL(true);
        } else {
          I18nManager.forceRTL(false);
        }
      } else {
        // Get device's default language
        const deviceLanguage = getDeviceDefaultLanguage();
        const finalLanguage =
          deviceLanguage === 'ar' || deviceLanguage === 'en'
            ? deviceLanguage
            : 'en';
        // Set the language both in state and MMKV
        storage.set('language', finalLanguage);
        setLanguage(finalLanguage);
        i18n.changeLanguage(finalLanguage); // Change language in i18n

        // Handle RTL settings
        if (finalLanguage === 'ar') {
          I18nManager.forceRTL(true);
        } else {
          I18nManager.forceRTL(false);
        }
      }
    } catch (error) {
      console.error('Error loading language from MMKV', error);
    }
  };

  // Function to save the language to MMKV and handle RTL
  const saveLanguage = (lang: string) => {
    try {
      let finalLang = lang;

      if (lang === 'device') {
        // Get the device's default language
        const deviceLanguage = Localization.locale; // Example: 'en-US', 'ar-EG'
        const languageCode = deviceLanguage.split('-')[0]; // Extract language code (e.g., 'en', 'ar')

        // If not 'ar' or 'en', default to 'en'
        finalLang =
          languageCode === 'ar' || languageCode === 'en' ? languageCode : 'en';
      }

      storage.set('language', finalLang); // Save to MMKV
      setLanguage(finalLang);
      i18n.changeLanguage(finalLang); // Update i18n language

      // Handle RTL layout for Arabic and restart the app if needed
      const isRTL = I18nManager.isRTL;
      if (finalLang === 'ar' && !isRTL) {
        I18nManager.forceRTL(true);
      } else if (finalLang !== 'ar' && isRTL) {
        I18nManager.forceRTL(false);
      }
      RNRestart.Restart(); // Restart the app to apply the LTR layout
    } catch (error) {
      console.error('Error saving language to MMKV', error);
    }
  };

  useEffect(() => {
    loadLanguage();
  }, []);

  return (
    <LanguageContext.Provider value={{ language, saveLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

