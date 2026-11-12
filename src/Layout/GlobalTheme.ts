// Tipagem do seu tema completo
export interface ThemeType {
  fonts: {
    jetbrains: string;
    arial: string;
  };
  colors: {
    background: string;
    surface: string;
    surfaceBorder: string;
    text: string;
    textMuted: string;
    primary: string;
    primaryHover: string;
    codeBg: string;
    // Propriedades antigas do portfólio mantidas para compatibilidade:
    backgroundCard: string;
    bold: string;
    border: string;
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

// Configurações que não mudam entre claro e escuro
const baseSettings = {
  fonts: {
    jetbrains: "'JetBrains Mono', monospace",
    arial: "Arial, sans-serif"
  },
  fontSizes: {
    small: "22px",
    medium: "24px",
    large: "26px",
    h1: "38px",
    h2: "26px"
  },
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
  }
};

export const darkTheme: ThemeType = {
  ...baseSettings,
  colors: {
    background: '#191A1B',
    surface: '#202224',
    surfaceBorder: '#2E3033',
    text: '#F2F2F2',
    textMuted: '#9E9E9E',
    primary: '#C90000',
    primaryHover: '#A00000',
    codeBg: '#121314',
    backgroundCard: '#202224',
    bold: '#C90000',
    border: '#2E3033', 
  }
};

export const lightTheme: ThemeType = {
  ...baseSettings,
  colors: {
    background: '#FAFAFA',      // Fundo quase branco
    surface: '#EFEFF1',         // Cards cinza suave
    surfaceBorder: '#DCDCE0',
    text: '#141414',
    textMuted: '#636369',
    primary: '#C90000',
    primaryHover: '#A00000',
    codeBg: '#E4E4E7',
    // Compatibilidade
    backgroundCard: '#EFEFF1',
    bold: '#C90000',
    border: '#C90000',          // Borda vermelha restaurada
  }
};