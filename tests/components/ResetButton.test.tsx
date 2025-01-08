import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ResetButton from 'components/ResetButton';

jest.mock('react-draggable', () => {
  const MockDraggable = ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  );
  return MockDraggable;
});

describe('ResetButton Component', () => {
  const mockOnResetClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the reset button', () => {
    render(<ResetButton onResetClick={mockOnResetClick} />);
    const button = screen.getByRole('button', {
      name: /reset button, draggable/i,
    });
    expect(button).toBeInTheDocument();
  });

  it('calls the onResetClick function when the button is clicked', () => {
    render(<ResetButton onResetClick={mockOnResetClick} />);
    const button = screen.getByRole('button', {
      name: /reset button, draggable/i,
    });
    fireEvent.click(button);
    expect(mockOnResetClick).toHaveBeenCalledTimes(1);
  });
});
