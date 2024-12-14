import React, { useEffect } from 'react';
import { Typography, Box, Container, Chip } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

interface HomeProps {
  selectedCategory: string | null;
}

const Home: React.FC<HomeProps> = ({ selectedCategory }) => {
  const joke = useSelector((state: RootState) => state.joke.currentJoke);
  const iconUrl = useSelector((state: RootState) => state.joke.iconUrl);

  useEffect(() => {}, [selectedCategory]);

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
              color: 'white',
              fontSize: '1.2rem',
              lineHeight: 1.5,
            }}
          >
            {joke || 'No joke available'}
          </Typography>

          {/* Selected Category */}
          {selectedCategory && (
            <Box sx={{ marginTop: '1rem' }}>
              <Chip
                label={selectedCategory}
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
