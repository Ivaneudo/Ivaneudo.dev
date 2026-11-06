import '@testing-library/jest-dom';
import { matchers } from '@emotion/jest';

// Adiciona as asserções específicas do Emotion ao Jest (ex: toHaveStyleRule)
expect.extend(matchers);