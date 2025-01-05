import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import JokeControls from 'components/JokeSection/JokeControls';
import { ThemeProvider } from '@mui/material/styles';
import theme from 'theme';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
};

describe('JokeControls Component', () => {
  const mockOnNext = jest.fn();
  const mockOnPrevious = jest.fn();
  const mockHandleArrowClick = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the Previous and Next buttons in search mode', () => {
    renderWithTheme(
      <JokeControls
        query="chuck"
        total={5}
        currentIndex={2}
        onNext={mockOnNext}
        onPrevious={mockOnPrevious}
      />,
    );

    const previousButton = screen.getByLabelText('Previous joke');
    const nextButton = screen.getByLabelText('Next joke');

    expect(previousButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });

  it('calls onPrevious and onNext when buttons are clicked', () => {
    renderWithTheme(
      <JokeControls
        query="chuck"
        total={5}
        currentIndex={2}
        onNext={mockOnNext}
        onPrevious={mockOnPrevious}
      />,
    );

    const previousButton = screen.getByLabelText('Previous joke');
    const nextButton = screen.getByLabelText('Next joke');

    fireEvent.click(previousButton);
    fireEvent.click(nextButton);

    expect(mockOnPrevious).toHaveBeenCalledTimes(1);
    expect(mockOnNext).toHaveBeenCalledTimes(1);
  });

  it('disables Previous button when at the first joke', () => {
    renderWithTheme(
      <JokeControls
        query="chuck"
        total={5}
        currentIndex={0}
        onPrevious={mockOnPrevious}
      />,
    );

    const previousButton = screen.getByLabelText('Previous joke');
    expect(previousButton).toBeDisabled();
  });

  it('disables Next button when at the last joke', () => {
    renderWithTheme(
      <JokeControls
        query="chuck"
        total={5}
        currentIndex={4}
        onNext={mockOnNext}
      />,
    );

    const nextButton = screen.getByLabelText('Next joke');
    expect(nextButton).toBeDisabled();
  });

  it('renders the category chip and arrow in category mode', () => {
    renderWithTheme(
      <JokeControls category="funny" handleArrowClick={mockHandleArrowClick} />,
    );

    const chip = screen.getByLabelText('Joke category: funny');
    const arrowButton = screen.getByLabelText('Next joke');

    expect(chip).toBeInTheDocument();
    expect(arrowButton).toBeInTheDocument();
  });

  it('calls handleArrowClick when the arrow button is clicked', () => {
    renderWithTheme(
      <JokeControls category="funny" handleArrowClick={mockHandleArrowClick} />,
    );

    const arrowButton = screen.getByLabelText('Next joke');
    fireEvent.click(arrowButton);

    expect(mockHandleArrowClick).toHaveBeenCalledTimes(1);
  });

  it('renders the correct joke count in search mode', () => {
    renderWithTheme(<JokeControls query="chuck" total={5} currentIndex={3} />);

    const jokeCount = screen.getByText('4 / 5');
    expect(jokeCount).toBeInTheDocument();
  });
});
