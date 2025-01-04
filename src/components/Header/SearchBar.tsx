import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import useTheme from '@mui/material/styles/useTheme';
import useMediaQuery from '@mui/material/useMediaQuery';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';

interface SearchBarProps {
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  onClearError: () => void;
  onClearSearch: () => void;
  onSearch: () => void;
  errorMessage: string;
  loading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchQueryChange,
  onClearError,
  onClearSearch,
  onSearch,
  errorMessage,
  loading,
}) => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  const maxCharacters = 30;

  return (
    <Box
      component="form"
      onSubmit={(e) => e.preventDefault()}
      sx={{
        display: 'flex',
        flexDirection: isSm ? 'column' : 'row',
        alignItems: isSm ? 'stretch' : 'flex-start',
        gap: '1rem',
        width: isSm ? '100%' : 'auto',
      }}
    >
      <TextField
        size="small"
        label="Search Jokes"
        aria-label="Search jokes"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => {
          if (e.target.value.length <= maxCharacters) {
            onSearchQueryChange(e.target.value);
          }
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            onSearch();
          }
        }}
        error={!!errorMessage}
        helperText={
          errorMessage ||
          `You can enter up to 30 characters (${searchQuery.length}/30)`
        }
        aria-describedby="search-helper-text"
        fullWidth
        slotProps={{
          input: {
            endAdornment: searchQuery && (
              <IconButton
                onClick={() => {
                  onSearchQueryChange('');
                  onClearError();
                  onClearSearch();
                }}
                size="small"
                aria-label="Clear search field"
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
        onClick={onSearch}
        aria-disabled={loading}
        disabled={loading}
        sx={{
          borderRadius: '25px',
          padding: isSm ? '0.5rem' : '0.5rem 2rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transition: 'background-color 0.3s ease',
          '&:focus': {
            outline: '2px solid #6a1b9a',
            outlineOffset: '2px',
          },
        }}
      >
        Search
      </Button>
    </Box>
  );
};

export default SearchBar;
