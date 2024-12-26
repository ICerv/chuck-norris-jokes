import React from 'react';
import JokeControls from './JokeControls';
import FadeAnimation from './FadeAnimation';
import chuckNorrisDesktop from '../../assets/images/chuck_norris_desktop.png';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface JokeDesktopViewProps {
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

const JokeDesktopView: React.FC<JokeDesktopViewProps> = ({
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
    <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
      <img
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'contain',
        }}
        src={chuckNorrisDesktop}
        alt="Background of Chuck Norris holding a board"
        loading="eager"
      />

      <Box
        component="svg"
        role="img"
        aria-labelledby="svgTitle"
        viewBox="0 0 500 500"
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
        }}
      >
        <title id="svgTitle">Joke Display Area</title>
        <foreignObject x="170" y="210" width="250" height="185">
          <Box
            sx={{
              display: 'block',
              color: 'white',
              textAlign: 'center',
              fontFamily: "'Caveat', cursive",
              wordWrap: 'break-word',
              height: '100%',
              padding: '1rem 0 2.2rem',
              boxSizing: 'border-box',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <div
              style={{
                overflowY: 'auto',
                maxHeight: '100%',
              }}
              aria-live="polite"
            >
              <FadeAnimation keyProp={joke}>
                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: "'Caveat', cursive",
                    color: 'white',
                  }}
                >
                  {joke || 'No joke available'}
                </Typography>
              </FadeAnimation>
            </div>

            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
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
                  aria-label="Joke navigation controls"
                />
              )}
            </Box>
          </Box>
        </foreignObject>
      </Box>
    </Box>
  );
};

export default JokeDesktopView;
