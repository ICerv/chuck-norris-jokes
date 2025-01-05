import React from 'react';
import { render, screen } from '@testing-library/react';
import JokeDesktopView from 'components/JokeSection/JokeDesktopView';

jest.mock('components/JokeSection/JokeControls', () =>
  jest.fn(() => <div>JokeControls Mock</div>),
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
    // Check that the mocked src value is applied
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
    expect(screen.getByText('JokeControls Mock')).toBeInTheDocument();
  });

  it('does not render JokeControls when errorMessage is provided', () => {
    render(<JokeDesktopView {...props} errorMessage="Error occurred" />);
    expect(screen.queryByText('JokeControls Mock')).not.toBeInTheDocument();
  });

  it('renders FadeAnimation with the joke', () => {
    render(<JokeDesktopView {...props} />);
    expect(screen.getByText('This is a joke')).toBeInTheDocument();
  });
});
