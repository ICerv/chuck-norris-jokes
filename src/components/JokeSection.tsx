import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  IconButton,
  useMediaQuery,
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import theme from '../theme';
import FadeAnimation from './FadeAnimation';

interface JokeSectionProps {
  joke: string;
  category?: string;
  onNextCategory: () => void;
  searchQuery: string;
  onSearch: (query: string) => void;
  isVisible: boolean;
}

const JokeSection: React.FC<JokeSectionProps> = ({
  joke,
  category,
  onNextCategory,
  searchQuery,
  onSearch,
  isVisible,
}) => {
  const isSm = useMediaQuery(theme.breakpoints.up('sm'));

  const handleArrowClick = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    } else {
      onNextCategory();
    }
  };

  return (
    <Box
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
        // Desktop view with background image
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
      ) : (
        // Mobile view with Card
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
          {/* Category and Arrow */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 1,
              mt: 2,
            }}
          >
            {category && (
              <Chip
                label={category}
                color="primary"
                size="medium"
                sx={{
                  fontFamily: "'Caveat', cursive",
                  width: 80,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  '& .MuiChip-label': {
                    fontSize: '1.1rem',
                  },
                }}
              />
            )}
            <IconButton
              onClick={handleArrowClick}
              size="small"
              sx={{ color: 'white' }}
            >
              <ArrowForwardIosIcon fontSize="small" />
            </IconButton>
          </Box>
        </Card>
      )}

      {/* Desktop content */}
      {isSm && (
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
                padding: '1rem 0 2rem',
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
                  {category && (
                    <Chip
                      label={category}
                      color="secondary"
                      size="small"
                      sx={{
                        fontFamily: "'Caveat', cursive",
                        px: 0.5,
                        width: 80,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        '& .MuiChip-label': {
                          fontSize: '1rem',
                        },
                      }}
                    />
                  )}
                  <IconButton
                    onClick={handleArrowClick}
                    size="small"
                    sx={{ color: 'white' }}
                  >
                    <ArrowForwardIosIcon fontSize="small" />
                  </IconButton>
                </Box>
              )}
            </Box>
          </foreignObject>
        </Box>
      )}
    </Box>
  );
};

export default JokeSection;
