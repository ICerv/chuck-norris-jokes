import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import JokeDesktopView from './JokeDesktopView';
import JokeMobileView from './JokeMobileView';
import theme from '../../theme';
import Box from '@mui/material/Box';
import { calculateIsSearchQuery } from '../../utils/helpers';

interface JokeSectionProps {
  joke: string;
  category: string;
  query?: string;
  total?: number;
  onNextCategoryOrQuery: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  errorMessage?: string | null;
  currentIndex?: number;
}

const JokeSection: React.FC<JokeSectionProps> = ({
  joke,
  category,
  total,
  query,
  onNextCategoryOrQuery,
  onNext,
  onPrevious,
  errorMessage,
  currentIndex,
}) => {
  const isSm = useMediaQuery(theme.breakpoints.up('sm'));
  const isSearchQuery = calculateIsSearchQuery(query, total);

  return (
    <Box
      role="region"
      aria-live="polite"
      aria-atomic="true"
      aria-describedby="joke-description"
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {isSm ? (
        <JokeDesktopView
          joke={errorMessage || joke}
          category={isSearchQuery ? undefined : category}
          total={total}
          currentIndex={currentIndex}
          onNext={onNext}
          onPrevious={onPrevious}
          handleArrowClick={onNextCategoryOrQuery}
          query={query}
          errorMessage={errorMessage}
        />
      ) : (
        <JokeMobileView
          joke={errorMessage || joke}
          category={isSearchQuery ? undefined : category}
          query={query}
          total={total}
          currentIndex={currentIndex}
          onNext={onNext}
          onPrevious={onPrevious}
          handleArrowClick={onNextCategoryOrQuery}
          errorMessage={errorMessage}
        />
      )}
    </Box>
  );
};

export default JokeSection;
