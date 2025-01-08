import { TextEncoder, TextDecoder } from 'util';
import { jest } from '@jest/globals';

jest.mock('hooks/useResponsive', () => ({
  useIsMobile: jest.fn(() => false),
  useIsDesktop: jest.fn(() => true),
}));

import '@testing-library/jest-dom';

// Kompatibilita prostředí pro testy s globálními třídami (TextEncoder a TextDecoder)
// Mockuje Material-UI hook useTheme, aby testy byly nezávislé na skutečném nastavení tématu
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
