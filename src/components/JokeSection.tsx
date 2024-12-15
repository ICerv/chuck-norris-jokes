import Chip from '@mui/material/Chip';
import React from 'react';

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
}

const JokeSection: React.FC<JokeSectionProps> = ({
  joke,
  iconUrl,
  category,
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
            <polygon points={area.points} fill="rgba(0, 0, 0, 0.1)" />

            {/* Text, Icon, and Category inside the polygon */}
            <foreignObject x="170" y="220" width="268" height="180">
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  color: '#fff',
                  textAlign: 'center',
                  fontFamily: "'Caveat', cursive",
                  wordWrap: 'break-word',
                  overflow: 'auto',
                  maxHeight: '100%',
                  padding: '0.5rem',
                  fontSize: '1rem',
                  lineHeight: '1.5',
                }}
              >
                {/* Joke Text */}
                <div style={{ overflow: 'auto', maxHeight: '100%' }}>
                  {joke || 'No joke available'}
                </div>
                {/* Chip (Category) */}
                {category && (
                  <Chip
                    label={category}
                    color="secondary"
                    size="small"
                    sx={{
                      marginTop: '0.5rem',
                      marginBottom: '0.5rem',
                      fontFamily: "'Caveat', cursive",
                      paddingX: '0.5rem',
                    }}
                  />
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
