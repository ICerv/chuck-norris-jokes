import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  Typography,
  CircularProgress,
  Box,
  Container,
  Chip,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setJoke } from '../redux/jokeSlice';
import { fetchRandomJoke, fetchJokeByQuery } from '../services/api';
import { RootState } from '../redux/store';

interface HomeProps {
  selectedCategory: string | null;
}

const Home: React.FC<HomeProps> = ({ selectedCategory }) => {
  const dispatch = useDispatch();
  const joke = useSelector((state: RootState) => state.joke.currentJoke);
  const iconUrl = useSelector((state: RootState) => state.joke.iconUrl);

  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const loadInitialJoke = async () => {
      setLoading(true);
      setErrorMessage('');

      try {
        const jokeData = await fetchRandomJoke();
        dispatch(setJoke({ joke: jokeData.joke, iconUrl: jokeData.iconUrl }));
      } catch (error) {
        console.error('Error fetching initial joke:', error);
        setErrorMessage('Failed to fetch the initial joke.');
      } finally {
        setLoading(false);
      }
    };

    loadInitialJoke();
  }, [dispatch]);

  const handleSearch = async () => {
    setLoading(true);
    setErrorMessage('');

    try {
      let jokeData;

      if (searchQuery) {
        jokeData = await fetchJokeByQuery(searchQuery);
      } else {
        jokeData = await fetchRandomJoke();
      }

      dispatch(setJoke({ joke: jokeData.joke, iconUrl: jokeData.iconUrl }));
    } catch (error) {
      console.error('Error fetching joke:', error);
      setErrorMessage(
        error instanceof Error
          ? error.message || 'No jokes found for the given query.'
          : 'An unknown error occurred.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Box sx={{ textAlign: 'center', marginTop: '2rem' }}>
        <Typography variant="h4" gutterBottom>
          Chuck Norris Jokes
        </Typography>

        {/* Search Section */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '1rem',
          }}
        >
          <TextField
            label="Search Jokes"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ width: '60%' }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            sx={{ marginLeft: '1rem' }}
          >
            Search
          </Button>
        </Box>

        {loading && (
          <Box sx={{ marginTop: '2rem' }}>
            <CircularProgress />
          </Box>
        )}

        {errorMessage && (
          <Typography color="error" sx={{ marginTop: '1rem' }}>
            {errorMessage}
          </Typography>
        )}

        {/* Joke Section */}
        <Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
              marginTop: '2rem',
            }}
          >
            {iconUrl && (
              <img
                src={iconUrl}
                alt="Chuck Norris Icon"
                style={{ marginRight: '1rem', width: 80, height: 80 }}
              />
            )}

            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography sx={{ fontSize: '1.2rem', textAlign: 'left' }}>
                {joke || 'No joke available'}
              </Typography>

              {selectedCategory && (
                <Box sx={{ marginTop: '2.5rem', textAlign: 'left' }}>
                  <Chip
                    label={selectedCategory}
                    color="primary"
                    sx={{ fontSize: '1rem' }}
                  />
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
