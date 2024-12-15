import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './pages/Home';
import useJokeActions from './hooks/useJokeActions';
import Header from './components/Header';

const App: React.FC = () => {
  const {
    categories,
    handleCategoryClick,
    handleSearch,
    loading,
    errorMessage,
  } = useJokeActions();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategorySelection = (category: string) => {
    setSelectedCategory(category);
    handleCategoryClick(category);
  };

  return (
    <Router>
      <Header
        categories={categories}
        onCategoryClick={handleCategorySelection}
        searchQuery={searchQuery}
        onSearch={() => handleSearch(searchQuery)}
        onSearchQueryChange={setSearchQuery}
        loading={loading}
        errorMessage={errorMessage}
      />
      <Home selectedCategory={selectedCategory} />
    </Router>
  );
};

export default App;
