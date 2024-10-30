import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  type FC,
} from 'react';
import { lightTheme, darkTheme } from '../styles/themes'; // Adjust the path accordingly
import { Appearance } from 'react-native'; // Import Appearance to get the device's theme
import type { childrenProps } from '@/types/general';

// Create an instance of MMKV
import storage from '@/utils/storage';

interface themeContextReturn {
  theme: any;
  themeValue: string | null;
  setTheme: (themeValue: string) => void;
}

const ThemeContext = createContext<themeContextReturn | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a Theme Provider');
  }

  return context;
};

export const ThemeProvider: FC<childrenProps> = ({ children }) => {
  const [theme, setThemeState] = useState<any | null>(null); // Set default theme
  const [themeValue, setThemeValue] = useState<string | null>(null); // State to hold theme value as text

  // Function to load the theme from MMKV
  const loadTheme = () => {
    try {
      const savedTheme = storage.getString('theme');
      if (savedTheme) {
        setThemeValue(savedTheme); // Update theme value as text
        setThemeState(savedTheme === 'dark' ? darkTheme : lightTheme);
      } else {
        // No saved theme, set to device's initial theme
        const initialTheme = Appearance.getColorScheme(); // 'dark' or 'light'
        const newTheme = initialTheme === 'dark' ? darkTheme : lightTheme;
        storage.set('theme', initialTheme || 'light'); // Store initial theme
        setThemeValue(initialTheme || 'light'); // Update theme value as text
        setThemeState(newTheme);
      }
    } catch (error) {
      console.error('Error loading theme from MMKV', error);
    }
  };

  // Function to save the selected theme to MMKV and update the state
  const saveTheme = (themeValue: string) => {
    try {
      storage.set('theme', themeValue);
      // Update the theme state based on the saved theme value
      const newTheme = themeValue === 'dark' ? darkTheme : lightTheme;
      setThemeValue(themeValue); // Update theme value as text
      setThemeState(newTheme); // Update the state
    } catch (error) {
      console.error('Error saving theme to MMKV', error);
    }
  };

  // Load theme on component mount
  useEffect(() => {
    loadTheme();
  }, []);

  // Function to set the theme in MMKV
  const setTheme = (themeValue: string) => {
    try {
      let finalThemeValue = themeValue;

      if (themeValue === 'device') {
        // Get the theme from the device settings
        const colorScheme = Appearance.getColorScheme();
        finalThemeValue = colorScheme === 'dark' ? 'dark' : 'light';
      }

      if (finalThemeValue === 'dark' || finalThemeValue === 'light') {
        saveTheme(finalThemeValue); // Save theme to MMKV
      } else {
        console.error('Invalid theme selected');
      }
    } catch (error) {
      console.error('Error setting theme:', error);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, themeValue, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

