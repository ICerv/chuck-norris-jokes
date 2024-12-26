import React, { useState, useEffect } from 'react';
import JokeSection from '../components/JokeSection/JokeSection';
import Loading from '../components/Loading';
import { calculateIsSearchQuery } from '../utils/helpers';

interface HomeProps {
  currentJoke: string;
  searchResults: { text: string; category: string; iconUrl: string | null }[];
  currentIndex: number;
  onNextJoke: () => void;
  onPreviousJoke: () => void;
  onNextCategoryOrQuery: () => void;
  errorMessage: string | null;
  total?: number;
  category?: string;
}

const Home: React.FC<HomeProps> = ({
  currentJoke,
  searchResults,
  currentIndex,
  onNextJoke,
  onPreviousJoke,
  onNextCategoryOrQuery,
  errorMessage,
  total,
  category,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  const displayedJoke =
    searchResults.length > 0
      ? searchResults[currentIndex]?.text || 'No joke available'
      : currentJoke || 'No joke available';

  const displayedCategory =
    searchResults.length > 0
      ? searchResults[currentIndex]?.category
      : category || 'Uncategorized';

  const isSearchQuery = calculateIsSearchQuery(
    searchResults.length > 0 ? 'searchQueryPlaceholder' : undefined,
    total,
  );

  return (
    <JokeSection
      joke={errorMessage || displayedJoke}
      query={isSearchQuery ? 'searchQueryPlaceholder' : undefined}
      category={displayedCategory}
      total={total}
      onNextCategoryOrQuery={onNextCategoryOrQuery}
      onNext={onNextJoke}
      onPrevious={onPreviousJoke}
      errorMessage={errorMessage}
      icon={searchResults[currentIndex]?.iconUrl || null}
      currentIndex={currentIndex}
    />
  );
};

export default Home;
