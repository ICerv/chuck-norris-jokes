import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setJoke } from '../redux/jokeSlice';
import { fetchJokeByCategory, fetchRandomJoke } from '../services/api';
import JokeSection from '../components/JokeSection/JokeSection';
import { RootState } from '../redux/store';

interface HomeProps {
  selectedCategory: string | null;
  searchQuery: string;
  onSearch: (query: string) => Promise<void>;
}

const Home: React.FC<HomeProps> = ({
  selectedCategory,
  searchQuery,
  onSearch,
}) => {
  const dispatch = useDispatch();

  const joke = useSelector((state: RootState) => state.joke.currentJoke);
  const category = useSelector((state: RootState) => state.joke.category);

  const fetchCategoryOrRandomJoke = useCallback(async () => {
    const jokeData = selectedCategory
      ? await fetchJokeByCategory(selectedCategory)
      : await fetchRandomJoke();

    dispatch(
      setJoke({
        joke: jokeData.joke,
        iconUrl: jokeData.iconUrl,
        category: selectedCategory || jokeData.category || 'Random',
      }),
    );
  }, [dispatch, selectedCategory]);

  // Handler for fetching jokes via search query
  const fetchSearchJoke = useCallback(async () => {
    if (searchQuery.trim()) {
      await onSearch(searchQuery);
    }
  }, [onSearch, searchQuery]);

  // Unified handler for either search or category
  const handleNextJoke = useCallback(async () => {
    if (searchQuery.trim()) {
      await fetchSearchJoke();
    } else {
      await fetchCategoryOrRandomJoke();
    }
  }, [fetchCategoryOrRandomJoke, fetchSearchJoke, searchQuery]);

  // Run fetch when the category changes
  useEffect(() => {
    fetchCategoryOrRandomJoke();
  }, [fetchCategoryOrRandomJoke]);

  return (
    <JokeSection
      joke={joke || 'No joke available'}
      category={category || 'Random'}
      onNextCategoryOrQuery={handleNextJoke}
      isVisible
    />
  );
};

export default Home;
