import React, { useEffect } from 'react';
import { Container } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { setJoke } from '../redux/jokeSlice';
import { fetchRandomJoke } from '../services/api';
import JokeSection from '../components/JokeSection';

interface HomeProps {
  selectedCategory: string | null;
}

const Home: React.FC<HomeProps> = ({ selectedCategory }) => {
  const dispatch = useDispatch();

  const joke = useSelector((state: RootState) => state.joke.currentJoke);
  // const iconUrl = useSelector((state: RootState) => state.joke.iconUrl);
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
      sx={{
        position: 'relative',
        overflow: 'hidden',
        height: '100vh',
        padding: 0,
      }}
    >
      <JokeSection joke={joke || ''} category={category || undefined} />
    </Container>
  );
};

export default Home;
