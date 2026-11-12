import { css } from '@emotion/react';
import type { ThemeType } from './GlobalTheme'; 

// Agora GlobalStyle é uma função que recebe o theme dinamicamente
export const GlobalStyle = (theme: ThemeType) => css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    width: 100%;
    /* Adicionamos a cor de fundo e texto global e uma transição suave */
    background-color: ${theme.colors.background};
    color: ${theme.colors.text};
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  ::-webkit-scrollbar {
    width: 12px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.background}; 
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${theme.colors.primary};
    border-radius: 20px 0 0 20px;
    
    border-left: 6px solid transparent; 
    border-right: 0px solid transparent; 
    border-top: 3px solid transparent;
    border-bottom: 3px solid transparent;
    
    background-clip: padding-box;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: ${theme.colors.primaryHover}; 
  }

  @-moz-document url-prefix() {
    * {
      scrollbar-width: thin;
      scrollbar-color: ${theme.colors.primary} ${theme.colors.background};
    }
  }
`;