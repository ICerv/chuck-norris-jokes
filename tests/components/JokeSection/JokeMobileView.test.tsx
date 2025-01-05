import React from 'react';
import { render, screen } from '@testing-library/react';
import JokeMobileView from 'components/JokeSection/JokeMobileView';
import '@testing-library/jest-dom';

jest.mock('components/JokeSection/JokeControls', () =>
  jest.fn(() => <div>JokeControls Mock</div>),
);
jest.mock('components/JokeSection/FadeAnimation', () =>
  jest.fn(({ children }) => <div>{children}</div>),
);

describe('JokeMobileView Component', () => {
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

  it('renders the Chuck Norris image', () => {
    render(<JokeMobileView {...props} />);
    const image = screen.getByAltText(
      'Illustration of Chuck Norris holding a board for displaying jokes',
    );
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'test-file-stub'); // Kontroluje mock
  });

  it('displays the joke text correctly', () => {
    render(<JokeMobileView {...props} />);
    expect(screen.getByText('This is a joke')).toBeInTheDocument();
  });

  it('displays fallback text when no joke is available', () => {
    render(<JokeMobileView {...props} joke={''} />);
    expect(screen.getByText('No joke available')).toBeInTheDocument();
  });

  it('renders JokeControls when errorMessage is not provided', () => {
    render(<JokeMobileView {...props} />);
    expect(screen.getByText('JokeControls Mock')).toBeInTheDocument();
  });

  it('does not render JokeControls when errorMessage is provided', () => {
    render(<JokeMobileView {...props} errorMessage="Error occurred" />);
    expect(screen.queryByText('JokeControls Mock')).not.toBeInTheDocument();
  });

  it('renders FadeAnimation with the joke', () => {
    render(<JokeMobileView {...props} />);
    expect(screen.getByText('This is a joke')).toBeInTheDocument();
  });
});
