import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import useMediaQuery from '@mui/material/useMediaQuery';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import theme from '../../theme';
import { calculateIsSearchQuery } from '../../utils/helpers';

interface JokeControlsProps {
  category?: string;
  query?: string;
  total?: number;
  currentIndex?: number;
  onNext?: () => void;
  onPrevious?: () => void;
  handleArrowClick?: () => void;
}

const JokeControls: React.FC<JokeControlsProps> = ({
  category,
  query,
  total = 0,
  currentIndex = 0,
  onNext,
  onPrevious,
  handleArrowClick,
}) => {
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  const isSearchQuery = calculateIsSearchQuery(query, total);

  return (
    <Box
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      role="group"
      aria-label="Joke navigation controls"
    >
      {isSearchQuery ? (
        <>
          <IconButton
            role="button"
            onClick={onPrevious}
            disabled={currentIndex === 0}
            aria-label="Previous joke"
            sx={{
              padding: 0,
              color:
                currentIndex === 0
                  ? isSm
                    ? theme.palette.grey[500]
                    : 'white'
                  : theme.palette.secondary.main,
            }}
          >
            <ArrowBackIosIcon aria-hidden="true" />
          </IconButton>
          <Box
            sx={{ minWidth: '100px', textAlign: 'center' }}
            aria-live="polite"
            aria-atomic="true"
          >
            <Typography
              variant="body2"
              sx={{
                fontFamily: "'Caveat', cursive",
                fontSize: '1.2rem',
                color: isSm ? theme.palette.secondary.main : 'white',
              }}
            >
              {currentIndex !== undefined && total !== undefined
                ? `${currentIndex + 1} / ${total}`
                : '0 / 0'}
            </Typography>
          </Box>
          <IconButton
            role="button"
            onClick={onNext}
            disabled={currentIndex === (total || 1) - 1}
            aria-label="Next joke"
            sx={{
              padding: 0,
              color:
                currentIndex === (total || 1) - 1
                  ? theme.palette.grey[500]
                  : theme.palette.secondary.main,
            }}
          >
            <ArrowForwardIosIcon aria-hidden="true" />
          </IconButton>
        </>
      ) : (
        <>
          {category && (
            <>
              <Chip
                label={category}
                size={isSm ? 'medium' : 'small'}
                sx={{
                  color: 'white',
                  fontFamily: "'Caveat', cursive",
                  width: 'fit-content',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  '& .MuiChip-label': {
                    fontSize: isSm ? '1.5rem' : '1rem',
                  },
                }}
                aria-label={`Joke category: ${category}`}
              />
              <IconButton
                role="button"
                onClick={handleArrowClick}
                aria-label="Next joke"
                disableRipple
                size="small"
                sx={{
                  color: isSm ? theme.palette.secondary.main : 'white',
                  '&:hover': {
                    color: isSm
                      ? theme.palette.primary.dark
                      : theme.palette.secondary.main,
                    transition: 'color 0.3s',
                  },
                }}
              >
                <ArrowForwardIosIcon aria-hidden="true" />
              </IconButton>
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default JokeControls;
