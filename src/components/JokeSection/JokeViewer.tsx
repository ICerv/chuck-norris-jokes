import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';

interface JokeViewerProps {
  jokes: string[]; // Array of jokes in the current category
  category: string; // Current category name
  onChooseAnotherCategory: () => void; // Callback to choose a new category
  onBrowseRandomJokes: () => void; // Callback to browse random jokes
}

const JokeViewer: React.FC<JokeViewerProps> = ({
  jokes,
  category,
  onChooseAnotherCategory,
  onBrowseRandomJokes,
}) => {
  const [currentJokeIndex, setCurrentJokeIndex] = useState(0);
  const totalJokes = jokes.length;
  const isCategoryComplete = currentJokeIndex === totalJokes;

  const handleNextJoke = () => {
    if (currentJokeIndex < totalJokes - 1) {
      setCurrentJokeIndex(currentJokeIndex + 1);
    }
  };

  const handlePreviousJoke = () => {
    if (currentJokeIndex > 0) {
      setCurrentJokeIndex(currentJokeIndex - 1);
    }
  };

  const handleRestartCategory = () => {
    setCurrentJokeIndex(0);
  };

  return (
    <Box textAlign="center">
      {/* Progress or Completion Message */}
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        {isCategoryComplete
          ? `You've finished all jokes in '${category}' category!`
          : `${currentJokeIndex + 1} of ${totalJokes} jokes in '${category}' category`}
      </Typography>

      {/* Joke Display */}
      {!isCategoryComplete && (
        <Typography variant="body1" sx={{ marginBottom: 3 }}>
          {jokes[currentJokeIndex]}
        </Typography>
      )}

      {/* Navigation Buttons */}
      {!isCategoryComplete && (
        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePreviousJoke}
            disabled={currentJokeIndex === 0}
            sx={{ marginRight: 2 }}
          >
            Previous
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNextJoke}
            disabled={currentJokeIndex === totalJokes - 1}
          >
            Next
          </Button>
        </Box>
      )}

      {/* Action Options When Category is Complete */}
      {isCategoryComplete && (
        <Box sx={{ marginTop: 3 }}>
          <Button
            variant="outlined"
            color="primary"
            onClick={onChooseAnotherCategory}
            sx={{ marginRight: 2 }}
          >
            Choose Another Category
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={onBrowseRandomJokes}
            sx={{ marginRight: 2 }}
          >
            Browse Random Jokes
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleRestartCategory}
          >
            Restart Category
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default JokeViewer;
