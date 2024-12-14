import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setJoke } from '../redux/jokeSlice';
import { fetchRandomJoke, fetchJokeByQuery } from '../services/api';
import { RootState } from '../redux/store';

const Home = (): React.ReactElement => {
  const dispatch = useDispatch();
  const joke = useSelector((state: RootState) => state.joke.currentJoke);
  const iconUrl = useSelector((state: RootState) => state.joke.iconUrl);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleGetJoke = async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      const randomJoke = await fetchRandomJoke();
      dispatch(setJoke({ joke: randomJoke.joke, iconUrl: randomJoke.iconUrl }));
    } catch (error) {
      console.error('Error fetching joke:', error);
      setErrorMessage('Failed to fetch a random joke.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchJoke = async () => {
    if (!searchQuery.trim()) {
      setErrorMessage('Please enter a search query.');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    try {
      const searchedJoke = await fetchJokeByQuery(searchQuery);
      dispatch(
        setJoke({ joke: searchedJoke.joke, iconUrl: searchedJoke.iconUrl }),
      );
    } catch (error) {
      console.error('Error searching joke:', error);
      if (error instanceof Error) {
        setErrorMessage(error.message || 'No jokes found.');
      } else {
        setErrorMessage('An unknown error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetJoke();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Chuck Norris Jokes
      </Typography>

      <div style={{ marginTop: '1rem' }}>
        <TextField
          label="Search Jokes"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ marginRight: '1rem', width: '60%' }}
        />
        <Button variant="contained" color="primary" onClick={handleSearchJoke}>
          Search
        </Button>
      </div>

      {errorMessage && (
        <Typography color="error" style={{ marginTop: '1rem' }}>
          {errorMessage}
        </Typography>
      )}

      {iconUrl && (
        <img
          src={iconUrl}
          alt="Chuck Norris Icon"
          style={{ marginTop: '1rem', width: 80, height: 80 }}
        />
      )}

      <Typography style={{ marginTop: '1rem' }}>
        {joke || 'No joke available'}
      </Typography>

      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: '1rem' }}
        onClick={handleGetJoke}
      >
        Get another joke
      </Button>
    </div>
  );
};

export default Home;
