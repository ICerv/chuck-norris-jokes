import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setJoke } from '../redux/jokeSlice';
import { fetchJokeByCategory, fetchRandomJoke } from '../services/api';
import JokeSection from '../components/JokeSection/JokeSection';
import { RootState } from '../redux/store';

interface HomeProps {
  selectedCategory: string | null;
  searchQuery: string;
  onSearch: (query: string) => Promise<void>; // Ensure `onSearch` is properly awaited
}

const Home: React.FC<HomeProps> = ({
  selectedCategory,
  searchQuery,
  onSearch,
}) => {
  const dispatch = useDispatch();

  const joke = useSelector((state: RootState) => state.joke.currentJoke);
  const category = useSelector((state: RootState) => state.joke.category);

  const [isVisible, setIsVisible] = useState<boolean>(true);

  // Common logic for triggering fade animations
  const triggerFadeAnimation = async (callback: () => Promise<void>) => {
    setIsVisible(false); // Trigger fade-out
    await callback(); // Wait for the provided callback (search or fetch)
    setTimeout(() => setIsVisible(true), 300); // Trigger fade-in after delay
  };

  // Fetch jokes based on the selected category or randomly
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
      await onSearch(searchQuery); // Call the provided `onSearch` function
    }
  }, [onSearch, searchQuery]);

  // Unified handler for either search or category
  const handleNextJoke = useCallback(() => {
    if (searchQuery.trim()) {
      triggerFadeAnimation(fetchSearchJoke);
    } else {
      triggerFadeAnimation(fetchCategoryOrRandomJoke);
    }
  }, [fetchCategoryOrRandomJoke, fetchSearchJoke, searchQuery]);

  // Run fetch when the category changes
  useEffect(() => {
    triggerFadeAnimation(fetchCategoryOrRandomJoke);
  }, [fetchCategoryOrRandomJoke]);

  return (
    <JokeSection
      joke={joke || 'No joke available'}
      category={category || 'Random'}
      onNextCategoryOrQuery={handleNextJoke}
      isVisible={isVisible}
    />
  );
};

export default Home;
