import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../../src/theme';
import Header from 'components/Header/Header';

// Helper function to render with theme
const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
};

describe('Header Component', () => {
  const mockProps = {
    categories: ['category1', 'category2', 'category3'],
    onCategoryClick: jest.fn(),
    searchQuery: '',
    onSearch: jest.fn(),
    onSearchQueryChange: jest.fn(),
    onRandomJokeClick: jest.fn(),
    onClearError: jest.fn(),
    errorMessage: null,
    loading: false,
    onClearSearch: jest.fn(),
  };

  it('renders the Logo component', () => {
    renderWithTheme(<Header {...mockProps} />);
    expect(screen.getByAltText('Logo')).toBeInTheDocument();
  });

  // it('renders the SearchBar component', () => {
  //   renderWithTheme(<Header {...mockProps} />);
  //   expect(screen.getByLabelText('Search jokes')).toBeInTheDocument();
  // });

  // it('renders the CategoryMenu component', () => {
  //   renderWithTheme(<Header {...mockProps} />);
  //   expect(screen.getByLabelText('Category menu')).toBeInTheDocument();
  // });

  // it('calls onSearchQueryChange when the search query changes', () => {
  //   renderWithTheme(<Header {...mockProps} />);
  //   const searchInput = screen.getByLabelText('Search jokes');
  //   fireEvent.change(searchInput, { target: { value: 'chuck norris' } });
  //   expect(mockProps.onSearchQueryChange).toHaveBeenCalledWith('chuck norris');
  // });

  // it('calls onSearch when the search button is clicked', () => {
  //   renderWithTheme(<Header {...mockProps} />);
  //   const searchInput = screen.getByLabelText('Search jokes');
  //   fireEvent.change(searchInput, { target: { value: 'chuck norris' } });
  //   fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' });
  //   expect(mockProps.onSearch).toHaveBeenCalled();
  // });

  // it('displays an error message when errorMessage is provided', () => {
  //   renderWithTheme(<Header {...mockProps} errorMessage="Error occurred" />);
  //   expect(screen.getByText('Error occurred')).toBeInTheDocument();
  // });

  // it('disables the search bar when loading is true', () => {
  //   renderWithTheme(<Header {...mockProps} loading={true} />);
  //   const searchInput = screen.getByLabelText('Search jokes');
  //   expect(searchInput).toBeDisabled();
  // });
});
