import React from 'react';
import JokeControls from './JokeControls';
import theme from '../../theme';
import FadeAnimation from './FadeAnimation';
import chuckNorrisMobile from '../../assets/images/chuck_norris_mobile.png';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface JokeMobileViewProps {
  joke: string;
  category?: string;
  query?: string;
  total?: number;
  currentIndex?: number;
  errorMessage?: string | null;
  onNext?: () => void;
  onPrevious?: () => void;
  handleArrowClick?: () => void;
}

const JokeMobileView: React.FC<JokeMobileViewProps> = ({
  joke,
  category,
  query,
  total,
  currentIndex,
  errorMessage,
  onNext,
  onPrevious,
  handleArrowClick,
}) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
      }}
    >
      {/* Chuck Norris Image */}
      <Box
        component="img"
        src={chuckNorrisMobile}
        alt="Illustration of Chuck Norris holding a board for displaying jokes"
        sx={{
          width: '100%',
          aspectRatio: '16 / 9',
          objectFit: 'contain',
          marginTop: theme.spacing(2),
        }}
      />

      {/* Joke Text Section */}
      <Box
        sx={{
          flex: '1 1 auto',
          paddingX: theme.spacing(3),
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: theme.spacing(2),
        }}
        aria-live="polite"
        tabIndex={-1}
      >
        {/* Joke Text */}
        <FadeAnimation keyProp={joke}>
          <Typography
            variant="h5"
            sx={{
              fontFamily: "'Caveat', cursive",
              overflow: 'hidden',
            }}
          >
            {joke || 'No joke available'}
          </Typography>
        </FadeAnimation>
      </Box>

      {/* Controls */}
      <Box
        role="group"
        aria-label="Joke navigation controls"
        sx={{
          position: 'fixed',
          bottom: 0,
          width: '100%',
          backgroundColor: theme.palette.background.paper,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: theme.spacing(3),
          zIndex: 1,
          borderTop: `1px solid ${theme.palette.divider}`,
          boxSizing: 'border-box',
        }}
      >
        {!errorMessage && (
          <JokeControls
            category={category}
            query={query}
            currentIndex={currentIndex}
            total={total}
            onNext={onNext}
            onPrevious={onPrevious}
            handleArrowClick={handleArrowClick}
          />
        )}
      </Box>
    </Box>
  );
};

export default JokeMobileView;
