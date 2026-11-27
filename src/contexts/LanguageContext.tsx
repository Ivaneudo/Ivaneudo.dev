import React, { useState } from 'react';
import pt from '../i18n/pt.json';
import en from '../i18n/en.json';
import es from '../i18n/es.json';
import {
  LanguageContext,
  type LanguageCode,
  type TranslationSchema,
} from './useLanguage';

const STORAGE_KEY = '@ivaneudo-portfolio:lang';

const TRANSLATIONS: Record<LanguageCode, TranslationSchema> = {
  pt,
  en,
  es,
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as LanguageCode | null;
    if (saved && (saved === 'pt' || saved === 'en' || saved === 'es')) {
      return saved;
    }
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('es')) return 'es';
    if (browserLang.startsWith('en')) return 'en';
    return 'pt';
  });

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: TRANSLATIONS[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};