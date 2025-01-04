import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';

const Loading: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100%',
      }}
    >
      <CircularProgress size={50} />
    </Box>
  );
};

export default Loading;
