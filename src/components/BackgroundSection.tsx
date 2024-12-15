import React, { ReactNode } from 'react';
import { Box, useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

interface BackgroundSectionProps {
  children: ReactNode;
}

const BackgroundSection: React.FC<BackgroundSectionProps> = ({ children }) => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        backgroundImage: isSm
          ? 'url(/images/chuck_norris_mobile.png)'
          : 'url(/images/chuck_norris_desktop.png)',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: isSm ? 'top' : 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {children}
    </Box>
  );
};

export default BackgroundSection;
