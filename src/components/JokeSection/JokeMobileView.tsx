import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import FadeAnimation from './FadeAnimation';
import JokeControls from './JokeControls';
import theme from 'theme';

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
        backgroundColor: theme.palette.background.default,
        color: 'text.primary',
        textAlign: 'center',
        boxShadow: theme.shadows[3],
        border: `1px solid ${theme.colors.border}`,
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: 2,
      }}
    >
      <CardContent
        sx={{
          padding: '0px',
        }}
      >
        <FadeAnimation isVisible={isVisible}>
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
