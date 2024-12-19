import React from 'react';
import {
  Box,
  Button,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from '@mui/material';

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
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Mobile responsiveness

  const openMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        color="secondary"
        onClick={openMenu}
        variant="text"
        sx={{
          textTransform: 'none',
          fontWeight: 'bold',
        }}
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
      >
        {/* Category Grid */}
        <Box
          display="grid"
          gridTemplateColumns={isMobile ? 'repeat(2, 1fr)' : 'repeat(2, 1fr)'}
          gap="8px"
          p="8px"
        >
          {categories.map((category) => (
            <MenuItem
              key={category}
              onClick={() => {
                onCategoryClick(category);
                closeMenu();
              }}
              sx={{
                textAlign: 'center',
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
                border: '1px solid lightgray',
                borderRadius: '8px',
                '&:hover': {
                  borderColor: 'primary.main',
                },
              }}
            >
              {category}
            </MenuItem>
          ))}
        </Box>

        {/* Random Button */}
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          p="16px"
        >
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              onRandomJokeClick();
              closeMenu();
            }}
            sx={{
              borderRadius: '25px',
              padding: '0.5rem 2rem',
              letterSpacing: '0.05rem',
              textTransform: 'none',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: 'secondary.dark',
              },
              width: isMobile ? '100%' : 'auto',
            }}
          >
            Random
          </Button>
        </Box>
      </Menu>
    </>
  );
};

export default CategoryMenu;
