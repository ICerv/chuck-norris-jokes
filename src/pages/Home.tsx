import React from 'react';
import { Button, Typography } from '@mui/material';

const Home = (): React.ReactElement => {
  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Chuck Norris Jokes
      </Typography>

      <Typography>Joke</Typography>
      <Button variant="contained" color="primary" style={{ marginTop: '1rem' }}>
        Get another joke
      </Button>
    </div>
  );
};

export default Home;
