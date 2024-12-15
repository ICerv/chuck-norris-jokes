import React, { useEffect } from 'react';
import { Typography, Box, Container, Chip } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { setJoke } from '../redux/jokeSlice';
import { fetchRandomJoke } from '../services/api';

interface HomeProps {
  selectedCategory: string | null;
}

const Home: React.FC<HomeProps> = ({ selectedCategory }) => {
  const dispatch = useDispatch();

  const joke = useSelector((state: RootState) => state.joke.currentJoke);
  const iconUrl = useSelector((state: RootState) => state.joke.iconUrl);
  const category = useSelector((state: RootState) => state.joke.category);

  useEffect(() => {
    const loadJoke = async () => {
      try {
        const jokeData = await fetchRandomJoke();
        dispatch(
          setJoke({
            joke: jokeData.joke,
            iconUrl: jokeData.iconUrl,
            category: jokeData.category,
          }),
        );
      } catch (error) {
        console.error('Failed to fetch joke:', error);
      }
    };

    loadJoke();
  }, [dispatch]);

  return (
    <Container
      sx={{ position: 'relative', overflow: 'hidden', height: '100vh' }}
    >
      {/* Background Image */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          backgroundImage: 'url(/images/chuck_norris.png)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'top',
        }}
      >
        {/* Joke Section */}
        <Box
          sx={{
            position: 'absolute',
            top: '60%',
            left: '60%',
            transform: 'translate(-50%, -50%)',
            width: '40%',
            textAlign: 'center',
            backgroundColor: 'transparent',
            padding: '1rem',
            borderRadius: '8px',
            zIndex: 2,
          }}
        >
          {/* Joke Icon */}
          {iconUrl && (
            <img
              src={iconUrl}
              alt="Chuck Norris Icon"
              style={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                marginBottom: '1rem',
              }}
            />
          )}

          {/* Joke Text */}
          <Typography
            variant="h6"
            sx={{
              fontFamily: "'Caveat', cursive",
              color: 'white',
              fontSize: '1.5rem',
              lineHeight: 1.5,
            }}
          >
            {joke || 'No joke available'}
          </Typography>

          {/* Joke Category */}
          {category && (
            <Box sx={{ marginTop: '1rem' }}>
              <Chip
                label={category}
                color="primary"
                sx={{ fontSize: '1rem' }}
              />
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
