import React from 'react'; // Přidání Reactu pro JSX
import { render, screen } from '@testing-library/react';
import Loading from 'components/Loading';

describe('Loading Component', () => {
  it('renders the spinner', () => {
    render(<Loading />);
    // Check if the CircularProgress (spinner) is present
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('has full-screen layout styles', () => {
    render(<Loading />);
    // Verify the Box container styles for full-screen alignment
    const boxElement = screen.getByRole('progressbar').closest('div');
    expect(boxElement).toHaveStyle({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100%',
    });
  });
});
