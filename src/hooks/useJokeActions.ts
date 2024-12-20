import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setJoke } from '../redux/jokeSlice';
import {
  fetchJokeCategories,
  fetchJokeByQuery,
  fetchRandomJoke,
  fetchJokeByCategory,
} from '../services/api';

interface Joke {
  joke: string;
  iconUrl: string | null;
  category: string | null;
}

const useJokeActions = () => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await fetchJokeCategories();
        setCategories(data);
      } catch {
        setErrorMessage('Failed to fetch categories.');
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = async (category: string) => {
    setLoading(true);
    setErrorMessage('');
    try {
      let jokeData;

      if (category === 'random') {
        jokeData = await fetchRandomJoke();
      } else {
        jokeData = await fetchJokeByCategory(category);
      }

      const mappedJoke: Joke = {
        joke: jokeData.joke || 'No joke available',
        iconUrl: jokeData.iconUrl || null,
        category: jokeData.category || null,
      };

      dispatch(setJoke(mappedJoke));
    } catch {
      setErrorMessage('Failed to fetch joke.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    setErrorMessage('');
    setLoading(true);

    try {
      const jokeData = await fetchJokeByQuery(query);

      if (!jokeData || jokeData.joke.startsWith('No jokes found')) {
        setErrorMessage(
          `No results found for "${query}". Please try a different query.`,
        );
        return;
      }

      dispatch(setJoke(jokeData));
    } catch {
      setErrorMessage('Failed to fetch joke. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return {
    categories,
    handleCategoryClick,
    handleSearch,
    loading,
    errorMessage,
    setErrorMessage,
  };
};

export default useJokeActions;
