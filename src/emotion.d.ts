import '@emotion/react';
import { ThemeType } from './Layout/GlobalTheme';

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface Theme extends ThemeType {}
}