import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import all translation files
import enTranslation from './locales/en/translation.json';
import teTranslation from './locales/te/translation.json';
import hiTranslation from './locales/hi/translation.json';
import taTranslation from './locales/ta/translation.json';
import knTranslation from './locales/kn/translation.json';

// Available languages
const AVAILABLE_LANGUAGES = ['en', 'te', 'hi', 'ta', 'kn'];
const DEFAULT_LANGUAGE = 'en';

// Get saved language from localStorage or use default
const getSavedLanguage = () => {
  const savedLang = localStorage.getItem('language');
  // If saved language is available in our list, use it; otherwise use default
  return savedLang && AVAILABLE_LANGUAGES.includes(savedLang) ? savedLang : DEFAULT_LANGUAGE;
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      te: { translation: teTranslation },
      hi: { translation: hiTranslation },
      ta: { translation: taTranslation },
      kn: { translation: knTranslation },
    },
    lng: getSavedLanguage(), // Use saved language or default
    fallbackLng: DEFAULT_LANGUAGE, // Fallback to English if translation not found
    interpolation: {
      escapeValue: false,
    },
  });

// Save language to localStorage whenever it changes
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('language', lng);
});

export default i18n;
