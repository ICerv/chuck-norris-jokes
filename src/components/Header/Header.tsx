import React from 'react';
import SearchBar from './SearchBar';
import CategoryMenu from './CategoryMenu';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import useTheme from '@mui/material/styles/useTheme';
import { Theme } from '@mui/material/styles';
import Logo from './Logo';
import theme from '../../theme';
import { useIsDesktop, useIsMobile } from '../../hooks/useResponsive';
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
  // const isMd = useMediaQuery(theme.breakpoints.up('md'));
  // const isSm = useMediaQuery(theme.breakpoints.up('sm'));
  const isMd = useIsDesktop();
  const isSm = useIsMobile();
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.colors.shadow.normal,
        width: '100%',
        paddingTop: {
          xs: '0',
          sm: '1.5rem',
        },
        paddingBottom: {
          xs: '1rem',
          sm: '0.5rem',
        },
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
          <Logo />

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
function useResponsive(arg0: string) {
  throw new Error('Function not implemented.');
}
