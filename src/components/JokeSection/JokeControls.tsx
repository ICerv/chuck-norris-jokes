import React from 'react';
import {
  Chip,
  IconButton,
  ChipProps,
  useMediaQuery,
  Theme,
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

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
          color="primary"
          size={chipSize}
          sx={{
            fontFamily: "'Caveat', cursive",
            width: 80,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            '& .MuiChip-label': {
              fontSize: isMobile ? '1.2rem' : '1rem',
            },
          }}
        />
      )}
      <IconButton
        onClick={handleArrowClick}
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
