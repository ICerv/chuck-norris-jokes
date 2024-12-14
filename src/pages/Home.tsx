import React from 'react';
import { Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setJoke } from '../redux/jokeSlice';
import { fetchRandomJoke } from '../services/api';
import { RootState } from '../redux/store';
const Home = (): React.ReactElement => {
  const dispatch = useDispatch();
  const joke = useSelector((state: RootState) => state.joke.currentJoke);

  const handleGetJoke = async () => {
    try {
      const randomJoke = await fetchRandomJoke();
      dispatch(setJoke(randomJoke.value));
    } catch (error) {
      console.error('Error fetching joke:', error);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Chuck Norris Jokes
      </Typography>

      <Typography style={{ marginTop: '1rem' }}>
        {joke || 'Click the button to get a joke!'}
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
