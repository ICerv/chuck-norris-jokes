import useMediaQuery from '@mui/material/useMediaQuery';
import JokeDesktopView from './JokeDesktopView';
import JokeMobileView from './JokeMobileView';
import theme from 'theme';
import Box from '@mui/material/Box';

interface JokeSectionProps {
  joke: string;
  category?: string;
  onNextCategoryOrQuery: () => void;

  isVisible: boolean;
}

const JokeSection: React.FC<JokeSectionProps> = ({
  joke,
  category,
  onNextCategoryOrQuery,

  isVisible,
}) => {
  const isSm = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {isSm ? (
        <JokeDesktopView
          joke={joke}
          category={category}
          handleArrowClick={onNextCategoryOrQuery}
          isVisible={isVisible}
        />
      ) : (
        <JokeMobileView
          joke={joke}
          category={category}
          handleArrowClick={onNextCategoryOrQuery}
          isVisible={isVisible}
        />
      )}
    </Box>
  );
};

export default JokeSection;
