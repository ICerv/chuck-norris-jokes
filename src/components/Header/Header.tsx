import React from 'react';
import SearchBar from './SearchBar';
import CategoryMenu from './CategoryMenu';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import useMediaQuery from '@mui/material/useMediaQuery';
import useTheme from '@mui/material/styles/useTheme';
import { Theme } from '@mui/material/styles';
interface HeaderProps {
  categories: string[];
  onCategoryClick: (category: string) => void;
  searchQuery: string;
  onSearch: () => void;
  onSearchQueryChange: (query: string) => void;
  onRandomJokeClick: () => void;
  onClearError: () => void;
  errorMessage: string | null;
  loading: boolean;
  onClearSearch: () => void;
}

const Header: React.FC<HeaderProps> = ({
  categories,
  onCategoryClick,
  searchQuery,
  onSearch,
  onSearchQueryChange,
  onRandomJokeClick,
  onClearError,
  errorMessage,
  loading,
  onClearSearch,
}) => {
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
          <Box
            component="a"
            aria-label="Visit Chuck Norris Jokes API"
            tabIndex={0}
            href="https://api.chucknorris.io"
            target="_blank"
            rel="noopener noreferrer"
            fontWeight="bold"
            fontSize="1.5rem"
            sx={{
              textDecoration: 'none',
              color: 'inherit',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            Chuck Norris Jokes
          </Box>

          <SearchBar
            aria-label="Search jokes"
            onClearSearch={onClearSearch}
            onClearError={onClearError}
            searchQuery={searchQuery}
            onSearchQueryChange={onSearchQueryChange}
            onSearch={onSearch}
            errorMessage={errorMessage || ''}
            loading={loading}
          />
          <CategoryMenu
            aria-label="Category menu"
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
