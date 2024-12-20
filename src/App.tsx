import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './pages/Home';
import useJokeActions from './hooks/useJokeActions';

import { Box } from '@mui/material';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';

const App: React.FC = () => {
  const {
    categories,
    handleCategoryClick,
    handleSearch,
    loading,
    errorMessage,
    setErrorMessage,
  } = useJokeActions();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const selectCategory = (category: string) => {
    // setSearchQuery('');
    setSelectedCategory(category);
    handleCategoryClick(category);
  };

  const fetchRandomJoke = () => {
    setSearchQuery('');
    setSelectedCategory(null);
    handleCategoryClick('random');
  };

  const clearErrors = () => setErrorMessage('');

  return (
    <Router>
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        {/* Header */}
        <Header
          categories={categories}
          onCategoryClick={selectCategory}
          searchQuery={searchQuery}
          onSearch={() => handleSearch(searchQuery)}
          onSearchQueryChange={setSearchQuery}
          loading={loading}
          errorMessage={errorMessage}
          onRandomJokeClick={fetchRandomJoke}
          onClearError={clearErrors}
        />

        {/* Main Content */}
        <Box
          sx={{
            flex: '1 0 auto',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Home
            selectedCategory={selectedCategory}
            searchQuery={searchQuery}
            onSearch={handleSearch}
          />
        </Box>
        {/* Footer */}
        <Footer />
      </Box>
    </Router>
  );
};

export default App;
