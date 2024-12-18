import React from 'react';
import { Box, Typography } from '@mui/material';
import FadeAnimation from './FadeAnimation';
import JokeControls from './JokeControls';

interface JokeDesktopViewProps {
  joke: string;
  category?: string;
  handleArrowClick: () => void;
  isVisible: boolean;
}

const JokeDesktopView: React.FC<JokeDesktopViewProps> = ({
  joke,
  category,
  handleArrowClick,
  isVisible,
}) => {
  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
      <Box
        component="img"
        src="/images/chuck_norris_desktop.png"
        alt="Chuck Norris Board"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'contain',
        }}
      />
      <Box
        component="svg"
        viewBox="0 0 500 500"
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
        }}
      >
        <foreignObject x="170" y="210" width="250" height="185">
          <Box
            sx={{
              display: 'block',
              color: '#fff',
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
            <FadeAnimation isVisible={isVisible}>
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
            {joke && !joke.includes('No joke available') && (
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <JokeControls
                  category={category}
                  handleArrowClick={handleArrowClick}
                  chipSize="small"
                />
              </Box>
            )}
          </Box>
        </foreignObject>
      </Box>
    </Box>
  );
};

export default JokeDesktopView;
