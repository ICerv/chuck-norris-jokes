import React from 'react';
import { Box, Link, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import LogoImage from '../../assets/images/logo.png';
import { Theme } from '@mui/material/styles';

const Logo: React.FC = () => {
  const theme: Theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.up('sm'), { noSsr: true });

  return (
    <Link
      href="https://api.chucknorris.io"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chuck Norris Jokes - go to API homepage"
      sx={{
        textDecoration: 'none',
        color: 'inherit',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box
        component="img"
        src={LogoImage}
        alt="Chuck Norris Jokes Logo"
        role="img"
        sx={{
          width: '100px',
          height: 'auto',
          marginTop: {
            xs: '0',
            sm: '-25px',
          },
        }}
      />
    </Link>
  );
};

export default Logo;
