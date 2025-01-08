import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import theme from 'theme';
import Logo from 'components/Header/Logo';

jest.mock('hooks/useResponsive', () => ({
  useIsMobile: jest.fn(),
}));

const mockUseIsMobile = require('hooks/useResponsive').useIsMobile;

// Helper to render with theme
const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

describe('Logo Component', () => {
  it('renders the text version on mobile view', () => {
    mockUseIsMobile.mockReturnValue(true);
    renderWithTheme(<Logo />);
    const textElement = screen.getByText(/Chuck Norris Jokes/i);
    expect(textElement).toBeInTheDocument();
  });

  it('renders the image version on desktop view', () => {
    mockUseIsMobile.mockReturnValue(false);
    renderWithTheme(<Logo />);
    const imgElement = screen.getByRole('img', {
      name: /Chuck Norris Jokes Logo/i,
    });
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', 'test-file-stub');
  });

  it('contains the correct link to the API homepage', () => {
    renderWithTheme(<Logo />);
    const linkElement = screen.getByRole('link', {
      name: /Chuck Norris Jokes - go to API homepage/i,
    });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', 'https://api.chucknorris.io');
    expect(linkElement).toHaveAttribute('target', '_blank');
    expect(linkElement).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('applies the correct styles', () => {
    renderWithTheme(<Logo />);
    const linkElement = screen.getByRole('link', {
      name: /Chuck Norris Jokes - go to API homepage/i,
    });
    expect(linkElement).toHaveStyle({
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      textDecoration: 'none',
      color: 'inherit',
    });
  });
});
