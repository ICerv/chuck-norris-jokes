import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { fetchJokeCategories, fetchJokeByCategory } from './services/api';
import { useDispatch } from 'react-redux';
import { setJoke } from './redux/jokeSlice';
import Home from './pages/Home';
import { Menu, MenuItem, Button } from '@mui/material';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
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
      const jokeData = await fetchJokeByCategory(category);
      dispatch(setJoke({ joke: jokeData.joke, iconUrl: jokeData.iconUrl }));
      setAnchorEl(null);
    } catch (error) {
      console.error('Error fetching joke:', error);
      setErrorMessage('Failed to fetch a joke.');
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
          }}
        >
          <span style={{ fontWeight: 'bold' }}>Chuck Norris Jokes</span>

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
