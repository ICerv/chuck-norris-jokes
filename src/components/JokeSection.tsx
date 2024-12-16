import Chip from '@mui/material/Chip';
import React from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface Board {
  points: string;
}

const boardAreas: Board[] = [
  {
    points: '168,214,436,216,435,401,168,404',
  },
];

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
  return (
    <div style={{ position: 'relative', maxWidth: '900px', margin: 'auto' }}>
      {/* Background Image */}
      <img
        src="/images/chuck_norris_desktop.png"
        alt="Chuck Norris Board"
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />

      {/* SVG Polygon and Content */}
      <svg
        viewBox="0 0 500 500"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      >
        {boardAreas.map((area, index) => (
          <React.Fragment key={index}>
            <polygon points={area.points} fill="transparent" />

            {/* SVG Polygon and Content */}
            <foreignObject x="170" y="210" width="265" height="185">
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
          </React.Fragment>
        ))}
      </svg>
    </div>
  );
};

export default JokeSection;
