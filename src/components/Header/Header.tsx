import React from 'react';
import { Box, Container } from '@mui/material';
import SearchBar from './SearchBar';
import CategoryMenu from './CategoryMenu';
import Logo from './Logo';
import { useIsDesktop, useIsMobile } from '../../hooks/useResponsive';
import theme from '../../theme';

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
  const isMd = useIsDesktop();
  const isSm = useIsMobile();

  return (
    <Box
      component="header"
      sx={{
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.colors.shadow.normal,
        width: '100%',
        paddingTop: 0,
        paddingBottom: isSm ? '1rem' : '0',
      }}
    >
      <Container maxWidth="xl">
        <Box
          component="nav"
          aria-label="Main navigation"
          sx={{
            display: 'flex',
            flexDirection: isMd ? 'row' : 'column',
            alignItems: isSm ? 'flex-start' : 'center',
            justifyContent: isMd ? 'space-between' : 'center',
            gap: '1rem',
          }}
        >
          <Logo />
          <SearchBar
            onClearSearch={onClearSearch}
            onClearError={onClearError}
            searchQuery={searchQuery}
            onSearchQueryChange={onSearchQueryChange}
            onSearch={onSearch}
            errorMessage={errorMessage || ''}
            loading={loading}
          />
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
