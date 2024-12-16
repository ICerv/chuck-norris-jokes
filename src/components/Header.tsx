import React from 'react';
import {
  Box,
  Button,
  Menu,
  MenuItem,
  TextField,
  CircularProgress,
  IconButton,
  useMediaQuery,
  Theme,
  useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface HeaderProps {
  categories: string[];
  onCategoryClick: (category: string) => void;
  searchQuery: string;
  onSearch: () => void;
  onSearchQueryChange: (query: string) => void;
  loading: boolean;
  errorMessage: string;
}

const Header: React.FC<HeaderProps> = ({
  categories,
  onCategoryClick,
  searchQuery,
  onSearch,
  onSearchQueryChange,
  loading,
  errorMessage,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const theme: Theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'));

  const openMenu = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const closeMenu = () => setAnchorEl(null);

  return (
    <Box
      sx={{
        padding: isMd ? '1.5rem 4rem' : '2rem 1rem',
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Box component="nav">
        {isMd ? (
          /* Desktop layout */
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box fontWeight="bold" fontSize="1.2rem">
              Chuck Norris Jokes
            </Box>
            <Box display="flex" alignItems="center" gap="1rem">
              <TextField
                size="small"
                label="Search Jokes"
                variant="outlined"
                value={searchQuery}
                onChange={(e) => onSearchQueryChange(e.target.value)}
                error={!!errorMessage}
                helperText={errorMessage || ''}
                fullWidth
                slotProps={{
                  input: {
                    endAdornment: searchQuery && (
                      <IconButton
                        onClick={() => onSearchQueryChange('')}
                        size="small"
                        aria-label="clear"
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    ),
                  },
                }}
              />
              <Button
                variant="contained"
                color="secondary"
                onClick={onSearch}
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  'Search'
                )}
              </Button>
            </Box>
            <Button
              color="secondary"
              onClick={openMenu}
              variant="text"
              sx={{ textTransform: 'none', fontWeight: 'bold' }}
            >
              Find Jokes by Category
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={closeMenu}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              slotProps={{
                paper: {
                  sx: {
                    padding: '8px',
                    width: '100%',
                    maxWidth: '200px',
                  },
                },
              }}
            >
              <Box
                display="flex"
                flexWrap="wrap"
                justifyContent="space-around"
                gap="8px"
              >
                {categories.map((category) => (
                  <MenuItem
                    key={category}
                    onClick={() => {
                      onCategoryClick(category);
                      closeMenu();
                    }}
                    sx={{
                      width: '70px',
                      textAlign: 'center',
                      alignItems: 'center',
                      display: 'flex',
                      justifyContent: 'center',
                      border: `1px solid ${theme.colors.border}`,
                      borderRadius: '8px',
                      boxShadow: theme.colors.shadow.normal,
                      '&:hover': {
                        borderColor: theme.palette.primary.main,
                        boxShadow: theme.colors.shadow.hover,
                      },
                    }}
                  >
                    {category}
                  </MenuItem>
                ))}
              </Box>
            </Menu>
          </Box>
        ) : (
          /* Mobile layout */
          <Box display="flex" flexDirection="column" gap="2rem">
            <Box fontWeight="bold" fontSize="1.2rem" textAlign="center">
              Chuck Norris Jokes
            </Box>
            <Box display="flex" flexDirection="column" gap="0.5rem">
              <TextField
                size="small"
                label="Search Jokes"
                variant="outlined"
                value={searchQuery}
                onChange={(e) => onSearchQueryChange(e.target.value)}
                error={!!errorMessage}
                helperText={errorMessage || ''}
                fullWidth
                slotProps={{
                  input: {
                    endAdornment: searchQuery && (
                      <IconButton
                        onClick={() => onSearchQueryChange('')}
                        size="small"
                        aria-label="clear"
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    ),
                  },
                }}
              />
              <Button
                variant="contained"
                color="secondary"
                onClick={onSearch}
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  'Search'
                )}
              </Button>
            </Box>
            <Button
              color="secondary"
              onClick={openMenu}
              variant="text"
              sx={{ textTransform: 'none', fontWeight: 'bold' }}
            >
              Find Jokes by Category
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={closeMenu}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              slotProps={{
                paper: {
                  sx: {
                    padding: '8px',
                    width: '100%',
                    maxWidth: '200px',
                  },
                },
              }}
            >
              <Box
                display="flex"
                flexWrap="wrap"
                justifyContent="space-around"
                gap="8px"
              >
                {categories.map((category) => (
                  <MenuItem
                    key={category}
                    onClick={() => {
                      onCategoryClick(category);
                      closeMenu();
                    }}
                    sx={{
                      width: '70px',
                      textAlign: 'center',
                      alignItems: 'center',
                      display: 'flex',
                      justifyContent: 'center',
                      border: `1px solid ${theme.colors.border}`,
                      borderRadius: '8px',
                      boxShadow: theme.colors.shadow.normal,
                      '&:hover': {
                        borderColor: theme.palette.primary.main,
                        boxShadow: theme.colors.shadow.hover,
                      },
                    }}
                  >
                    {category}
                  </MenuItem>
                ))}
              </Box>
            </Menu>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Header;