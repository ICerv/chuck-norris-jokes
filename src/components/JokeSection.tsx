import React from 'react';
import { Box, Typography, Chip, useMediaQuery, useTheme } from '@mui/material';

interface JokeSectionProps {
  joke: string | null;
  iconUrl: string | null;
  category: string | null;
}

const JokeSection: React.FC<JokeSectionProps> = ({
  joke,
  iconUrl,
  category,
}) => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Box
      sx={{
        textAlign: 'center',
        width: { xs: '90%', sm: '70%', md: '40%' },
        padding: '1rem',
        borderRadius: '8px',
        color: isSm ? theme.palette.text.primary : theme.palette.common.white,
      }}
    >
      {/* Joke Icon */}
      {iconUrl && (
        <img
          src={iconUrl}
          alt="Chuck Norris Icon"
          style={{
            width: 60,
            height: 60,
            marginBottom: '1rem',
          }}
        />
      )}

      {/* Joke Text */}
      <Typography
        variant="h6"
        sx={{
          fontFamily: "'Caveat', cursive",
          fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.8rem' },
          lineHeight: 1.5,
        }}
      >
        {joke || 'No joke available'}
      </Typography>

      {/* Joke Category */}
      {category && (
        <Box sx={{ marginTop: '1rem' }}>
          <Chip
            label={category}
            color="primary"
            sx={{ fontSize: { xs: '0.8rem', sm: '1rem' } }}
          />
        </Box>
      )}
    </Box>
  );
};

export default JokeSection;
