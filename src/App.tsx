import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { fetchJokeCategories, fetchJokeByQuery } from './services/api';
import { useDispatch } from 'react-redux';
import { setJoke } from './redux/jokeSlice';
import Home from './pages/Home';
import {
  Menu,
  MenuItem,
  Button,
  TextField,
  Box,
  CircularProgress,
} from '@mui/material';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await fetchJokeCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setErrorMessage('Failed to fetch categories.');
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = async (category: string) => {
    try {
      setSelectedCategory(category);
      const jokeData = await fetchJokeByQuery(category);
      dispatch(setJoke({ joke: jokeData.joke, iconUrl: jokeData.iconUrl }));
      setAnchorEl(null);
    } catch (error) {
      console.error('Error fetching joke:', error);
      setErrorMessage('Failed to fetch a joke.');
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      const jokeData = await fetchJokeByQuery(searchQuery);
      dispatch(setJoke({ joke: jokeData.joke, iconUrl: jokeData.iconUrl }));
    } catch (error) {
      console.error('Error fetching joke:', error);
      setErrorMessage('Failed to fetch jokes.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Router>
      <div>
        <nav
          style={{
            padding: '1rem',
            backgroundColor: '#f5f5f5',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* Logo */}
          <span style={{ fontWeight: 'bold' }}>Chuck Norris Jokes</span>

          {/* Search Bar */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <TextField
              size="small"
              label="Search Jokes"
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ minWidth: '400px' }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSearch}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                'Search'
              )}
            </Button>
          </Box>

          {/* Categories Dropdown */}
          <Button
            aria-controls="category-menu"
            aria-haspopup="true"
            onClick={(e) => setAnchorEl(e.currentTarget)}
            style={{ textTransform: 'none' }}
          >
            Categories
          </Button>
          <Menu
            id="category-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            {categories.map((category) => (
              <MenuItem
                key={category}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </MenuItem>
            ))}
          </Menu>
        </nav>

        <Home selectedCategory={selectedCategory} />

        {errorMessage && (
          <p style={{ color: 'red', textAlign: 'center', marginTop: '1rem' }}>
            {errorMessage}
          </p>
        )}
      </div>
    </Router>
  );
};

export default App;
