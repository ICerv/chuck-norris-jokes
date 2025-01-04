import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '@mui/material/styles';
import { jest } from '@jest/globals';
import Footer from '../../../src/components/Footer/Footer';
import theme from '../../../src/theme';

import useMediaQuery from '@mui/material/useMediaQuery';

// Mock `useMediaQuery` to simulate different screen sizes
jest.mock('@mui/material/useMediaQuery', () => jest.fn());

describe('Footer Component', () => {
  test('does not render on small screens (mobile)', () => {
    // Simulate mobile screen
    (useMediaQuery as jest.Mock).mockImplementation(() => false);

    render(
      <ThemeProvider theme={theme}>
        <Footer />
      </ThemeProvider>,
    );

    // Assert that nothing is rendered
    expect(
      screen.queryByText(/Created by Inna Červenková/i),
    ).not.toBeInTheDocument();
    expect(screen.queryByText(/View on GitHub/i)).not.toBeInTheDocument();
  });

  test('renders correctly on desktop screens', () => {
    // Simulate desktop screen
    (useMediaQuery as jest.Mock).mockImplementation(() => true);

    render(
      <ThemeProvider theme={theme}>
        <Footer />
      </ThemeProvider>,
    );

    // Assert that key elements are rendered
    expect(screen.getByText(/Created by Inna Červenková/i)).toBeInTheDocument();
    expect(screen.getByText(/View on GitHub/i)).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /View on GitHub/i }),
    ).toHaveAttribute('href', 'https://github.com/ICerv/chuck-norris-jokes');
  });
});
