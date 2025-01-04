import { Box, Typography, Container, Link, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React from 'react';

function Footer() {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.up('sm'));

  if (!isSm) {
    return null;
  }

  return (
    <footer
      style={{
        width: '100%',
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        padding: '1rem 0',
        textAlign: 'center',
        marginTop: 'auto',
      }}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <Typography
          variant="body2"
          sx={{ fontSize: '0.875rem' }}
          role="contentinfo"
        >
          &copy; 2024 Created by Inna Červenková
        </Typography>

        <Link
          aria-label="View the source code on GitHub"
          href="https://github.com/ICerv/chuck-norris-jokes"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            display: 'flex',
            alignItems: 'center',
            color: 'text.primary',
            textDecoration: 'none',
            '&:hover': { color: 'primary.main' },
          }}
        >
          <IconButton color="inherit" size="small" aria-label="GitHub link">
            <GitHubIcon fontSize="inherit" />
          </IconButton>
          <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
            View on GitHub
          </Typography>
        </Link>
      </Container>
    </footer>
  );
}

export default Footer;
