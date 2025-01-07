import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { Box, IconButton } from '@mui/material';
import theme from '../theme';

const ResetButton: React.FC<{ onResetClick: () => void }> = ({
  onResetClick,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const nodeRef = useRef<HTMLElement>(null as unknown as HTMLElement);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragStop = () => {
    setIsDragging(false);
  };

  const handleClick = () => {
    if (!isDragging) {
      onResetClick();
    }
  };

  return (
    <Draggable
      nodeRef={nodeRef}
      onStart={handleDragStart}
      onStop={handleDragStop}
    >
      <Box
        ref={nodeRef}
        sx={{
          position: 'fixed',
          bottom: '1rem',
          right: { xs: '1rem', sm: '2rem' },
          zIndex: 1000,
          cursor: 'grab',
        }}
      >
        <IconButton
          role="button"
          aria-label="Reset button, draggable"
          onClick={handleClick}
          sx={{
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.secondary.contrastText,
            '&:hover': {
              color: theme.palette.secondary.main,
              backgroundColor: 'transparent',
              border: `2px solid ${theme.palette.secondary.main}`,
            },
          }}
        >
          <RestartAltIcon fontSize="large" />
        </IconButton>
      </Box>
    </Draggable>
  );
};

export default ResetButton;
