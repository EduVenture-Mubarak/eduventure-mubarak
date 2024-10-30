import ar from '@/locales/ar';
import en from '@/locales/en';
import { MMKV } from 'react-native-mmkv'; // Import MMKV
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Create an instance of MMKV
import storage from './storage';

// Define translation resources
const resources = {
  en: en,
  ar: ar,
};

// Initialize i18n
export const initializeI18n = async () => {
  try {
    const storedLanguage = storage.getString('language'); // Use MMKV to get the stored language
    await i18n.use(initReactI18next).init({
      compatibilityJSON: 'v3',
      resources,
      lng: storedLanguage || 'en', // Set the language from MMKV or default to 'en'
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false, // React already protects from XSS
      },
    });
  } catch (error) {
    console.error('Error initializing i18n:', error);
  }
};

export default i18n;

