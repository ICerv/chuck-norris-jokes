import React from 'react';
import { Box, Typography } from '@mui/material';
import JokeControls from './JokeControls';
import theme from 'theme';
import FadeAnimation from './FadeAnimation';

interface JokeMobileViewProps {
  joke: string;
  category?: string;
  handleArrowClick: () => void;
}

const JokeMobileView: React.FC<JokeMobileViewProps> = ({
  joke,
  category,
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
        src="/images/chuck_norris_mobile.png"
        alt="Chuck Norris Mobile"
        sx={{
          width: '100%',
          aspectRatio: '1 / 1',
          objectFit: 'contain',
        }}
      />

      {/* Joke Text Section */}
      <Box
        sx={{
          flex: '1 1 auto',
          paddingX: theme.spacing(3),
          textAlign: 'center',
        }}
      >
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

      {/* Fixed Controls at the Bottom */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          backgroundColor: theme.palette.background.paper,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: theme.spacing(2),
          zIndex: 1,
          borderTop: `1px solid ${theme.palette.divider}`,
        }}
      >
        <JokeControls category={category} handleArrowClick={handleArrowClick} />
      </Box>
    </Box>
  );
};

export default JokeMobileView;
