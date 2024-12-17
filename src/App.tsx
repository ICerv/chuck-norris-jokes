import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './pages/Home';
import useJokeActions from './hooks/useJokeActions';
import Header from './components/Header';
import { Box } from '@mui/material';
import Footer from './components/Footer';

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

  const handleCategorySelection = (category: string) => {
    setSelectedCategory(category);
    handleCategoryClick(category);
  };

  const handleRandomJoke = () => {
    setSearchQuery('');
    setSelectedCategory(null);
    handleCategoryClick('random');
  };

  const clearErrorMessage = () => {
    setErrorMessage('');
  };

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
        <Header
          categories={categories}
          onCategoryClick={handleCategorySelection}
          searchQuery={searchQuery}
          onSearch={() => handleSearch(searchQuery)}
          onSearchQueryChange={setSearchQuery}
          loading={loading}
          errorMessage={errorMessage}
          onRandomJokeClick={handleRandomJoke}
          onClearError={clearErrorMessage}
        />

        <Box
          style={{ flex: '1 0 auto', display: 'flex', alignItems: 'center' }}
        >
          <Home
            selectedCategory={selectedCategory}
            searchQuery={searchQuery}
            onSearch={handleSearch}
          />
        </Box>
        <Footer />
      </Box>
    </Router>
  );
};

export default App;
