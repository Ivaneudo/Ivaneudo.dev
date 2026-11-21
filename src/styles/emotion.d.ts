import '@emotion/react';
import type { ThemeType } from './GlobalTheme';

declare module '@emotion/react' {
  export interface Theme extends ThemeType {}
}