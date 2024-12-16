import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setJoke } from '../redux/jokeSlice';
import { fetchJokeByCategory, fetchRandomJoke } from '../services/api';
import JokeSection from '../components/JokeSection';
import { RootState } from '../redux/store';

interface HomeProps {
  selectedCategory: string | null;
}

const Home: React.FC<HomeProps> = ({ selectedCategory }) => {
  const dispatch = useDispatch();

  const joke = useSelector((state: RootState) => state.joke.currentJoke);
  const category = useSelector((state: RootState) => state.joke.category);

  const [currentJoke, setCurrentJoke] = useState<string>(joke || '');
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const loadJoke = async () => {
      try {
        const jokeData = selectedCategory
          ? await fetchJokeByCategory(selectedCategory)
          : await fetchRandomJoke();

        setCurrentJoke(jokeData.joke);

        dispatch(
          setJoke({
            joke: jokeData.joke,
            iconUrl: jokeData.iconUrl,
            category: selectedCategory || jokeData.category || 'Unknown',
          }),
        );
      } catch (error) {
        console.error('Failed to fetch joke:', error);
      }
    };

    loadJoke();
  }, [dispatch, selectedCategory, currentIndex]);

  useEffect(() => {
    if (joke) {
      setCurrentJoke(joke);
    }
  }, [joke]);

  const handleNextJoke = () => setCurrentIndex((prev) => prev + 1);

  return (
    <JokeSection
      joke={currentJoke}
      category={category || 'Random'}
      onNextCategory={handleNextJoke}
    />
  );
};

export default Home;
