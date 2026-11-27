import { createContext, useContext } from 'react';

export type ThemeMode = 'light' | 'dark';

export interface ThemeContextData {
  themeMode: ThemeMode;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

export const useThemeMode = () => useContext(ThemeContext);