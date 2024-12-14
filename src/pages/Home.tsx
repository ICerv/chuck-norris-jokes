import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setJoke } from '../redux/jokeSlice';
import { fetchRandomJoke } from '../services/api';
import { RootState } from '../redux/store';

const Home = (): React.ReactElement => {
  const dispatch = useDispatch();
  const joke = useSelector((state: RootState) => state.joke.currentJoke);
  const iconUrl = useSelector((state: RootState) => state.joke.iconUrl);
  const [loading, setLoading] = useState(true);

  const handleGetJoke = async () => {
    setLoading(true);
    try {
      const randomJoke = await fetchRandomJoke();
      dispatch(setJoke({ joke: randomJoke.joke, iconUrl: randomJoke.iconUrl }));
    } catch (error) {
      console.error('Error fetching joke:', error);
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
