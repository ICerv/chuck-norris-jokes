import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import FadeAnimation from './FadeAnimation';
import JokeControls from './JokeControls';

interface JokeMobileViewProps {
  joke: string;
  category?: string;
  handleArrowClick: () => void;
  isVisible: boolean;
}

const JokeMobileView: React.FC<JokeMobileViewProps> = ({
  joke,
  category,
  handleArrowClick,
  isVisible,
}) => {
  return (
    <Card
      sx={{
        maxWidth: 300,
        minHeight: 200,
        backgroundColor: 'secondary.main',
        color: 'white',
        textAlign: 'center',
        boxShadow: 3,
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: 2,
      }}
    >
      <CardContent>
        <FadeAnimation isVisible={isVisible}>
          <Typography
            variant="h5"
            sx={{
              fontFamily: "'Caveat', cursive",
              mb: 2,
              overflow: 'hidden',
            }}
          >
            {joke || 'No joke available'}
          </Typography>
        </FadeAnimation>
      </CardContent>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 1,
          mt: 2,
        }}
      >
        <JokeControls
          category={category}
          handleArrowClick={handleArrowClick}
          chipSize="medium"
        />
      </Box>
    </Card>
  );
};

export default JokeMobileView;
