import { TextEncoder, TextDecoder } from 'util';
import { jest } from '@jest/globals';

import '@testing-library/jest-dom';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as unknown as typeof global.TextDecoder;

jest.mock('@mui/material/styles/useTheme', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    palette: {
      primary: { main: '#000' },
      secondary: { main: '#fff' },
    },
  })),
}));
