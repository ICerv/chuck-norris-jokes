import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    xxl: true;
  }
  interface Theme {
    colors: {
      border: string;
      shadow: {
        normal: string;
        hover: string;
      };
    };
  }
  interface ThemeOptions {
    colors?: {
      border?: string;
      shadow?: {
        normal: string;
        hover: string;
      };
    };
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#6a1b9a',
    },
    secondary: {
      main: '#ab47bc',
    },
    background: {
      default: '#f5f5f5',
    },
  },

  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    fontWeightBold: 700,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 480,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1920,
    },
  },
  colors: {
    border: '#e0e0e0',
    shadow: {
      normal: '0 2px 4px rgba(0, 0, 0, 0.1)',
      hover: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },
  },
});

export default theme;
