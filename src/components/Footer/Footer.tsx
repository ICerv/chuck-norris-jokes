import { Box, Typography, Container, Link, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        backgroundColor: 'background.default',
        color: 'text.secondary',
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
        <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
          &copy; 2024 Created by Inna Červenková
        </Typography>

        <Link
          href="https://github.com/ICerv/chuck-norris-jokes"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            display: 'flex',
            alignItems: 'center',
            color: 'text.secondary',
            textDecoration: 'none',
            '&:hover': { color: 'primary.main' },
          }}
        >
          <IconButton color="inherit" size="small">
            <GitHubIcon fontSize="inherit" />
          </IconButton>
          <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
            View on GitHub
          </Typography>
        </Link>
      </Container>
    </Box>
  );
}

export default Footer;
