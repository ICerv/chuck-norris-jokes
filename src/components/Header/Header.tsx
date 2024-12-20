import React, { useState } from 'react';
import { Box, Container, useMediaQuery, Theme, useTheme } from '@mui/material';
import SearchBar from './SearchBar';
import CategoryMenu from './CategoryMenu';

interface HeaderProps {
  categories: string[];
  onCategoryClick: (category: string) => void;
  searchQuery: string;
  onSearch: () => void;
  onSearchQueryChange: (query: string) => void;
  loading: boolean;
  errorMessage: string;
  onRandomJokeClick: () => void;
  onClearError: () => void;
}

const Header: React.FC<HeaderProps> = ({
  categories,
  onCategoryClick,
  searchQuery,
  onSearch,
  onSearchQueryChange,
  loading,
  errorMessage,
  onRandomJokeClick,
  onClearError,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const theme: Theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'));
  const isSm = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        width: '100%',
        paddingTop: '1.5rem',
      }}
    >
      <Container maxWidth="xl">
        <Box
          component="nav"
          display="flex"
          flexDirection={isMd ? 'row' : 'column'}
          alignItems={isSm ? 'flex-start' : 'stretch'}
          justifyContent={isMd ? 'space-between' : 'center'}
          gap="1rem"
          sx={{
            minHeight: '70px',
          }}
        >
          {/* Title */}
          <Box fontWeight="bold" fontSize="1rem">
            Chuck Norris Jokes
          </Box>

          {/* Search Bar */}
          <SearchBar
            searchQuery={searchQuery}
            onSearchQueryChange={onSearchQueryChange}
            onSearch={onSearch}
            onClearError={onClearError}
            loading={loading}
            errorMessage={errorMessage}
            isFocused={isFocused}
            setIsFocused={setIsFocused}
          />

          {/* Category Menu */}
          <CategoryMenu
            categories={categories}
            onCategoryClick={onCategoryClick}
            onRandomJokeClick={onRandomJokeClick}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default Header;
