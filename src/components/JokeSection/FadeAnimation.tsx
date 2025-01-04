import React, { Suspense } from 'react';

const MotionDiv = React.lazy(() =>
  import('framer-motion').then((mod) => ({ default: mod.motion.div })),
);
const AnimatePresence = React.lazy(() =>
  import('framer-motion').then((mod) => ({ default: mod.AnimatePresence })),
);

interface FadeAnimationProps {
  children: React.ReactNode;
  keyProp: string | number;
}

const FadeAnimation: React.FC<FadeAnimationProps> = ({ children, keyProp }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AnimatePresence mode="wait">
        {children && (
          <MotionDiv
            key={keyProp}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </MotionDiv>
        )}
      </AnimatePresence>
    </Suspense>
  );
};

export default FadeAnimation;
