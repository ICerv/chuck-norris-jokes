import React from 'react';
import { Box, Link } from '@mui/material';
import LogoImage from '../../assets/images/logo.png';

const Logo: React.FC = () => {
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
        alt="Logo"
        role="img"
        sx={{
          width: {
            xs: '100px',
            sm: '140px',
          },
          height: 'auto',
          marginTop: {
            xs: '0',
            sm: '-45px',
          },
        }}
      />
    </Link>
  );
};

export default Logo;
