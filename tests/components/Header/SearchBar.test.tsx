import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from 'components/Header/SearchBar';

describe('SearchBar Component', () => {
  const mockProps = {
    searchQuery: '',
    onSearchQueryChange: jest.fn(),
    onClearError: jest.fn(),
    onClearSearch: jest.fn(),
    onSearch: jest.fn(),
    errorMessage: '',
    loading: false,
  };

  it('renders the search bar with default props', () => {
    render(<SearchBar {...mockProps} />);
    const input = screen.getByLabelText(/search jokes/i);
    expect(input).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /search/i });
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  });

  it('updates the search query on change', () => {
    render(<SearchBar {...mockProps} />);
    const input = screen.getByRole('textbox', { name: /search jokes/i });

    fireEvent.change(input, { target: { value: 'chuck norris' } });
    expect(mockProps.onSearchQueryChange).toHaveBeenCalledWith('chuck norris');
  });

  it('clears the search field and errors on clear button click', () => {
    render(<SearchBar {...mockProps} searchQuery="chuck norris" />);
    const clearButton = screen.getByLabelText(/clear search field/i);

    fireEvent.click(clearButton);
    expect(mockProps.onSearchQueryChange).toHaveBeenCalledWith('');
    expect(mockProps.onClearError).toHaveBeenCalled();
    expect(mockProps.onClearSearch).toHaveBeenCalled();
  });

  it('triggers the search function on button click', () => {
    render(<SearchBar {...mockProps} />);
    const searchButton = screen.getByRole('button', { name: /search/i });

    fireEvent.click(searchButton);
    expect(mockProps.onSearch).toHaveBeenCalled();
  });

  it('shows error message when provided', () => {
    render(<SearchBar {...mockProps} errorMessage="An error occurred" />);
    const helperText = screen.getByText(/an error occurred/i);
    expect(helperText).toBeInTheDocument();
  });

  it('displays character count when typing', () => {
    render(<SearchBar {...mockProps} searchQuery="chuck" />);
    const helperText = screen.getByText(/5\/20/i);
    expect(helperText).toBeInTheDocument();
  });

  it('disables the search button when loading is true', () => {
    render(<SearchBar {...mockProps} loading={true} />);
    const searchButton = screen.getByRole('button', { name: /search/i });
    expect(searchButton).toBeDisabled();
  });

  it('calls onSearch on Enter key press', () => {
    render(<SearchBar {...mockProps} />);

    const input = screen.getByRole('textbox', { name: /search jokes/i });

    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(mockProps.onSearch).toHaveBeenCalled();
  });
});
