import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './redux/store';
import {
  fetchCategories,
  fetchJokesByCategory,
  resetCategory,
  setCategory,
} from './redux/categorySlice';
import { fetchRandomJoke } from './redux/randomJokeSlice';
import {
  clearError,
  fetchJokesByQuery,
  resetSearchState,
  setSearchQuery,
} from './redux/searchSlice';
import { Box, Button } from '@mui/material';

import Home from './pages/Home';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ResetButton from './components/ResetButton';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { categories, currentCategory, currentJoke } = useSelector(
    (state: RootState) => state.categories,
  );
  const randomJoke = useSelector((state: RootState) => state.randomJoke);
  const searchResults = useSelector((state: RootState) => state.search.results);
  const totalSearchResults = useSelector(
    (state: RootState) => state.search.total,
  );
  const searchQuery = useSelector((state: RootState) => state.search.query);
  const errorMessage = useSelector(
    (state: RootState) => state.search.errorMessage,
  );
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchRandomJoke())
      .unwrap()
      .catch(() => console.error('Failed to fetch a random joke.'));
  }, [dispatch]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setCurrentIndex(0);
    dispatch(setSearchQuery(searchQuery));
    dispatch(fetchJokesByQuery(searchQuery))
      .unwrap()
      .catch(() => console.error('Failed to fetch jokes.'));
  };

  const handleCategoryClick = (category: string) => {
    dispatch(resetSearchState());
    setCurrentIndex(0);
    dispatch(setCategory(category));
    dispatch(fetchJokesByCategory(category))
      .unwrap()
      .catch(() =>
        console.error('Failed to fetch jokes for category:', category),
      );
  };

  const handleArrowClick = () => {
    if (currentCategory) {
      dispatch(fetchJokesByCategory(currentCategory));
    } else {
      dispatch(fetchRandomJoke());
    }
  };

  const handleRandomJokeClick = () => {
    dispatch(resetCategory());
    dispatch(resetSearchState());
    dispatch(fetchRandomJoke()).unwrap();
  };

  const handleSearchQueryChange = (query: string) => {
    dispatch(setSearchQuery(query));
  };

  const handleClearSearch = () => {
    dispatch(resetSearchState());
    dispatch(resetCategory());
    dispatch(fetchRandomJoke());
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Header
        categories={categories}
        onCategoryClick={handleCategoryClick}
        onRandomJokeClick={handleRandomJokeClick}
        onClearError={() => dispatch(clearError())}
        searchQuery={searchQuery}
        onSearchQueryChange={handleSearchQueryChange}
        onSearch={handleSearch}
        onClearSearch={handleClearSearch}
        errorMessage={errorMessage}
        loading={false}
      />

      <Box
        sx={{
          flex: '1 0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Home
          currentJoke={
            typeof currentJoke === 'string'
              ? currentJoke
              : currentJoke?.text ||
                randomJoke.currentJoke ||
                'No joke available'
          }
          searchResults={searchResults}
          currentIndex={currentIndex}
          onNextJoke={() =>
            setCurrentIndex((prev) => (prev + 1) % searchResults.length)
          }
          onPreviousJoke={() =>
            setCurrentIndex((prev) =>
              prev === 0 ? searchResults.length - 1 : prev - 1,
            )
          }
          onNextCategoryOrQuery={handleArrowClick}
          errorMessage={errorMessage}
          total={searchQuery ? totalSearchResults : undefined}
          category={currentCategory || randomJoke.category || 'Uncategorized'}
        />
      </Box>

      <ResetButton onResetClick={handleClearSearch} />

      <Footer />
    </Box>
  );
};

export default App;
