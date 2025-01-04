import React from 'react';
import {
  Typography,
  Container,
  Link,
  IconButton,
  useMediaQuery,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useTheme, styled } from '@mui/material/styles';

const StyledFooter = styled('footer')(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  padding: theme.spacing(2, 0),
  textAlign: 'center',
  marginTop: 'auto',
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

const StyledLink = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  color: theme.palette.text.primary,
  textDecoration: 'none',
  '&:hover': {
    color: theme.palette.primary.main,
  },
}));

function Footer() {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.up('sm'));

  if (!isSm) {
    return null;
  }

  return (
    <StyledFooter>
      <StyledContainer>
        <Typography
          variant="body2"
          sx={{
            fontSize: '0.875rem',
          }}
          role="contentinfo"
        >
          &copy; 2024 Created by Inna Červenková
        </Typography>

        <StyledLink
          aria-label="View the source code on GitHub"
          href="https://github.com/ICerv/chuck-norris-jokes"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconButton
            color="inherit"
            size="small"
            aria-label="GitHub link"
            sx={{
              marginRight: '0.25rem',
            }}
          >
            <GitHubIcon fontSize="inherit" />
          </IconButton>
          <Typography
            variant="body2"
            sx={{
              fontSize: '0.875rem',
            }}
          >
            View on GitHub
          </Typography>
        </StyledLink>
      </StyledContainer>
    </StyledFooter>
  );
}

export default Footer;
