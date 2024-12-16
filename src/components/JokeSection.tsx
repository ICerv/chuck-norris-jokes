import Chip from '@mui/material/Chip';
import React from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useMediaQuery } from '@mui/material';
import theme from '../theme';

interface JokeSectionProps {
  joke: string;
  iconUrl?: string;
  category?: string;
  onNextCategory: () => void;
}

const JokeSection: React.FC<JokeSectionProps> = ({
  joke,
  iconUrl,
  category,
  onNextCategory,
}) => {
  const isSm = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      {/* Background Image  */}
      <img
        src="/images/chuck_norris_desktop.png"
        alt="Chuck Norris Board"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: isSm ? 'cover' : 'contain',
        }}
      />

      <svg
        viewBox="0 0 500 500"
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
        }}
      >
        <foreignObject x="170" y="210" width="250" height="185">
          <div
            style={{
              position: 'relative',
              display: 'block',
              color: '#fff',
              textAlign: 'center',
              fontFamily: "'Caveat', cursive",
              wordWrap: 'break-word',
              height: '100%',
              padding: '1rem 0 2rem',
              boxSizing: 'border-box',
              overflow: 'hidden',
            }}
          >
            {/* Scroll text */}
            <div
              style={{
                overflowY: 'auto',
                height: '100%',
                paddingRight: '1rem',
                boxSizing: 'content-box',
                paddingLeft: '1rem',
              }}
            >
              {joke || 'No joke available'}
            </div>

            {/* Chip and Arrow */}
            {joke && !joke.includes('No joke available') && (
              <div
                style={{
                  position: 'absolute',
                  bottom: '0',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                {category && (
                  <Chip
                    label={category}
                    color="secondary"
                    size="small"
                    sx={{
                      fontFamily: "'Caveat', cursive",
                      paddingX: '0.5rem',
                    }}
                  />
                )}
                <ArrowForwardIosIcon
                  fontSize="small"
                  onClick={onNextCategory}
                  style={{ cursor: 'pointer' }}
                />
              </div>
            )}
          </div>
        </foreignObject>
      </svg>
    </div>
  );
};

export default JokeSection;
