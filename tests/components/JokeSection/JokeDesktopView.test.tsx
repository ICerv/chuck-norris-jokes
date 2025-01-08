import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import JokeDesktopView from 'components/JokeSection/JokeDesktopView';

jest.mock('components/JokeSection/JokeControls', () =>
  jest.fn(({ onNext, onPrevious }) => (
    <div>
      <button onClick={onPrevious} aria-label="Previous">
        Previous
      </button>
      <button onClick={onNext} aria-label="Next">
        Next
      </button>
    </div>
  )),
);

jest.mock('components/JokeSection/FadeAnimation', () =>
  jest.fn(({ children }) => <div>{children}</div>),
);

describe('JokeDesktopView Component', () => {
  const props = {
    joke: 'This is a joke',
    category: 'funny',
    query: 'chuck norris',
    total: 5,
    currentIndex: 2,
    errorMessage: null,
    onNext: jest.fn(),
    onPrevious: jest.fn(),
    handleArrowClick: jest.fn(),
  };

  it('renders the background image', () => {
    render(<JokeDesktopView {...props} />);
    const backgroundImage = screen.getByAltText(
      'Background of Chuck Norris holding a board',
    );
    expect(backgroundImage).toBeInTheDocument();
    // Check mocked src attribute
    expect(backgroundImage).toHaveAttribute('src', 'test-file-stub');
  });

  it('displays the joke text correctly', () => {
    render(<JokeDesktopView {...props} />);
    expect(screen.getByText('This is a joke')).toBeInTheDocument();
  });

  it('displays fallback text when no joke is available', () => {
    render(<JokeDesktopView {...props} joke={''} />);
    expect(screen.getByText('No joke available')).toBeInTheDocument();
  });

  it('renders JokeControls when errorMessage is not provided', () => {
    render(<JokeDesktopView {...props} />);
    const previousButton = screen.getByRole('button', { name: /previous/i });
    const nextButton = screen.getByRole('button', { name: /next/i });
    expect(previousButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });

  it('does not render JokeControls when errorMessage is provided', () => {
    render(<JokeDesktopView {...props} errorMessage="Error occurred" />);
    expect(
      screen.queryByRole('button', { name: /previous/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /next/i }),
    ).not.toBeInTheDocument();
  });

  it('renders FadeAnimation with the joke', () => {
    render(<JokeDesktopView {...props} />);
    expect(screen.getByText('This is a joke')).toBeInTheDocument();
  });

  it('calls onNext when the next button is clicked', () => {
    render(<JokeDesktopView {...props} />);
    const nextButton = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextButton);
    expect(props.onNext).toHaveBeenCalled();
  });

  it('calls onPrevious when the previous button is clicked', () => {
    render(<JokeDesktopView {...props} />);
    const previousButton = screen.getByRole('button', { name: /previous/i });
    fireEvent.click(previousButton);
    expect(props.onPrevious).toHaveBeenCalled();
  });

  it('renders FadeAnimation with the correct keyProp', () => {
    render(<JokeDesktopView {...props} />);
    expect(screen.getByText('This is a joke')).toBeInTheDocument();
  });
});
