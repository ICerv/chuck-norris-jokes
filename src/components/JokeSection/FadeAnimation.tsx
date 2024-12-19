import React from 'react';

interface FadeAnimationProps {
  isVisible: boolean;
  children: React.ReactNode;
}

const FadeAnimation: React.FC<FadeAnimationProps> = ({
  isVisible,
  children,
}) => {
  const duration = 300;

  return (
    <div
      style={{
        opacity: isVisible ? 1 : 0,
        visibility: isVisible ? 'visible' : 'hidden',
        transition: `opacity ${duration}ms ease-in-out, visibility 0s linear ${
          isVisible ? '0s' : `${duration}ms`
        }`,
        overflowY: 'auto',
        maxHeight: '100%',
        paddingRight: '1rem',
        boxSizing: 'content-box',
        paddingLeft: '1rem',
      }}
    >
      {isVisible ? children : null}{' '}
    </div>
  );
};

export default FadeAnimation;
