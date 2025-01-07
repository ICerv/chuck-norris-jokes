import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useIsMobile } from '../../hooks/useResponsive';
import theme from 'theme';
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
  const isSm = useIsMobile();

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
      {/* Button for triggering menu */}
      <Button
        aria-controls={anchorEl ? 'category-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={Boolean(anchorEl)}
        variant="outlined"
        color="secondary"
        aria-label="Find jokes by category"
        onMouseEnter={handleMouseEnterButton}
        sx={{
          textTransform: 'none',
          fontWeight: 'bold',
          fontSize: '1rem',
          borderRadius: '1.5rem',
          color: theme.palette.secondary.main,
          backgroundColor: 'white',
        }}
      >
        Find Jokes by Category
      </Button>

      {/* Dropdown Menu */}
      <Menu
        id="category-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          onMouseLeave: handleMouseLeave,
          'aria-label': 'Category menu',
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
        {/* Menu Items */}
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
                border: `1px solid ${theme.palette.grey[300]}`,
                borderRadius: '0.5rem',
                padding: '0.5rem',
                color: theme.palette.text.primary,
                '&:hover': {
                  borderColor: theme.palette.primary.main,
                  backgroundColor: theme.palette.grey[100],
                  color: theme.palette.primary.main,
                },
                '&:focus': {
                  outline: `2px solid ${theme.palette.primary.main}`,
                  outlineOffset: '2px',
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
