import React from 'react';
import {
  Chip,
  IconButton,
  ChipProps,
  useMediaQuery,
  Theme,
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import theme from 'theme';

interface JokeControlsProps {
  category?: string;
  handleArrowClick: () => void;
  chipSize?: ChipProps['size'];
}

const JokeControls: React.FC<JokeControlsProps> = ({
  category,
  handleArrowClick,
  chipSize = 'medium',
}) => {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm'),
  );

  return (
    <>
      {category && (
        <Chip
          label={category}
          sx={{
            backgroundColor: theme.palette.secondary.main,
            color: 'white',
            fontFamily: "'Caveat', cursive",
            border: isMobile ? '1px solid white' : 'none',
            width: 70,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            '& .MuiChip-label': {
              fontSize: isMobile ? '1.2rem' : '1rem',
            },
          }}
          size={chipSize}
        />
      )}
      <IconButton
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handleArrowClick();
        }}
        disableRipple
        size="small"
        sx={{
          color: 'white',
        }}
        aria-label="Next joke or category"
      >
        <ArrowForwardIosIcon fontSize="small" />
      </IconButton>
    </>
  );
};

export default JokeControls;
