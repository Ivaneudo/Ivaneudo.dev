import { createContext, useContext } from 'react';
import type pt from '../i18n/pt.json';

export type LanguageCode = 'pt' | 'en' | 'es';
export type TranslationSchema = typeof pt;

export interface LanguageContextData {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: TranslationSchema;
}

export const LanguageContext = createContext<LanguageContextData>({} as LanguageContextData);

export const useLanguage = () => useContext(LanguageContext);