import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setJoke } from '../redux/jokeSlice';
import { fetchJokeByCategory, fetchRandomJoke } from '../services/api';
import JokeSection from '../components/JokeSection/JokeSection';
import { RootState } from '../redux/store';

interface HomeProps {
  selectedCategory: string | null;
  searchQuery: string;
  onSearch: (query: string) => void;
}

const Home: React.FC<HomeProps> = ({
  selectedCategory,
  searchQuery,
  onSearch,
}) => {
  const dispatch = useDispatch();

  const joke = useSelector((state: RootState) => state.joke.currentJoke);
  const category = useSelector((state: RootState) => state.joke.category);

  const [currentJoke, setCurrentJoke] = useState<string>(joke || '');
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const loadJoke = async () => {
      try {
        setIsVisible(false);
        const jokeData = selectedCategory
          ? await fetchJokeByCategory(selectedCategory)
          : await fetchRandomJoke();

        setTimeout(() => {
          setCurrentJoke(jokeData.joke);
          const jokeCategory =
            jokeData.category && jokeData.category.length > 0
              ? jokeData.category
              : selectedCategory || 'Unknown';

          dispatch(
            setJoke({
              joke: jokeData.joke,
              iconUrl: jokeData.iconUrl,
              category: jokeCategory,
            }),
          );
          setIsVisible(true);
        }, 300);
      } catch (error) {
        console.error('Failed to fetch joke:', error);
      }
    };

    loadJoke();
  }, [dispatch, selectedCategory, currentIndex]);

  useEffect(() => {
    if (joke) {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentJoke(joke);
        setIsVisible(true);
      }, 300);
    }
  }, [joke]);

  const handleNextJoke = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  return (
    <JokeSection
      joke={currentJoke}
      category={category || 'Random'}
      searchQuery={searchQuery}
      onSearch={onSearch}
      onNextCategory={handleNextJoke}
      isVisible={isVisible}
    />
  );
};

export default Home;
