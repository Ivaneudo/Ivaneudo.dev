export interface ThemeType {
  fonts: {
    jetbrains: string;
    arial: string;
  };
  colors: {
    background: string;
    backgroundSecondary: string;
    surface: string;
    surfaceHover: string;
    surfaceBorder: string;
    navbarBg: string;
    text: string;
    textMuted: string;
    primary: string;
    primaryHover: string;
    primaryGlow: string;
    codeBg: string;
    backgroundCard: string;
    bold: string;
    border: string;
    shadow: string;
    shadowSm: string;
    shadowHover: string;
  };
  fontSizes: {
    small: string;
    medium: string;
    large: string;
    h1: string;
    h2: string;
  };
  breakpoints: {
    mobile: string;
    tablet: string;
  };
}

const baseSettings = {
  fonts: {
    jetbrains: "'JetBrains Mono', monospace",
    arial: "'Inter', Arial, sans-serif",
  },
  fontSizes: {
    small: '22px',
    medium: '24px',
    large: '26px',
    h1: '38px',
    h2: '26px',
  },
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
  },
};

export const darkTheme: ThemeType = {
  ...baseSettings,
  colors: {
    background: '#0B0B0E',
    backgroundSecondary: '#111116',
    surface: 'rgba(22, 22, 28, 0.88)',
    surfaceHover: 'rgba(30, 30, 38, 0.96)',
    surfaceBorder: 'rgba(255, 255, 255, 0.08)',
    navbarBg: 'rgba(11, 11, 14, 0.85)',
    text: '#F3F4F6',
    textMuted: '#A1A1AA',
    primary: '#C90000',
    primaryHover: '#A00000',
    primaryGlow: 'rgba(201, 0, 0, 0.16)',
    codeBg: '#14141A',
    backgroundCard: 'rgba(22, 22, 28, 0.88)',
    bold: '#C90000',
    border: 'rgba(255, 255, 255, 0.08)',
    shadow: '0 10px 28px rgba(0, 0, 0, 0.45)',
    shadowSm: '0 4px 12px rgba(0, 0, 0, 0.35)',
    shadowHover: '0 14px 34px rgba(0, 0, 0, 0.55)',
  },
};

export const lightTheme: ThemeType = {
  ...baseSettings,
  colors: {
    background: '#F4F4F6',
    backgroundSecondary: '#EAEAEF',
    surface: '#FFFFFF',
    surfaceHover: '#FFFFFF',
    surfaceBorder: '#E4E4E8',
    navbarBg: 'rgba(244, 244, 246, 0.86)',
    text: '#141417',
    textMuted: '#52525B',
    primary: '#C90000',
    primaryHover: '#A00000',
    primaryGlow: 'rgba(201, 0, 0, 0.07)',
    codeBg: '#F1F1F4',
    backgroundCard: '#FFFFFF',
    bold: '#C90000',
    border: '#E4E4E8',
    shadow: '0 1px 3px rgba(0, 0, 0, 0.04), 0 6px 16px rgba(0, 0, 0, 0.03)',
    shadowSm: '0 1px 2px rgba(0, 0, 0, 0.04)',
    shadowHover: '0 4px 12px rgba(0, 0, 0, 0.05), 0 12px 24px rgba(201, 0, 0, 0.06)',
  },
};