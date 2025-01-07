import React from 'react';
import { Link, Typography } from '@mui/material';
import LogoImage from '../../assets/images/logo.svg';
import { useIsMobile } from 'hooks/useResponsive';

const Logo: React.FC = () => {
  const isSm = useIsMobile();

  return (
    <Link
      href="https://api.chucknorris.io"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chuck Norris Jokes - go to API homepage"
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        textDecoration: 'none',
        color: 'inherit',
      }}
    >
      {isSm ? (
        <Typography
          variant="h6"
          component="span"
          sx={{ fontWeight: 'bold', paddingTop: '1rem' }}
        >
          Chuck Norris Jokes
        </Typography>
      ) : (
        <img
          src={LogoImage}
          alt="Chuck Norris Jokes Logo"
          role="img"
          style={{
            width: '120px',
            height: 'auto',
          }}
          aria-hidden="false"
        />
      )}
    </Link>
  );
};

export default Logo;
