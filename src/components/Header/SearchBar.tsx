import React, { useCallback } from 'react';
import {
  Box,
  TextField,
  Button,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';

interface SearchBarProps {
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  onSearch: () => void;
  onClearError: () => void;
  loading: boolean;
  errorMessage: string;
  isFocused: boolean;
  setIsFocused: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchQueryChange,
  onSearch,
  onClearError,
  loading,
  errorMessage,
  isFocused,
  setIsFocused,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSearch = useCallback(() => {
    if (searchQuery.trim() === '') return; // Prevent searching for empty input
    onSearch();
  }, [onSearch, searchQuery]);

  return (
    <Box
      component="form"
      onSubmit={(e) => e.preventDefault()}
      sx={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'stretch' : 'flex-start',
        gap: '1rem',
        width: isMobile ? '100%' : 'auto',
      }}
    >
      <TextField
        size="small"
        label="Search Jokes"
        variant="outlined"
        value={searchQuery}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(e) => {
          if (e.target.value.length <= 20) {
            onSearchQueryChange(e.target.value);
            if (errorMessage) onClearError();
          }
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            if (searchQuery.trim()) onSearch();
          }
        }}
        error={!!errorMessage}
        helperText={
          errorMessage ||
          (isFocused
            ? `You can enter up to 20 characters (${searchQuery.length}/20)`
            : '')
        }
        fullWidth
        slotProps={{
          input: {
            endAdornment: searchQuery && (
              <IconButton
                onClick={() => {
                  onSearchQueryChange('');
                  onClearError();
                }}
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
        startIcon={<SearchIcon />}
        onClick={handleSearch}
        disabled={loading}
        sx={{
          borderRadius: '25px',
          padding: isMobile ? '0.5rem' : '0.5rem 2rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transition: 'background-color 0.3s ease',
        }}
      >
        Search
      </Button>
    </Box>
  );
};

export default SearchBar;
