import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import useTheme from '@mui/material/styles/useTheme';
import useMediaQuery from '@mui/material/useMediaQuery';

interface CategoryMenuProps {
  categories: string[];
  onCategoryClick: (category: string) => void;
  onRandomJokeClick: () => void;
}

const CategoryMenu: React.FC<CategoryMenuProps> = ({
  categories,
  onCategoryClick,
  onRandomJokeClick,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));

  const handleMouseEnterButton = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMouseLeave = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (category: string) => {
    onCategoryClick(category);
    setAnchorEl(null);
  };

  const handleRandomJokeClick = () => {
    onRandomJokeClick();
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        display: 'inline-block',
        position: 'relative',
      }}
      onMouseLeave={handleMouseLeave}
    >
      <Button
        aria-controls={anchorEl ? 'category-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={Boolean(anchorEl)}
        color="secondary"
        variant="text"
        onMouseEnter={handleMouseEnterButton}
        sx={{
          textTransform: 'none',
          fontWeight: 'bold',
        }}
      >
        Find Jokes by Category
      </Button>
      <Menu
        id="category-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          onMouseLeave: handleMouseLeave,
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Box
          display="grid"
          gridTemplateColumns={isSm ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)'}
          gap={2}
          p={1}
        >
          {categories.map((category) => (
            <MenuItem
              key={category}
              onClick={() => handleMenuItemClick(category)}
              sx={{
                textAlign: 'center',
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
                border: '1px solid lightgray',
                borderRadius: '0.5rem',
                padding: '0.5rem',
                '&:hover': {
                  borderColor: 'primary.main',
                },
              }}
            >
              {category}
            </MenuItem>
          ))}
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center" p={2}>
          <Button
            aria-label="Get a random joke"
            variant="contained"
            color="secondary"
            onClick={handleRandomJokeClick}
            sx={{
              borderRadius: '1.5rem',
              padding: '0.5rem 2rem',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: 'secondary.dark',
              },
            }}
          >
            Random
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default CategoryMenu;
