import { css } from '@emotion/react';
import { darkTheme } from './GlobalTheme'; // ajuste o caminho

export const GlobalStyle = css`
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
  }

  ::-webkit-scrollbar {
    width: 12px;
  }

  ::-webkit-scrollbar-track {
    background: ${darkTheme.colors.background}; 
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${darkTheme.colors.bold};
    border-radius: 20px 0 0 20px;
    
    border-left: 6px solid transparent; 
    border-right: 0px solid transparent; 
    border-top: 3px solid transparent;
    border-bottom: 3px solid transparent;
    
    background-clip: padding-box;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #a30000; 
  }

  @-moz-document url-prefix() {
    * {
      scrollbar-width: thin;
      scrollbar-color: ${darkTheme.colors.bold} ${darkTheme.colors.background};
    }
  }
`;